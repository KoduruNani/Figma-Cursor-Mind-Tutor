import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Grid, Alert } from '@mui/material';

const questions = [
  {
    id: 1,
    question: 'Explain the process of photosynthesis.',
    answer: 'Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.'
  },
  {
    id: 2,
    question: 'Describe the main theme of Shakespeare\'s Hamlet.',
    answer: 'The main theme of Hamlet is the struggle between action and inaction, and the consequences of indecision.'
  },
];

const SubjectiveQuestionsPanel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    setSubmitted(true);
    // Placeholder: simple keyword check for demo
    const correct = userAnswer.toLowerCase().includes(questions[current].answer.split(' ')[0].toLowerCase());
    if (correct) setScore(score + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrent(current + 1);
    setUserAnswer('');
    setSubmitted(false);
    setShowResult(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7f9fb' }}>
      <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Question {current + 1} of {questions.length}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
            {questions[current].question}
          </Typography>
          <TextField
            label="Your Answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            disabled={submitted}
            sx={{ mb: 2 }}
          />
          {showResult && (
            <Alert severity={userAnswer.toLowerCase().includes(questions[current].answer.split(' ')[0].toLowerCase()) ? 'success' : 'error'} sx={{ mb: 2 }}>
              {userAnswer.toLowerCase().includes(questions[current].answer.split(' ')[0].toLowerCase()) ? 'Good answer!' : 'Try to include more relevant details.'}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item>
              {!submitted ? (
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={userAnswer.trim() === ''}>
                  Submit
                </Button>
              ) : current < questions.length - 1 ? (
                <Button variant="outlined" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Your Score: {score} / {questions.length}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default SubjectiveQuestionsPanel; 