import { motion } from "framer-motion";

import Container from "../common/Container";
import Button from "../common/Button";

const AboutCTA = () => {
  return (
    <section className="bg-[#F7F2EB] py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="font-[Cinzel] text-[#4A294B] text-2xl md:text-3xl leading-tight">
            Find the Piece That's Waiting for You
          </h2>

          <p className="mt-4 text-[#6D6460] leading-7">
            Pretty, wearable, easy on the wallet — starting at ₹400.
            Come find your next favorite piece.
          </p>

          <div className="mt-8">
            <Button to="/shop" variant="gold">
              Shop the Collection
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutCTA;