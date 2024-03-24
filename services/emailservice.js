const nodemailer = require("nodemailer");

// Replace these values with your email provider's SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdulmoqeetahsan@gmail.com",
    pass: "wtpc aypb ecnt piup",
  },
});

const sendVerificationEmail = (email, verificationCode) => {
  const htmlBody = `
    <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
      <h2 style="color: #333;">Verification Code for Your App</h2>
      <p style="font-size: 18px; color: #555;">Your verification code is: <strong>${verificationCode}</strong></p>
    </div>
  `;

  const mailOptions = {
    from: "abdulmoqeetahsan@gmail.com",
    to: email,
    subject: "Verification Code for Your App",
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendNotificationEmailtodoc = (email) => {
  const htmlBody = `
    <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
      <h2 style="color: #333;">Upcoming Appointment Request</h2>
      <p style="font-size: 18px; color: #555;">You have an upcoming appointment request. Please check your schedule.</p>
    </div>
  `;

  const mailOptions = {
    from: "abdulmoqeetahsan@gmail.com",
    to: email,
    subject: "Upcoming Appointment Request",
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendNotificationEmailtopatient = (email) => {
  const htmlBody = `
    <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
      <h2 style="color: #333;">Appointment Status</h2>
      <p style="font-size: 18px; color: #555;">Your have an appointment status had been updated. Please check your schedule.</p>
    </div>
  `;

  const mailOptions = {
    from: "abdulmoqeetahsan@gmail.com",
    to: email,
    subject: "Upcoming Appointment Request",
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = {
  sendVerificationEmail,
  sendNotificationEmailtodoc,
  sendNotificationEmailtopatient,
};
