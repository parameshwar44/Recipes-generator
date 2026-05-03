import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const PageBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #2a1147 0%, #150824 100%)',
  padding: theme.spacing(3),
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(15px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '420px',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(170, 59, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff3b8f',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.5)',
    '&.Mui-focused': {
      color: '#ff3b8f',
    },
  },
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #aa3bff, #ff3b8f)',
  border: 0,
  borderRadius: 12,
  boxShadow: '0 4px 15px 0 rgba(170, 59, 255, 0.4)',
  color: 'white',
  height: 54,
  padding: '0 30px',
  marginTop: '24px',
  fontWeight: 'bold',
  fontSize: '1rem',
  letterSpacing: '1px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #9a2bee, #ef2b7f)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px 0 rgba(170, 59, 255, 0.6)',
  },
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:7000/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <PageBackground>
      <GlassPaper elevation={0}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(45deg, #aa3bff, #ff3b8f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px',
              mb: 1
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Sign in to access your dashboard
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </InputAdornment>
                ),
              }
            }}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />

          {error && (
            <Typography variant="body2" sx={{ color: '#ff3b8f', mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
              {error}
            </Typography>
          )}

          <GradientButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </GradientButton>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Don't have an account?{' '}
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: '#aa3bff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'color 0.3s',
                  '&:hover': { color: '#ff3b8f' }
                }}
                onClick={() => (window.location.href = "/register")}
              >
                Register here
              </Typography>
            </Typography>
          </Box>
        </Box>
      </GlassPaper>
    </PageBackground>
  );
}

export default Login;