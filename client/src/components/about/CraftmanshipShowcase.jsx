import { motion } from "framer-motion";

import Container from "../common/Container";
import ImagePlaceholder from "../common/ImagePlaceholder";
import SectionDivider from "../common/SectionDivider";

const steps = [
  {
    id: 1,
    title: "Selecting Materials",
    caption: "Photo: raw gold/silver, gemstones being sorted",
  },
  {
    id: 2,
    title: "Hand-Setting Stones",
    caption: "Photo: artisan's hands setting a stone, close-up",
  },
  {
    id: 3,
    title: "The Final Polish",
    caption: "Photo: finished piece being polished/inspected",
  },
];

const CraftsmanshipShowcase = () => {
  return (
    <section className="relative bg-[#341A36] py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <p className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm font-medium">
            The Craft
          </p>

          <h2 className="mt-5 font-[Cinzel] text-[#F7F2EB] text-3xl md:text-4xl leading-tight">
            Made By Hand, Not By Machine
          </h2>

          <div className="mt-6 w-14 h-[2px] bg-[#C7A05A] mx-auto" />

          <p className="mt-6 text-[#DDD1D7] leading-8">
            Every piece passes through the same hands from raw
            material to finished form — nothing about that process
            is rushed.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ImagePlaceholder
                label={step.caption}
                aspect="aspect-square"
              />

              <p className="mt-4 text-center font-[Cinzel] text-[#F7F2EB] text-sm tracking-wide">
                {String(index + 1).padStart(2, "0")} — {step.title}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>

      <SectionDivider />
    </section>
  );
};

export default CraftsmanshipShowcase;