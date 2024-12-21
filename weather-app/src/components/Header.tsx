import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => (
  <AppBar position="static" style={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
        Outdoor Meetup Weather App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
