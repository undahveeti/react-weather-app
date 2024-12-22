import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CarouselProps {
  children: React.ReactNode[]; // Array of WeatherSections
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < children.length - 2) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
        disabled={currentIndex === 0}
      >
        <ArrowBackIosIcon fontSize="large" />
      </button>

      {/* Render Two Sections */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          overflow: 'hidden',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {children.slice(currentIndex, currentIndex + 2).map((child, index) => (
          <div key={index} style={{ width: '50%' }}>
            {child}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
        disabled={currentIndex >= children.length - 2}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Carousel;
