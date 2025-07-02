import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Alert } from '@mui/material';

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    answer: 2,
  },
  {
    id: 2,
    question: 'Which is the largest planet?',
    options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
    answer: 1,
  },
];

const ObjectiveQuestionsPanel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(Number(e.target.value));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrent(current + 1);
    setSelected(null);
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
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500 }}>
              {questions[current].question}
            </FormLabel>
            <RadioGroup value={selected !== null ? selected : ''} onChange={handleSelect}>
              {questions[current].options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={idx}
                  control={<Radio />}
                  label={option}
                  disabled={submitted}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {showResult && (
            <Alert severity={selected === questions[current].answer ? 'success' : 'error'} sx={{ mt: 2 }}>
              {selected === questions[current].answer ? 'Correct!' : 'Incorrect.'}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              {!submitted ? (
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={selected === null}>
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

export default ObjectiveQuestionsPanel; 