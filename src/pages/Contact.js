import React from 'react';
import {
  Container,
  Typography,
  Box,
  Link,
  Stack,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Contact
      </Typography>

      <Stack spacing={2}>
        <Box display="flex" alignItems="center">
          <EmailIcon color="primary" sx={{ mr: 1 }} />
          <Link href="mailto:fabiano.gv.12@gmail.com" underline="hover">
            fabiano.gv.12@gmail.com
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <PhoneIcon color="primary" sx={{ mr: 1 }} />
          <Typography>+52 331 216 0193</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <PublicIcon color="primary" sx={{ mr: 1 }} />
          <Link href="https://fabiandev.org" target="_blank" rel="noopener noreferrer" underline="hover">
            fabiandev.org
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <LinkedInIcon color="primary" sx={{ mr: 1 }} />
          <Link
            href="https://www.linkedin.com/in/roberto-fabian-gonzalez-058584307"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            LinkedIn Profile
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <LocationOnIcon color="primary" sx={{ mr: 1 }} />
          <Typography>Guadalajara, Jalisco, Mexico</Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Contact;
