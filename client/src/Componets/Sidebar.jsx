import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ConfirmModal from './ConfirmModal';

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  background: 'linear-gradient(180deg, #2a1147 0%, #150824 100%)',
  color: '#e2d5f8',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: 'rgba(42, 17, 71, 0.5)',
  backdropFilter: 'blur(10px)',
  color: '#aa3bff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  width: '100%',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar({ children }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsLogoutModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/* ADMIN PANEL removed as requested */}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: '#ff3b8f' }}>A</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                  mt: 1,
                  minWidth: '150px'
                }
              }}
            >
              <MenuItem onClick={handleLogoutClick} sx={{ fontWeight: 600, color: '#aa3bff' }}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Main>
        <DrawerHeader />
        {children}
      </Main>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to log out of your account?"
      />
    </Box>
  );
}
