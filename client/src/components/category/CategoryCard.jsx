import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-3xl"
    >

      <Link
        to={`/shop?category=${category._id}`}
        className="relative block overflow-hidden rounded-3xl"
      >

        {/* ================================================= */}
        {/* IMAGE */}
        {/* ================================================= */}

        <div className="overflow-hidden">

          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}

            src={
              category.image?.url ||
              "/placeholder-category.jpg"
            }

            alt={category.name}

            className="
              h-[220px]
              md:h-[240px]
              lg:h-[260px]

              w-full

              object-cover

              transition-transform
              duration-700

              group-hover:scale-110
            "
          />

        </div>

        {/* ================================================= */}
        {/* OVERLAY */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-[#2E1830]/85
            via-[#4A294B]/40
            to-transparent
          "
        />

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="absolute bottom-0 left-0 w-full p-6">

          {/* GOLD LINE */}

          <div
            className="
              mb-5

              h-0.5
              w-10

              bg-[#C7A05A]

              transition-all
              duration-500

              group-hover:w-16
            "
          />

          {/* CATEGORY NAME */}

          <h3
            className="
              font-[Cinzel]

              text-xl
              lg:text-2xl

              text-white
            "
          >
            {category.name}
          </h3>

          {/* ARROW */}

          <div
            className="
              mt-3

              flex
              items-center
              gap-2

              text-[#E9E1DA]

              group-hover:text-[#C7A05A]

              transition-colors
              duration-300
            "
          >

            <span className="text-sm">
              Explore
            </span>

            <FiArrowRight
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />

          </div>

        </div>

      </Link>

    </motion.div>
  );
};

export default CategoryCard;