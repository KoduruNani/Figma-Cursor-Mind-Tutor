import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { login, setToken } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(email, password);
      if (res.token) {
        setToken(res.token);
        navigate('/dashboard');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url(/bg-figma.png) no-repeat center center fixed',
        backgroundSize: 'cover',
      }}
    >
      <Paper elevation={3} sx={{ p: 6, minWidth: 400, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Logo Placeholder */}
        <Box sx={{ mb: 3 }}>
          <img src="/logo.svg" alt="Logo" style={{ width: 64, height: 64 }} />
        </Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Sign In
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account? <a href="/register">Sign Up</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm; 