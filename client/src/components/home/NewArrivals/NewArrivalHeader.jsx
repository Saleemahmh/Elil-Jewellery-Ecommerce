import Button from "../../common/Button";

const NewArrivalHeader = () => {
  return (
    <div className="flex items-end justify-between mb-8">

      <div>

        <p
          className="
          uppercase
          tracking-[0.35em]
          text-[#C7A05A]
          text-xs
          "
        >
          JUST ARRIVED
        </p>

        <h2
          className="
          mt-4
          font-[Cinzel]
          text-[#F7F2EB]
          text-4xl
          lg:text-5xl
          "
        >
          New Arrivals
        </h2>

        <div className="w-16 h-[2px] bg-[#C7A05A] mt-6"/>

        <p
          className="
          mt-4
          max-w-lg
          text-[#DDD1D7]
          leading-8
          "
        >
          Fresh designs crafted for the season,
          blending timeless elegance with modern luxury.
        </p>

      </div>

      <div className="hidden md:block">

        <Button variant="gold">
          View All
        </Button>

      </div>

    </div>
  );
};

export default NewArrivalHeader;