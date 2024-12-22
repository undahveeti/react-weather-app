// components/Container.tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
