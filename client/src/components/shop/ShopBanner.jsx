import { PiDiamondBold } from "react-icons/pi";

const ShopBanner = () => {
  return (
    <section className="relative bg-[#4A294B] py-20 lg:py-28 overflow-hidden pt-20 pb-14">

  <div className="max-w-7xl mx-auto px-6">
 <div
        className="
          pointer-events-none
          absolute top-0 left-1/2 -translate-x-1/2
          w-[600px] h-[600px]
          rounded-full
          bg-[#C7A05A]/10
          blur-[120px]
        "
      />
    <div className="text-center">
       
<PiDiamondBold
        className="
          pointer-events-none
          absolute -right-10 -top-10
          text-white/[0.04]
          w-64 h-64
          rotate-12
        "
      />
      <p className="uppercase tracking-[0.35em] text-xs text-[#C7A05A]">
        Discover
      </p>

      <h1
        className="
        mt-5
        font-[Cinzel]
        text-white
        text-4xl
        lg:text-5xl
        "
      >
        Our Jewellery Collection
      </h1>

      <div className="w-16 h-[2px] bg-[#C7A05A] mx-auto mt-6" />

      <p
        className="
        mt-6
        max-w-2xl
        mx-auto
        text-[#6D6460]
        leading-8
        "
      >
        Explore handcrafted rings, earrings, bracelets, pendants and
        timeless pieces designed to celebrate every story.
      </p>

    </div>

  </div>

</section>
  );
};

export default ShopBanner;