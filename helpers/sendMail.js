const nodemailer = require("nodemailer");

// Create a transporter object using Gmail SMTP
module.exports.sendMail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // hoặc 587 nếu bạn dùng TLS
    secure: true, // Sử dụng true cho cổng 465 và false cho cổng 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Error:", error.message);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
};
