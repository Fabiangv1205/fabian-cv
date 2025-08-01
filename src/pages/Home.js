import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Hero */}
      {/* Hero */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Roberto Fabián González Vargas
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          Full Stack Developer (Jr)
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Creating clean, scalable and user-centric web/mobile solutions with
          React, Firebase and Linux-based tools.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            href="/Roberto_Fabian_Gonzalez_Vargas.pdf"
            download
          >
            Download CV
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component="a"
            href="https://github.com/Fabiangv1205"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
        </Box>
      </Box>

      {/* Summary */}
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          👤 Professional Summary
        </Typography>
        <Typography>
          Electronics and Communications Engineering professional with
          experience in Linux systems administration, automation using Ansible,
          and web development with Python/Django. Skilled in Docker and cloud
          services. Over the past year, I’ve worked as a freelance developer
          building mobile applications with React Native and web apps with React
          and Express. Strong ability to work independently or in teams, focused
          on scalable, maintainable, and user-friendly software.
        </Typography>
      </Paper>

      {/* Skills */}
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          🛠️ Skills Summary
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {[
            "JavaScript",
            "React",
            "React Native",
            "Express.js",
            "Firebase",
            "Django",
            "Docker",
            "Ansible",
            "Bash",
            "Git",
            "Linux (Debian)",
            "REST APIs",
          ].map((skill) => (
            <Chip
              key={skill}
              label={skill}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
        <MuiLink href="/skills" underline="hover">
          🔍 View detailed technical skills →
        </MuiLink>
      </Paper>

      {/* Experience */}
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          <WorkIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Work Experience
        </Typography>
        <Typography fontWeight="bold">
          Freelance Web & Mobile Developer
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          January 2024 – Present
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="Built cross-platform mobile apps using React Native for Android and iOS." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Designed responsive web interfaces with React.js." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Developed RESTful APIs using Express.js and Node.js." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Integrated Firebase for auth, data and notifications." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Delivered functional apps tailored to client needs and usage scenarios." />
          </ListItem>
        </List>
      </Paper>

      {/* Certifications */}
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          <VerifiedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Certifications & Trainings
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="LPI Linux Essentials"
              secondary="UC-b8daa5cb-ab28-415b-92e2-4b7014757bdc"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Ansible desde Cero"
              secondary="UC-72bcfa43-5440-4475-a7f8-de77b82c6572"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Python Total (Avanzado en 16 días)"
              secondary="UC-329464f6-fa0e-482d-8e9e-907d56728c00"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Docker en 5 días"
              secondary="UC-d4f421dd-64c3-41c6-81c6-c3e2c3812dca"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Curso LPIC-1 (Linux Admin)"
              secondary="In progress"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Curso de Inglés B1.2/B2.1"
              secondary="In progress"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Education */}
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          <SchoolIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Education
        </Typography>
        <Typography gutterBottom>🎓 High School Diploma</Typography>
        <Typography>
          🎓 Bachelor’s Degree in Electronics and Communications Engineering
          (Truncated)
        </Typography>
      </Paper>

      {/* Portfolio */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          <FolderSpecialIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Portfolio Highlights
        </Typography>

        <Card sx={{ mb: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
          <CardContent>
            <Typography variant="h6">iShoes</Typography>
            <Typography variant="body2">
              Mobile e-commerce app with admin dashboard, cloud image storage,
              and cart animation. Built with React Native + Firebase.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
          <CardContent>
            <Typography variant="h6">Gastos App</Typography>
            <Typography variant="body2">
              Expense tracker with weekly summaries, user balances and Firestore
              integration.
            </Typography>
          </CardContent>
        </Card>

        <MuiLink href="/portfolio" underline="hover">
          🖼️ View full portfolio →
        </MuiLink>
      </Paper>
    </Container>
  );
};

export default Home;
