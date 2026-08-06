import { useState } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import Button from "../common/Button.jsx";

import hero1 from "../../assets/images/hero/hero_1.jpg";
import hero2 from "../../assets/images/hero/hero_2.jpg";
import hero3 from "../../assets/images/hero/hero_3.jpg";

const heroImages = [hero1, hero2, hero3];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#5B365A] via-[#4A294B] to-[#2E1830]">
      {/* Decorative Background Glow */}

      {/* Gold Glow */}
      <div className="absolute top-0 left-0 pointer-events-none w-125 h-125 bg-[#C7A05A]/15 blur-[180px] rounded-full"></div>

      {/* Soft White Glow */}
      <div className="absolute pointer-events-none bottom-0 right-0 w-112.5 h-112.5 bg-white/8 blur-[180px] rounded-full"></div>

      {/* Plum Glow */}
      <div className="absolute top-1/2 left-1/3 w-87.5 h-87.5 bg-[#7B5A7C]/20 blur-[140px] rounded-full"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.15)_100%)]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-12 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
        {/* LEFT */}

        <div className="flex-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[0.35em] text-[#C7A05A] font-medium text-sm mb-5"
          >
            Luxury Jewellery
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[Cinzel] text-6xl md:text-7xl xl:text-8xl text-white leading-[0.95]"
          >
            Timeless
            <br />
            Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-xl text-[#E9E1DA] text-lg leading-8"
          >
            Discover handcrafted jewellery designed to celebrate life's
            meaningful moments with sophistication, elegance, and lasting
            beauty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mt-10"
          >
            <Button to="/shop" variant="gold">
              Shop Collection
            </Button>

            <Button to="/collections" variant="whiteOutline">
              Explore Collection
            </Button>
          </motion.div>
        </div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 relative w-full"
        >
          {/* Gold Glow */}
          <div className="absolute -top-12 -right-10 w-72 h-72 rounded-full bg-[#C7A05A]/20 blur-[100px]"></div>

          {/* Plum Glow */}
          <div className="absolute -bottom-12 -left-10 w-72 h-72 rounded-full bg-[#7B5A7C]/20 blur-[120px]"></div>

          <Swiper
            modules={[EffectFade, Autoplay, Pagination]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass: "hero-bullet",
              bulletActiveClass: "hero-bullet-active",
            }}
            className="relative rounded-3xl shadow-2xl"
          >
            {heroImages.map((src, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 7 }}
                  src={src}
                  alt="Luxury Jewellery"
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dot styling — scoped so it doesn't leak into
              other Swiper instances (e.g. the campaign slider) */}
          <style>{`
            .hero-bullet {
              width: 8px;
              height: 8px;
              display: inline-block;
              border-radius: 9999px;
              background: rgba(255, 255, 255, 0.4);
              margin: 0 4px !important;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .hero-bullet-active {
              background: #C7A05A;
              width: 22px;
              border-radius: 9999px;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;