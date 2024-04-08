// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // or any other port you prefer

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other SMTP service
  auth: {
    user: "souvikhalder68@gmail.com",
    pass: "Halder@453441",
  },
});

// API endpoint for sending emails
app.post("/send-email", (req, res) => {
  const mailOptions = {
    from: "souvikhalder68@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
