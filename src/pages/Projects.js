// src/pages/Projects.js
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Skeleton,
  Alert,
  Stack,
  Chip,
  useTheme,
  alpha,
  CardHeader,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import { useLanguage } from "../context/LanguageContext";

const SectionCard = ({ icon, title, action, children }) => {
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
        action={action}
        sx={{ pb: 0, "& .MuiCardHeader-title": { fontWeight: 800 } }}
      />
      <CardContent sx={{ pt: 2 }}>{children}</CardContent>
    </Card>
  );
};

const Projects = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    fetch("https://ishoes.fabiandev.org/api/productos/todos", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const onlyPublic = Array.isArray(data) ? data.filter((p) => p.publicado) : [];
        setProductos(onlyPublic);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Error al obtener productos:", err);
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const handleOpenModal = (src) => setModalImg(src);
  const handleCloseModal = () => setModalImg(null);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* HERO (mismo patrón que Home/Skills) */}
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

      {/* iShoes Screenshots */}
      <SectionCard
        icon={<FolderSpecialIcon color="primary" />}
        title={t("projects.screenshotsTitle")}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3, width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            href="/ishoes_preview.apk"
            download
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 99, px: 2.5, width: { xs: "100%", sm: "auto" } }}
          >
            {t("projects.downloadApk")}
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
          {t("projects.screenshotsDesc")}
        </Typography>

        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                onClick={() => handleOpenModal(`/${i}.jpg`)}
                sx={{
                  aspectRatio: "9 / 16",
                  width: "100%",
                  bgcolor: "background.default",
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 1,
                  p: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
                }}
              >
                <Box
                  component="img"
                  src={`/${i}.jpg`}
                  alt={`Screenshot ${i}`}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      {/* Products fetched from API */}
      <SectionCard
        icon={<FolderSpecialIcon color="primary" />}
        title={t("projects.fetchTitle")}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t("projects.fetchDesc")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t("projects.errorLoading")}
          </Alert>
        )}

        {loading ? (
          <Grid container spacing={3} justifyContent="center">
            {[...Array(6)].map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ height: "100%", borderRadius: 3 }}>
                  <Skeleton variant="rectangular" height={180} />
                  <Box sx={{ p: 2 }}>
                    <Skeleton width="70%" />
                    <Skeleton width="90%" />
                    <Skeleton width="40%" />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {productos.map((prod) => (
              <Grid item xs={12} sm={6} md={4} key={prod.productId}>
                <Card
                  onClick={() => setSelectedProduct(prod)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: 300,
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={`https://ishoes.fabiandev.org${prod.images?.[0] || ""}`}
                      alt={prod.nombre}
                      loading="lazy"
                      sx={{
                        height: 180,
                        objectFit: "contain",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        bgcolor: "background.default",
                      }}
                    />
                    {typeof prod.rating === "number" && (
                      <Chip
                        size="small"
                        icon={<StarIcon fontSize="small" />}
                        label={prod.rating.toFixed(1)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "grey.800"
                              : "common.white",
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom noWrap>
                      {prod.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {prod.descripcion}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="primary">
                      $
                      {Number.isFinite(parseFloat(prod.price))
                        ? parseFloat(prod.price).toFixed(2)
                        : prod.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Product details modal */}
        <Dialog
          open={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {selectedProduct?.nombre}
            <IconButton
              aria-label="close"
              onClick={() => setSelectedProduct(null)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              image={`https://ishoes.fabiandev.org${
                selectedProduct?.images?.[0] || ""
              }`}
              alt={selectedProduct?.nombre}
              sx={{
                height: 250,
                objectFit: "contain",
                borderRadius: 2,
                mb: 2,
                bgcolor: "background.default",
              }}
            />
            <Typography variant="body1" color="text.secondary" paragraph>
              {selectedProduct?.descripcion}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {typeof selectedProduct?.rating === "number" && (
                <Chip
                  size="small"
                  icon={<StarIcon fontSize="small" />}
                  label={selectedProduct.rating.toFixed(1)}
                />
              )}
              <Typography variant="h6" color="primary" sx={{ ml: "auto" }}>
                $
                {Number.isFinite(parseFloat(selectedProduct?.price))
                  ? parseFloat(selectedProduct?.price).toFixed(2)
                  : selectedProduct?.price}
              </Typography>
            </Stack>
          </DialogContent>
        </Dialog>
      </SectionCard>

      {/* Image Modal viewer */}
      <Dialog open={!!modalImg} onClose={handleCloseModal} maxWidth="md">
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={modalImg || ""}
            alt="Full size screenshot"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "90vh",
              objectFit: "contain",
              display: "block",
              borderRadius: 1,
            }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Projects;
