import { motion } from "framer-motion";

const CollectionHero = ({ image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6 }}
      className="
        rounded-[34px]
        overflow-hidden
        border
        border-[#C7A05A]/60
        shadow-2xl
      "
    >
      <img
        src={image}
        alt=""
        className="
          w-full
          h-[620px]
          object-cover
        "
      />
    </motion.div>
  );
};

export default CollectionHero;