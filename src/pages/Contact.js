// src/pages/Contact.js
import React from "react";
import {
  Container,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Box,
  Divider,
  Link as MuiLink,
  useTheme,
  alpha,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useLanguage } from "../context/LanguageContext";

const SectionCard = ({ icon, title, children, action }) => {
  const theme = useTheme();
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardHeader
        avatar={icon}
        title={
          <Typography variant="h6" fontWeight={800}>
            {title}
          </Typography>
        }
        action={action}
        sx={{ pb: 0, "& .MuiCardHeader-title": { fontWeight: 800 } }}
      />
      <CardContent sx={{ pt: 2 }}>{children}</CardContent>
    </Card>
  );
};

const Contact = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const heroBg = `linear-gradient(0deg, ${alpha(
    theme.palette.primary.main,
    theme.palette.mode === "dark" ? 0.12 : 0.08
  )}, transparent)`;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          background: heroBg,
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3" fontWeight={900}>
            {t("contact.title")}
          </Typography>

          <SectionCard>
            <Stack spacing={2} divider={<Divider flexItem />}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <EmailIcon color="primary" />
                <MuiLink
                  href="mailto:fabiano.gv.12@gmail.com"
                  underline="hover"
                >
                  fabiano.gv.12@gmail.com
                </MuiLink>
              </Box>

              <Box display="flex" alignItems="center" gap={1.5}>
                <PhoneIcon color="primary" />
                <MuiLink href="tel:+523312160193" underline="hover">
                  +52 331 216 0193
                </MuiLink>
              </Box>

              <Box display="flex" alignItems="center" gap={1.5}>
                <PublicIcon color="primary" />
                <MuiLink
                  href="https://fabiandev.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  fabiandev.org
                </MuiLink>
              </Box>

              <Box display="flex" alignItems="center" gap={1.5}>
                <LinkedInIcon color="primary" />
                <MuiLink
                  href="https://www.linkedin.com/in/roberto-fabian-gonzalez-058584307"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {t("contact.linkedin")}
                </MuiLink>
              </Box>

              <Box display="flex" alignItems="center" gap={1.5}>
                <LocationOnIcon color="primary" />
                <Typography>{t("contact.location")}</Typography>
              </Box>
            </Stack>
          </SectionCard>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Contact;
