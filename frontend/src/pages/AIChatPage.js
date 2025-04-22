import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAI from 'openai';
import './AIChatPage.css';

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Required for frontend usage (remove in production)
});

// Function to format assistant messages with proper spacing and styling
const formatAssistantMessage = (content) => {
    if (!content) return '';
    
    // Process the content for better formatting
    let formattedContent = content
        // Replace double line breaks with a special marker for paragraphs
        .replace(/\n\n+/g, '||||PARAGRAPH||||')
        // Handle single line breaks within paragraphs (not followed by a list item)
        .replace(/\n(?!\d+\.|\*|•)/g, '<br />')
        // Format numbered lists (ensure there's proper spacing)
        .replace(/(\d+\.)\s+([^\n]+)/g, '<span class="list-item">$1 $2</span>')
        // Format bullet points
        .replace(/•\s+([^\n]+)/g, '<span class="list-item bullet">• $1</span>')
        .replace(/\*\s+([^\n]+)/g, '<span class="list-item bullet">• $1</span>')
        // Format definitions or terms (but not if already wrapped in a tag)
        .replace(/([^:<>]+):\s+([^\n<]+)(?![^<]*>)/g, '<span class="definition"><strong>$1:</strong> $2</span>')
        // Bold text between asterisks
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*\s][^*]*[^*\s])\*/g, '<em>$1</em>')
        // Handle special formatting for examples, notes, etc.
        .replace(/(Example:)([^\n]+)/g, '<span class="example"><strong>$1</strong>$2</span>')
        .replace(/(Note:)([^\n]+)/g, '<span class="note"><strong>$1</strong>$2</span>')
        // Split back into paragraphs
        .split('||||PARAGRAPH||||');
    
    // Return the formatted content with proper paragraph spacing
    return (
        <div className="formatted-content">
            {formattedContent.map((paragraph, i) => (
                <div 
                    key={i} 
                    className={paragraph.includes('list-item') ? 'paragraph list-paragraph' : 'paragraph'}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                />
            ))}
        </div>
    );
};

function AIChatPage() {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m your AI tutor assistant. Ask me anything about your studies or homework questions.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleBackClick = () => {
        navigate('/home');
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        // Add user message to chat
        const userMessage = { role: 'user', content: userInput };
        setChatMessages(prevMessages => [...prevMessages, userMessage]);
        
        // Clear input field
        setUserInput('');
        
        // Set loading state
        setIsLoading(true);

        try {
            // Format message history for o4-mini model
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
                    inputMessages.push({
                        "role": "user",
                        "content": [
                            {
                                "type": "input_text",
                                "text": msg.content
                            }
                        ]
                    });
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
            inputMessages.push({
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": userInput
                    }
                ]
            });
            
            // Call OpenAI API with the o4-mini model
            console.log('Sending request to OpenAI with messages:', inputMessages);
            const response = await openai.responses.create({
                model: "o4-mini",
                input: inputMessages,
                text: {
                    "format": {
                        "type": "text"
                    }
                },
                reasoning: {
                    "effort": "medium"
                },
                tools: [],
                store: true
            });
            
            console.log('Received response from OpenAI:', response);
            
            // Extract assistant's response - handle different possible response formats
            let assistantResponse = '';
            
            try {
                // Check for output_text directly on the response object
                if (response.output_text && typeof response.output_text === 'string') {
                    assistantResponse = response.output_text;
                }
                // Check for output array in the o4-mini response format
                else if (response.output && Array.isArray(response.output)) {
                    // Extract text from output array
                    assistantResponse = response.output
                        .filter(item => item.type === 'output_text')
                        .map(item => item.text)
                        .join('\n');
                    
                    // If we couldn't extract the text from the array format, try other methods
                    if (!assistantResponse && response.output.length > 0 && response.output[0].text) {
                        assistantResponse = response.output[0].text;
                    }
                }
                // For newer SDK format
                else if (response.content && Array.isArray(response.content)) {
                    assistantResponse = response.content
                        .filter(item => item.type === 'text')
                        .map(item => item.text)
                        .join('\n');
                }
                // For format shown in example
                else if (response.output && response.output.choices && response.output.choices[0].message) {
                    assistantResponse = response.output.choices[0].message.content
                        .filter(item => item.type === 'output_text')
                        .map(item => item.text)
                        .join('\n');
                }
                // Fallback format
                else if (typeof response.text === 'string') {
                    assistantResponse = response.text;
                }
                // Default fallback if unexpected format
                else {
                    assistantResponse = 'I received your question, but the response format was unexpected. Please try again or ask another question.';
                    console.log('Unexpected response format:', response);
                }
            } catch (parseError) {
                console.error('Error parsing response:', parseError, response);
                assistantResponse = 'I received your question, but had trouble processing my response. Please try again with a different question.';
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
                    content: 'Sorry, I encountered an error connecting to my knowledge base. This could be due to missing API configuration. Please check with the site administrator.' 
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
                                {message.role === 'assistant' 
                                    ? formatAssistantMessage(message.content)
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
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Ask your question here..."
                        className="chat-input"
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        className="send-button"
                        disabled={isLoading || !userInput.trim()}
                    >
                        Send
                    </button>
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