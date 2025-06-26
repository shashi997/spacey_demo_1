import { useState, useEffect } from 'react';
import AvatarCanvas from '../components/AvatarCanvas'
import WebcamFeed from '../components/WebcamFeed'
import LessonCarousel from '../components/LessonCarousel'
import AI_Chat from '../components/AI_Chat';

// A simple hook to get window size
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return { width: size[0], height: size[1] };
};


const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Section: Main Panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel (65%): 3D Avatar */}
        <div className="w-[65%] h-full p-4">
          <div className="bg-gray-100 rounded-lg h-full shadow-inner">
            <AvatarCanvas />
          </div>
        </div>

        {/* Right Panel (35%): Webcam Feed */}
        <div className="w-[35%] h-full p-4">
          <div className="bg-gray-100 rounded-lg h-full shadow-inner flex items-center justify-center">
            <WebcamFeed />
          </div>
        </div>
      </div>

      {/* Bottom Section: Lesson Carousel */}
      <div className="w-full p-4">
        <LessonCarousel />
      </div>
    </div>
  )
}

export default Dashboard