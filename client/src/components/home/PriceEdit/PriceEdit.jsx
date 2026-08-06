import { motion } from "framer-motion";

import { priceEdit } from "../../../data/priceEdit";
import PricePill from "./PricePill";

const PriceEdit = () => {
  return (
    <section className="bg-[#F7F2EB] py-10 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Card */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          relative
          rounded-[42px]
          border
          border-[#C7A05A]
          bg-gradient-to-r
          from-[#F4E8DB]
          via-[#F7EFE7]
          to-[#F5E5DA]
          pt-5
          pb-8 md:pb-10
          px-6 md:px-8
          shadow-[0_15px_60px_rgba(74,41,75,.06)]
          "
        >

          <p
            className="
            uppercase
            tracking-[0.35em]
            text-[#C7A05A]
            text-xs
            text-center
            "
          >
            Price Edit
          </p>

          <h2
            className="
            mt-5
            font-[Cinzel]
            text-[#4A294B]
            text-2xl
            lg:text-3xl
            text-center
            "
          >
            Luxury Within Reach
          </h2>

          <div
            className="
            w-16
            h-[2px]
            bg-[#C7A05A]
            mx-auto
            mt-6
            "
          />

          <p
            className="
            mt-2
            text-[#6D6460]
            max-w-2xl
            mx-auto
            leading-8
            text-center
            "
          >
            Handpicked jewellery grouped by budget so discovering your
            perfect piece feels effortless.
          </p>

          {/* Pills */}

          <div
            className="
  mt-10

  flex
  flex-col
  items-center
  gap-4

  md:absolute
  md:left-1/2
  md:-bottom-10
  md:-translate-x-1/2

  md:grid
  md:grid-cols-3
  md:gap-8

  md:w-full
  md:max-w-4xl
  md:px-8
  "
          >
            {priceEdit.map((item) => (
              <PricePill
                key={item.id}
                item={item}
              />
            ))}
          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default PriceEdit;