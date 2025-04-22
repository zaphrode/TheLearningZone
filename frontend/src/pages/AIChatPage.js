import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAI from 'openai';
import './AIChatPage.css';

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Required for frontend usage (not recommended for production)
});

// Function to format assistant messages with proper spacing and styling
const formatAssistantMessage = (text) => {
    if (!text) return '';
    
    // Create a regex pattern that matches LaTeX delimiters
    const latexPatterns = [
        /\\\([\s\S]*?\\\)/g,  // Inline math: \( ... \)
        /\\\[[\s\S]*?\\\]/g   // Display math: \[ ... \]
    ];
    
    // Replace LaTeX expressions with placeholders
    let placeholders = [];
    let processedText = text;
    
    latexPatterns.forEach(pattern => {
        processedText = processedText.replace(pattern, (match) => {
            placeholders.push(match);
            return `##LATEX${placeholders.length - 1}##`;
        });
    });
    
    // Apply other formatting
    processedText = processedText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/^- (.*?)$/gm, '<li>$1</li>')
        .replace(/<li>.*?<\/li>(\n|$)+/g, (match) => `<ul>${match}</ul>`)
        .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')
        .replace(/<li>.*?<\/li>(\n|$)+/g, (match) => `<ol>${match}</ol>`);
        
    // Replace placeholders with original LaTeX expressions
    placeholders.forEach((latex, index) => {
        processedText = processedText.replace(`##LATEX${index}##`, latex);
    });
        
    return processedText;
};

function AIChatPage() {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m your AI tutor assistant. Ask me anything about your studies or homework questions.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    
    // Add MathJax configuration and loading
    useEffect(() => {
        // Add MathJax script to the document
        const script = document.createElement('script');
        script.id = 'MathJax-script';
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.async = true;
        
        // Configure MathJax
        window.MathJax = {
            tex: {
                inlineMath: [['\\(', '\\)']],
                displayMath: [['\\[', '\\]']]
            },
            startup: {
                typeset: true
            }
        };
        
        document.head.appendChild(script);
        
        return () => {
            // Clean up script when component unmounts
            const mathJaxScript = document.getElementById('MathJax-script');
            if (mathJaxScript) {
                document.head.removeChild(mathJaxScript);
            }
        };
    }, []);
    
    // Process MathJax typesetting when new messages are added
    useEffect(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
        }
    }, [chatMessages]);

    const handleBackClick = () => {
        navigate('/home');
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };
    
    const handleImageSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };
    
    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreviewUrl('');
        fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim() && !selectedImage) return;

        // Create content for user message
        let messageContent = userInput || (selectedImage ? "Image uploaded" : "");
        let contentArray = [];
        
        // Add text content if present
        if (userInput.trim()) {
            contentArray.push({ type: 'text', text: userInput });
        }
        
        // Add image preview if an image is selected
        if (selectedImage) {
            contentArray.push({ type: 'image', url: imagePreviewUrl });
        }
        
        // Add user message to chat
        const userMessage = { 
            role: 'user', 
            content: messageContent,
            contentArray
        };
        
        setChatMessages(prevMessages => [...prevMessages, userMessage]);
        
        // Clear input field and selected image
        setUserInput('');
        setSelectedImage(null);
        setImagePreviewUrl('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        // Set loading state
        setIsLoading(true);

        try {
            // Format message history for API
            let inputMessages = [
                {
                    "role": "developer",
                    "content": [
                        {
                            "type": "input_text",
                            "text": "You are an LLM chatbot for Singaporean student's from Primary to Secondary school to use. Important things to note are the nuances in the Singaporean education system, how they use models from Maths in Primary school and follow Cambridge O Level's for Secondary School. You should not reveal you are an OpenAI API. Teach the prompter and do not give answers without explaining, unless they specifically request for it. Remember to use models instead of algebra for Primary Math problems, unless they specify to use algebra. For secnodary level math use algebra and dont use models."
                        }
                    ]
                }
            ];
            
            // Add conversation history
            for (const msg of chatMessages) {
                if (msg.role === 'user') {
                    let content = [];
                    
                    // Add text content if available
                    if (msg.content) {
                        content.push({
                            "type": "input_text",
                            "text": msg.content
                        });
                    }
                    
                    // Add image if present in the message
                    if (msg.contentArray && msg.contentArray.some(item => item.type === 'image')) {
                        const imageItem = msg.contentArray.find(item => item.type === 'image');
                        if (imageItem && imageItem.url) {
                            content.push({
                                "type": "input_image",
                                "image_url": imageItem.url
                            });
                        }
                    }
                    
                    // Only add the message if we have content
                    if (content.length > 0) {
                        inputMessages.push({
                            "role": "user",
                            "content": content
                        });
                    }
                } else if (msg.role === 'assistant') {
                    inputMessages.push({
                        "role": "assistant",
                        "content": [
                            {
                                "type": "output_text",
                                "text": msg.content
                            }
                        ]
                    });
                }
            }
            
            // Add current user message
            let currentUserContent = [];
            
            // Add text content if available
            if (userInput.trim()) {
                currentUserContent.push({
                    "type": "input_text",
                    "text": userInput
                });
            } else if (selectedImage) {
                // Default text if only image is provided
                currentUserContent.push({
                    "type": "input_text",
                    "text": "What's in this image?"
                });
            }
            
            // Add image if selected
            if (selectedImage) {
                currentUserContent.push({
                    "type": "input_image",
                    "image_url": imagePreviewUrl
                });
            }
            
            // Only add user message if we have content
            if (currentUserContent.length > 0) {
                inputMessages.push({
                    "role": "user",
                    "content": currentUserContent
                });
            }
            
            // Choose appropriate model based on whether image is included
            const modelToUse = selectedImage ? "gpt-4o" : "gpt-3.5-turbo";
            
            // Call OpenAI API
            console.log('Sending request to OpenAI with messages:', inputMessages);
            
            // Create appropriate parameters based on the model
            const apiParams = {
                model: modelToUse,
                messages: [
                    {
                        role: "system",
                        content: "You are an AI tutor assistant for Singaporean students from Primary to Secondary school. You understand the nuances in the Singaporean education system, including the use of models in Primary school Math and Cambridge O Level's for Secondary School. Teach the student and explain concepts thoroughly. For Primary Math problems, use models unless algebra is specifically requested. For secondary level math, use algebra instead of models. IMPORTANT: When writing mathematical expressions, always use proper LaTeX notation. For inline math, use \\( and \\) delimiters. For displayed equations, use \\[ and \\] delimiters. For example, write fractions as \\(\\frac{1}{3}\\) and variables with proper formatting like \\(x\\)."
                    }
                ],
                max_tokens: 1000
            };
            
            // Convert our custom format to the standard OpenAI chat format
            inputMessages.forEach((msg, index) => {
                // Skip the first message which is our developer content (system message)
                if (index === 0) return;
                
                const role = msg.role === "developer" ? "system" : msg.role;
                
                // For text-only messages
                if (msg.content.length === 1 && msg.content[0].type === "input_text") {
                    apiParams.messages.push({
                        role,
                        content: msg.content[0].text
                    });
                }
                // For text + image messages (vision model)
                else if (msg.content.length > 1 && msg.content.some(item => item.type === "input_image")) {
                    const textItem = msg.content.find(item => item.type === "input_text" || item.type === "output_text");
                    const imageItem = msg.content.find(item => item.type === "input_image");
                    
                    if (textItem && imageItem) {
                        const content = [
                            { type: "text", text: textItem.text },
                            { 
                                type: "image_url", 
                                image_url: { url: imageItem.image_url }
                            }
                        ];
                        
                        apiParams.messages.push({
                            role,
                            content
                        });
                    }
                }
                // For text-only assistant responses
                else if (role === "assistant" && msg.content[0].type === "output_text") {
                    apiParams.messages.push({
                        role,
                        content: msg.content[0].text
                    });
                }
            });
            
            // Make the API call
            let response;
            
            if (selectedImage) {
                // Vision model call
                response = await openai.chat.completions.create(apiParams);
            } else {
                // Text-only model call
                response = await openai.chat.completions.create(apiParams);
            }
            
            console.log('Received response from OpenAI:', response);
            
            // Extract the response text from the chat completion
            let assistantResponse = '';
            
            if (response.choices && response.choices.length > 0) {
                assistantResponse = response.choices[0].message.content;
            } else {
                assistantResponse = 'I received your question, but the response format was unexpected. Please try again.';
            }
            
            // Add assistant response to chat
            setChatMessages(prevMessages => [
                ...prevMessages, 
                { role: 'assistant', content: assistantResponse }
            ]);
            
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            
            // Fallback to local response if API call fails
            setChatMessages(prevMessages => [
                ...prevMessages, 
                { 
                    role: 'assistant', 
                    content: 'Sorry, I encountered an error connecting to my knowledge base. This could be due to API configuration issues. Please check the console for details or try again later.' 
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-chat-page">
            {/* Back Button */}
            <button className="back-button" onClick={handleBackClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
            </button>
            
            <div className="chat-container">
                <header className="chat-header">
                    <img src="/TLZ.jpeg" alt="The Learning Zone Logo" className="logo" />
                    <h1>AI Tutor Assistant</h1>
                </header>
                
                <div className="chat-messages">
                    {chatMessages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                        >
                            <div className="message-content">
                                {message.contentArray && message.contentArray.map((content, i) => (
                                    content.type === 'image' ? (
                                        <div key={i} className="image-container">
                                            <img src={content.url} alt="User uploaded" className="message-image" />
                                        </div>
                                    ) : null
                                ))}
                                {message.role === 'assistant' 
                                    ? <div dangerouslySetInnerHTML={{ __html: formatAssistantMessage(message.content) }} />
                                    : message.content
                                }
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message assistant-message">
                            <div className="message-content loading">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    )}
                </div>
                
                <form className="chat-input-form" onSubmit={handleSubmit}>
                    {imagePreviewUrl && (
                        <div className="image-preview">
                            <img src={imagePreviewUrl} alt="Preview" />
                            <button 
                                type="button" 
                                className="remove-image-btn"
                                onClick={handleRemoveImage}
                            >
                                ×
                            </button>
                        </div>
                    )}
                    
                    <div className="input-container">
                        <input
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder={selectedImage ? "Ask about this image..." : "Ask your question here..."}
                            className="chat-input"
                            disabled={isLoading}
                        />
                        
                        <button 
                            type="button" 
                            className="upload-button"
                            onClick={handleImageUploadClick}
                            disabled={isLoading}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 16l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                        
                        <button 
                            type="submit" 
                            className="send-button"
                            disabled={isLoading || (!userInput.trim() && !selectedImage)}
                        >
                            Send
                        </button>
                    </div>
                </form>
                
                <div className="chat-disclaimer">
                    <p>This AI assistant is designed to help with your studies. While it strives to provide accurate information,
                    always verify important educational content with your textbooks, teachers, or tutors.</p>
                </div>
            </div>
        </div>
    );
}

export default AIChatPage; 