import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, TextField, Button, Grid } from '@mui/material';

const AIGenerationPanel: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleGenerate = () => {
    // Call AI generation API here
    setResult('This is a placeholder for AI-generated content.');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7f9fb' }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="English" />
            <Tab label="Biology" />
            {/* Add more tabs as needed */}
          </Tabs>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Enter your prompt
              </Typography>
              <TextField
                label="Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                fullWidth
                multiline
                minRows={4}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleGenerate} sx={{ fontWeight: 600 }}>
                Generate
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Result
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, minHeight: 120, background: '#f9f9f9' }}>
                {result || 'AI-generated content will appear here.'}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default AIGenerationPanel; 