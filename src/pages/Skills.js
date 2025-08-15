// src/pages/Skills.js
import React from "react";
import {
  Container,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Stack,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import TerminalIcon from "@mui/icons-material/Terminal";
import SecurityIcon from "@mui/icons-material/Security";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useLanguage } from "../context/LanguageContext";

const SectionCard = ({ icon, title, children }) => {
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
        title={<Typography variant="h6" fontWeight={800}>{title}</Typography>}
        sx={{ pb: 0, "& .MuiCardHeader-title": { fontWeight: 800 } }}
      />
      <CardContent sx={{ pt: 2 }}>{children}</CardContent>
    </Card>
  );
};

const Skills = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const primaryTone = alpha(
    theme.palette.primary.main,
    theme.palette.mode === "dark" ? 0.18 : 0.12
  );

  const chipSx = {
    bgcolor: primaryTone,
    fontWeight: 600,
    whiteSpace: "nowrap",
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* HERO */}
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
          <Typography
            fontWeight={900}
            sx={{
              lineHeight: 1.1,
              fontSize: {
                xs: "clamp(28px, 8.5vw, 40px)",
                sm: "clamp(36px, 6.5vw, 52px)",
                md: "clamp(44px, 5.5vw, 64px)",
              },
            }}
          >
            {t("skills.title")}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ maxWidth: 900, fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            {t("skills.subtitle")}
          </Typography>
        </Stack>
      </Paper>

      {/* GRID por categorías */}
      <Grid container spacing={3}>
        {/* AI & Generative */}
        <Grid item xs={12} md={6}>
          <SectionCard
            icon={<AutoAwesomeIcon color="primary" />}
            title={t("skills.ai") || "AI & Generative"}
          >
            <Stack direction="row" flexWrap="wrap" gap={1} rowGap={1}>
              {[
                "Replicate SDK",
                "Minimax video-01",
                "Text-to-Video (T2V)",
                "Image-to-Video (I2V)",
                "Prompt Engineering",
                "First-frame pipeline",
                "Video delivery (MP4)",
                "MotionPeek (demo)",
              ].map((tech) => (
                <Chip key={tech} label={tech} sx={chipSx} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        {/* Frontend */}
        <Grid item xs={12} md={6}>
          <SectionCard icon={<CodeIcon color="primary" />} title={t("skills.frontend")}>
            <Stack direction="row" flexWrap="wrap" gap={1} rowGap={1}>
              {[
                "JavaScript",
                "React",
                "React Native",
                "Expo",
                "Material UI",
                "Dialogs & Video player",
                "i18n (context)",
                "Clipboard & Downloads",
                "Responsive layout / Theming",
              ].map((tech) => (
                <Chip key={tech} label={tech} sx={chipSx} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        {/* Backend */}
        <Grid item xs={12} md={6}>
          <SectionCard icon={<StorageIcon color="primary" />} title={t("skills.backend")}>
            <Stack direction="row" flexWrap="wrap" gap={1} rowGap={1}>
              {[
                "Node.js",
                "Express",
                "REST APIs",
                "Multer (uploads)",
                "Static files (/uploads)",
                "Morgan (logs)",
                "Fetch/stream handling",
                "Firebase Auth",
                "Firestore",
              ].map((tech) => (
                <Chip key={tech} label={tech} sx={chipSx} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        {/* DevOps & Infra */}
        <Grid item xs={12} md={6}>
          <SectionCard icon={<CloudIcon color="primary" />} title={t("skills.devops")}>
            <Stack direction="row" flexWrap="wrap" gap={1} rowGap={1}>
              {[
                "Cloudflare Tunnel",
                "Static hosting",
                "CI/CD (basic)",
                "Docker",
                "Ansible",
              ].map((tech) => (
                <Chip key={tech} label={tech} sx={chipSx} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        {/* Linux & CLI */}
        <Grid item xs={12} md={6}>
          <SectionCard icon={<TerminalIcon color="primary" />} title={t("skills.linux")}>
            <Stack direction="row" flexWrap="wrap" gap={1} rowGap={1}>
              {["Linux (Debian)", "Bash", "Git / GitHub", "SSH / SCP"].map((tech) => (
                <Chip key={tech} label={tech} sx={chipSx} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        {/* Security */}
        <Grid item xs={12} md={6}>
          <SectionCard icon={<SecurityIcon color="primary" />} title={t("skills.security")}>
            <Stack direction="row" flexWrap="wrap" gap={1} rowGap={1}>
              {[
                "HTTPS / SSL",
                "API Key (x-api-key)",
                "Auth with JWT",
                "Role-based Access Control",
              ].map((tech) => (
                <Chip key={tech} label={tech} sx={chipSx} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Skills;
