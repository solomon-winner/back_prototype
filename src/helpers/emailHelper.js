import nodemailer from "nodemailer";

export const EmailHelper = () => {
  const sendEmail = async (email, subject, message) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject,
        text: message,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    sendEmail,
  };
};
