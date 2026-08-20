import express from "express";

import {
  subscribe,
  unsubscribe,
  broadcastNewsletter,
} from "../controller/subscriber.controller.js";

import {
  subscribeValidation,
  broadcastValidation,
} from "../validations/subscriber.validation.js";

import validateRequest from "../middleware/validateRequest.middleware.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/subscribe", subscribeValidation, validateRequest, subscribe);

router.get("/unsubscribe/:token", unsubscribe);

router.post(
  "/broadcast",
  protect,
  authorize("admin"),
  broadcastValidation,
  validateRequest,
  broadcastNewsletter,
);

export default router;
