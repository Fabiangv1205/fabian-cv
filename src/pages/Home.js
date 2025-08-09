import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
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
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Roberto Fabián González Vargas
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          Full Stack & Linux Systems Engineer
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Creating scalable, maintainable and user-centric solutions with React,
          Firebase and Linux tools.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            href="/Roberto_Fabian_Gonzalez_Vargas2.pdf"
            download
          >
            Download CV
          </Button>
          <Button
            variant="outlined"
            color="primary"
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
          Full Stack and Linux Systems Engineer with hands-on experience in
          Linux administration, automation using Ansible, and modern web
          development with React, Express, and Django. Skilled in
          containerization with Docker and cloud-based tools. Over the past
          year, I’ve delivered tailored mobile and web applications for
          real-world clients, working independently or collaboratively. Focused
          on building scalable, maintainable, and user-centric software
          solutions.
        </Typography>
      </Paper>

      {/* Work Experience */}
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
            <ListItemText primary="- Built cross-platform mobile apps using React Native for Android and iOS." />
          </ListItem>
          <ListItem>
            <ListItemText primary="- Developed 'Tee-Time', a mobile app for managing golf reservations using React Native and Firebase." />
          </ListItem>
          <ListItem>
            <ListItemText primary="- Built 'iShoes', an e-commerce mobile app with admin dashboard, image storage, cart animation and stock logic." />
          </ListItem>
          <ListItem>
            <ListItemText primary="- Designed and implemented the backend for 'iShoes' using Express.js, Firebase Admin SDK and RESTful APIs." />
          </ListItem>
          <ListItem>
            <ListItemText primary="- Created 'Control de Ingresos', a financial tracking app with user balance summaries and Firestore." />
          </ListItem>
          <ListItem>
            <ListItemText primary="- Collaborated with clients to define requirements, timelines, and deliverables." />
          </ListItem>
          <ListItem>
            <ListItemText primary="- Focused on clean, maintainable code and intuitive user experiences." />
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
              primary="✅ Certificación LPI Linux Essentials: Temario oficial completo"
              secondary="UC-b8daa5cb-ab28-415b-92e2-4b7014757bdc"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary=" ✅ Ansible desde Cero (2023)"
              secondary="UC-72bcfa43-5440-4475-a7f8-de77b82c6572"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="✅ Python Total. Programador Avanzado en 16 dias"
              secondary="UC-329464f6-fa0e-482d-8e9e-907d56728c00"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="✅ Maneja Dockers en 5 dias. Mejora como SysAdmin Linux  o Devops"
              secondary="UC-d4f421dd-64c3-41c6-81c6-c3e2c3812dca"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="✅ Certificación LPIC-2: Ingeniero Linux. Examen 201"
              secondary="UC-bb29d961-354d-4066-ba42-9363cebd7358"
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="⏳ Curso de Inglés B1.2/B2.1 garantizado" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="⏳ Aprende Machine Learning y Data Science con Python, ¡conviértete en un experto en Machine Learning con Python!
"
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
        <List dense>
          <ListItem>
            <ListItemText
              primary="🟢 Tee-Time"
              secondary="Golf reservation app built with React Native"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🟢 iShoes"
              secondary="E-commerce app with admin dashboard, backend and stock management"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🟢 Control de Ingresos"
              secondary="Weekly summary and expense tracker with Firestore integration"
            />
          </ListItem>
        </List>
        <MuiLink href="/projects" underline="hover">
           View projects →
        </MuiLink>
      </Paper>
    </Container>
  );
};

export default Home;
