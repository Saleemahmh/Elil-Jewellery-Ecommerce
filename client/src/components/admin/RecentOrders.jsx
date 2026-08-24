import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const statusStyles = {
  Pending:
    "bg-amber-50 text-amber-700",

  Processing:
    "bg-blue-50 text-blue-700",

  Shipped:
    "bg-purple-50 text-purple-700",

  Delivered:
    "bg-green-50 text-green-700",

  Cancelled:
    "bg-red-50 text-red-700",
};

const RecentOrders = ({
  orders,
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
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
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
            Orders
          </p>

          <h2
            className="
              mt-1
              font-[Cinzel]
              text-xl
              text-[#341A36]
            "
          >
            Recent Orders
          </h2>
        </div>

        <Link
          to="/admin/orders"
          className="
            inline-flex
            items-center
            gap-1
            text-xs
            font-medium
            text-[#C7A05A]
            hover:text-[#341A36]
          "
        >
          View all

          <FiArrowRight />
        </Link>
      </div>

      {/* CONTENT */}

      <div className="mt-6 overflow-x-auto">

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-12
                  animate-pulse
                  rounded-lg
                  bg-[#F7F2EB]
                "
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-[#6B5A68]">
              No orders found.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[650px]">

            <thead>
              <tr
                className="
                  border-b
                  border-[#E7DED4]
                  text-left
                "
              >
                <th className="pb-3 text-xs font-medium text-[#6B5A68]">
                  Order
                </th>

                <th className="pb-3 text-xs font-medium text-[#6B5A68]">
                  Customer
                </th>

                <th className="pb-3 text-xs font-medium text-[#6B5A68]">
                  Amount
                </th>

                <th className="pb-3 text-xs font-medium text-[#6B5A68]">
                  Status
                </th>

                <th className="pb-3 text-xs font-medium text-[#6B5A68]">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="
                    border-b
                    border-[#F0EAE3]
                    last:border-0
                  "
                >
                  <td className="py-4">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="
                        text-sm
                        font-medium
                        text-[#341A36]
                        hover:text-[#C7A05A]
                      "
                    >
                      #{order._id.slice(-6).toUpperCase()}
                    </Link>
                  </td>

                  <td className="py-4">
                    <div>
                      <p className="text-sm text-[#341A36]">
                        {order.user?.name ||
                          "Customer"}
                      </p>

                      <p className="mt-0.5 text-xs text-[#8A7985]">
                        {order.user?.email || ""}
                      </p>
                    </div>
                  </td>

                  <td className="py-4 text-sm font-medium text-[#341A36]">
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="py-4">
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-[10px]
                        font-medium
                        ${statusStyles[order.orderStatus] || "bg-gray-50 text-gray-600"}
                      `}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-4 text-xs text-[#6B5A68]">
                    {new Date(
                      order.createdAt,
                    ).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </section>
  );
};

export default RecentOrders;