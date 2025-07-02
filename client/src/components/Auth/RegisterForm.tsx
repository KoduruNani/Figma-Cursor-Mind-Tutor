import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { register, setToken } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      const res = await register(email, password);
      if (res.token) {
        setToken(res.token);
        navigate('/dashboard');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
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
          Sign Up
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <a href="/login">Sign In</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm; 