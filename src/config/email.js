import { createTransport } from "nodemailer";

const smtpTransport = createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default smtpTransport;
