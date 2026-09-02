import { motion } from "framer-motion";

import Container from "../common/Container";
import ImagePlaceholder from "../common/ImagePlaceholder";
import ourStoryImage from "../../assets/images/about/our-story.jpg";

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
              Good Style Shouldn't Cost a Fortune
            </h2>

            <div className="mt-6 w-14 h-[2px] bg-[#C7A05A]" />

            <p className="mt-6 text-[#6D6460] leading-8">
              Elil started with a pretty simple frustration — the
              jewellery we actually wanted to wear every day was
              either overpriced or fell apart within a week. We
              wanted something in between.
            </p>

            <p className="mt-5 text-[#6D6460] leading-8">
              So that's what we build: trend-led pieces that
              photograph well, hold up to daily wear, and are priced
              so you can actually build a collection — not just pick
              one piece and call it done.
            </p>
          </motion.div>

          {/* ================= IMAGE ================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={ourStoryImage}
                alt="Elil"
                className="w-full h-full object-cover"
              />
            </div>
            *
            <ImagePlaceholder label="Photo: founder's workspace or early sketches" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default OurStory;