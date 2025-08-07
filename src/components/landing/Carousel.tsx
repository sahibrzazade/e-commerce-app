import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselProps } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { themedBackground } from '../../styles/themeClassNames';



const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const { theme } = useTheme();

  const themedIcon = {
    color: theme === 'light' ? 'black' : 'white',
  };

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`slide-${idx}`}
              className="w-full max-h-[900px] flex-shrink-0 select-none pointer-events-none"
              draggable={false}
            />
          ))}
        </div>

        <button
          className={`${themedBackground} absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full cursor-pointer shadow-lg hover:bg-primary-light hover:dark:bg-primary-dark transition-all`}
          onClick={goToPrevious}
        >
          <LeftOutlined className="text-xl" style={themedIcon} />
        </button>

        <button
          className={`${themedBackground} absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full cursor-pointer shadow-lg hover:bg-primary-light hover:dark:bg-primary-dark transition-all`}
          onClick={goToNext}
        >
          <RightOutlined className="text-xl" style={themedIcon} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-4">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`transition-all duration-300 cursor-pointer ease-in-out ${current === idx
                ? 'transform scale-130 opacity-100'
                : 'opacity-60 hover:opacity-100'
                }`}
            >
              <img
                src={src}
                alt={`thumbnail-${idx}`}
                className="h-16 w-16 object-cover transition-all duration-100 ease-in-out"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
