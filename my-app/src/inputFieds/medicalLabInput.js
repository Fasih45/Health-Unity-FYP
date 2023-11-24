const inputFields = [
  {
    label: "Username",
    name: "username",
    type: "text",
    required: true,
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
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    required: true,
    showOnSignup: true,
  },
  {
    label: "Lab Name",
    name: "labName",
    type: "text",
    required: true,
    showOnSignup: true,
  },
  {
    label: "Lab License",
    name: "labLicense",
    type: "text",
    required: true,
    showOnSignup: true,
  },
  {
    label: "Contact Number",
    name: "contactNumber",
    type: "tel", // Assuming it's a phone number
    required: true,
    showOnSignup: true,
  },
];

export default inputFields;
