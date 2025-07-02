import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/authService';

const AddCourseForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const unsplashImages = [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c', // Computer Science
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', // Mathematics
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353', // Literature
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // Physics
    'https://images.unsplash.com/photo-1464983953574-0892a716854b', // Art
  ];

  const getRandomImage = () => unsplashImages[Math.floor(Math.random() * unsplashImages.length)];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5019/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, description, thumbnailUrl: thumbnail }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Course added successfully!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setError(data.message || 'Failed to add course');
      }
    } catch (err) {
      setError('Failed to add course');
    }
    setLoading(false);
  };

  const handleRandomizeImage = () => {
    setThumbnail(getRandomImage());
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7f9fb' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <Paper elevation={3} sx={{ p: 6, minWidth: 400, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Add New Course
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              required
            />
            <TextField
              label="Thumbnail URL"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              fullWidth
              margin="normal"
              required
              helperText="Or click 'Random Image' to get a realistic course image."
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Button variant="outlined" onClick={handleRandomizeImage} sx={{ mr: 2 }}>
                Random Image
              </Button>
              {thumbnail && (
                <img src={thumbnail} alt="Course Preview" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid #ccc' }} />
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddCourseForm; 