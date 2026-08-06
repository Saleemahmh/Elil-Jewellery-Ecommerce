import { motion } from "framer-motion";

/**
 * Single trust-badge card for the "Why Choose Elil" / Services section.
 *
 * Pass either `hallmark` (a short text badge, e.g. "925") OR `icon`
 * (a react-icons component) — not both. `hallmark` renders inside the
 * same circular medallion style used for the icons, echoing the
 * Roman-numeral tabs on the campaign slider.
 */
const ServiceCard = ({ hallmark, icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="
        group
        relative

        bg-white

        rounded-[18px] sm:rounded-[24px]

        border border-[#E7DFD3]

        p-5 sm:p-8

        text-center

        transition-colors
        duration-300

        hover:border-[#C7A05A]/60

        shadow-[0_15px_40px_rgba(74,41,75,0.06)]
      "
    >
      {/* Gold corner flourish */}
      <div
        className="
          absolute top-3 sm:top-5 left-1/2 -translate-x-1/2
          w-6 sm:w-8 h-[2px]
          bg-[#C7A05A]/40
          transition-all duration-300
          group-hover:w-12
          group-hover:bg-[#C7A05A]
        "
      />

      {/* Icon / hallmark badge */}
      <div
        className="
          mx-auto mt-4 mb-4 sm:mt-6 sm:mb-6
          w-12 h-12 sm:w-16 sm:h-16
          rounded-full
          border border-[#C7A05A]/50
          flex items-center justify-center

          text-[#4A294B]

          transition-all duration-300
          group-hover:border-[#C7A05A]
          group-hover:bg-[#C7A05A]/10
        "
      >
        {hallmark ? (
          <span className="font-[Cinzel] text-xs sm:text-sm tracking-wide">
            {hallmark}
          </span>
        ) : (
          Icon && <Icon size={20} className="sm:hidden" />
        )}
        {!hallmark && Icon && <Icon size={26} className="hidden sm:block" />}
      </div>

      <h3 className="font-[Cinzel] text-[#4A294B] text-base sm:text-lg leading-snug">
        {title}
      </h3>

      <p className="mt-2 sm:mt-3 text-[#8A8079] text-xs sm:text-sm leading-6">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;