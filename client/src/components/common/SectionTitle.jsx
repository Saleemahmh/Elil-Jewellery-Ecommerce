import { motion } from "framer-motion";

const SectionTitle = ({
  subtitle,
  title,
  description,
  align = "center",
}) => {
  const alignment = {
    center: "items-center text-center",
    left: "items-start text-left",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignment[align]} max-w-3xl mx-auto mb-14`}
    >
      {subtitle && (
        <span className="uppercase tracking-[0.35em] text-[#C7A05A] text-sm font-semibold mb-3">
          {subtitle}
        </span>
      )}

      <h2 className="font-[Cinzel] text-[#4A294B] text-3xl md:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-[#6F6963] text-base md:text-lg leading-8 max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;