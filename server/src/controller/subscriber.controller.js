import {
  subscribe as subscribeService,
  unsubscribe as unsubscribeService,
  broadcastNewsletter as broadcastNewsletterService,
} from "../services/subscriber.service.js";

export const subscribe = async (req, res) => {
  try {
    await subscribeService(req.body.email);

    return res.status(201).json({
      success: true,
      message: "Thanks for subscribing! Check your inbox for a welcome email.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    await unsubscribeService(req.params.token);

    return res.status(200).json({
      success: true,
      message: "You've been unsubscribed.",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin-only — see subscriber.routes.js for the protect/authorize
// middleware guarding this.
export const broadcastNewsletter = async (req, res) => {
  try {
    const result = await broadcastNewsletterService(req.body);

    return res.status(200).json({
      success: true,
      message: `Newsletter sent to ${result.sentTo} subscriber${result.sentTo === 1 ? "" : "s"}.`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
