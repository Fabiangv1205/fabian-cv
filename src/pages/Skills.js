import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,

} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import TerminalIcon from '@mui/icons-material/Terminal';
import SecurityIcon from '@mui/icons-material/Security';

const sectionStyle = {
  p: 3,
  mb: 4,
  borderLeft: '6px solid #1976d2',
  transition: 'all 0.2s ease-in-out',
};

const chipStyle = {
  mr: 1,
  mb: 1,
  transition: '0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#e3f2fd',
  },
};

const Skills = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
        Technical Skills
      </Typography>
      <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={5}>
        A categorized list of tools, frameworks, and technologies I use professionally
      </Typography>

      {/* Frontend */}
      <Paper elevation={2} sx={sectionStyle}>
        <Box display="flex" alignItems="center" mb={2}>
          <CodeIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="medium">
            Frontend
          </Typography>
        </Box>
        {['JavaScript', 'React', 'React Native', 'Expo', 'Material UI'].map((tech) => (
          <Chip key={tech} label={tech} sx={chipStyle} color="primary" variant="outlined" />
        ))}
      </Paper>

      {/* Backend */}
      <Paper elevation={2} sx={sectionStyle}>
        <Box display="flex" alignItems="center" mb={2}>
          <StorageIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="medium">
            Backend
          </Typography>
        </Box>
        {['Express.js', 'Firebase Auth', 'Firestore', 'REST APIs'].map((tech) => (
          <Chip key={tech} label={tech} sx={chipStyle} color="primary" variant="outlined" />
        ))}
      </Paper>

      {/* DevOps & Infra */}
      <Paper elevation={2} sx={sectionStyle}>
        <Box display="flex" alignItems="center" mb={2}>
          <CloudIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="medium">
            DevOps & Infrastructure
          </Typography>
        </Box>
        {['Cloudflare Tunnel', 'CI/CD (basic)', 'Supabase Storage', 'Firebase Hosting'].map((tech) => (
          <Chip key={tech} label={tech} sx={chipStyle} color="primary" variant="outlined" />
        ))}
      </Paper>

      {/* Linux & CLI */}
      <Paper elevation={2} sx={sectionStyle}>
        <Box display="flex" alignItems="center" mb={2}>
          <TerminalIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="medium">
            Linux & CLI Tools
          </Typography>
        </Box>
        {['Linux (Debian)', 'Bash', 'Git / GitHub', 'SSH / SCP'].map((tech) => (
          <Chip key={tech} label={tech} sx={chipStyle} color="primary" variant="outlined" />
        ))}
      </Paper>

      {/* Security */}
      <Paper elevation={2} sx={sectionStyle}>
        <Box display="flex" alignItems="center" mb={2}>
          <SecurityIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="medium">
            Security Basics
          </Typography>
        </Box>
        {['HTTPS / SSL', 'Auth with JWT', 'Role-based Access Control'].map((tech) => (
          <Chip key={tech} label={tech} sx={chipStyle} color="primary" variant="outlined" />
        ))}
      </Paper>
    </Container>
  );
};

export default Skills;
