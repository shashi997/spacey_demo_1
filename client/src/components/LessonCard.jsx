import React from 'react'

const LessonCard = ({ title, image }) => {
  return (
    <div className="flex-shrink-0 w-full lg:w-auto bg-space-blue rounded-lg overflow-hidden group shadow-md border border-border-color transition-all duration-300 hover:shadow-xl hover:border-accent-cyan hover:-translate-y-1">
      <img src={image} alt={title} className="w-full h-36 object-cover" />
      <div className="p-4 flex flex-col">
        <h4 className="text-md font-semibold mb-3 text-text-primary">{title}</h4>
        <button className="bg-accent-cyan text-space-dark font-bold py-2 px-4 text-sm rounded-lg hover:bg-cyan-300 transition-colors duration-300 self-start">
          Launch
        </button>
      </div>
    </div>
  )
}

export default LessonCard