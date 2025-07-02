import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getToken } from '../../services/authService';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5019/api/courses', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        if (res.ok) {
          setCourses(data);
        } else {
          setError(data.message || 'Failed to fetch courses');
        }
      } catch (err) {
        setError('Failed to fetch courses');
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: '#f7f9fb' }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Courses
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            href="/add-course"
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Add New Course
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card sx={{ borderRadius: 3, boxShadow: 2, height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.thumbnail}
                    alt={course.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CourseList; 