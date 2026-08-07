const FilterSection = ({ title, children }) => {
  return (
    <div className="border-b border-[#E7DED4] pb-8 mb-8">

      <h3
        className="
        font-[Cinzel]
        text-[#4A294B]
        text-lg
        mb-5
        "
      >
        {title}
      </h3>

      {children}

    </div>
  );
};

export default FilterSection;