const EmptyProducts = () => {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      py-24
      "
    >
      <h2
        className="
        font-[Cinzel]
        text-3xl
        text-[#4A294B]
        "
      >
        No Products Found
      </h2>

      <p
        className="
        mt-4
        text-[#7A6E68]
        max-w-md
        text-center
        leading-7
        "
      >
        We couldn't find jewellery matching your current filters.
        Try adjusting your search or explore another collection.
      </p>
    </div>
  );
};

export default EmptyProducts;