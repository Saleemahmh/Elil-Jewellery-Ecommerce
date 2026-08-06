import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const FeaturedHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">

      <div>

        <p className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm font-medium">
          Featured Products
        </p>

        <h2 className="mt-4 font-[Cinzel] text-4xl md:text-5xl text-[#4A294B]">
          Curated Luxury
        </h2>

        <p className="mt-5 max-w-xl text-[#6F6660] leading-8">
          Handpicked jewellery selected for timeless elegance and
          everyday sophistication.
        </p>

      </div>

      <Link
        to="/shop"
        className="
          mt-8
          md:mt-0
          inline-flex
          items-center
          gap-2
          text-[#4A294B]
          font-medium
          hover:text-[#C7A05A]
          transition
        "
      >
        Shop All

        <FiArrowRight />

      </Link>

    </div>
  );
};

export default FeaturedHeader;