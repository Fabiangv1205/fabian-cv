// src/components/Navbar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Stack,
  useTheme,
  useScrollTrigger,
  Container,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import EmailIcon from "@mui/icons-material/Email";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const location = useLocation();
  const trigger = useScrollTrigger({ threshold: 8, disableHysteresis: true });
  const { mode, toggleTheme } = useThemeMode();
  const { lang, setLang, t } = useLanguage();

  const links = React.useMemo(
    () => [
      { text: t("nav.home"), to: "/" },
      { text: t("nav.skills"), to: "/skills" },
      { text: t("nav.projects"), to: "/projects" },
      { text: t("nav.contact"), to: "/contact" },
    ],
    [t]
  );

  const iconMap = React.useMemo(
    () => ({
      "/": <HomeIcon />,
      "/skills": <CodeIcon />,
      "/projects": <FolderSpecialIcon />,
      "/contact": <EmailIcon />,
    }),
    []
  );

  const modeTooltip = React.useMemo(() => {
    const toDark = lang === "es" ? "Cambiar a modo oscuro" : "Switch to dark mode";
    const toLight = lang === "es" ? "Cambiar a modo claro" : "Switch to light mode";
    return mode === "light" ? toDark : toLight;
  }, [mode, lang]);

  const appBarSx = {
    bgcolor: alpha(theme.palette.background.paper, trigger ? 0.9 : 0.6),
    color: "text.primary",
    backgroundImage:
      theme.palette.mode === "dark"
        ? `linear-gradient(${alpha(theme.palette.primary.main, 0.06)}, ${alpha(
            theme.palette.primary.main,
            0.06
          )})`
        : `linear-gradient(${alpha(theme.palette.primary.main, 0.03)}, ${alpha(
            theme.palette.primary.main,
            0.03
          )})`,
    backdropFilter: "saturate(120%) blur(8px)",
    WebkitBackdropFilter: "saturate(120%) blur(8px)",
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
    boxShadow: trigger ? theme.shadows[3] : "none",
    transition: theme.transitions.create(
      ["background-color", "box-shadow", "backdrop-filter"],
      { duration: theme.transitions.duration.shorter }
    ),
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
    "@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      bgcolor: alpha(theme.palette.background.paper, trigger ? 0.98 : 0.92),
    },
  };

  const NavButton = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Button
        key={to}
        component={RouterLink}
        to={to}
        size="small"
        variant={isActive ? "contained" : "text"}
        color="primary"
        sx={{
          borderRadius: 999,
          fontWeight: 600,
          textTransform: "none",
          px: 1.75,
          ...(isActive
            ? {}
            : {
                color: theme.palette.primary.main,
              }),
        }}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      <AppBar position="sticky" elevation={trigger ? 3 : 0} sx={appBarSx}>
        <Container maxWidth="lg" disableGutters>
          <Toolbar sx={{ justifyContent: "space-between", gap: 2, px: 2 }}>
            {/* Left: Desktop links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {links.map(({ text, to }) => (
                <NavButton key={to} to={to}>
                  {text}
                </NavButton>
              ))}
            </Box>

            {/* Right: language, theme, menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Mobile menu button */}
              <IconButton
                edge="start"
                aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
                onClick={() => setOpen(true)}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>

              {/* Language Switch */}
              <ToggleButtonGroup
                size="small"
                value={lang}
                exclusive
                onChange={(_, value) => value && setLang(value)}
                aria-label={lang === "es" ? "Idioma" : "Language"}
                sx={{
                  borderRadius: 999,
                  "& .MuiToggleButton-root": {
                    textTransform: "none",
                    px: 1.25,
                  },
                }}
              >
                <ToggleButton value="es" aria-label="español">
                  ES
                </ToggleButton>
                <ToggleButton value="en" aria-label="english">
                  EN
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Theme toggle */}
              <Tooltip title={modeTooltip} arrow>
                <IconButton onClick={toggleTheme} color="inherit" aria-label={modeTooltip}>
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer actualizado */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 320,
            height: "100%",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            background: `linear-gradient(180deg,
              ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.06)} 0%,
              transparent 35%)`,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 3,
          },
        }}
      >
        {/* Header del drawer */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                }}
              >
                F
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1 }}>
                  fabiandev.org
                </Typography>
                <Typography variant="h6" fontWeight={900} lineHeight={1.1}>
                  Menu
                </Typography>
              </Box>
            </Stack>

            <ToggleButtonGroup
              size="small"
              value={lang}
              exclusive
              onChange={(_, value) => value && setLang(value)}
              aria-label={lang === "es" ? "Idioma" : "Language"}
              sx={{
                borderRadius: 999,
                "& .MuiToggleButton-root": {
                  px: 1.5,
                  border: "none",
                },
                "& .Mui-selected": {
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                },
              }}
            >
              <ToggleButton value="es" aria-label="español">
                ES
              </ToggleButton>
              <ToggleButton value="en" aria-label="english">
                EN
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>

        <Divider />

        {/* Navegación con iconos y estado activo */}
        <Box sx={{ p: 2 }}>
          <List disablePadding>
            {links.map(({ text, to }) => {
              const isActive = location.pathname === to;
              return (
                <ListItemButton
                  key={to}
                  component={RouterLink}
                  to={to}
                  onClick={() => setOpen(false)}
                  selected={isActive}
                  sx={{
                    mb: 0.5,
                    py: 1.25,
                    borderRadius: 2,
                    alignItems: "center",
                    ...(isActive
                      ? {
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                          "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.18) },
                          "& .MuiListItemText-primary": { fontWeight: 700 },
                        }
                      : {
                          "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.08) },
                        }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    {iconMap[to]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
