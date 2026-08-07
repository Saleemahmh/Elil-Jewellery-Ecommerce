import { motion } from "framer-motion";
import { PiStarFill, PiQuotesFill } from "react-icons/pi";

/**
 * Single review card for the Testimonials section.
 *
 * `initials` renders inside a gold-ringed medallion (same visual
 * language as the "925" hallmark badge in ServiceCard and the
 * Roman-numeral tabs on the campaign slider) — no stock avatar photo
 * needed.
 */
const TestimonialCard = ({
  quote,
  name,
  detail,
  rating = 5,
  initials,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="
        relative

        bg-white

        rounded-[24px]

        border border-[#E7DFD3]

        p-8

        shadow-[0_15px_40px_rgba(74,41,75,0.06)]
      "
    >
      {/* Watermark quote mark */}
      <PiQuotesFill className="absolute top-6 right-7 text-[#C7A05A]/15 w-10 h-10" />

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <PiStarFill
            key={i}
            className={i < rating ? "text-[#C7A05A]" : "text-[#E7DFD3]"}
            size={16}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="relative mt-5 text-[#4A3B47] leading-7 text-[15px]">
        “{quote}”
      </p>

      {/* Attribution */}
      <div className="mt-7 flex items-center gap-4">
        <div
          className="
            shrink-0
            w-11 h-11
            rounded-full
            border border-[#C7A05A]/50
            bg-[#F7F2EB]
            flex items-center justify-center
          "
        >
          <span className="font-[Cinzel] text-xs text-[#4A294B] tracking-wide">
            {initials}
          </span>
        </div>

        <div>
          <p className="font-[Cinzel] text-sm text-[#4A294B]">{name}</p>
          {detail && (
            <p className="text-xs text-[#8A8079] mt-0.5">{detail}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;