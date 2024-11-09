const nodemailer = require("nodemailer");

// Tạo transporter với Gmail SMTP
module.exports.sendMail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // hoặc 587 nếu bạn dùng TLS
    secure: true, // Sử dụng true cho cổng 465 và false cho cổng 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Kiểm tra cấu hình kết nối
  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ Verification Error:", error.message);
        reject(error);
      } else {
        console.log("✅ Server is ready to take messages");
        resolve(success);
      }
    });
  });

  // Tùy chọn email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };

  // Gửi email
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Sending Error:", error.message);
        reject(error);
      } else {
        console.log("✅ Email sent:", info.response);
        resolve(info);
      }
    });
  });
};
