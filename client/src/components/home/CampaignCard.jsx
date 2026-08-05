import { motion } from "framer-motion";
import Button from "../common/Button";

const CampaignCard = ({ campaign }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="
        absolute
        bottom-6
        left-6

        md:bottom-10
        md:left-10

        lg:bottom-12
        lg:left-12

        w-[88%]
        sm:w-[340px]
        lg:w-[380px]

        rounded-[28px]

        bg-white/10
        backdrop-blur-md

        border border-white/20

        shadow-[0_25px_60px_rgba(0,0,0,0.28)]

        p-6
        md:p-8

        z-20
      "
    >
      {/* Gold Label */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-10 h-[1px] bg-[#C7A05A]" />

        <p className="uppercase tracking-[0.35em] text-[11px] text-[#E6C37A]">
          ELIL COLLECTION
        </p>

      </div>

      {/* Title */}

      <h2 className="font-[Cinzel] text-white text-3xl md:text-4xl leading-tight">
        {campaign.title}
      </h2>

      {/* Subtitle */}

      <p className="mt-5 text-white/80 leading-7 text-[15px]">
        {campaign.subtitle}
      </p>

      {/* Button */}

      <div className="mt-8">

        <Button
          variant="gold"
          className="rounded-full"
        >
          {campaign.button}
        </Button>

      </div>

    </motion.div>
  );
};

export default CampaignCard;