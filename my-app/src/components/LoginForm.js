import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import patientInput from "../inputFieds/patientInput";
import docterInput from "../inputFieds/docterInput";
import labInput from "../inputFieds/medicalLabInput";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginRequest,
  verification,
} from "../redux/actions/authActions";
import { register, registerRequest } from "../redux/actions/registerAction";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn(props) {
  const { verify } = props;
  const [isSignup, setIsSignup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { user, username } = useParams();
  const navigate = useNavigate();
  const errorLogin = useSelector((state) => state.auth.error);
  const errorSignup = useSelector((state) => state.regis.error);
  const statuscode = useSelector((state) => state.auth.statuscode);
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputFields, setInputFields] = useState(patientInput);
  const [formData, setFormData] = useState({
    fullName: "",
    cnic: "",
    email: "",
    username: "",
    medicalLicenseNumber: "",
    labName: "",
    labLicense: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    showPassword: false,
    dateOfBirth: null,
    verificationNumber: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    cnic: "",
    email: "",
    username: "",
    medicalLicenseNumber: "",
    labName: "",
    labLicense: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    verificationNumber: "",
  });
  React.useEffect(() => {
    // This function will be called when the component is unmounted or when isSignup changes
    return () => {
      setFormData({
        fullName: "",
        cnic: "",
        email: "",
        username: "",
        medicalLicenseNumber: "",
        labName: "",
        labLicense: "",
        password: "",
        confirmPassword: "",
        nationality: "",
        showPassword: false,
        dateOfBirth: null,
        verificationNumber: "",
      });
      setSelectedDate(null);

      setErrors({
        fullName: "",
        cnic: "",
        email: "",
        username: "",
        medicalLicenseNumber: "",
        labName: "",
        labLicense: "",
        password: "",
        confirmPassword: "",
        nationality: "",
        verificationNumber: "",
      });
    };
  }, [isSignup, user]);
  React.useEffect(() => {
    if (user === "patient") setInputFields(patientInput);
    if (user === "doctor") setInputFields(docterInput);

    if (user === "medical_labs" || user === "pharmacy")
      setInputFields(labInput);

    dispatch(loginRequest()); ///for reset error if error is not found
    dispatch(registerRequest()); //for reset error
  }, [dispatch, inputFields, user]);
  React.useEffect(() => {
    if (errorLogin && statuscode === 401)
      navigate(`/${formData.username}/${user}/signin`);
  }, [statuscode, errorLogin]);

  React.useEffect(() => {
    if (location.pathname === `/${user}/signin`) {
      setIsSignup(false);
      navigate(`/${user}/signin`);
      dispatch(loginRequest()); ///for reset error if error is not found
      dispatch(registerRequest()); //for reset error
    }
  }, [user, location.pathname, navigate, dispatch]);
  React.useEffect(() => {
    if (statuscode === 200) {
      navigate(`/welcome/${user}/${username}`);
      dispatch(loginRequest());
    }
  }, [statuscode, navigate, dispatch]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "confirmPassword") {
      validateConfirmPassword(value);
    }
    validateField(name, value);
    dispatch(loginRequest()); ///for reset error
    dispatch(registerRequest()); ///for reset error
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
    setFormData({
      ...formData,
      dateOfBirth: date,
    });
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (formData.password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "username":
        setErrors((prevErrors) => ({
          ...prevErrors,
          username:
            value && value.trim() !== ""
              ? value.length >= 4 && /^[A-Za-z]/.test(value)
                ? ""
                : "Username should be at least 4 characters long and start with an alphabet letter"
              : "Username cannot be empty",
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            value && value.trim() !== ""
              ? /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{4,}$/.test(value)
                ? ""
                : "Password should contain at least one special character, one alphabet letter, and be at least 4 characters long"
              : "Password cannot be empty",
        }));
        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email:
            value && value.trim() !== ""
              ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ""
                : "Invalid email format"
              : "Email cannot be empty",
        }));
        break;
      case "fullName":
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName:
            value && value.trim() !== ""
              ? /^[A-Za-z ]{4,}$/.test(value)
                ? ""
                : "Full name should be at least 4 characters long and contain only alphabets"
              : "Full name cannot be empty",
        }));
        break;
      case "cnic":
        setErrors((prevErrors) => ({
          ...prevErrors,
          cnic: value
            ? /^[0-9]{13}$/.test(value)
              ? ""
              : "CNIC should contain exactly 13 digits and only numbers"
            : "CNIC cannot be empty",
        }));
        break;
      case "nationality":
        setErrors((prevErrors) => ({
          ...prevErrors,
          nationality:
            value && value.trim() !== ""
              ? /^[A-Za-z]{4,}$/.test(value)
                ? ""
                : "Nationality should be at least 4 characters long and contain only alphabets"
              : "Nationality cannot be empty",
        }));
        break;
      case "medicalLicenseNumber":
        setErrors((prevErrors) => ({
          ...prevErrors,
          medicalLicenseNumber:
            value && value.trim() !== ""
              ? /^(MD\d+|\d+MD)$/.test(value)
                ? ""
                : "Format should be MD12345 or 12345MD"
              : "Medical License Number cannot be empty",
        }));
        break;
      case "labLicense":
        setErrors((prevErrors) => ({
          ...prevErrors,
          labLicense:
            value && value.trim() !== ""
              ? /^(FPHRA\d+|\d+FPHRA)$/.test(value)
                ? ""
                : "Format should be FPHRA12345 or 12345FPHRA"
              : "Medical License Number cannot be empty",
        }));
        break;
      case "labName":
        setErrors((prevErrors) => ({
          ...prevErrors,
          labName:
            value && value.trim() !== ""
              ? /^[A-Za-z ]{4,}$/.test(value)
                ? ""
                : "Lab name should be at least 4 characters long and contain only alphabets"
              : "Lab name cannot be empty",
        }));
        break;
      case "contactNumber":
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactNumber:
            value && value.trim() !== ""
              ? /^(?:(\+92)|(0))?\d{10}$/.test(value)
                ? ""
                : "Invalid contact number format"
              : "Contact Number cannot be empty",
        }));
        break;
      case "verificationNumber":
        setErrors((prevErrors) => ({
          ...prevErrors,
          verificationNumber: value
            ? /^[0-9]{6}$/.test(value)
              ? ""
              : "Verification number should be exactly 6 digits"
            : "Verification number cannot be empty",
        }));
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    console.log(formData);

    if (isSignup) {
      console.log(formData);
      inputFields.forEach(({ name }) => validateField(name, formData[name]));
      validateConfirmPassword(formData.confirmPassword);
    } else if (verify) {
      validateField("verificationNumber", formData.verificationNumber);
    } else {
      validateField("username", formData.username);
      validateField("password", formData.password);
    }
    if (Object.values(errors).some((error) => !!error)) {
      console.error("Form has errors. Please correct them.");
    } else {
      console.log("Form submitted successfully!", verify);
      if (!isSignup && !verify) {
        dispatch(login(formData, user));
      } else if (verify) {
        dispatch(
          verification(
            {
              username: username,
              verificationNumber: parseInt(formData.verificationNumber, 10),
            },
            user
          )
        );
      } else {
        dispatch(register(formData, user));
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword,
    }));
  };

  return (
    <>
      {(errorLogin || errorSignup) && (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>
            {errorLogin}
            {errorSignup}
          </strong>{" "}
          You should check in on some of those fields below.
        </div>
      )}
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
            boxShadow={"5px 5px 10px"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignup ? `${user} Sign up` : `${user} Sign in`}
            </Typography>
            <form onSubmit={handleSubmit}>
              {isSignup && (user === "doctor" || user === "patient") && (
                <TextField
                  margin="normal"
                  variant="outlined"
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
              )}
              {!verify && (
                <TextField
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  autoFocus
                />
              )}
              {isSignup && (user === "doctor" || user === "patient") && (
                <TextField
                  margin="normal"
                  variant="outlined"
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
                />
              )}
              {isSignup && (user === "doctor" || user === "patient") && (
                <TextField
                  margin="normal"
                  variant="outlined"
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
                />
              )}
              {verify && (
                <TextField
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="verificationNumber"
                  type="number"
                  label="Verification Number"
                  name="verificationNumber"
                  error={!!errors.verificationNumber}
                  helperText={errors.verificationNumber}
                  value={formData.verificationNumber}
                  onChange={handleInputChange}
                  autoFocus
                />
              )}
              {isSignup && (user === "doctor" || user === "patient") && (
                <DatePicker
                  className="custom-datepicker"
                  selected={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  isClearable
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd-MM-yyyy" // Set the desired format
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  type="date"
                  name="date"
                  required
                  maxDate={new Date()}
                />
              )}

              {isSignup && user === "doctor" && (
                <TextField
                  autoFocus
                  margin="normal"
                  variant="outlined"
                  name="medicalLicenseNumber"
                  value={formData.medicalLicenseNumber}
                  onChange={handleInputChange}
                  fullWidth
                  id="medicalLicenseNumber"
                  label="Medical License Number"
                  error={!!errors.medicalLicenseNumber}
                  helperText={errors.medicalLicenseNumber}
                />
              )}
              {isSignup && (
                <TextField
                  margin="normal"
                  variant="outlined"
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
                />
              )}
              {isSignup && (user === "medical_labs" || user === "pharmacy") && (
                <TextField
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="labName"
                  label="Lab Name"
                  type="text"
                  name="labName"
                  value={formData.labName}
                  onChange={handleInputChange}
                  error={!!errors.labName}
                  helperText={errors.labName}
                  autoFocus
                />
              )}
              {isSignup && (user === "medical_labs" || user === "pharmacy") && (
                <TextField
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="labLicense"
                  label="Lab License"
                  type="text"
                  name="labLicense"
                  value={formData.labLicense}
                  onChange={handleInputChange}
                  error={!!errors.labLicense}
                  helperText={errors.labLicense}
                />
              )}
              {isSignup && (user === "medical_labs" || user === "pharmacy") && (
                <TextField
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber}
                />
              )}
              {!verify && (
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={formData.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {formData.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {isSignup && (
                <TextField
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={formData.showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {formData.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {!isSignup && (
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={
                  !isSignup ? <LockOpenIcon /> : <ExitToAppOutlinedIcon />
                }
                sx={{ mt: 3, mb: 2 }}
              >
                {isSignup ? "Sign up" : "Sign in"}
              </Button>
              {!isSignup && !verify && (
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid>
                    <Button
                      item
                      onClick={() => {
                        setIsSignup(!isSignup);
                        navigate(`/${user}/signup`);
                      }}
                    >
                      {"Sign Up"}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
