import { motion } from "framer-motion";

const toRoman = (num) => {
  const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return romans[num] || String(num + 1);
};

const CampaignTabs = ({ campaigns, activeIndex, swiper }) => {
  return (
    <div className="mt-10 lg:mt-12">
      <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-6 sm:gap-8">
        {campaigns.map((campaign, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={campaign.id}
              onClick={() => swiper?.slideTo(index)}
              className="
                group
                flex
                items-start
                gap-4
                text-left
                min-w-0
                sm:min-w-[150px]
              "
            >
              {/* Hallmark medallion */}
              <div
                className={`
                  shrink-0
                  w-9 h-9
                  rounded-full
                  border
                  flex items-center justify-center
                  font-[Cinzel] text-[12px]
                  transition-all duration-300

                  ${
                    isActive
                      ? "border-[#C7A05A] text-[#C7A05A] bg-[#C7A05A]/10"
                      : "border-[#D9CFC2] text-[#B6AAA0] group-hover:border-[#C7A05A] group-hover:text-[#C7A05A]"
                  }
                `}
              >
                {toRoman(index)}
              </div>

              <div className="pt-1">
                {/* Title */}
                <h3
                  className={`
                    font-[Cinzel]
                    text-lg
                    md:text-xl
                    leading-snug
                    whitespace-nowrap
                    transition-colors
                    duration-300

                    ${
                      isActive
                        ? "text-[#4A294B]"
                        : "text-[#8A8079] group-hover:text-[#4A294B]"
                    }
                  `}
                >
                  {campaign.title}
                </h3>

                {/* Animated line */}
                <motion.div
                  animate={{ width: isActive ? "100%" : "28%" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="mt-3 h-[2px] bg-[#C7A05A] rounded-full"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignTabs;