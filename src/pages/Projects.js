import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

const Examples = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImg, setModalImg] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://ishoes.fabiandev.org/api/productos/todos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.filter((p) => p.publicado));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (src) => setModalImg(src);
  const handleCloseModal = () => setModalImg(null);

  return (
    <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Project Examples
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        A few practical examples demonstrating solutions I've built.
      </Typography>

      {/* Example 1 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Screenshots from app iShoes
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Example login screen using Firebase Auth with form validation and
          role-based access.
        </Typography>

        <Box textAlign="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            href="/Ishoes_preview.apk"
            download
            startIcon={<DownloadIcon />}
          >
            Download iShoes App (APK)
          </Button>
        </Box>

        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box
                component="img"
                src={`/${i}.jpg`}
                alt={`Screenshot ${i}`}
                onClick={() => handleOpenModal(`/${i}.jpg`)}
                sx={{
                  width: "100%",
                  maxHeight: 350,
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                  borderRadius: 2,
                  border: "1px solid #e1e4e8",
                  boxShadow: 1,
                  p: 1,
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Modal Viewer */}
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
            src={modalImg}
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

      {/* Example 3: Fetch from iShoes API */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Fetch Products from iShoes Backend</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          This example shows products retrieved from the iShoes backend REST
          API.
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {productos.map((prod) => (
              <Grid
                item
                key={prod.productId}
                sx={{
                  width: 300,
                  display: "flex",
                }}
              >
                <Card
                  onClick={() => setSelectedProduct(prod)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 300,
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`https://ishoes.fabiandev.org${
                      prod.images?.[0] || ""
                    }`}
                    alt={prod.nombre}
                    sx={{
                      height: 180,
                      objectFit: "contain",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom noWrap>
                      {prod.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                      noWrap
                    >
                      {prod.descripcion}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="primary"
                    >
                      ${parseFloat(prod.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Modal de detalles */}
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
              }}
            />
            <Typography variant="body1" color="text.secondary" paragraph>
              {selectedProduct?.descripcion}
            </Typography>
            <Typography variant="h6" color="primary">
              ${parseFloat(selectedProduct?.price || 0).toFixed(2)}
            </Typography>
          </DialogContent>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Examples;
