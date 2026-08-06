import { motion } from "framer-motion";
import { PiDiamondBold } from "react-icons/pi";

import { priceEdit } from "../../../data/priceEdit";
import PricePill from "./PricePill";

const PriceEdit = () => {
  return (
    <section className="relative bg-[#4A294B] py-20 lg:py-28 overflow-hidden">
      {/* Soft gold glow behind the heading, for depth against the flat plum */}
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

      {/* Faint oversized diamond watermark, echoes the jewellery motif
          without competing with the text */}
      <PiDiamondBold
        className="
          pointer-events-none
          absolute -right-10 -top-10
          text-white/[0.04]
          w-64 h-64
          rotate-12
        "
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="uppercase tracking-[0.35em] text-[#C7A05A] text-xs sm:text-sm font-medium">
            Price Edit
          </p>

          <h2 className="mt-5 font-[Cinzel] text-white text-3xl md:text-4xl leading-tight">
            Luxury Within Reach
          </h2>

          <div className="mt-6 w-14 h-[2px] bg-[#C7A05A] mx-auto" />

          <p className="mt-6 text-white/70 leading-8">
            Handpicked jewellery grouped by budget, so discovering your
            perfect piece feels effortless.
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="
            mt-12
            flex flex-col items-center gap-4

            sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6
          "
        >
          {priceEdit.map((item) => (
            <PricePill key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PriceEdit;