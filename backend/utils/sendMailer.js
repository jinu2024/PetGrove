const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  // Create a nodemailer transporter with authentication credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE, // Set to true if using TLS
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  }); 

  // Define the email options
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
