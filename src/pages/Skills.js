import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import DevicesIcon from '@mui/icons-material/Devices';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const skills = [
  {
    category: 'Languages',
    icon: <CodeIcon color="primary" />,
    items: ['JavaScript', 'HTML', 'CSS', 'SQL (básico)', 'Bash'],
  },
  {
    category: 'Frontend',
    icon: <DevicesIcon color="primary" />,
    items: ['React', 'React Native', 'Expo', 'Material UI'],
  },
  {
    category: 'Backend & DB',
    icon: <StorageIcon color="primary" />,
    items: ['Firebase Auth', 'Firestore', 'Express.js'],
  },
  {
    category: 'DevOps / Infra',
    icon: <CloudIcon color="primary" />,
    items: ['Linux (Debian)', 'Cloudflare Tunnel', 'SSH', 'VPS'],
  },
  {
    category: 'Tools',
    icon: <BuildIcon color="primary" />,
    items: ['Git', 'GitHub', 'VSCode', 'Postman', 'npm', 'npx'],
  },
  {
    category: 'Soft Skills',
    icon: <EmojiObjectsIcon color="primary" />,
    items: ['Autodidacta', 'Resolución de problemas', 'Colaboración', 'Comunicación'],
  },
];

const Skills = () => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', mb: 4, color: theme.palette.text.primary }}
        >
          My Technical Skills
        </Typography>

        <Grid container spacing={4}>
          {skills.map(({ category, icon, items }) => (
            <Grid item xs={12} sm={6} key={category}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  height: '100%',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  {icon}
                  <Typography
                    variant="h6"
                    sx={{
                      ml: 1,
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {items.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        backgroundColor:
                          theme.palette.mode === 'light' ? '#e3f2fd' : '#1e88e5',
                        color:
                          theme.palette.mode === 'light' ? '#0d47a1' : '#fff',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
