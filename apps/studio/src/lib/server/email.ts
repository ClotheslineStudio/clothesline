import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '$env/static/private';

const port = Number(SMTP_PORT);
const secure = port === 465;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendContactEmail({ name, email, message, ip, timestamp }: {
  name: string;
  email: string;
  message: string;
  ip: string;
  timestamp: string;
}) {
  return transporter.sendMail({
    from: SMTP_USER,
    to: 'info@clotheslinestudio.com',
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nIP: ${ip}\nTimestamp: ${timestamp}`,
  });
}
