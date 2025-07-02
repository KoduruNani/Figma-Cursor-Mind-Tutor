import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { getToken } from '../../services/authService';

interface Material {
  id: number;
  title: string;
  description: string;
  file: string;
}

const UploadMaterialPanel: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchMaterials = async () => {
    setFetching(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5019/api/materials', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMaterials(data);
      } else {
        setError(data.message || 'Failed to fetch materials');
      }
    } catch (err) {
      setError('Failed to fetch materials');
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5019/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title, description, file }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Material uploaded successfully!');
        setTitle('');
        setDescription('');
        setFile('');
        fetchMaterials();
      } else {
        setError(data.message || 'Failed to upload material');
      }
    } catch (err) {
      setError('Failed to upload material');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7f9fb' }}>
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Upload New Material
              </Typography>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
              <Box component="form" onSubmit={handleSubmit}>
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
                  required
                />
                <TextField
                  label="File Name"
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 600 }} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Upload'}
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Uploaded Materials
              </Typography>
              {fetching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}><CircularProgress /></Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <List>
                  {materials.map((mat) => (
                    <ListItem key={mat.id} divider>
                      <ListItemText
                        primary={mat.title}
                        secondary={`${mat.description} (${mat.file})`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UploadMaterialPanel; 