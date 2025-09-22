import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can I help you today?",
      sender: 'support',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user' as const,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate response
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          text: "Thanks for your message! Our team will get back to you shortly.",
          sender: 'support' as const,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-4 md:right-6 w-14 h-14 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center chat-pulse`}
        style={{ 
          backgroundColor: '#6050DC',
          boxShadow: '0 4px 20px rgba(96, 80, 220, 0.4)'
        }}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-4 md:right-6 w-80 max-w-[calc(100vw-2rem)] h-96 max-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-scale-in"
          style={{ 
            border: '1px solid #F0F0F0',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Header */}
          <div 
            className="p-4 text-white flex justify-between items-center"
            style={{ backgroundColor: '#6050DC' }}
          >
            <div>
              <h3 
                className="font-medium"
                style={{ fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Customer Support
              </h3>
              <p 
                className="text-sm opacity-90"
                style={{ fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                We're here to help
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200 hover-scale"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#0A73BE' : '#f3f4f6',
                    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p 
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                style={{ 
                  fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                  backgroundColor: 'white'
                }}
              />
              <button
                onClick={handleSendMessage}
                className="p-2 text-white rounded-lg hover:bg-[#085a9a] hover-scale"
                style={{ backgroundColor: '#0A73BE' }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}