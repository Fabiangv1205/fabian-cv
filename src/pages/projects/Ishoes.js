// src/pages/projects/Ishoes.js
import React, { useEffect, useRef, useState, useMemo } from "react";
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
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SectionCard from "../../components/SectionCard";
import { useLanguage } from "../../context/LanguageContext";

const CarouselMD = ({
  images = [],
  onImageClick,
  aspect = "9 / 16",
  autoPlay = true,
  interval = 3500, // ms
  pauseOnHover = true,
  stopOnInteraction = true,
}) => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const count = images.length;
  const safeIndex = (i) => (i + count) % count;

  const next = () => setIndex((i) => safeIndex(i + 1));
  const prev = () => setIndex((i) => safeIndex(i - 1));
  const goTo = (i) => setIndex(safeIndex(i));

  useEffect(() => {
    if (!autoPlay || count <= 1) return;

    let timerId;
    const tick = () => {
      timerId = setTimeout(() => {
        if (!paused && !document.hidden) {
          setIndex((i) => (i + 1) % count);
        }
        tick();
      }, interval);
    };

    tick();
    return () => clearTimeout(timerId);
  }, [autoPlay, interval, paused, count]);

  useEffect(() => {
    const onVis = () => setPaused((p) => (document.hidden ? true : p));
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? 0;
    touchDeltaX.current = 0;
    if (stopOnInteraction) setPaused(true);
  };
  const onTouchMove = (e) => {
    const x = e.touches?.[0]?.clientX ?? 0;
    touchDeltaX.current = x - touchStartX.current;
  };
  const onTouchEnd = () => {
    const threshold = 40; // px
    if (touchDeltaX.current > threshold) prev();
    else if (touchDeltaX.current < -threshold) next();
    touchDeltaX.current = 0;
    if (stopOnInteraction) setPaused(false);
  };

  if (count === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 1,
        p: 1,
        bgcolor: "background.default",
      }}
    >
      {/* Viewport */}
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: 1.5,
          position: "relative",
          aspectRatio: aspect,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      >
        {/* Track */}
        <Box
          ref={trackRef}
          sx={{
            height: "100%",
            display: "flex",
            width: `${count * 100}%`,
            transform: `translateX(-${index * (100 / count)}%)`,
            transition: "transform 300ms ease",
          }}
        >
          {images.map((src, idx) => (
            <Box
              key={src + idx}
              sx={{
                width: `${100 / count}%`,
                minWidth: `${100 / count}%`,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                boxSizing: "border-box",
                cursor: "pointer",
              }}
              onClick={() => onImageClick?.(src)}
            >
              <Box
                component="img"
                src={src}
                alt={`Slide ${idx + 1}`}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: 1,
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Prev/Next buttons */}
        <IconButton
          aria-label="previous"
          onClick={prev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            "&:hover": { bgcolor: alpha(theme.palette.background.paper, 0.9) },
            boxShadow: 1,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label="next"
          onClick={next}
          sx={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            "&:hover": { bgcolor: alpha(theme.palette.background.paper, 0.9) },
            boxShadow: 1,
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Dots */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            borderRadius: 999,
            px: 1,
            py: 0.5,
            boxShadow: 1,
          }}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                cursor: "pointer",
                bgcolor:
                  i === index
                    ? "primary.main"
                    : alpha(theme.palette.text.primary, 0.4),
                transition: "all .2s",
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

const Ishoes = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
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

    fetch("https://ishoes.fabiandev.org/api/productos/todos", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        const onlyPublic = Array.isArray(data)
          ? data.filter((p) => p.publicado)
          : [];
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

  // Imágenes locales para el carrusel
  const screens = useMemo(() => [1, 2, 3, 4, 5].map((i) => `/${i}.jpg`), []);

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
            iShoes
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 900, fontSize: { xs: "1rem", md: "1.1rem" } }}
          >
            {t("projects.ishoesLong")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/ishoes_preview.apk"
            download
            startIcon={<DownloadIcon />}
            sx={{
              borderRadius: 99,
              px: 2.5,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {t("projects.downloadApk")}
          </Button>
        </Stack>
      </Paper>

      {/* APK + Screenshots (con carrusel y autoplay) */}
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
        ></Stack>

        <CarouselMD
          images={screens}
          onImageClick={handleOpenModal}
          aspect={isMdUp ? "16 / 9" : "9 / 16"}
          autoPlay
          interval={3500}
          pauseOnHover
          stopOnInteraction
        />
      </SectionCard>

      {/* Productos desde API */}
      <SectionCard
        sx={{ mt: { xs: 3, md: 4 } }}
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
                      image={`https://ishoes.fabiandev.org${
                        prod.images?.[0] || ""
                      }`}
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
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="primary"
                    >
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

        {/* Modal producto */}
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

      {/* Modal visor de imagen (para el carrusel) */}
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

export default Ishoes;
