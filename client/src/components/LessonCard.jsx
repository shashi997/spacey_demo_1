import React from 'react'

const LessonCard = ({ title, image }) => {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg overflow-hidden group shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5 flex flex-col">
        <h4 className="text-lg font-semibold mb-4 text-gray-800 truncate">{title}</h4>
        <button className="bg-cyan-500 text-white font-bold py-2 px-4 text-sm rounded-lg hover:bg-cyan-600 transition-colors duration-300 transform group-hover:scale-105 self-center">
          Launch
        </button>
      </div>
    </div>
  )
}

export default LessonCard