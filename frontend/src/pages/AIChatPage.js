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
    
    // Process for list formatting
    const lines = processedText.split('\n');
    let inOrderedList = false;
    let inUnorderedList = false;
    let formattedLines = [];
    
    // Process each line
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Skip processing if line contains a LaTeX placeholder
        if (line.includes('##LATEX')) {
            formattedLines.push(line);
            continue;
        }
        
        // Check for ordered list item (1. 2. 3. etc)
        const orderedListMatch = line.match(/^(\d+)\.\s+(.*?)$/);
        if (orderedListMatch) {
            const number = orderedListMatch[1]; // Get the actual number
            if (!inOrderedList) {
                // Start a new ordered list
                inOrderedList = true;
                formattedLines.push('<ol>');
            }
            // Add list item with original number via value attribute
            formattedLines.push(`<li value="${number}">${orderedListMatch[2]}</li>`);
        } 
        // Check for unordered list item (- or *)
        else if (line.match(/^[-*]\s+(.*?)$/)) {
            const content = line.replace(/^[-*]\s+/, '');
            if (!inUnorderedList) {
                // Start a new unordered list
                inUnorderedList = true;
                formattedLines.push('<ul>');
            }
            // Add list item
            formattedLines.push(`<li>${content}</li>`);
        }
        // Handle end of lists
        else {
            if (inOrderedList) {
                inOrderedList = false;
                formattedLines.push('</ol>');
            }
            if (inUnorderedList) {
                inUnorderedList = false;
                formattedLines.push('</ul>');
            }
            // Add the non-list line
            formattedLines.push(line);
        }
    }
    
    // Close any open lists at the end
    if (inOrderedList) {
        formattedLines.push('</ol>');
    }
    if (inUnorderedList) {
        formattedLines.push('</ul>');
    }
    
    // Join lines back to text
    processedText = formattedLines.join('\n');
    
    // Apply other formatting - careful not to break LaTeX content
    processedText = processedText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Convert standalone dash bullet points to proper list items
        .replace(/^-\s+(.*?)$/gm, '<div class="standalone-bullet"><span class="bullet-marker">-</span> $1</div>')
        // Convert inline dash bullet points to proper list items - ensure new line before bullet
        .replace(/(\S)\s+-\s+([^\n<])/g, '$1</p><p><div class="standalone-bullet"><span class="bullet-marker">-</span> $2')
        // Format bullet points (• symbol) to always start on a new line
        .replace(/•\s+(.*?)(?=•|$)/g, '</p><div class="standalone-bullet"><span class="inline-bullet">•</span> <span class="bullet-content">$1</span></div><p>')
        // Format multiple bullet points in sequence
        .replace(/<\/div><p><\/p><div class/g, '</div><div class')
        // Also format dashes within text that look like bullet points - ensure new line before dash
        .replace(/([^\-])\s+–\s+([^<])/g, '$1</p><p><span class="inline-dash">–</span> $2');
        
    // Clean up any empty paragraphs created during formatting
    processedText = processedText
        .replace(/<p><\/p>/g, '')
        .replace(/<p>\s*<\/p>/g, '');
        
    // Replace placeholders with original LaTeX expressions
    placeholders.forEach((latex, index) => {
        processedText = processedText.replace(`##LATEX${index}##`, latex);
    });
    
    // Add a wrapper div with special class for MathJax to process
    return `<div class="tex2jax_process">${processedText}</div>`;
};

function AIChatPage() {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m your AI tutor assistant. Ask me anything about your studies or homework questions. Let me know your level as well, so I can curate my response better.' }
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
        
        // Configure MathJax with extended capabilities
        window.MathJax = {
            tex: {
                inlineMath: [['\\(', '\\)']],
                displayMath: [['\\[', '\\]']],
                processEscapes: true,       // Process \$ to get $
                processEnvironments: true   // Process \begin{xxx}...\end{xxx}
            },
            options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
                processHtmlClass: 'tex2jax_process'
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
            // Allow a small delay for the DOM to update before typesetting
            setTimeout(() => {
                window.MathJax.typesetPromise()
                    .catch(err => console.error('MathJax typesetting failed:', err));
            }, 100);
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
                            "text": "You are an LLM chatbot for Singaporean student's from Primary to Secondary schools to ask questions ranging from Maths, Science and English. If they state their level, curate your answers for their level. Important nuances to note in the Singaporean education system, is how they use models from Maths in Primary school and follow the GCSE Cambridge O Level's syllabus for Secondary School. You should not reveal you are an OpenAI API. Teach the prompter and do not give answers without explaining, unless they specifically request for it. Remember to use models instead of algebra for Primary Math problems, unless they specify to use algebra. For secondary level math use algebra and dont use models."
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
                // Special handling for mathematical expressions
                const formattedUserInput = userInput.trim();
                
                // Detect if this is likely a math problem - look for patterns that suggest an equation or calculation
                const mathPattern = /^[\d\s\+\-\*\/\(\)\[\]\{\}\^\=]+$|^(solve|calculate|evaluate|find|compute|what is)\s+[\d\s\+\-\*\/\(\)\[\]\{\}\^\=xyzabc]+$/i;
                const containsMath = mathPattern.test(formattedUserInput);
                
                if (containsMath) {
                    // For math expressions, provide clear instructions but don't mention brackets in a way visible to the user
                    currentUserContent.push({
                        "type": "input_text",
                        "text": formattedUserInput
                    });
                } else {
                    // For regular questions
                    currentUserContent.push({
                        "type": "input_text",
                        "text": formattedUserInput
                    });
                }
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
            const modelToUse = "o4-mini"; // Always use o4-mini regardless of image
            
            // Call OpenAI API
            console.log('Sending request to OpenAI with messages:', inputMessages);
            
            // Create appropriate parameters based on the model
            const apiParams = {
                model: modelToUse,
                messages: [
                    {
                        role: "system",
                        content: "You are an AI tutor assistant for Singaporean students from Primary to Secondary school. Teach the student and explain concepts thoroughly. For Primary Math problems, use models unless algebra is specifically requested. For secondary level math, use algebra instead of models. IMPORTANT: When writing mathematical expressions, always use proper LaTeX notation. For inline math, use \\( and \\) delimiters. For displayed equations, use \\[ and \\] delimiters. For example, write fractions as \\(\\frac{1}{3}\\), exponents/powers as \\(x^2\\) for x squared, and variables with proper formatting like \\(x\\). Never use plain text carets (^) for exponents - always use proper LaTeX notation inside the appropriate delimiters. When interpreting mathematical expressions from the user, treat ^ as exponentiation and preserve all operations exactly as written. IMPORTANT: Never mention anything about 'preserving brackets' or 'algebra' in your responses unless it's directly relevant to the question being asked. Don't reference how the system detects math problems."
                    }
                ],
                max_completion_tokens: 5000
            };
            
            // Convert our custom format to the standard OpenAI chat format
            inputMessages.forEach((msg, index) => {
                // Skip the first message which is our developer content (system message)
                if (index === 0) return;
                
                const role = msg.role === "developer" ? "system" : msg.role;
                
                // For text-only messages
                if (msg.content.length === 1 && msg.content[0].type === "input_text") {
                    // Preserve mathematical expressions by escaping special characters
                    let processedText = msg.content[0].text;
                    
                    // Check if the text contains likely mathematical expressions
                    if (/[\+\-\*\/\(\)\[\]\{\}\^\=]/.test(processedText)) {
                        console.log("Detected potential mathematical expression:", processedText);
                    }
                    
                    apiParams.messages.push({
                        role,
                        content: processedText
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
                console.log('OpenAI response choice:', response.choices[0]);
                assistantResponse = response.choices[0].message.content;
                if (assistantResponse === null || assistantResponse === undefined) {
                    console.warn('Assistant response content is null or undefined. Finish reason:', response.choices[0].finish_reason);
                    assistantResponse = 'I received a response, but it was empty. Please try rephrasing your question or try again later.';
                }
            } else {
                console.warn('No choices found in OpenAI response or choices array is empty.');
                assistantResponse = 'I received your question, but the response format was unexpected. Please try again.';
            }
            
            console.log('Formatted assistant response to be displayed:', assistantResponse);
            
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