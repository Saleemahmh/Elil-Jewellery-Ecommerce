import { motion, AnimatePresence } from "framer-motion";

const SetHero = ({ item }) => {
  return (
    <div className="w-full flex justify-center">
  <div className="w-full lg:w-[82%] xl:w-[78%] overflow-hidden rounded-[32px] border border-[#C7A05A]/40">
      <AnimatePresence mode="wait">
        <motion.img
          key={item.id}
          src={item.image}
          alt={item.name}
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full h-[360px] md:h-[430px] lg:h-[500px] object-cover"
        />
      </AnimatePresence>
    </div>
    </div>
  );
};

export default SetHero;
