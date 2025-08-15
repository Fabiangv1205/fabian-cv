// src/pages/projects/TeeTime.js
import React from "react";
import { Container, Typography, Paper, Stack, alpha, useTheme } from "@mui/material";
import SectionCard from "../../components/SectionCard";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

const TeeTime = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          textAlign: "center",
          background: `linear-gradient(0deg, ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.12 : 0.08)}, transparent)`,
        }}
      >
        <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center">
          <Typography fontWeight={900} sx={{ lineHeight: 1.1, fontSize: { xs: "clamp(28px, 8.5vw, 40px)", sm: "clamp(36px, 6.5vw, 52px)", md: "clamp(44px, 5.5vw, 64px)" } }}>
            TeeTime
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 900, fontSize: { xs: "1rem", md: "1.1rem" } }}>
            Web app de reservas con panel de administración y recordatorios.
          </Typography>
        </Stack>
      </Paper>

      <SectionCard icon={<FolderSpecialIcon color="primary" />} title="Descripción">
        <Typography variant="body2" color="text.secondary">

        </Typography>
      </SectionCard>
    </Container>
  );
};

export default TeeTime;
