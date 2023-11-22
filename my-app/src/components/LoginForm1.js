import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';



const defaultTheme = createTheme();

const LoginForm1 = () => {
  const [isSignup,setIsSignup]=useState(false);
  const [selectedDate, handleDateChange] = useState(null);
  const [error, setError] = useState('');
  console.log(isSignup)

  const [formData, setFormData] = useState({
    fullName:'',
    cnic:'',
    email: '',
    username: '',
    password: '',
    confirmPassword:'',
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    fullName:'',
    cnic:'',
    email: '',
    username: '',
    password: '',
    confirmPassword:'',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if (email.trim() === '' || password.trim() === '' || password.length <= '3') {
      setError('Please enter both email and password.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Your login logic here
      console.log('Login successful!');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      
    <Container component="main" maxWidth="xs">
    <Box
        display="flex"
        flexDirextion={"dolumn"}
        maxwidth={400}
        alignItems={"center"}
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={12}
        boxShadow={'5px 5px 10px'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ":hover":{
                boxShadow:"10px 10px 20px #ccc",
            }
          }}
        >



        <form onSubmit={handleSubmit}>
        <Typography variant="h5" align="center">
          Login
        </Typography>

        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        </form>
       </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm1;
