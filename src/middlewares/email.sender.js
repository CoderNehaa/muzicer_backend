import nodemailer from "nodemailer";

export const mailSender = async ({ emailAddress, username, password }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nagdaneha97@gmail.com",
      pass: "wgqr ryqb etdd fome",
    },
  });

  const mailOptions = {
    from: "nagdaneha97@gmail.com",
    to: emailAddress,
    subject: "Login to your musicer account with new password",
    text: `Hello ${username}, restore your account with this temporary password, and then choose password of your choice once you sign in. Your new Password is ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
