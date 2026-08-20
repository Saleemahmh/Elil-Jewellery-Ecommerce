// import { motion } from "framer-motion";

// import NewArrivalBanner from "./NewArrivalBanner";
// import NewArrivalHeader from "./NewArrivalHeader";
// import NewArrivalCard from "./NewArrivalCard";
// import SectionDivider from "../../common/SectionDivider";

// import { newArrivals } from "../../../data/newArrivals";
// // import bannerImage from "../../../assets/images/new-arrivals/banner.jpg";

// const NewArrivals = () => {
//   return (
//     <section className="relative bg-[#4A294B] py-16 lg:py-20">

//       <div className="max-w-7xl mx-auto px-6 lg:px-10">

//         <NewArrivalBanner
//           offer="Upto 15% Off"
//           ctaLink="/shop"
//           // bannerImage={bannerImage}
//         />

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >

//           <NewArrivalHeader />

//           {/* Product Grid */}

//           <div
//             className="
//             mt-6

//             grid
//             grid-cols-2
//             md:grid-cols-3
//             xl:grid-cols-6

//             gap-5
//             "
//           >
//             {newArrivals.map((product) => (
//               <NewArrivalCard
//                 key={product._id}
//                 product={product}
//               />
//             ))}
//           </div>

//         </motion.div>

//       </div>

//       <SectionDivider />

//     </section>
//   );
// };

// export default NewArrivals;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import NewArrivalBanner from "./NewArrivalBanner";
import NewArrivalHeader from "./NewArrivalHeader";
import NewArrivalCard from "./NewArrivalCard";
import SectionDivider from "../../common/SectionDivider";

import { fetchCategories } from "../../../redux/slices/categorySlice";

const NewArrivals = () => {
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(
      fetchCategories({
        status: "active",
      })
    );
  }, [dispatch]);

  return (
    <section className="relative bg-[#4A294B] py-16 lg:py-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* BANNER */}

        <NewArrivalBanner
          offer="Upto 15% Off"
          ctaLink="/shop?newArrival=true"
        />

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <NewArrivalHeader />

          {/* CATEGORY GRID */}

          <div
            className="
              mt-6
              grid
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-6
              gap-5
            "
          >

            {loading ? (
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="
                    h-64
                    rounded-2xl
                    bg-white/10
                    animate-pulse
                  "
                />
              ))
            ) : error ? (
              <p className="col-span-full text-center text-white/70">
                Unable to load new arrivals.
              </p>
            ) : (
              categories.slice(0, 6).map((category) => (
                <NewArrivalCard
                  key={category._id}
                  category={category}
                />
              ))
            )}

          </div>

        </motion.div>

      </div>

      <SectionDivider />

    </section>
  );
};

export default NewArrivals;