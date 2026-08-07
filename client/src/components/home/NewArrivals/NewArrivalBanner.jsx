import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

/**
 * Promo strip for the New Arrivals section — ribbon tag + offer copy +
 * CTA on the left, a lifestyle photo bleeding off the right edge.
 *
 * Swap `bannerImage` for a real photo of the jewellery being worn
 * (a hand/wrist/ear shot works best, matching the Hero carousel style).
 */
const NewArrivalBanner = ({
  offer = "Upto 15% Off",
  ctaLabel = "Explore",
  ctaLink = "/shop",
  bannerImage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border border-[#C7A05A]/30
        bg-gradient-to-r from-[#3A1F3C] via-[#4A294B] to-[#3A1F3C]
        mb-8
      "
    >
      <div className="relative z-10 flex items-center justify-between gap-6 px-6 sm:px-10 py-5 sm:py-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Ribbon tag */}
          <span
            className="
              shrink-0
              font-[Cinzel]
              uppercase
              tracking-[0.1em]
              text-xs sm:text-sm
              text-[#2E1830]
              bg-[#C7A05A]
              px-4 py-1.5 sm:py-2
              rounded-full
            "
          >
            New Launch
          </span>

          <p className="text-white text-base sm:text-xl font-light">
            {offer.split(/(\d+%)/).map((part, i) =>
              /\d+%/.test(part) ? (
                <span key={i} className="font-[Cinzel] text-[#E6C37A]">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        </div>

        <Link
          to={ctaLink}
          className="
            shrink-0
            inline-flex items-center gap-2
            bg-[#C7A05A]
            text-white
            text-sm sm:text-base
            font-medium
            px-5 sm:px-6 py-2 sm:py-2.5
            rounded-full
            transition-all duration-300
            hover:brightness-110
            hover:-translate-y-0.5
          "
        >
          {ctaLabel}
          <FiArrowRight />
        </Link>
      </div>

      {/* Lifestyle photo, bleeding off the right edge, faded into the
          banner rather than hard-cropped */}
      {bannerImage && (
        <div className="hidden lg:block absolute top-0 right-0 h-full w-[320px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A294B] via-[#4A294B]/60 to-transparent z-10" />
          <img
            src={bannerImage}
            alt="Jewellery worn"
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};

export default NewArrivalBanner;