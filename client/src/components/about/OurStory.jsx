import { motion } from "framer-motion";

import Container from "../common/Container";
import ImagePlaceholder from "../common/ImagePlaceholder";

const OurStory = () => {
  return (
    <section className="bg-[#F7F2EB] py-20 lg:py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ================= TEXT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm font-medium">
              Where It All Began
            </p>

            <h2 className="mt-5 font-[Cinzel] text-[#4A294B] text-3xl md:text-4xl leading-tight">
              A Small Idea, Held Close
            </h2>

            <div className="mt-6 w-14 h-[2px] bg-[#C7A05A]" />

            <p className="mt-6 text-[#6D6460] leading-8">
              Elil started at a kitchen table, not a boardroom — with
              a handful of sketches and a conviction that fine
              jewellery didn't need to feel distant or impersonal.
              We wanted pieces that felt like they'd always belonged
              to the person wearing them.
            </p>

            <p className="mt-5 text-[#6D6460] leading-8">
              Today, that same conviction shapes every piece we make.
              We work with small ateliers who share our obsession
              with detail, and we hold every design to one question:
              would we wear this ourselves, for years to come?
            </p>
          </motion.div>

          {/* ================= IMAGE ================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <ImagePlaceholder label="Photo: founder's workspace or early sketches" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default OurStory;