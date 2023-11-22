import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [isSignup,setIsSignup]=useState(false);
  const [selectedDate, handleDateChange] = useState(null);
  const [error1, setError1] = useState('');
  // console.log(isSignup)

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
    nationality:'',
    password: '',
    confirmPassword:'',
  });

  

  const handleNumericInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    inputValue = inputValue.slice(0, 13);
    inputValue = inputValue.replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3'); // Apply the format: 33401-0440920-5
    // setNumericValue(inputValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });


    if (name === 'confirmPassword') {
      validateConfirmPassword(value);
    } else{
      validateField(name, value);
    }
  

    // Perform validation on the fly
    
  };


  const validateConfirmPassword = (confirmPassword) => {
    if (formData.password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
      }));
    }
    };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'username':
        setErrors((prevErrors) => ({
          ...prevErrors,
          username:
            value.trim() !== ''
              ? (value.length >= 4 && /^[A-Z]/.test(value)
                ? ''
                : 'Username should be 4 characters long, starting with a capital letter')
              : 'Username cannot be empty',
        }));
        break;
      case 'password':
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            value.trim() !== '' ? 
            (/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(value) ? '' : 'Password should contain at least one special character, one numeric digit, and be at least 8 characters long') 
            : 'Password cannot be empty',
        }));
        break;
      default:
        break;
    }
  };


  const validateForm = () => {
    if (formData.email.trim() === '' ) {
      setError1('Please enter  email a.');
      return false;
    }
    if (formData.password.trim() === '' || formData.password.length <= '3'  )
    {
      setError1('Please Enter Rigth password.');
      return false;
    }
    if (!(formData.username.length >= 4) ||  !(/^[A-Z]/.test(formData.username))  )
    {
      setError1('Please Enter Rigth User Name.');
      return false;
    }
    setError1('');
    return true;
    
  };



   
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    
    if (validateForm()){
      console.log({
        fullName:data.get('fullName'),
        username:data.get('username'),
        cnic:data.get('cnic'),
        email: data.get('email'),
        password: data.get('password'),
      });
      setError1('')

    }
    
  };

  const handleTogglePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
             {isSignup ? "Sign up":"Sign in"}
          </Typography>

          <form  onSubmit={handleSubmit}>

            {error1 && (
            <Typography variant="body2" color="error" align="center">
              {error1}
            </Typography>)}

           { isSignup &&  <TextField
                  margin="normal"
                  variant='outlined'
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
            }
            {isSignup &&<TextField
              margin="normal"
              variant='outlined'
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
              autoFocus
            />}
            {isSignup &&<TextField
              margin="normal"
              variant='outlined'
              required
              fullWidth
              id="nationality"
              label="nationality"
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              autoFocus
            />}
            {isSignup &&<TextField
              margin="normal"
              variant='outlined'
              required
              fullWidth
              id="cnic"
              type="number"
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              // value={formData.cnic}
              // onInput={handleNumericInputChange}
              
              autoFocus
            />}

            {isSignup && 
              <DatePicker className="custom-datepicker" // Add your own custom styles
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
              isClearable
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              showMonthDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              typr="date"
              name="date"
              
              maxDate={new Date()} // Set maxDate to the current date
              
            />
              
            }
            
            <TextField
              margin="normal"
              variant='outlined'
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              autoComplete="email"
              autoFocus
            />
            {!isSignup && 
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              label="Password"
              type={formData.showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            }
            {isSignup && 
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={formData.showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            }
            {isSignup &&
               <TextField
               margin="normal"
               required
               fullWidth
               name="confirmPassword"
               label="Confirm Password"
               type={formData.showPassword ? 'text' : 'password'}
               id="confirmPassword"
               autoComplete="current-password"
               value={formData.confirmPassword}
               onChange={handleInputChange}
               error={!!errors.confirmPassword}
               helperText={errors.confirmPassword}
               InputProps={{
                 endAdornment: (
                   <InputAdornment position="end">
                     <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                       {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                     </IconButton>
                   </InputAdornment>
                 ),
               }}
             />             
            }
            
            {!isSignup &&<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              endIcon={!isSignup? <LockOpenIcon/>:<ExitToAppOutlinedIcon/>}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup ? "Sign up":"Sign in"}
            </Button>
            {!isSignup  &&
            <Grid container spacing={2}> 
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid>
              <Button item onClick={()=>setIsSignup(!isSignup)}>
                  {"Sign Up"}
              </Button>
              </Grid>
             
            </Grid>}
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}