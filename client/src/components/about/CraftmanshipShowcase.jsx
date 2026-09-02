import { motion } from "framer-motion";

import Container from "../common/Container";
import ImagePlaceholder from "../common/ImagePlaceholder";
import SectionDivider from "../common/SectionDivider";

// Once you have photos for each step, drop them in
// src/assets/images/about/ and import + attach like this:
//
import step1 from "../../assets/images/about/craft-step-1.jpg";
import step2 from "../../assets/images/about/craft-step-2.jpg";
import step3 from "../../assets/images/about/craft-step-3.jpg";
//
// then add `image: step1` (etc.) to each object below.

const steps = [
  {
    id: 1,
    title: "Designed In-House",
    caption: "Photo: mood board, sketches, or design process",
    image: step1, 
  },
  {
    id: 2,
    title: "Checked, Piece by Piece",
    caption: "Photo: quality check station or close-up inspection",
    image: step2, 
  },
  {
    id: 3,
    title: "Packed With Care",
    caption: "Photo: finished pieces being packaged",
    image: step3, 
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
            How It Comes Together
          </p>

          <h2 className="mt-5 font-[Cinzel] text-[#F7F2EB] text-3xl md:text-4xl leading-tight">
            From Idea to Your Doorstep
          </h2>

          <div className="mt-6 w-14 h-[2px] bg-[#C7A05A] mx-auto" />

          <p className="mt-6 text-[#DDD1D7] leading-8">
            Every piece goes through the same process before it
            reaches you — designed with intention, checked properly,
            and packed like it matters. Because it does.
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
              {step.image ? (
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <ImagePlaceholder
                  label={step.caption}
                  aspect="aspect-square"
                />
              )}

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