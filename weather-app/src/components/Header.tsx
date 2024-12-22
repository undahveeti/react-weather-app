import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, Divider, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Mobile breakpoint

  const toggleMenu = (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setMenuOpen(open);
  };

  return (
    <>
      {/* Header */}
      <header
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          background: 'linear-gradient(90deg, #4facfe, #00f2fe)', // Weather theme gradient
          color: '#fff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'fixed', // Stick to top
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        {/* Title */}
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>
          WEATHER IO
        </div>

        {/* Right Section (Responsive) */}
        {isMobile ? (
          // Hamburger Menu for Mobile
          <IconButton
            aria-label="menu"
            onClick={toggleMenu(true)}
            style={{ color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          // Buttons for Desktop
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
        )}
      </header>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={menuOpen} onClose={toggleMenu(false)}>
        <div
          style={{
            width: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
          role="presentation"
          onClick={toggleMenu(false)}
          onKeyDown={toggleMenu(false)}
        >
          <List>
            {/* Help Option */}
            <ListItem component="button" onClick={() => alert('Help Clicked!')}>
              <ListItemText primary="Help" />
            </ListItem>
            <Divider />

            {/* Sign Out Option */}
            <ListItem component="button" onClick={() => alert('Sign Out Clicked!')}>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
