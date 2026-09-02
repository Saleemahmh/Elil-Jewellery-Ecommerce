import { motion } from "framer-motion";
import { PiQuotesFill } from "react-icons/pi";

import Container from "../common/Container";
import SectionDivider from "../common/SectionDivider";

const FounderQuote = () => {
  return (
    <section className="relative bg-[#4A294B] py-20 lg:py-24 overflow-hidden">
      <PiQuotesFill className="absolute top-10 left-1/2 -translate-x-1/2 text-white/[0.05] w-24 h-24" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-2xl mx-auto text-center"
        >
          <p className="font-[Cinzel] text-white text-2xl md:text-3xl leading-relaxed">
            "Great style shouldn't be saved for special occasions.
            We make it for the everyday — because you deserve to
            feel good in what you wear, any day of the week."
          </p>

          <div className="mt-6 w-14 h-[2px] bg-[#C7A05A] mx-auto" />

          <p className="mt-6 text-[#C7A05A] text-sm uppercase tracking-[0.25em]">
            Team Elil
          </p>
        </motion.div>
      </Container>

      <SectionDivider />
    </section>
  );
};

export default FounderQuote;