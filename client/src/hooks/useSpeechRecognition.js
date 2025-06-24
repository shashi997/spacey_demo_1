import { useState, useEffect, useRef, useCallback } from 'react';

// Check for browser support once
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = ({ onFinalResult } = {}) => {
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [speechError, setSpeechError] = useState(null);
  
    // Effect to initialize the recognition instance once
    useEffect(() => {
      if (!SpeechRecognition) {
        console.warn("Speech recognition not supported by this browser.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop after a pause in speech
      recognition.interimResults = true; // Get results as the user speaks for live feedback
      recognition.lang = 'en-US';
      recognitionRef.current = recognition;
    }, []);
  
    // Effect to manage the recognition event listeners
    useEffect(() => {
      const recognition = recognitionRef.current;
      if (!recognition) return;
  
      const handleResult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        setTranscript(finalTranscript + interimTranscript);
  
        // When a final result is received, call the provided callback
        if (finalTranscript.trim() && onFinalResult) {
          onFinalResult(finalTranscript.trim());
        }
      };
  
      const handleError = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          setSpeechError("I didn't catch that. Please try again.");
          return;
        }
        setSpeechError(`Speech error: ${event.error}`);
      };
  
      const handleStart = () => setIsListening(true);
      const handleEnd = () => setIsListening(false);
  
      recognition.addEventListener('result', handleResult);
      recognition.addEventListener('error', handleError);
      recognition.addEventListener('start', handleStart);
      recognition.addEventListener('end', handleEnd);
  
      // Cleanup listeners on unmount or when the callback changes
      return () => {
        recognition.removeEventListener('result', handleResult);
        recognition.removeEventListener('error', handleError);
        recognition.removeEventListener('start', handleStart);
        recognition.removeEventListener('end', handleEnd);
        recognition.abort();
      };
    }, [onFinalResult]);
  
    const startListening = useCallback(() => {
      const recognition = recognitionRef.current;
      if (recognition && !isListening) {
        setTranscript('');
        setSpeechError(null);
        try {
          recognition.start();
        } catch (e) {
          console.error("Error starting recognition:", e);
          setIsListening(false);
        }
      }
    }, [isListening]);
  
    const stopListening = useCallback(() => {
      const recognition = recognitionRef.current;
      if (recognition && isListening) {
        recognition.stop();
      }
    }, [isListening]);
  
    return {
      isListening,
      transcript, // This provides the live transcript for UI feedback
      speechError,
      startListening,
      stopListening,
      isRecognitionSupported: !!SpeechRecognition,
    };
};