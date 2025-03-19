import React, { useState, useEffect } from "react";
import axios from "axios";
import { CHATBOT_API_END_POINT } from '@/utils/constant'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) setMessages([]);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    try {
      setIsLoading(true);
      const response = await apiCall(userMessage.text);
      
      // Add bot response
      const botMessage = { 
        id: Date.now() + 1, 
        text: response,
        isUser: false 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Bot is busy, try again later.",
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const apiCall = async (prompt) => {
    console.log("enter to api call function",prompt)
    try {
      const res = await axios.post(`${CHATBOT_API_END_POINT}/chat`, {
        params:  prompt ,
        withCredentials: true
      });
      
      if (!res.data.success) throw new Error("API request failed");
      return res.data.response; // Adjust according to your API response structure
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        💬 Chat
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-5 bg-white w-80 h-96 shadow-lg rounded-lg flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg max-w-[85%] ${
                  message.isUser 
                    ? "bg-blue-100 ml-auto" 
                    : "bg-gray-100"
                }`}
                style={{ 
                  wordWrap: "break-word",
                  minWidth: "60px",
                  transition: "all 0.3s ease"
                }}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg bg-gray-100 max-w-[85%]">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t p-3 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your prompt"
              className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 disabled:hover:text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l7-1.5a1 1 0 00.242-.051l4-1a1 1 0 00.904-1.066l-.5-8a1 1 0 00-.723-.84l-4-1.5a1 1 0 00-.522-.043z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;