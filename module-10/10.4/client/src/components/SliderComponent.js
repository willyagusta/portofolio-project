import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
  };

  return (
    <Slider {...settings}>
      {items.map(item => (
        <div key={item.id} className="p-2">
          <div className="bg-gray-800 p-4 rounded-md">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4" />
          </div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p>{item.description}</p>
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;