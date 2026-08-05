import { motion } from "framer-motion";

const CollectionPreviewCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      className="
        bg-white/5
        backdrop-blur-md

        border
        border-[#C7A05A]/30

        rounded-3xl

        overflow-hidden
      "
    >
      <img
        src={product.image}
        alt={product.name}
        className="
          w-full
          h-32
          object-cover
        "
      />

      

      <div className="p-3">

        <h3 className="font-[Cinzel] text-white text-xl">

          {product.name}

        </h3>

        <p className="mt-2 text-[#E6C37A]">

          {product.price}

        </p>

      </div>

    </motion.div>
  );
};

export default CollectionPreviewCard;