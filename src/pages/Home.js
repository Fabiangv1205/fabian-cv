import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link as MuiLink,
} from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      {/* Hero */}
      <Box textAlign="center" mt={6} mb={4}>
        <Typography variant="h3" fontWeight="bold">
          Roberto Fabián González Vargas
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          Full Stack Developer (Jr)
        </Typography>
        <Typography variant="body1" paragraph>
          Creating clean, scalable and user-centric web/mobile solutions with React, Firebase and Linux-based tools.
        </Typography>
        <Button
          variant="contained"
          href="/Roberto_Fabian_Gonzalez_Vargas.pdf"
          download
        >
          📄 Download CV
        </Button>
      </Box>

      {/* About */}
      <Box mb={5}>
        <Typography variant="h4" gutterBottom>
          About Me
        </Typography>
        <Typography>
          I'm a self-taught developer based in Mexico. Passionate about building useful apps with React Native, deploying with Cloudflare, and learning Linux & backend systems every day.
        </Typography>
      </Box>

      {/* Skills */}
      <Box mb={5}>
        <Typography variant="h4" gutterBottom>
          Skills Summary
        </Typography>
        <Typography>
          JavaScript · React · Firebase · Git · Expo · REST APIs · Linux (Debian) · Cloudflare · Express.js
        </Typography>
        <MuiLink href="/skills" underline="hover">
          🔍 View detailed skills →
        </MuiLink>
      </Box>

      {/* Portfolio */}
      <Box mb={5}>
        <Typography variant="h4" gutterBottom>
          Portfolio Highlights
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            height="180"
            image="/images/ishoes.png"
            alt="iShoes"
          />
          <CardContent>
            <Typography variant="h6">iShoes</Typography>
            <Typography variant="body2">
              A mobile e-commerce app with admin dashboard, cloud image storage, and cart animation using React Native + Firebase.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            height="180"
            image="/images/gastos.png"
            alt="Expense Tracker"
          />
          <CardContent>
            <Typography variant="h6">Gastos App</Typography>
            <Typography variant="body2">
              Expense tracker with weekly summaries, user balances and Firestore integration.
            </Typography>
          </CardContent>
        </Card>

        <MuiLink href="/portfolio" underline="hover">
          🖼️ View full portfolio →
        </MuiLink>
      </Box>
    </Container>
  );
};

export default Home;
