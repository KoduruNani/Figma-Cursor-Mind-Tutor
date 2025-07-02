import React from 'react';
import { AppBar, Toolbar, Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'AI Generation', path: '/ai-generation' },
  { label: 'Upload Material', path: '/upload-material' },
  { label: 'Objective', path: '/objective-questions' },
  { label: 'Subjective', path: '/subjective-questions' },
];

const GlobalNavBar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  return (
    <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo192.png" alt="Logo" style={{ width: 44, height: 44, marginRight: 14, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontFamily: 'Montserrat, Roboto, Arial',
              letterSpacing: 1,
              color: '#222',
              transition: 'color 0.2s',
              cursor: 'pointer',
              '&:hover': { color: '#1976d2' },
            }}
          >
            MindTutor
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color={location.pathname === link.path ? 'primary' : 'inherit'}
              variant={location.pathname === link.path ? 'contained' : 'text'}
              sx={{ fontWeight: 600, borderRadius: 2 }}
            >
              {link.label}
            </Button>
          ))}
          <Button onClick={logout} color="secondary" variant="outlined" sx={{ ml: 2, fontWeight: 600 }}>
            Logout
          </Button>
          <Avatar alt="User" src="/avatar.png" />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalNavBar; 