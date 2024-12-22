import React from 'react';
import { IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header: React.FC = () => {
  return (
    <header
      style={{
        width: '100%', // Full width of the screen
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'linear-gradient(90deg, #4facfe, #00f2fe)', // Weather-themed gradient
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'fixed', // Stick to the top of the screen
        top: 0,
        left: 0,
        zIndex: 1000, // Ensure it's above other elements
      }}
    >
      {/* Logo/Title */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>
        WHETHER IO
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <IconButton
          aria-label="help"
          style={{ color: '#fff' }}
          onClick={() => alert('Help Clicked!')}
        >
          <HelpOutlineIcon />
        </IconButton>
        <IconButton
          aria-label="sign out"
          style={{ color: '#fff' }}
          onClick={() => alert('Sign Out Clicked!')}
        >
          <ExitToAppIcon />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
