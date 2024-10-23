import React from 'react';
import SliderComponent from './SliderComponent';

function ProjectSlider() {
  const portfolioItems = [
    { id: 1, title: "Title-1", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 2, title: "Title-2", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 3, title: "Title-3", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 4, title: "Title-4", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 5, title: "Title-5", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 6, title: "Title-6", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 7, title: "Title-7", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 8, title: "Title-8", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 9, title: "Title-9", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
    { id: 10, title: "Title-10", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
  ];

  const firstRowItems = portfolioItems.slice(0, 5);
  const secondRowItems = portfolioItems.slice(5, 10);

  return (
    <div className="px-16">
      <SliderComponent items={firstRowItems} />
      <SliderComponent items={secondRowItems} />
    </div>
  );
}

export default ProjectSlider;