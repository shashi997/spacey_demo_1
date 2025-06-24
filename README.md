# Spacey AI Tutor

An AI-powered interactive learning platform focused on space science, featuring a conversational 3D avatar and personalized visual interactions. This project aims to provide an engaging and futuristic learning experience.

## Key Features (Under Development)

1.  **3D Ready Player Me Avatar (AI Tutor):**
    * **Current:** A 3D placeholder box is rendered within the scene, capable of simple "speaking" animations.
    * **Goal:** Integrate a full Ready Player Me avatar that serves as an AI tutor, capable of complex animations including lip-syncing tied to speech.

2.  **Real-time Voice Interaction:**
    * **Current:** Microphone input capture is implemented. 
    * **Goal:** Implement robust client-side Automatic Speech Recognition (ASR) (e.g., a 2MB model), Voice Activity Detection (VAD), seamless WebSocket communication with a backend LLM (e.g., Google Gemini) and Text-to-Speech (TTS) service. The avatar's lip-sync will be accurately driven by the TTS output.

3.  **Personalized Visual Greeting:**
    * **Current:** The application accesses the user's webcam feed. 
    * **Goal:** The backend will utilize a Vision LLM (e.g., Gemini Vision) to analyze the snapshot and generate a personalized compliment or greeting based on facial features, sentiment, or other visual cues. This compliment will then be spoken by the avatar via TTS.



## Technologies Used

### Frontend
* **React:** For building the user interface.
* **Vite:** Fast build tool and development server.
* **Tailwind CSS:** For rapid UI development and styling.
* **@react-three/fiber:** React renderer for Three.js, for creating 3D scenes.
* **@react-three/drei:** A collection of useful helpers for `@react-three/fiber`.
* **@readyplayerme/react-avatar-creator:** (Planned) For seamless integration of Ready Player Me avatars.
* **TensorFlow.js & @tensorflow-models/face-detection:** Client-side machine learning for face detection.
* **Web Speech API:** For client-side Text-to-Speech (for compliment).

### Backend (Requires separate setup - reference expected for this repo)
* **Node.js / Express:** (Expected) For handling API requests (e.g., image uploads, LLM/TTS integration).
* **WebSockets (ws):** (Expected) For real-time bi-directional communication for voice interaction.
* **LLM (e.g., Google Gemini):** (Planned) For natural language understanding and generation.
* **TTS (e.g., Google Text-to-Speech):** (Planned) For converting AI responses to speech.
* **Vision LLM (e.g., Google Gemini Vision):** (Planned) For image analysis for personalized greetings.
