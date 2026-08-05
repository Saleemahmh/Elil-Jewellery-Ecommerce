import { useState } from "react";
import { motion } from "framer-motion";

import Button from "../../common/Button";

import { emeraldSet } from "../../../data/sets.js";

import SetHero from "./SetHero";
import SetThumbnail from "./SetThumbnail";

const SetCollection = () => {

  const [activeItem, setActiveItem] = useState(
    emeraldSet.items[0]
  );

  return (

    <section className="bg-[#341A36] py-8 lg:py-10">

      <div className="max-w-6xl mx-auto px-12 lg:px-6">

        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.8 }}
          className="text-center mb-10"
        >

          <p className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm">
            Set Collection
          </p>

          <h2 className="mt-5 text-[#F7F2EB] font-[Cinzel] text-4xl">

            {emeraldSet.title}

          </h2>

          <p className="text-[#DDD6CF] mt-6">

            {emeraldSet.subtitle}

          </p>

          <div className="mt-6">

            <Button variant="gold">

              Explore Set

            </Button>

          </div>

        </motion.div>

        <SetHero item={activeItem} />

        <div className="mt-8 flex justify-center gap-8 flex-wrap">

          {emeraldSet.items.map(item => (

            <SetThumbnail
              key={item.id}
              item={item}
              active={activeItem.id===item.id}
              onHover={setActiveItem}
            />

          ))}

        </div>

      </div>

    </section>

  );
};

export default SetCollection;