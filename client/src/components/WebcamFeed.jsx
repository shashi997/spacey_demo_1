import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const WebcamFeed = () => {
  // --- Webcam-specific state and logic ---
  const videoRef = useRef(null);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState(null);

  // Define the callback function to handle the final speech result
  const handleSpeechResult = useCallback((finalTranscript) => {
    console.log("Final transcript received:", finalTranscript);
    // TODO: This is where you would send the transcript to your AI backend
  }, []);

  // --- Consume the speech recognition hook ---
  const {
    isListening,
    transcript,
    speechError,
    startListening,
    stopListening,
    isRecognitionSupported,
  } = useSpeechRecognition({ onFinalResult: handleSpeechResult });

  // Effect for getting webcam and microphone stream
  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setMediaError("Webcam & microphone access denied. Please enable it in your browser settings.");
        } else {
          setMediaError("Could not access media devices. Please ensure they are not in use.");
        }
      } finally {
        setIsMediaLoading(false);
      }
    };

    enableStream();

    // Cleanup function to stop the stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Runs once on mount

  // A single handler for the button to toggle listening state
  const handleListenButtonClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (isMediaLoading) {
    return <p className="text-gray-500">Initializing webcam and microphone...</p>;
  }

  if (mediaError) {
    return <p className="text-red-500 p-4 text-center">{mediaError}</p>;
  }

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-black flex flex-col">
      <div className="relative w-full flex-grow">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted // Mute to prevent feedback loop from speakers to mic
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs font-semibold tracking-wider">
          LIVE FEED
        </div>
      </div>
      <div className="p-4 bg-gray-800 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Status: {isListening ? "Listening..." : "Ready"}
          </p>
          <button
            onClick={handleListenButtonClick}
            disabled={!isRecognitionSupported}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } ${!isRecognitionSupported ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            {isListening 
              ? 'Stop Listening' 
              : (isRecognitionSupported ? 'Start Listening' : 'Not Supported')}
          </button>
        </div>
        <div className="mt-3 p-2 bg-gray-900 rounded-md h-16 overflow-y-auto">
          {/* Display speech error from the hook if it exists */}
          {speechError ? (
            <p className="text-red-400 italic">{speechError}</p>
          ) : (
            <p className="text-gray-300 italic">{transcript || "Your speech will appear here..."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamFeed;
