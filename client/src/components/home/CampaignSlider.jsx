import { useState } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { campaigns } from "../../data/campaigns";

import Button from "../common/Button";
import CampaignCard from "./CampaignCard";
import CampaignTabs from "./CampaignTabs";

/**
 * Wraps the campaign image with a graceful fallback.
 *
 * If `campaign.image` fails to resolve (wrong path, missing file,
 * broken import in data/campaigns.js) this renders a soft brand-toned
 * gradient with the campaign title instead of a dead gray box —
 * so a broken path never breaks the layout while you're debugging it.
 */
const CampaignImage = ({ campaign }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="
          w-full h-[520px] lg:h-[640px]
          flex items-center justify-center
          bg-gradient-to-br from-[#4A294B] via-[#6D4B63] to-[#C7A05A]
        "
      >
        <p className="font-[Cinzel] text-white/70 text-xl tracking-wide px-8 text-center">
          {campaign.title}
        </p>
      </div>
    );
  }

  return (
    <motion.img
      key={campaign.id}
      src={campaign.image}
      alt={campaign.title}
      onError={() => setFailed(true)}
      
      className="w-full h-[520px] lg:h-[640px] object-cover breathe"
    />
  );
};

const CampaignSlider = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // TEMP DEBUG — if you see this instead of the slider, `campaigns` is
  // empty, undefined, or not exported correctly from data/campaigns.js.
  if (!campaigns || campaigns.length === 0) {
    return (
      <section className="bg-[#F7F2EB] py-20 text-center text-[#4A294B]">
        campaigns array is empty or undefined — check the export in
        data/campaigns.js
      </section>
    );
  }

  return (
    <section className="bg-[#F7F2EB] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[420px_1fr] gap-12 xl:gap-20 items-center">
          {/* ================= LEFT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md"
          >
            <p className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm font-medium">
              Signature Collection
            </p>

            <h2 className="mt-5 font-[Cinzel] text-[#4A294B] text-4xl md:text-5xl leading-tight">
              Jewellery
              <br />
              Beyond
              <br />
              Occasion
            </h2>

            {/* Gold hairline — a small signature echoed in the tabs below */}
            <div className="mt-7 w-14 h-[2px] bg-[#C7A05A]" />

            <p className="mt-7 text-[#6D6460] leading-8">
              Explore seasonal campaigns inspired by timeless elegance,
              craftsmanship and modern luxury. Every collection tells a
              different story.
            </p>

            <div className="mt-10">
              <Button variant="gold">View Campaigns</Button>
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          {/* min-w-0 is the fix: grid items default to min-width:auto,
              which lets wide content (the Swiper/image) force this
              column past its 1fr track and off the right edge of the
              screen — min-w-0 makes it actually shrink to fit. */}

          <div className="min-w-0">
            {/* Slim gold frame around the image — a small "cased jewel" feel */}
            <div className="p-2 bg-gradient-to-br from-[#E6C37A] via-[#C7A05A] to-[#8A6C3A] rounded-[34px] shadow-2xl">
              <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                speed={900}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                onSwiper={setSwiper}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="rounded-[28px] overflow-hidden"
              >
                {campaigns.map((campaign) => (
                  <SwiperSlide key={campaign.id}>
                    <div className="relative overflow-hidden">
                      <CampaignImage campaign={campaign} />

                      {/* Softer, directional overlay so the tag text stays
                          legible without flattening the whole photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

                      <CampaignCard campaign={campaign} />


                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <CampaignTabs
              campaigns={campaigns}
              activeIndex={activeIndex}
              swiper={swiper}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSlider;