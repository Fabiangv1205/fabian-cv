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
} from "@mui/material";

const Examples = () => {
  const [productos, setProductos] = useState([]);
  console.log(productos)
  const [loading, setLoading] = useState(true);

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

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Project Examples
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        A few practical examples demonstrating solutions I've built.
      </Typography>

      {/* Example 1 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Login Form with Firebase</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Example login screen using Firebase Auth with form validation and
          role-based access.
        </Typography>
        <Box>
          <Button variant="outlined" href="/examples/login" size="small">
            🔍 View Example
          </Button>
        </Box>
      </Paper>

      {/* Example 2 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Animated Cart Example</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Example of cart animation used in iShoes e-commerce app.
        </Typography>
        <Box>
          <Button variant="outlined" href="/examples/cart" size="small">
            🔍 View Example
          </Button>
        </Box>
      </Paper>

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
          <Grid container spacing={3}>
            {productos.map((prod) => (
              <Grid item xs={12} sm={6} key={prod.productId}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                    display: "flex",
                    flexDirection: "column",
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
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {prod.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
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
      </Paper>
    </Container>
  );
};

export default Examples;
