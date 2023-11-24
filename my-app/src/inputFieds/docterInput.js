
const inputFields = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    required: true,
    autoFocus: true,
  },
  {
    label: "Username",
    name: "username",
    type: "text",
    required: true,
  },
  {
    label: "Nationality",
    name: "nationality",
    type: "text",
    required: true,
    showOnSignup: true,
  },
  {
    label: "CNIC",
    name: "cnic",
    type: "number",
    required: true,
    showOnSignup: true,
  },
  {
    label: "Date of Birth",
    name: "dateOfBirth",
    type: "date",
    required: true,
    showOnSignup: true,
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    required: true,
    showOnSignup: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
    showOnSignup: true,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
    showOnSignup: true,
  },
  {
    label: "Medical License Number",
    name: "medicalLicenseNumber",
    type: "text",
    required: true,
    showOnSignup: true,
  },
];

export default inputFields;
