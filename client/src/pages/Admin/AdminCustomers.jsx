import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiEye,
  FiUsers,
} from "react-icons/fi";

import {
  fetchAdminCustomers,
} from "../../redux/slices/adminCustomerSlice.js";

const AdminCustomers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    customers,
    loading,
    error,
  } = useSelector(
    (state) => state.adminCustomers,
  );

  const [search, setSearch] =
    useState("");

  // =====================================================
  // FETCH CUSTOMERS
  // =====================================================

  useEffect(() => {
    dispatch(
      fetchAdminCustomers(),
    );
  }, [dispatch]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (event) => {
    const value =
      event.target.value;

    setSearch(value);

    dispatch(
      fetchAdminCustomers({
        search: value,
      }),
    );
  };

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (
    amount,
  ) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      },
    ).format(amount || 0);
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (
    date,
  ) => {
    if (!date) return "—";

    return new Date(
      date,
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  return (
    <div className="pb-10">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#C7A05A]
          "
        >
          Store Management
        </p>

        <h1
          className="
            mt-2
            font-[Cinzel]
            text-3xl
            text-[#341A36]
          "
        >
          Customers
        </h1>

        <p className="mt-2 text-sm text-[#6B5A68]">
          View and manage your registered
          customers.
        </p>

      </div>

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
          p-4
        "
      >

        <div className="relative max-w-md">

          <FiSearch
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#9A8A95]
            "
          />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search customers..."
            className="
              w-full
              rounded-xl
              border
              border-[#E7DED4]
              bg-[#FDFBF8]
              py-3
              pl-11
              pr-4
              text-sm
              text-[#341A36]
              outline-none
              focus:border-[#C7A05A]
            "
          />

        </div>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div
          className="
            mb-6
            rounded-2xl
            border
            border-red-100
            bg-red-50
            p-5
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* CUSTOMER TABLE */}
      {/* ================================================= */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
        "
      >

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-[#FDFBF8]">

              <tr>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#7A6E68]
                  "
                >
                  Customer
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#7A6E68]
                  "
                >
                  Contact
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-center
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#7A6E68]
                  "
                >
                  Orders
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#7A6E68]
                  "
                >
                  Total Spent
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#7A6E68]
                  "
                >
                  Verification
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#7A6E68]
                  "
                >
                  Joined
                </th>

                <th
                  className="
                    px-6
                    py-4
                    text-right
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-[#7A6E68]
                  "
                >
                  Action
                </th>

              </tr>

            </thead>

            <tbody
              className="
                divide-y
                divide-[#E7DED4]
              "
            >

              {/* ========================================= */}
              {/* LOADING */}
              {/* ========================================= */}

              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="
                      px-6
                      py-12
                      text-center
                      text-sm
                      text-[#8A7985]
                    "
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : customers.length === 0 ? (

                /* ======================================= */
                /* EMPTY */
                /* ======================================= */

                <tr>
                  <td
                    colSpan="7"
                    className="
                      px-6
                      py-16
                      text-center
                    "
                  >

                    <div className="flex flex-col items-center">

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          bg-[#F7F2EB]
                          text-[#9A8A95]
                        "
                      >
                        <FiUsers size={22} />
                      </div>

                      <p
                        className="
                          mt-4
                          text-sm
                          font-medium
                          text-[#341A36]
                        "
                      >
                        No customers found
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-[#9A8A95]
                        "
                      >
                        Registered customers
                        will appear here.
                      </p>

                    </div>

                  </td>
                </tr>

              ) : (

                /* ======================================= */
                /* CUSTOMERS */
                /* ======================================= */

                customers.map(
                  (customer) => (
                    <tr
                      key={
                        customer._id
                      }
                      className="
                        transition
                        hover:bg-[#FDFBF8]
                      "
                    >

                      {/* CUSTOMER */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          {customer.avatar ? (
                            <img
                              src={
                                customer.avatar
                              }
                              alt={
                                customer.fullName
                              }
                              className="
                                h-10
                                w-10
                                rounded-full
                                object-cover
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#F1EAE3]
                                text-sm
                                font-medium
                                text-[#341A36]
                              "
                            >
                              {customer.fullName
                                ?.charAt(
                                  0,
                                )
                                ?.toUpperCase()}
                            </div>
                          )}

                          <div>

                            <p
                              className="
                                text-sm
                                font-medium
                                text-[#341A36]
                              "
                            >
                              {
                                customer.fullName
                              }
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CONTACT */}

                      <td className="px-6 py-5">

                        <p
                          className="
                            text-sm
                            text-[#341A36]
                          "
                        >
                          {
                            customer.email
                          }
                        </p>

                        {customer.phone && (
                          <p
                            className="
                              mt-1
                              text-xs
                              text-[#8A7985]
                            "
                          >
                            {
                              customer.phone
                            }
                          </p>
                        )}

                      </td>

                      {/* ORDERS */}

                      <td
                        className="
                          px-6
                          py-5
                          text-center
                        "
                      >
                        <span
                          className="
                            text-sm
                            font-medium
                            text-[#341A36]
                          "
                        >
                          {
                            customer.orderCount
                          }
                        </span>
                      </td>

                      {/* TOTAL SPENT */}

                      <td className="px-6 py-5">

                        <span
                          className="
                            text-sm
                            font-medium
                            text-[#341A36]
                          "
                        >
                          {formatCurrency(
                            customer.totalSpent,
                          )}
                        </span>

                      </td>

                      {/* VERIFICATION */}

                      <td className="px-6 py-5">

                        {customer.isVerified ? (
                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-green-50
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-green-700
                            "
                          >
                            Verified
                          </span>
                        ) : (
                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-amber-50
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-amber-700
                            "
                          >
                            Not verified
                          </span>
                        )}

                      </td>

                      {/* JOINED */}

                      <td className="px-6 py-5">

                        <span
                          className="
                            text-sm
                            text-[#6B5A68]
                          "
                        >
                          {formatDate(
                            customer.createdAt,
                          )}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end">

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/customers/${customer._id}`,
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              border
                              border-[#E7DED4]
                              bg-white
                              px-4
                              py-2
                              text-xs
                              font-medium
                              text-[#341A36]
                              transition
                              hover:bg-[#F7F2EB]
                            "
                          >
                            <FiEye />

                            View
                          </button>

                        </div>

                      </td>

                    </tr>
                  ),
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminCustomers;