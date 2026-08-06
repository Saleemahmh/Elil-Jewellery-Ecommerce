import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PricePill = ({ item }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <Link
        to={item.link}
        className="
        group
        block
        rounded-full
        border
        border-[#C7A05A]
        bg-[#4A294B]
        px-6
        w-60
        py-5
        text-center
        shadow-lg
        transition-all
        duration-300
        hover:bg-[#5B325A]
        hover:shadow-[0_12px_35px_rgba(199,160,90,.28)]
      "
      >
        <span
          className="
          font-[Cinzel]
          text-xl
          text-[#E6C37A]
          tracking-wide
        "
        >
          {item.title}
        </span>
      </Link>
    </motion.div>
  );
};

export default PricePill;