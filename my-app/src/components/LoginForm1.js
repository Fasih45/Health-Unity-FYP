import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const LoginForm1 = () => {
  const [numericValue, setNumericValue] = useState('');

  const handleNumericInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    inputValue = inputValue.slice(0, 13);
    inputValue = inputValue.replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3'); // Apply the format: 33401-0440920-5
    setNumericValue(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform additional actions on form submission
    console.log('Submitted value:', numericValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Numeric Input</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Numeric Input"
          id="numericInput"
          value={numericValue}
          onInput={handleNumericInputChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm1;



