// src/pages/Projects.js
import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link as RouterLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SectionCard from "../components/SectionCard";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";


const Projects = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const projects = [
    {
      key: "motionpeek",
      title:
        t("projects.cards.motionpeek.title") ||
        "MotionPeek (Text/Image → Video)",
      to: "/projects/motionpeek",
      icon: <MovieCreationIcon />,
    },
    {
      key: "ishoes",
      title: "iShoes (React Native + Backend(Express))",
      to: "/projects/ishoes",
      icon: <ShoppingBagIcon />,
    },
    {
      key: "teetime",
      title: "TeeTime (React Native)",
      to: "/projects/teetime",
      icon: <GolfCourseIcon />,
    },
    {
      key: "ingresos",
      title: "Control de Ingresos (React Native + Firebase)",

      to: "/projects/ingresos",
      icon: <ReceiptLongIcon />,
    },
  ];

  const iconWrap = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    color: "primary.main",
    bgcolor: alpha(theme.palette.primary.main, 0.15),
    flexShrink: 0,
  };

  const cardSx = {
    textDecoration: "none",
    borderRadius: 3,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: 3,
    transition: "transform .2s, box-shadow .2s, background .2s",
    background: `linear-gradient(180deg,
      ${alpha(
        theme.palette.primary.main,
        theme.palette.mode === "dark" ? 0.06 : 0.04
      )} 0%,
      transparent 40%)`,
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 6,
      background: `linear-gradient(180deg,
        ${alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.1 : 0.07
        )} 0%,
        transparent 45%)`,
    },
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
            {t("projects.title")}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 900, fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            {t("projects.subtitle")}
          </Typography>
        </Stack>
      </Paper>

      <SectionCard
        icon={<FolderSpecialIcon color="primary" />}
        title={t("projects.featured") || "Proyectos destacados"}
      >
        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.key}>
              <Card component={RouterLink} to={p.to} sx={cardSx}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 1.5 }}
                  >
                    <Box sx={iconWrap}>{p.icon}</Box>
                    <Typography variant="h6" fontWeight={800} noWrap>
                      {p.title}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {p.desc}
                  </Typography>
                </CardContent>

                <Box sx={{ px: 2, pb: 2 }}>
                  <Button endIcon={<ArrowForwardIcon />} size="small">
                    {t("projects.viewDetails") || "Ver detalles"}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Container>
  );
};

export default Projects;
