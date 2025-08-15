// src/pages/Home.js
import React from "react";
import {
  Container,
  Typography,
  Button,
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
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import { useLanguage } from "../context/LanguageContext";
import GitHubIcon from "@mui/icons-material/GitHub";

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

  const primaryTone = alpha(
    theme.palette.primary.main,
    theme.palette.mode === "dark" ? 0.18 : 0.12
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* HERO - responsive fix */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          textAlign: "center",
          background: `linear-gradient(0deg, ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.12 : 0.08
          )}, transparent)`,
        }}
      >
        <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center">
          {/* Nombre con clamp para XS */}
          <Typography
            fontWeight={900}
            sx={{
              lineHeight: 1.1,
              fontSize: {
                xs: "clamp(28px, 9vw, 40px)",
                sm: "clamp(36px, 6.5vw, 52px)",
                md: "clamp(44px, 5.5vw, 64px)",
              },
            }}
          >
            {t("home.name")}
          </Typography>

          {/* Título ajustado por breakpoint */}
          <Typography
            color="primary"
            fontWeight={700}
            sx={{ fontSize: { xs: "1.15rem", md: "1.5rem" } }}
          >
            {t("home.title")}
          </Typography>

          {/* Subtítulo con ancho máx. y tamaño más discreto en XS */}
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 900, fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            {t("home.subtitle")}
          </Typography>

          {/* Botones: columna en XS, fila desde SM */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ pt: 1, width: "100%", maxWidth: 520 }}
            justifyContent="center"
          >
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              href="/Roberto_Fabian_Gonzalez_Vargas2.pdf"
              download
              sx={{ borderRadius: 99, px: 2.5, width: { xs: "100%", sm: "auto" } }}
            >
              {t("common.downloadCV")}
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/Fabiangv1205"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderRadius: 99, px: 2.5, width: { xs: "100%", sm: "auto" } }}
            >
              {t("common.github")}
            </Button>
          </Stack>

          {/* Chips: wrap + gaps y límites de ancho */}
          <Stack
            direction="row"
            sx={{ pt: 2, width: "100%", maxWidth: 680, justifyContent: "center", flexWrap: "wrap", gap: 1, rowGap: 1 }}
          >
            {[
              "React",
              "React Native",
              "Express",
              "Firebase",
              "Docker",
              "Linux/CLI",
              "Ansible", "Generative AI",
              "Prompt Engineering",
              "OpenAI API",
              "Text-to-Video (T2V)",
              "Image-to-Video (I2V)",
            ].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: primaryTone,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              />
            ))}
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
      </Grid>
    </Container>
  );
};

export default Home;
