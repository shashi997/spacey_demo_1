import { useState, useEffect } from 'react';
import AvatarCanvas from '../components/AvatarCanvas'
import WebcamFeed from '../components/WebcamFeed'
import LessonCarousel from '../components/LessonCarousel'
import AI_Chat from '../components/AI_Chat';


const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 h-screen gap-4 p-4 bg-space-dark">
      {/* Left Side */}
      <div className="flex flex-col h-full gap-4">
        {/* Top-Left: 3D Avatar */}
        <div className="h-[60%] bg-space-blue rounded-lg shadow-md overflow-hidden">
          <AvatarCanvas />
        </div>

        {/* Bottom-Left: Lesson Cards */}
        <div className="h-[40%] bg-space-blue rounded-lg shadow-md overflow-hidden">
          <LessonCarousel />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col h-full gap-4">
        {/* Top-Right: Webcam Feed */}
        <div className="h-[30%] bg-space-blue rounded-lg shadow-md flex items-center justify-center overflow-hidden">
          <WebcamFeed />
        </div>

        {/* Bottom-Right: AI Chat */}
        <div className="h-[70%] bg-space-blue rounded-lg shadow-md overflow-hidden">
          <AI_Chat />
        </div>
      </div>
    </div>
  )
}

export default Dashboard