import { motion } from "framer-motion";
import {
  PiSparkleBold,
  PiShieldCheckBold,
  PiTagBold,
  PiPackageBold,
} from "react-icons/pi";

import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

const values = [
  {
    id: 1,
    icon: PiSparkleBold,
    title: "Trend-Right Designs",
    description: "New styles, dropped often — never stuck in last season.",
  },
  {
    id: 2,
    icon: PiShieldCheckBold,
    title: "Quality You Can Trust",
    description: "Every piece checked before it ships, no shortcuts.",
  },
  {
    id: 3,
    icon: PiTagBold,
    title: "Prices That Make Sense",
    description: "Good style shouldn't mean an empty wallet.",
  },
  {
    id: 4,
    icon: PiPackageBold,
    title: "Thoughtful Packaging",
    description: "Feels a little special, every time it arrives.",
  },
];

const OurValues = () => {
  return (
    <section className="bg-[#F7F2EB] py-20 lg:py-28">
      <Container>
        <SectionTitle
          subtitle="What We Stand For"
          title="Our Values"
          description="A few quiet commitments that shape everything we make, whether you can see them or not."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="
                  group
                  relative
                  bg-white
                  rounded-[24px]
                  border border-[#E7DFD3]
                  p-8
                  text-center
                  transition-colors
                  duration-300
                  hover:border-[#C7A05A]/60
                  shadow-[0_15px_40px_rgba(74,41,75,0.06)]
                "
              >
                <div
                  className="
                    absolute top-5 left-1/2 -translate-x-1/2
                    w-8 h-[2px]
                    bg-[#C7A05A]/40
                    transition-all duration-300
                    group-hover:w-12
                    group-hover:bg-[#C7A05A]
                  "
                />

                <div
                  className="
                    mx-auto mt-6 mb-6
                    w-16 h-16
                    rounded-full
                    border border-[#C7A05A]/50
                    flex items-center justify-center
                    text-[#4A294B]
                    transition-all duration-300
                    group-hover:border-[#C7A05A]
                    group-hover:bg-[#C7A05A]/10
                  "
                >
                  <Icon size={26} />
                </div>

                <h3 className="font-[Cinzel] text-[#4A294B] text-lg leading-snug">
                  {value.title}
                </h3>

                <p className="mt-3 text-[#8A8079] text-sm leading-6">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default OurValues;