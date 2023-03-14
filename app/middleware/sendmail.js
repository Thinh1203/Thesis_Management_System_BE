const nodemailer = require('nodemailer');

const sendMail = async (destination, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_API_APP_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, 
      to: destination, 
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendMail };
