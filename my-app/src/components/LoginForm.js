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
import { useNavigate } from 'react-router-dom';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [isSignup, setIsSignup] = useState(false);
  const [selectedDate, handleDateChange] = useState(null);
  const [require,setrequire]=useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    cnic: '',
    email: '',
    username: '',
    nationality: '',
    password: '',
    confirmPassword: '',
  });
  React.useEffect(() => {
    // This function will be called when the component is unmounted or when isSignup changes
    return () => {
      setFormData({
        fullName: '',
        cnic: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
      });

      setErrors({
        fullName: '',
        cnic: '',
        email: '',
        username: '',
        nationality: '',
        password: '',
        confirmPassword: '',
      });
      setrequire(1);
      navigate('/patient/signup');
    };
  }, [isSignup, navigate]); 

  const inputFields = [
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      required: true,
      autoFocus: true,
    },
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      required: true,
    },
    {
      label: 'Nationality',
      name: 'nationality',
      type: 'text',
      required: true,
      showOnSignup: true,
    },
    {
      label: 'CNIC',
      name: 'cnic',
      type: 'number',
      required: true,
      showOnSignup: true,
    },
    {
      label: 'Date of Birth',
      name: 'dateOfBirth',
      type: 'date',
      required: true,
      showOnSignup: true,
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      required: true,
      showOnSignup: true,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      required: true,
      showOnSignup: true,
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      required: true,
      showOnSignup: true,
    },
  ];

  const handleInputChange = (e) => {
    setrequire(0);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'confirmPassword') {
      validateConfirmPassword(value);
    }
    validateField(name, value);
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
            value && value.trim() !== ''
              ? value.length >= 4 && /^[A-Za-z]/.test(value)
                ? ''
                : 'Username should be at least 4 characters long and start with an alphabet letter'
              : 'Username cannot be empty',
        }));
        break;
      case 'password':
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            value && value.trim() !== ''
              ? /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{4,}$/.test(value)
                ? ''
                : 'Password should contain at least one special character, one alphabet letter, and be at least 4 characters long'
              : 'Password cannot be empty',
        }));
        break;
      case 'email':
        setErrors((prevErrors) => ({
          ...prevErrors,
          email:
            value && value.trim() !== ''
              ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ''
                : 'Invalid email format'
              : 'Email cannot be empty',
        }));
        break;
      case 'fullName':
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName:
            value && value.trim() !== ''
              ? /^[A-Za-z ]{4,}$/.test(value)
                ? ''
                : 'Full name should be at least 4 characters long and contain only alphabets'
              : 'Full name cannot be empty',
        }));
        break;
      case 'cnic':
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnic:
            value && value.trim() !== ''
              ? /^[0-9]{13}$/.test(value)
                ? ''
                : 'CNIC should contain exactly 13 digits and only numbers'
              : 'CNIC cannot be empty',
        }));
        break;
      case 'nationality':
        setErrors((prevErrors) => ({
          ...prevErrors,
          nationality:
            value && value.trim() !== ''
              ? /^[A-Za-z]{4,}$/.test(value)
                ? ''
                : 'Nationality should be at least 4 characters long and contain only alphabets'
              : 'Nationality cannot be empty',
        }));
        break;
      default:
        break;
    }
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if(isSignup){
console.log('hh')
      inputFields.forEach(({ name }) => validateField(name, formData[name]));
      validateConfirmPassword(formData.confirmPassword);
  
    }
    else{
      validateField('username', formData.username);
      validateField('password', formData.password);
      }
      if (require===1||Object.values(errors).some((error) => !!error)) {
        console.error('Form has errors. Please correct them.');
      } else {
        console.log('Form submitted successfully!');
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


           { isSignup &&  <TextField
                  margin="normal"
                  variant='outlined'
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  autoFocus
                />
            }
            {<TextField
              margin="normal"
              variant='outlined'
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
              fullWidth
              id="nationality"
              label="nationality"
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              error={!!errors.nationality}
              helperText={errors.nationality}
              autoFocus
            />}
            {isSignup &&<TextField
              margin="normal"
              variant='outlined'
              fullWidth
              id="cnic"
              type="number"
              label="CNIC"
              name="cnic"
              error={!!errors.cnic}
              helperText={errors.cnic}
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
              required
              
              maxDate={new Date()} // Set maxDate to the current date
              
            />
              
            }
            
            {isSignup && <TextField
              margin="normal"
              variant='outlined'
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
              autoFocus
            />}
            
            {
              <TextField
              margin="normal"
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