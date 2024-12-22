import React, { useState } from 'react';

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleScrollLeft = () => {
    setVisibleIndex((prev) => Math.max(0, prev - 1));
  };

  const handleScrollRight = () => {
    setVisibleIndex((prev) => Math.min(children.length - 2, prev + 1)); // Show two at a time
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <button
        onClick={handleScrollLeft}
        style={{
          position: 'absolute',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        &lt;
      </button>

      <div
        style={{
          display: 'flex',
          transform: `translateX(-${visibleIndex * 50}%)`,
          transition: 'transform 0.5s ease-in-out',
          width: `${children.length * 50}%`,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            style={{ flex: '0 0 50%', boxSizing: 'border-box', padding: '1rem' }}
          >
            {child}
          </div>
        ))}
      </div>

      <button
        onClick={handleScrollRight}
        style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
