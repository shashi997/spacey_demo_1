// e:\Spacey-Intern\spacey_first_demo\spacey_demo_1\client\src\components\AI_Chat.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Mic, Send, Sparkles } from 'lucide-react';

const AI_Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Nebula, your guide to the cosmos. What would you like to learn about today?", sender: 'ai' },
    { id: 2, text: "I want to know about black holes.", sender: 'user' },
    { id: 3, text: "A fascinating topic! A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even light—can escape. Shall we dive deeper?", sender: 'ai' },
  ]);
  const [input, setInput] = useState(''); // State for the final message (typed or recognized)
  const [liveTranscript, setLiveTranscript] = useState(''); // State for live interim voice feedback

  const messagesEndRef = useRef(null); // Ref for auto-scrolling chat
  // Refs to hold the latest values of isListening and stopListening
  // This breaks the circular dependency issue by allowing handleSend to be defined earlier.
  const isListeningRef = useRef(false);
  const stopListeningRef = useRef(() => {});

  // Memoized handleSend function to handle both typed and voice-triggered sends
  const handleSend = useCallback((e, textToSend = null) => {
    // Prevent default form submission if triggered by a submit event
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Determine the message text: use textToSend if provided (from voice), otherwise use current input state
    const messageText = textToSend !== null ? textToSend.trim() : input.trim();

    if (messageText === '') return; // Do not send empty messages

    const userMessage = { id: Date.now(), text: messageText, sender: 'user' };
    // Simulate an AI response for demonstration purposes
    const aiResponse = { id: Date.now() + 1, text: "That's a great question! Let me look that up...", sender: 'ai' };

    setMessages((prevMessages) => [...prevMessages, userMessage, aiResponse]);
    setInput(''); // Clear the main input field after sending
    setLiveTranscript(''); // Ensure live transcript is also cleared

    // Use the refs for isListening and stopListening
    if (isListeningRef.current) {
      stopListeningRef.current();
    }
  }, [input]); // Dependencies: only input, as isListening and stopListening are accessed via refs

  // Callback for when a final speech result is ready from the hook
  const handleFinalSpeechResult = useCallback((finalText) => {
    setInput(finalText); // Populate the input field with the final recognized text
    setLiveTranscript(''); // Clear live transcript as final result is processed
    handleSend(null, finalText); // Automatically send the message
  }, [handleSend]); // Dependency on handleSend to ensure it's the latest version

  // Integrate the useSpeechRecognition hook
  const {
    isListening,
    transcript: interimTranscript, // Renamed to avoid conflict and clarify its purpose
    speechError,
    startListening,
    stopListening,
    isRecognitionSupported,
  } = useSpeechRecognition({ onFinalResult: handleFinalSpeechResult });

  // Effect to keep refs updated with the latest values from the hook
  // This runs whenever isListening or stopListening from the hook change.
  useEffect(() => {
    isListeningRef.current = isListening;
    stopListeningRef.current = stopListening;
  }, [isListening, stopListening]);

  // Effect to update liveTranscript for visual feedback while speaking
  useEffect(() => {
    if (isListening) {
      setLiveTranscript(interimTranscript); // Show interim results while listening
    } else {
      setLiveTranscript(''); // Clear live transcript when not listening
    }
  }, [interimTranscript, isListening]); // Dependencies: interimTranscript (for updates), isListening (for state change)

  // Effect to scroll to the bottom of the chat messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Dependency on messages to scroll when new messages arrive

  // Toggle listening function for the microphone button
  const handleToggleListen = useCallback(() => {
    if (isListening) { // This `isListening` is the one from the hook, which is in scope here.
      stopListening(); // This `stopListening` is the one from the hook, which is in scope here.
    } else {
      setInput(''); // Clear main input field before starting new voice input
      setLiveTranscript(''); // Clear any lingering live transcript
      startListening(); // This `startListening` is the one from the hook, which is in scope here.
    }
  }, [isListening, startListening, stopListening]); // Dependencies for useCallback

  return (
    <div className="bg-slate-800 h-full flex flex-col rounded-lg border border-slate-700 shadow-lg text-slate-100">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-xl font-semibold text-white">AI Conversation</h3>
      </div>

      {/* Messages Display Area */}
      <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar */}
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex-shrink-0 flex items-center justify-center" title="Nebula AI">
                  <Sparkles className="w-5 h-5 text-sky-300" />
                </div>
              )}
              {/* Message Bubble */}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-sky-500 text-white rounded-br-none'
                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-slate-700">
        {/* Display speech recognition errors */}
        {speechError && (
          <p className="text-yellow-400 text-xs text-center mb-2">{speechError}</p>
        )}
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            // Display live transcript while listening, otherwise display the main input state
            value={isListening ? liveTranscript : input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask about space..."}
            className="flex-grow bg-slate-900/70 text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
            aria-label="Type your message here"
          />
          {/* Microphone button, only shown if speech recognition is supported */}
          {isRecognitionSupported && (
            <button
              type="button"
              onClick={handleToggleListen}
              className={`p-2 rounded-full transition-colors duration-200 ease-in-out ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
              aria-label={isListening ? "Stop listening" : "Start voice search"}
              title={isListening ? "Stop listening" : "Start voice search"}
            >
              <Mic className="w-6 h-6" />
            </button>
          )}
          {/* Send button */}
          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-200 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed"
            // Disable if both the main input and live transcript are empty
            disabled={!input.trim() && !liveTranscript.trim()} 
            aria-label="Send message"
            title="Send message"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AI_Chat;
