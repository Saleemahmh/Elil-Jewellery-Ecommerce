import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import newsletterImage from "../../../assets/images/images/ring_2.jpg";

/**
 * Full-bleed background photo with a plum gradient overlay, matching
 * the Hero's treatment.
 *
 * handleSubmit is a placeholder — wire it to whichever email service
 * you're using (Mailchimp, Klaviyo, a custom API route, etc.).
 */
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    // TODO: replace with your actual newsletter API call
    // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });

    setStatus("success");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      {/* Background photo */}
      <img
        src={newsletterImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Plum gradient overlay on top of the photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E1830]/90 via-[#4A294B]/85 to-[#2E1830]/95" />

      {/* Soft gold glow, echoes Hero's decorative glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#C7A05A]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm font-medium"
        >
          The Elil Circle
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-[Cinzel] text-white text-2xl md:text-3xl leading-tight"
        >
          Join & Get 10% Off
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 w-10 h-[2px] bg-[#C7A05A] mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-3 text-white/70 text-sm leading-6"
        >
          Be first to know about new collections, private sales, and
          styling stories — plus 10% off your first piece.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row items-stretch gap-2.5 max-w-sm mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="
              flex-1
              bg-white/10
              backdrop-blur-md
              border border-white/25
              rounded-full
              px-5 py-2.5
              text-white
              placeholder-white/50
              text-xs
              outline-none
              transition-colors
              duration-300
              focus:border-[#C7A05A]
            "
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="
              inline-flex items-center justify-center gap-2
              bg-[#C7A05A]
              text-white
              text-xs font-medium
              px-5 py-2.5
              rounded-full
              transition-all duration-300
              hover:brightness-110
              hover:-translate-y-0.5
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >
            {status === "submitting" ? "Joining..." : "Subscribe"}
            {status !== "submitting" && <FiArrowRight />}
          </button>
        </motion.form>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-[#E6C37A] text-xs"
          >
            You're in — check your inbox for your code.
          </motion.p>
        )}

        <p className="mt-3 text-white/40 text-[11px]">
          No spam, just the occasional something special. Unsubscribe
          anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;