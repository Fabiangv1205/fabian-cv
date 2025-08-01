import React from 'react';
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
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';

const links = [
  { text: 'Home', to: '/' },
  { text: 'Skills', to: '/skills' },
  { text: 'Projects', to: '/projects' },
  { text: 'Experience', to: '/experience' },
  { text: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Links desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {links.map(({ text, to }) => (
              <Button
                key={to}
                component={RouterLink}
                to={to}
                sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
              >
                {text}
              </Button>
            ))}
          </Box>

          {/* Botón modo claro/oscuro */}
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {/* Menú móvil */}
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 240,
            height: '100%',
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
              sx={{ py: 2 }}
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
