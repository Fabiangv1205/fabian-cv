// src/pages/projects/MotionPeek.js
import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  LinearProgress,
  alpha,
  useTheme,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper as MuiPaper,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SectionCard from "../../components/SectionCard";
import { useLanguage } from "../../context/LanguageContext";

const API_URL = "https://ishoes.fabiandev.org";

const MotionPeek = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const [prompt, setPrompt] = useState("");
  const [firstFrameUrl, setFirstFrameUrl] = useState("");
  const [saveToDisk] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const [videos, setVideos] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listErr, setListErr] = useState("");

  const [apiKey, setApiKey] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [checkingKey, setCheckingKey] = useState(false);

  // Galería
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [imagesErr, setImagesErr] = useState("");

  const heroBg = `linear-gradient(0deg, ${alpha(
    theme.palette.primary.main,
    theme.palette.mode === "dark" ? 0.12 : 0.08
  )}, transparent)`;

  const videoSrc = result?.playableUrl || "";

  const loadVideos = useCallback(async () => {
    setListLoading(true);
    setListErr("");
    try {
      const res = await fetch(`${API_URL}/api/ai/list`);
      if (!res.ok)
        throw new Error((await res.text()) || t("motionpeek.listLoadError"));
      const data = await res.json();
      setVideos(Array.isArray(data.videos) ? data.videos : []);
    } catch (e) {
      setListErr(e.message || t("motionpeek.listLoadError"));
    } finally {
      setListLoading(false);
    }
  }, [t]);

  const loadFirstFrames = async () => {
    setImagesLoading(true);
    setImagesErr("");
    try {
      const res = await fetch(`${API_URL}/api/ai/firstframes`);
      if (!res.ok)
        throw new Error((await res.text()) || t("motionpeek.galleryLoadError"));
      const data = await res.json();
      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (e) {
      setImagesErr(e.message || t("motionpeek.galleryLoadError"));
    } finally {
      setImagesLoading(false);
    }
  };

  const openGallery = () => {
    setGalleryOpen(true);
    loadFirstFrames();
  };

  // validar API key antes de mostrar el resto
  const handleAuth = async () => {
    setCheckingKey(true);
    setErr("");
    try {
      if (!apiKey.trim()) throw new Error(t("motionpeek.enterApiKey"));
      const res = await fetch(`${API_URL}/api/ai/auth`, {
        headers: { "x-api-key": apiKey },
      });
      if (!res.ok) throw new Error(t("motionpeek.invalidApiKey"));
      setIsAuthed(true);
    } catch (e) {
      setErr(e.message || t("motionpeek.couldNotValidate"));
    } finally {
      setCheckingKey(false);
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setApiKey("");
    setErr("");
  };
  const handleGenerate = async () => {
    setLoading(true);
    setErr("");
    setResult(null);
    setCopied(false);

    try {
      if (!isAuthed || !apiKey.trim()) {
        throw new Error(t("motionpeek.mustAuthFirst"));
      }

      // 1) crear job (respuesta rápida)
      const res = await fetch(`${API_URL}/api/ai/animate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          prompt,
          firstFrameImageUrl: firstFrameUrl || undefined,
          saveToDisk,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        let msg = t("motionpeek.requestFailed");
        try {
          msg = JSON.parse(text)?.error || msg;
        } catch {}
        if (res.status === 401) msg = t("motionpeek.unauthorized");
        if (res.status === 403) msg = t("motionpeek.forbidden");
        throw new Error(msg || `HTTP ${res.status}`);
      }
      const { id } = await res.json();
      if (!id) throw new Error("No se recibió id de predicción");

      // 2) poll cada 3s hasta que esté listo o falle
      const start = Date.now();
      const timeoutMs = 5 * 60 * 1000; // 5 min tope

      while (true) {
        await new Promise((r) => setTimeout(r, 3000));
        const sres = await fetch(`${API_URL}/api/ai/status/${id}`, {
          headers: { "x-api-key": apiKey },
        });
        if (!sres.ok) {
          const txt = await sres.text();
          try {
            throw new Error(JSON.parse(txt)?.error || txt);
          } catch {
            throw new Error(txt || "Error al consultar estado");
          }
        }
        const data = await sres.json();

        if (data.status === "succeeded") {
          const playableUrl =
            data.absoluteUrl ||
            (data.localPath ? `${API_URL}${data.localPath}` : data.videoUrl);
          setResult({ ...data, playableUrl });
          await loadVideos();
          break;
        }
        if (data.status === "failed" || data.error) {
          throw new Error(data.error || "La predicción falló");
        }
        if (Date.now() - start > timeoutMs) {
          throw new Error("Tiempo de espera agotado");
        }
      }
    } catch (e) {
      setErr(e.message || t("motionpeek.errorGenerating"));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => videoSrc && window.open(videoSrc, "_blank");
  const handleDownload = () => {
    if (!videoSrc) return;
    const a = document.createElement("a");
    a.href = videoSrc;
    a.download = "motionpeek.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  const handleCopy = async () => {
    if (!videoSrc) return;
    try {
      await navigator.clipboard.writeText(videoSrc);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

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
          background: heroBg,
        }}
      >
        <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center">
          <Typography
            fontWeight={900}
            sx={{
              lineHeight: 1.1,
              fontSize: {
                xs: "clamp(28px,8.5vw,40px)",
                sm: "clamp(36px,6.5vw,52px)",
                md: "clamp(44px,5.5vw,64px)",
              },
            }}
          >
            {t("motionpeek.title")}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 900 }}>
            {t("motionpeek.subtitle")}
          </Typography>
        </Stack>
      </Paper>

      {/* Paso 1: Validar API key */}
      {!isAuthed && (
        <SectionCard
          icon={<PlayCircleOutlineIcon color="primary" />}
          title={t("motionpeek.accessTitle")}
        >
          <Stack spacing={2}>
            {!!err && <Alert severity="error">{err}</Alert>}
            <TextField
              label={t("motionpeek.apiKeyLabel")}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              autoComplete="new-password"
              name="ai-api-key"
              inputProps={{ "data-lpignore": "true", "data-1p-ignore": "true" }}
              required
              helperText={t("motionpeek.apiKeyHelp")}
            />
            <Button
              variant="contained"
              onClick={handleAuth}
              disabled={checkingKey || !apiKey.trim()}
            >
              {checkingKey
                ? t("motionpeek.verifying")
                : t("motionpeek.continue")}
            </Button>
          </Stack>
        </SectionCard>
      )}

      {/* Paso 2: Form + galería (solo si está autenticado) */}
      {isAuthed && (
        <>
          <SectionCard
            icon={<PlayCircleOutlineIcon color="primary" />}
            title={t("motionpeek.formTitle")}
          >
            <Stack spacing={2}>
              {!!err && <Alert severity="error">{err}</Alert>}

              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button size="small" onClick={handleLogout}>
                  {t("motionpeek.logout")}
                </Button>
              </Stack>

              <TextField
                label={t("motionpeek.prompt")}
                multiline
                minRows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A woman walking through neon-lit Tokyo at night..."
              />

              {/* Selector de primer frame (galería) */}
              <Stack spacing={1}>
                <Typography variant="subtitle2">
                  {t("motionpeek.firstFrameTitle")}
                </Typography>
                {firstFrameUrl ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      component="img"
                      src={firstFrameUrl}
                      alt="First frame"
                      sx={{
                        width: 72,
                        height: 72,
                        objectFit: "cover",
                        borderRadius: 1,
                        border: (th) => `1px solid ${th.palette.divider}`,
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => setFirstFrameUrl("")}
                    >
                      {t("motionpeek.remove")}
                    </Button>
                    <Button onClick={openGallery}>
                      {t("motionpeek.change")}
                    </Button>
                  </Stack>
                ) : (
                  <Button variant="outlined" onClick={openGallery}>
                    {t("motionpeek.pickFromGallery")}
                  </Button>
                )}
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                >
                  {t("motionpeek.generate")}
                </Button>
              </Stack>

              {loading && <LinearProgress />}

              {!!videoSrc && (
                <Stack spacing={1.5} sx={{ mt: 2 }}>
                  <Typography variant="h6">
                    {t("motionpeek.resultTitle")}
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                      border: `1px solid ${theme.palette.divider}`,
                      boxShadow: 1,
                      bgcolor: "background.default",
                    }}
                  >
                    <Box
                      component="video"
                      src={videoSrc}
                      poster={firstFrameUrl || undefined}
                      controls
                      playsInline
                      sx={{ width: "100%", display: "block" }}
                    />
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      startIcon={<OpenInNewIcon />}
                      onClick={handleOpenNew}
                    >
                      {t("motionpeek.open")}
                    </Button>
                    <Button
                      startIcon={<DownloadIcon />}
                      onClick={handleDownload}
                    >
                      {t("motionpeek.download")}
                    </Button>
                    <Button
                      startIcon={<ContentCopyIcon />}
                      onClick={handleCopy}
                      variant={copied ? "contained" : "outlined"}
                    >
                      {copied
                        ? t("motionpeek.copied")
                        : t("motionpeek.copyLink")}
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </SectionCard>

          {/* Videos guardados (público) */}
          <SectionCard
            icon={<PlayCircleOutlineIcon color="primary" />}
            title={t("motionpeek.savedVideosTitle")}
          >
            <Stack spacing={2}>
              {!!listErr && <Alert severity="error">{listErr}</Alert>}
              {listLoading && <LinearProgress />}
              {!listLoading && videos.length === 0 && (
                <Typography color="text.secondary">
                  {t("motionpeek.noneVideos")}
                </Typography>
              )}
              {!listLoading && videos.length > 0 && (
                <Stack spacing={2}>
                  {videos.map((v) => {
                    const date = new Date(v.mtime);
                    const sizeMB = (v.size / (1024 * 1024)).toFixed(2);
                    return (
                      <MuiPaper
                        key={v.filename}
                        variant="outlined"
                        sx={{ p: 2, borderRadius: 2 }}
                      >
                        <Stack spacing={1.5}>
                          <Typography variant="subtitle2" noWrap>
                            {v.filename}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {date.toLocaleString()} • {sizeMB} MB
                          </Typography>
                          <Box
                            component="video"
                            src={v.url}
                            controls
                            playsInline
                            sx={{
                              width: "100%",
                              borderRadius: 1,
                              bgcolor: "background.default",
                            }}
                          />
                        </Stack>
                      </MuiPaper>
                    );
                  })}
                </Stack>
              )}
            </Stack>
          </SectionCard>

          {/* Diálogo de galería */}
          <Dialog
            open={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>{t("motionpeek.galleryTitle")}</DialogTitle>
            <DialogContent dividers>
              {!!imagesErr && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {imagesErr}
                </Alert>
              )}
              {imagesLoading && <LinearProgress sx={{ mb: 2 }} />}

              {/* Subir nueva imagen */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mb: 2 }}
              >
                <Button variant="outlined" component="label">
                  {t("motionpeek.uploadImage")}
                  <input
                    hidden
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const form = new FormData();
                        form.append("image", file);
                        const res = await fetch(
                          `${API_URL}/api/ai/upload-first-frame`,
                          {
                            method: "POST",
                            headers: { "x-api-key": apiKey },
                            body: form,
                          }
                        );
                        if (!res.ok)
                          throw new Error(
                            (await res.text()) || t("motionpeek.uploadError")
                          );
                        const data = await res.json();
                        await loadFirstFrames();
                        setFirstFrameUrl(data.url);
                        setGalleryOpen(false);
                      } catch (e2) {
                        setImagesErr(e2.message || t("motionpeek.uploadError"));
                      } finally {
                        e.target.value = "";
                      }
                    }}
                  />
                </Button>
              </Stack>

              <Grid container spacing={2}>
                {images.map((img) => (
                  <Grid item xs={6} sm={4} md={3} key={img.filename}>
                    <Box
                      onClick={() => {
                        setFirstFrameUrl(img.url);
                        setGalleryOpen(false);
                      }}
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        border: (th) => `1px solid ${th.palette.divider}`,
                        cursor: "pointer",
                        transition: "transform .15s, box-shadow .15s",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 3,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={img.url}
                        alt={img.filename}
                        sx={{
                          width: "100%",
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      title={img.filename}
                    >
                      {img.filename}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {!imagesLoading && images.length === 0 && (
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {t("motionpeek.galleryEmpty")}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setGalleryOpen(false)}>
                {t("motionpeek.close")}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default MotionPeek;
