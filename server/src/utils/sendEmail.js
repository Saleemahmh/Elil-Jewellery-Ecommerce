import nodemailer from "nodemailer";

/**
 * utils/sendEmail.js
 *
 * Uses SMTP via Nodemailer. Add these to your .env:
 *
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=587
 *   SMTP_USER=youraddress@gmail.com
 *   SMTP_PASS=your-16-character-app-password   (NOT your regular Gmail password)
 *
 * Gmail App Passwords require 2FA enabled on the account first:
 * Google Account → Security → 2-Step Verification → App passwords.
 *
 * Any other SMTP provider (SendGrid, Mailgun, your own domain's mail
 * server, etc.) works the same way — just swap the host/port/creds.
 */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Elil Jewellery" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};

/**
 * Sends one email to many recipients without exposing everyone's
 * address to each other (BCC), in small batches so a single send
 * doesn't hit most providers' per-message recipient limits.
 */
export const sendBulkEmail = async ({ recipients, subject, html }) => {
  const BATCH_SIZE = 40;
  const batches = [];

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    batches.push(recipients.slice(i, i + BATCH_SIZE));
  }

  for (const batch of batches) {
    await transporter.sendMail({
      from: `"Elil Jewellery" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // "To" field needs someone — real recipients go in BCC
      bcc: batch,
      subject,
      html,
    });
  }
};
