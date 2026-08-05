import { motion } from "framer-motion";

const SetThumbnail = ({ item, active, onHover }) => {
  return (
    <motion.button
      whileHover={{ y: -5 }}
      onMouseEnter={() => onHover(item)}
      className="group text-center"
    >
      <div
        className={`
          overflow-hidden
          rounded-2xl
          border
          transition-all
          duration-300

          ${
            active
              ? "border-[#C7A05A]"
              : "border-[#C7A05A]/30"
          }
        `}
      >
        <img
          src={item.image}
          alt={item.name}
          className="
            h-24
            w-24
            object-cover
            transition
            duration-500
            group-hover:scale-110
          "
        />
      </div>

      <p className="mt-3 text-sm text-[#F7F2EB] tracking-wide">
        {item.name}
      </p>
    </motion.button>
  );
};

export default SetThumbnail;