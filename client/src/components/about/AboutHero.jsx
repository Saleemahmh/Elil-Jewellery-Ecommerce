import { motion } from "framer-motion";
import { PiDiamondBold } from "react-icons/pi";

import SectionDivider from "../common/SectionDivider";

const AboutHero = () => {
  return (
    <section className="relative bg-[#4A294B] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Soft gold glow, same motif as ShopBanner */}
        <div
          className="
            pointer-events-none
            absolute top-0 left-1/2 -translate-x-1/2
            w-[600px] h-[600px]
            rounded-full
            bg-[#C7A05A]/10
            blur-[120px]
          "
        />

        <PiDiamondBold
          className="
            pointer-events-none
            absolute -right-10 -top-10
            text-white/[0.04]
            w-64 h-64
            rotate-12
          "
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative text-center max-w-2xl mx-auto"
        >
          <p className="uppercase tracking-[0.35em] text-xs text-[#C7A05A]">
            Our Story
          </p>

          <h1 className="mt-5 font-[Cinzel] text-white text-4xl lg:text-5xl leading-tight">
            Crafted with Purpose,
            <br />
            Worn with Pride
          </h1>

          <div className="w-16 h-[2px] bg-[#C7A05A] mx-auto mt-6" />

          <p className="mt-6 text-white/70 leading-8">
            Elil began with a simple belief — that jewellery should
            feel as personal as the moments it's made for. Every
            piece we craft carries that belief forward.
          </p>
        </motion.div>
      </div>

      <SectionDivider />
    </section>
  );
};

export default AboutHero;