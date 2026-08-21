import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiCheck,
  FiX,
} from "react-icons/fi";

import toast from "react-hot-toast";

import {
  fetchAddresses,
  addAddress,
  editAddress,
  removeAddress,
  makeDefaultAddress,
  clearAddressError,
} from "../../redux/slices/addressSlice";

const emptyForm = {
  label: "Home",
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: false,
};

const Addresses = () => {
  const dispatch = useDispatch();

  const {
    addresses,
    loading,
    saving,
    deleting,
    settingDefault,
    error,
    saveError,
    deleteError,
    defaultError,
  } = useSelector((state) => state.addresses);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // =====================================================
  // FETCH ADDRESSES
  // =====================================================

  useEffect(() => {
    dispatch(fetchAddresses());

    return () => {
      dispatch(clearAddressError());
    };
  }, [dispatch]);

  // =====================================================
  // SHOW ERRORS
  // =====================================================

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (saveError) {
      toast.error(saveError);
    }
  }, [saveError]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
    }
  }, [deleteError]);

  useEffect(() => {
    if (defaultError) {
      toast.error(defaultError);
    }
  }, [defaultError]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData(emptyForm);

    setEditingId(null);

    setShowForm(false);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await dispatch(
          editAddress({
            addressId: editingId,
            addressData: formData,
          }),
        ).unwrap();

        toast.success("Address updated successfully");
      } else {
        await dispatch(addAddress(formData)).unwrap();

        toast.success("Address added successfully");
      }

      resetForm();
    } catch (errorMessage) {
      toast.error(errorMessage || "Unable to save address");
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (address) => {
    setFormData({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country || "India",
      isDefault: address.isDefault,
    });

    setEditingId(address._id);

    setShowForm(true);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(removeAddress(id)).unwrap();

      toast.success("Address deleted successfully");
    } catch (errorMessage) {
      toast.error(errorMessage || "Unable to delete address");
    }
  };

  // =====================================================
  // SET DEFAULT
  // =====================================================

  const handleSetDefault = async (id) => {
    try {
      await dispatch(makeDefaultAddress(id)).unwrap();

      toast.success("Default address updated");
    } catch (errorMessage) {
      toast.error(errorMessage || "Unable to update default address");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-[#E7DED4]
          bg-white
          p-10
          text-center
        "
      >
        <p className="text-sm text-[#6B5A68]">Loading your addresses...</p>
      </div>
    );
  }

  return (
     <div className="px-3 sm:px-5 lg:px-6">
    
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#C7A05A]
            "
          >
            Your Addresses
          </p>

          <h2
            className="
              mt-2
              font-[Cinzel]
              text-2xl
              text-[#341A36]
              sm:text-3xl
            "
          >
            Saved Addresses
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#6B5A68]
            "
          >
            Manage your saved shipping addresses.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#341A36]
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#4A294B]
            "
          >
            <FiPlus />
            Add Address
          </button>
        )}
      </div>

      {/* ================================================= */}
      {/* FORM */}
      {/* ================================================= */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="
            mt-6
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            p-5
            sm:p-7
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#E7DED4]
              pb-4
            "
          >
            <div>
              <h3
                className="
                  font-[Cinzel]
                  text-xl
                  text-[#341A36]
                "
              >
                {editingId ? "Edit Address" : "Add New Address"}
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#6B5A68]
                "
              >
                Enter your complete delivery details.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="
                rounded-full
                p-2
                text-[#6B5A68]
                transition
                hover:bg-[#F7F2EB]
                hover:text-[#341A36]
              "
            >
              <FiX />
            </button>
          </div>

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
            "
          >
            {/* LABEL */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#341A36]
                "
              >
                Address Type
              </label>

              <select
                name="label"
                value={formData.label}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#FDFBF8]
                  px-4
                  py-3
                  text-sm
                  text-[#341A36]
                  outline-none
                  focus:border-[#C7A05A]
                "
              >
                <option value="Home">Home</option>

                <option value="Work">Work</option>

                <option value="Other">Other</option>
              </select>
            </div>

            {/* FULL NAME */}

            <div>
              <label className="form-label">Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter full name"
              />
            </div>

            {/* PHONE */}

            <div>
              <label className="form-label">Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>

            {/* POSTAL */}

            <div>
              <label className="form-label">Postal Code</label>

              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Postal code"
              />
            </div>

            {/* ADDRESS 1 */}

            <div className="sm:col-span-2">
              <label className="form-label">Address Line 1</label>

              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="House number, street name"
              />
            </div>

            {/* ADDRESS 2 */}

            <div className="sm:col-span-2">
              <label className="form-label">Address Line 2</label>

              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="form-input"
                placeholder="Apartment, landmark, etc. (optional)"
              />
            </div>

            {/* CITY */}

            <div>
              <label className="form-label">City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="City"
              />
            </div>

            {/* STATE */}

            <div>
              <label className="form-label">State</label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="State"
              />
            </div>

            {/* COUNTRY */}

            <div>
              <label className="form-label">Country</label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {/* DEFAULT */}

          <label
            className="
              mt-6
              flex
              cursor-pointer
              items-center
              gap-3
              text-sm
              text-[#6B5A68]
            "
          >
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="
                h-4
                w-4
                accent-[#C7A05A]
              "
            />
            Set as default address
          </label>

          {/* BUTTONS */}

          <div
            className="
              mt-6
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={resetForm}
              className="
                rounded-xl
                border
                border-[#E7DED4]
                px-5
                py-3
                text-sm
                text-[#6B5A68]
                hover:bg-[#F7F2EB]
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                rounded-xl
                bg-[#341A36]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#4A294B]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </form>
      )}

      {/* ================================================= */}
      {/* ADDRESS LIST */}
      {/* ================================================= */}

      {!showForm && (
        <div className="mt-6">
          {addresses.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-[#E7DED4]
                bg-white
                px-6
                py-14
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F7F2EB]
                  text-[#C7A05A]
                "
              >
                <FiMapPin />
              </div>

              <h3
                className="
                  mt-5
                  font-[Cinzel]
                  text-xl
                  text-[#341A36]
                "
              >
                No saved addresses
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-6
                  text-[#6B5A68]
                "
              >
                Add a delivery address to make your future checkouts faster and
                easier.
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#341A36]
                  px-5
                  py-3
                  text-sm
                  text-white
                  hover:bg-[#4A294B]
                "
              >
                <FiPlus />
                Add Your First Address
              </button>
            </div>
          ) : (
           <div
  className="
    grid
    grid-cols-1
    gap-5
    px-3
    sm:px-6
    md:grid-cols-3
    md:gap-6
    lg:px-8
  "
>
  {addresses.map((address) => (
    <div
  key={address._id}
  className={`
    w-full
    max-w-md
    mx-auto
    rounded-2xl
    border
    bg-white
    p-4
    sm:p-5
    transition-all
    duration-300

    ${
      address.isDefault
        ? "border-[#C7A05A] shadow-[0_4px_18px_rgba(199,160,90,0.12)]"
        : "border-[#E7DED4]"
    }
  `}
>
                  {/* CARD HEADER */}

                  <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                  >
                    <div
                      className="
                          flex
                          items-center
                          gap-3
                        "
                    >
                      <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#F7F2EB]
                            text-[#C7A05A]
                          "
                      >
                        <FiMapPin />
                      </div>

                      <div>
                        <div
                          className="
                              flex
                              flex-wrap
                              items-center
                              gap-2
                            "
                        >
                          <h3
                            className="
                                font-[Cinzel]
                                text-lg
                                text-[#341A36]
                              "
                          >
                            {address.label}
                          </h3>

                          {address.isDefault && (
                            <span
  className="
    inline-flex
    items-center
    gap-1
    rounded-full
    border
    border-[#C7A05A]/40
    bg-[#C7A05A]/10
    px-2.5
    py-1
    text-[10px]
    font-medium
    uppercase
    tracking-wider
    text-[#A77D2F]
  "
>
                              <FiCheck />
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                          flex
                          items-center
                          gap-1
                        "
                    >
                      <button
                        type="button"
                        onClick={() => handleEdit(address)}
                        className="
                            rounded-lg
                            p-2
                            text-[#6B5A68]
                            hover:bg-[#F7F2EB]
                            hover:text-[#341A36]
                          "
                        aria-label="Edit address"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(address._id)}
                        disabled={deleting}
                        className="
                            rounded-lg
                            p-2
                            text-[#6B5A68]
                            hover:bg-red-50
                            hover:text-red-600
                            disabled:opacity-50
                          "
                        aria-label="Delete address"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  {/* DETAILS */}

                  <div
                    className="
                        mt-5
                        border-t
                        border-[#E7DED4]
                        pt-5
                      "
                  >
                    <p
                      className="
                          text-sm
                          font-medium
                          text-[#341A36]
                        "
                    >
                      {address.fullName}
                    </p>

                    <p
                      className="
                          mt-1
                          text-sm
                          text-[#6B5A68]
                        "
                    >
                      {address.phone}
                    </p>

                    <p
                      className="
                          mt-3
                          text-sm
                          leading-6
                          text-[#6B5A68]
                        "
                    >
                      {address.addressLine1}
                      {address.addressLine2 && (
                        <>
                          <br />
                          {address.addressLine2}
                        </>
                      )}
                      <br />
                      {address.city}, {address.state} {address.postalCode}
                      <br />
                      {address.country}
                    </p>
                  </div>

                  {/* DEFAULT BUTTON */}

                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address._id)}
                      disabled={settingDefault}
                      className="
                          mt-5
                          text-xs
                          font-medium
                          text-[#C7A05A]
                          hover:text-[#341A36]
                          disabled:opacity-50
                        "
                    >
                      {settingDefault ? "Updating..." : "Set as default"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Addresses;
