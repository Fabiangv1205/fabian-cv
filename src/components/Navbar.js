import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link as RouterLink } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const { lang, setLang, t } = useLanguage();

  const links = [
    { text: t("nav.home"), to: "/" },
    { text: t("nav.skills"), to: "/skills" },
    { text: t("nav.projects"), to: "/projects" },
    { text: t("nav.contact"), to: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          {/* Links desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {links.map(({ text, to }) => (
              <Button
                key={to}
                component={RouterLink}
                to={to}
                sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
              >
                {text}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Switch de idioma */}
            <ToggleButtonGroup
              size="small"
              value={lang}
              exclusive
              onChange={(_, value) => value && setLang(value)}
              aria-label="language"
            >
              <ToggleButton value="es" aria-label="español">ES</ToggleButton>
              <ToggleButton value="en" aria-label="english">EN</ToggleButton>
            </ToggleButtonGroup>

            {/* Menú móvil */}
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={() => setOpen(true)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>

            {/* Botón modo claro/oscuro */}
            <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            height: "100%",
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <Divider />
        <List>
          {links.map(({ text, to }) => (
            <ListItem
              button
              key={to}
              component={RouterLink}
              to={to}
              onClick={() => setOpen(false)}
              sx={{ py: 2, color: theme.palette.text.primary }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
