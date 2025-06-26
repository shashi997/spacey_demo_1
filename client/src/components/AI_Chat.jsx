import { useState, useRef, useEffect } from 'react';

const AI_Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Nebula, your guide to the cosmos. What would you like to learn about today?", sender: 'ai' },
    { id: 2, text: "I want to know about black holes.", sender: 'user' },
    { id: 3, text: "A fascinating topic! A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even light—can escape. Shall we dive deeper?", sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    // In a real app, you'd send the message to a backend for a real response
    const aiResponse = { id: Date.now() + 1, text: "That's a great question! Let me look that up...", sender: 'ai' };

    setMessages([...messages, userMessage, aiResponse]);
    setInput('');
  };

  return (
    <div className="bg-space-blue h-full flex flex-col rounded-lg border border-border-color shadow-lg">
      <div className="p-4 border-b border-border-color">
        <h3 className="text-lg font-bold text-text-primary">AI Conversation</h3>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-space-purple rounded-full flex-shrink-0" title="Nebula AI"></div>
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-accent-cyan text-space-dark rounded-br-none'
                    : 'bg-gray-700 text-text-primary rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-border-color">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about space..."
            className="flex-grow bg-gray-700 text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-space-purple"
          />
          <button
            type="submit"
            className="bg-space-purple text-white p-2 rounded-full hover:bg-purple-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AI_Chat;
