const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  loading = false,
}) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#E7DED4]
        bg-white
        p-5
        shadow-sm
        transition
        duration-300
        hover:-translate-y-0.5
        hover:shadow-md
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div>
          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#6B5A68]
            "
          >
            {title}
          </p>

          {loading ? (
            <div
              className="
                mt-3
                h-8
                w-24
                animate-pulse
                rounded
                bg-[#F7F2EB]
              "
            />
          ) : (
            <p
              className="
                mt-2
                font-[Cinzel]
                text-2xl
                text-[#341A36]
                sm:text-3xl
              "
            >
              {value}
            </p>
          )}

          {description && (
            <p
              className="
                mt-2
                text-xs
                text-[#8A7985]
              "
            >
              {description}
            </p>
          )}
        </div>

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F7F2EB]
            text-[#C7A05A]
          "
        >
          <Icon className="text-xl" />
        </div>

      </div>
    </div>
  );
};

export default AdminStatCard;