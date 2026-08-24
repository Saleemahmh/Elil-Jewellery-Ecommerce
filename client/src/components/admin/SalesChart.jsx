import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SalesChart = ({
  data,
  loading,
}) => {
  return (
    <section
      className="
        rounded-2xl
        border
        border-[#E7DED4]
        bg-white
        p-5
        sm:p-6
      "
    >
      <div>
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#C7A05A]
          "
        >
          Analytics
        </p>

        <h2
          className="
            mt-1
            font-[Cinzel]
            text-xl
            text-[#341A36]
          "
        >
          Monthly Sales
        </h2>
      </div>

      <div className="mt-6 h-[300px]">

        {loading ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              rounded-xl
              bg-[#F7F2EB]
            "
          >
            <p className="text-sm text-[#6B5A68]">
              Loading sales data...
            </p>
          </div>
        ) : data.length === 0 ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
            "
          >
            <p className="text-sm text-[#6B5A68]">
              No sales data available.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 11,
                }}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#C7A05A"
                fill="#F7F2EB"
                strokeWidth={2}
              />

            </AreaChart>
          </ResponsiveContainer>
        )}

      </div>
    </section>
  );
};

export default SalesChart;