import React from 'react'
import LessonCard from './LessonCard';

import satelliteImg from '../assets/chirag-malik-FHGkbIJYVbg-unsplash.jpg';
import spaghettificationImg from '../assets/boliviainteligente-MO6wb4hdhZo-unsplash.jpg';
import space_explorationImg from '../assets/brian-mcgowan-I0fDR8xtApA-unsplash.jpg';
import MarsRoverImg from '../assets/mars-67522_640.jpg';
import ZeroGravityImg from '../assets/ai-generated-8143656_640.jpg';

const lessons = [
    { id: 1, title: 'Build Your Own Satellite', image: satelliteImg },
    { id: 2, title: 'Spaghettification', image: spaghettificationImg },
    { id: 3, title: `What's new in the Space Exploration`, image: space_explorationImg },
    { id: 4, title: 'Mars Rover Mission', image: MarsRoverImg },
    { id: 5, title: 'Zero Gravity', image: ZeroGravityImg }, // Re-using image
];

const LessonCarousel = () => {
    return (
        <div className="rounded-lg">
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} title={lesson.title} image={lesson.image} />
            ))}
          </div>
        </div>
    );
}

export default LessonCarousel