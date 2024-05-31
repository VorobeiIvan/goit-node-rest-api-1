import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = (email, token) => {
  const msg = {
    to: email,
    from: "your-email@example.com",
    subject: "Email Verification",
    text: `Please verify your email by clicking the link: ${process.env.BASE_URL}/users/verify/${token}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export { sendVerificationEmail };
