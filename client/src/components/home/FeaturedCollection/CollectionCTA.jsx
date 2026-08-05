import { motion } from "framer-motion";
import Button from "../../common/Button";

const CollectionCTA = ({ collection }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
      }}
    >
      <p className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm">

        Featured Collection

      </p>

      <h2
        className="
          mt-5

          font-[Cinzel]

          text-white

          text-5xl

          leading-tight
        "
      >
        {collection.title}
      </h2>

      <div className="mt-6 w-16 h-[2px] bg-[#C7A05A]" />

      <p className="mt-8 text-white/70 leading-8">

        {collection.subtitle}

      </p>

      <div className="mt-10">

        <Button variant="gold">

          {collection.button}

        </Button>

      </div>

    </motion.div>
  );
};

export default CollectionCTA;