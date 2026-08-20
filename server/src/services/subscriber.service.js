import crypto from "crypto";

import Subscriber from "../models/subscriber.js";
import { sendEmail, sendBulkEmail } from "../utils/sendEmail.js";

// =====================================
// SUBSCRIBE
// =====================================

export const subscribe = async (email) => {
  const existing = await Subscriber.findOne({ email });

  if (existing) {
    if (existing.status === "subscribed") {
      throw new Error("This email is already subscribed.");
    }

    // Previously unsubscribed — re-activate rather than erroring
    existing.status = "subscribed";
    await existing.save();
    await sendWelcomeEmail(existing);
    return existing;
  }

  const subscriber = await Subscriber.create({
    email,
    unsubscribeToken: crypto.randomBytes(20).toString("hex"),
  });

  await sendWelcomeEmail(subscriber);

  return subscriber;
};

const sendWelcomeEmail = async (subscriber) => {
  const unsubscribeUrl = `${process.env.CLIENT_URL}/unsubscribe/${subscriber.unsubscribeToken}`;

  await sendEmail({
    to: subscriber.email,
    subject: "Welcome to the Elil Circle",
    html: `
      <div style="font-family: Georgia, serif; max-width:480px; margin:0 auto; padding:32px; background:#F7F2EB;">
        <p style="letter-spacing:3px; text-transform:uppercase; font-size:11px; color:#C7A05A; margin:0 0 16px;">
          The Elil Circle
        </p>
        <h1 style="color:#4A294B; font-size:24px; margin:0 0 16px;">You're in.</h1>
        <p style="color:#4A3B47; line-height:1.7; font-size:14px; margin:0 0 20px;">
          Thanks for joining the Elil Circle — you'll be first to know
          about new collections, private sales, and styling stories.
          Here's 10% off your first piece:
        </p>
        <p style="font-size:20px; letter-spacing:2px; color:#4A294B; font-weight:bold; margin:0 0 32px;">
          WELCOME10
        </p>
        <p style="color:#8A8079; font-size:12px; margin:0;">
          <a href="${unsubscribeUrl}" style="color:#8A8079;">Unsubscribe</a>
        </p>
      </div>
    `,
  });
};

// =====================================
// UNSUBSCRIBE
// =====================================

export const unsubscribe = async (token) => {
  const subscriber = await Subscriber.findOne({ unsubscribeToken: token });

  if (!subscriber) {
    throw new Error("Invalid or expired unsubscribe link.");
  }

  subscriber.status = "unsubscribed";
  await subscriber.save();

  return subscriber;
};

// =====================================
// GET ACTIVE SUBSCRIBERS
// =====================================

export const getAllSubscribers = async () => {
  return Subscriber.find({ status: "subscribed" });
};

// =====================================
// BROADCAST — admin sends a newsletter to everyone
// =====================================

export const broadcastNewsletter = async ({ subject, message }) => {
  const subscribers = await getAllSubscribers();

  if (subscribers.length === 0) {
    throw new Error("No active subscribers to send to.");
  }

  const recipients = subscribers.map((s) => s.email);

  await sendBulkEmail({
    recipients,
    subject,
    html: `
      <div style="font-family: Georgia, serif; max-width:480px; margin:0 auto; padding:32px; background:#F7F2EB;">
        <p style="letter-spacing:3px; text-transform:uppercase; font-size:11px; color:#C7A05A; margin:0 0 16px;">
          Elil Jewellery
        </p>
        <div style="color:#4A3B47; line-height:1.7; font-size:14px;">
          ${message}
        </div>
      </div>
    `,
  });

  return { sentTo: recipients.length };
};
