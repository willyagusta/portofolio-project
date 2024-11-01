import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectSlider from '../components/ProjectSlider';
import SliderComponent from '../components/SliderComponent';


// Mock the SliderComponent
jest.mock('../components/SliderComponent', () => {
  return jest.fn(() => <div>Slider Component Mock</div>);
});

describe('ProjectSlider', () => {
  it('renders two SliderComponent instances with correct items', () => {
    render(<ProjectSlider />);
    console.log ('render two slider components');

    console.log('Check if SliderComponent is called twice');
    expect(SliderComponent).toHaveBeenCalledTimes(2);

    console.log('Check if SliderComponent is called with the correct props');
    expect(SliderComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [
          { id: 1, title: "Title-1", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 2, title: "Title-2", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 3, title: "Title-3", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 4, title: "Title-4", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 5, title: "Title-5", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
        ]
      }),
      {}
    );

    expect(SliderComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [
          { id: 6, title: "Title-6", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 7, title: "Title-7", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 8, title: "Title-8", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 9, title: "Title-9", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
          { id: 10, title: "Title-10", description: "Lorem ipsum dolor sit amet", image: "image/project.png" },
        ]
      }),
      {}
    );
  });
});