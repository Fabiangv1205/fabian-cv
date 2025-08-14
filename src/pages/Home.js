// src/pages/Home.js
import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Grid,
  Divider,
  Link as MuiLink,
  useTheme,
  alpha,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguage } from "../context/LanguageContext";
import GitHubIcon from "@mui/icons-material/GitHub"

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
        sx={{
          pb: 0,
          "& .MuiCardHeader-title": { fontWeight: 800 },
        }}
      />
      <CardContent sx={{ pt: 2 }}>{children}</CardContent>
    </Card>
  );
};

const Home = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const primaryTone = alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.12);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* HERO */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(0deg, ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.12 : 0.08
          )}, transparent)`,
        }}
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3" fontWeight={900}>
            {t("home.name")}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700}>
            {t("home.title")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 900 }}
          >
            {t("home.subtitle")}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ pt: 1 }} flexWrap="wrap" justifyContent="center">
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              href="/Roberto_Fabian_Gonzalez_Vargas2.pdf"
              download
              sx={{ borderRadius: 99, px: 2 }}
            >
              {t("common.downloadCV")}
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/Fabiangv1205"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: 99, px: 2 }}
            >
              {t("common.github")}
            </Button>
          </Stack>

          {/* Quick chips */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ pt: 2 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {["React", "React Native", "Express", "Firebase", "Docker", "Linux/CLI", "Ansible"].map(
              (tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: primaryTone,
                    fontWeight: 600,
                  }}
                />
              )
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* GRID de secciones */}
      <Grid container spacing={3}>
        {/* Resumen Profesional */}
        <Grid item xs={12} md={6}>
          <SectionCard
            icon={<WorkOutlineIcon color="primary" />}
            title={t("home.summaryTitle")}
          >
            <Typography>{t("home.summaryText")}</Typography>
          </SectionCard>
        </Grid>

        {/* Experiencia */}
        <Grid item xs={12} md={6}>
          <SectionCard
            icon={<WorkOutlineIcon color="primary" />}
            title={t("home.workTitle")}
          >
            <Typography fontWeight={700}>{t("home.freelance")}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {t("home.period")}
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={1.2}>
              {["b1", "b2", "b3", "b4", "b5", "b6", "b7"].map((k) => (
                <Typography key={k} variant="body2">
                  {t(`home.bullets.${k}`)}
                </Typography>
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        {/* Certificaciones */}
        <Grid item xs={12} md={6}>
          <SectionCard
            icon={<VerifiedIcon color="primary" />}
            title={t("home.certificationsTitle")}
          >
            <Stack spacing={1.2}>
              <Typography variant="body2">
                ✅ Certificación LPI Linux Essentials: Temario oficial completo —{" "}
                <MuiLink underline="hover" href="#" color="primary">
                  UC-b8daa5cb-ab28-415b-92e2-4b7014757bdc
                </MuiLink>
              </Typography>
              <Typography variant="body2">
                ✅ Ansible desde Cero (2023) —{" "}
                <MuiLink underline="hover" href="#" color="primary">
                  UC-72bcfa43-5440-4475-a7f8-de77b82c6572
                </MuiLink>
              </Typography>
              <Typography variant="body2">
                ✅ Python Total. Programador Avanzado en 16 días —{" "}
                <MuiLink underline="hover" href="#" color="primary">
                  UC-329464f6-fa0e-482d-8e9e-907d56728c00
                </MuiLink>
              </Typography>
              <Typography variant="body2">
                ✅ Maneja Dockers en 5 días. Mejora como SysAdmin Linux o DevOps —{" "}
                <MuiLink underline="hover" href="#" color="primary">
                  UC-d4f421dd-64c3-41c6-81c6-c3e2c3812dca
                </MuiLink>
              </Typography>
              <Typography variant="body2">
                ✅ Certificación LPIC-2: Ingeniero Linux. Examen 201 —{" "}
                <MuiLink underline="hover" href="#" color="primary">
                  UC-bb29d961-354d-4066-ba42-9363cebd7358
                </MuiLink>
              </Typography>
              <Typography variant="body2">⏳ Curso de Inglés B1.2/B2.1</Typography>
              <Typography variant="body2">
                ⏳ Aprende Inteligencia Artificial Generativa: LLMs, ChatGPT, GPTs, Prompt Engineering, Midjourney, Stable Diffusion y más!
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>

        {/* Educación */}
        <Grid item xs={12} md={6}>
          <SectionCard
            icon={<SchoolIcon color="primary" />}
            title={t("home.educationTitle")}
          >
            <Stack spacing={1}>
              <Typography>🎓 High School Diploma</Typography>
              <Typography>
                🎓 Bachelor’s Degree in Electronics and Communications Engineering
                (Truncated)
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>

        {/* Portafolio destacado */}
        <Grid item xs={12}>
          <SectionCard
            icon={<FolderSpecialIcon color="primary" />}
            title={t("home.portfolioTitle")}
            action={
              <Button
                variant="text"
                size="small"
                endIcon={<ArrowForwardIcon />}
                href="/projects"
              >
                {t("home.viewProjects")}
              </Button>
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 3, height: "100%" }}
                >
                  <Typography fontWeight={700}>
                    {t("home.portfolio.teetime")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {t("home.portfolio.teetimeDesc")}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 3, height: "100%" }}
                >
                  <Typography fontWeight={700}>
                    {t("home.portfolio.ishoes")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {t("home.portfolio.ishoesDesc")}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 3, height: "100%" }}
                >
                  <Typography fontWeight={700}>
                    {t("home.portfolio.ingresos")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {t("home.portfolio.ingresosDesc")}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </SectionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
