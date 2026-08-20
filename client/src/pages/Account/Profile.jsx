import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit2,
  FiCheck,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Container from "../../components/common/Container";
import { updateUserProfile } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector(
    (state) => state.auth
  );

  // =====================================
  // EDIT MODE
  // =====================================

  const [isEditing, setIsEditing] = useState(false);

  // =====================================
  // FORM STATE
  // =====================================

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  // =====================================
  // INITIALIZE FORM
  // =====================================

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================
  // START EDITING
  // =====================================

  const handleEdit = () => {
    setFormData({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
    });

    setIsEditing(true);
  };

  // =====================================
  // CANCEL EDITING
  // =====================================

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
    });

    setIsEditing(false);
  };

  // =====================================
  // SAVE PROFILE
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullName = formData.fullName.trim();
    const phone = formData.phone.trim();

    // -------------------------------
    // BASIC VALIDATION
    // -------------------------------

    if (!fullName) {
      toast.error("Full name is required.");
      return;
    }

    if (fullName.length < 3) {
      toast.error(
        "Full name must be at least 3 characters."
      );
      return;
    }

    if (phone.length > 20) {
      toast.error(
        "Phone number cannot exceed 20 characters."
      );
      return;
    }

    try {
      await dispatch(
        updateUserProfile({
          fullName,
          phone,
        })
      ).unwrap();

      toast.success(
        "Your profile has been updated successfully."
      );

      setIsEditing(false);
    } catch (error) {
      toast.error(
        error || "Unable to update your profile."
      );
    }
  };

  // =====================================
  // NO USER
  // =====================================

  if (!user) {
    return (
      <section className="min-h-screen bg-[#F7F2EB] py-10 sm:py-14">
        <Container>
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-[#6B5A68]">
              Unable to load your profile.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F2EB] py-10 sm:py-14">
      <Container>

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <div className="mb-8">

          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-[#C7A05A]
            "
          >
            Account
          </p>

          <h1
            className="
              mt-2
              font-[Cinzel]
              text-3xl
              text-[#341A36]
              sm:text-4xl
            "
          >
            My Profile
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-7
              text-[#6B5A68]
            "
          >
            View and manage your personal information.
          </p>

        </div>

        {/* ================================================= */}
        {/* PROFILE CARD */}
        {/* ================================================= */}

        <div
          className="
            max-w-3xl
            overflow-hidden
            rounded-2xl
            border
            border-[#E7DED4]
            bg-white
            shadow-sm
          "
        >

          {/* ================================================= */}
          {/* PROFILE HEADER */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-5
              border-b
              border-[#E7DED4]
              bg-[#341A36]
              px-6
              py-7
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-8
            "
          >

            {/* USER */}

            <div className="flex items-center gap-5">

              {/* AVATAR */}

              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-2
                  border-[#C7A05A]
                  bg-[#F7F2EB]
                  text-[#C7A05A]
                "
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName || "Profile"}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <FiUser className="text-3xl" />
                )}
              </div>

              {/* NAME */}

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#C7A05A]
                  "
                >
                  Welcome
                </p>

                <h2
                  className="
                    mt-1
                    font-[Cinzel]
                    text-xl
                    text-[#F7F2EB]
                    sm:text-2xl
                  "
                >
                  {user.fullName || "User"}
                </h2>

              </div>

            </div>

            {/* ================================================= */}
            {/* EDIT / CANCEL BUTTONS */}
            {/* ================================================= */}

            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[#C7A05A]
                  px-5
                  py-2.5
                  text-sm
                  text-[#C7A05A]
                  transition
                  duration-300
                  hover:bg-[#C7A05A]
                  hover:text-[#341A36]
                  sm:self-auto
                "
              >
                <FiEdit2 />
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[#F7F2EB]/40
                  px-5
                  py-2.5
                  text-sm
                  text-[#F7F2EB]
                  transition
                  duration-300
                  hover:border-[#C7A05A]
                  hover:text-[#C7A05A]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:self-auto
                "
              >
                <FiX />
                Cancel
              </button>
            )}

          </div>

          {/* ================================================= */}
          {/* PROFILE FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8"
          >

            <div className="mb-6">

              <h3
                className="
                  font-[Cinzel]
                  text-xl
                  text-[#341A36]
                "
              >
                Personal Information
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#6B5A68]
                "
              >
                {isEditing
                  ? "Update your personal information below."
                  : "Your account information."}
              </p>

            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* ================================================= */}
              {/* FULL NAME */}
              {/* ================================================= */}

              <div>

                <label
                  htmlFor="fullName"
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#4A294B]
                  "
                >
                  <FiUser className="text-[#C7A05A]" />
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-[#E7DED4]
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-[#341A36]
                      outline-none
                      transition
                      focus:border-[#C7A05A]
                      focus:ring-1
                      focus:ring-[#C7A05A]
                    "
                  />
                ) : (
                  <div
                    className="
                      min-h-[46px]
                      rounded-lg
                      border
                      border-[#E7DED4]
                      bg-[#F7F2EB]/50
                      px-4
                      py-3
                      text-sm
                      text-[#341A36]
                    "
                  >
                    {user.fullName || "Not provided"}
                  </div>
                )}

              </div>

              {/* ================================================= */}
              {/* EMAIL */}
              {/* ================================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#4A294B]
                  "
                >
                  <FiMail className="text-[#C7A05A]" />
                  Email Address
                </label>

                <div
                  id="email"
                  className="
                    min-h-[46px]
                    rounded-lg
                    border
                    border-[#E7DED4]
                    bg-[#F7F2EB]/50
                    px-4
                    py-3
                    text-sm
                    text-[#6B5A68]
                  "
                >
                  {user.email || "Not provided"}
                </div>

                {isEditing && (
                  <p
                    className="
                      mt-2
                      text-xs
                      text-[#8A7A86]
                    "
                  >
                    Email address cannot be changed here.
                  </p>
                )}

              </div>

              {/* ================================================= */}
              {/* PHONE */}
              {/* ================================================= */}

              <div>

                <label
                  htmlFor="phone"
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#4A294B]
                  "
                >
                  <FiPhone className="text-[#C7A05A]" />
                  Phone Number
                </label>

                {isEditing ? (
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-[#E7DED4]
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-[#341A36]
                      outline-none
                      transition
                      focus:border-[#C7A05A]
                      focus:ring-1
                      focus:ring-[#C7A05A]
                    "
                  />
                ) : (
                  <div
                    className="
                      min-h-[46px]
                      rounded-lg
                      border
                      border-[#E7DED4]
                      bg-[#F7F2EB]/50
                      px-4
                      py-3
                      text-sm
                      text-[#341A36]
                    "
                  >
                    {user.phone || "Not provided"}
                  </div>
                )}

              </div>

              {/* ================================================= */}
              {/* ACCOUNT TYPE */}
              {/* ================================================= */}

              <div>

                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#4A294B]
                  "
                >
                  <FiUser className="text-[#C7A05A]" />
                  Account Type
                </label>

                <div
                  className="
                    min-h-[46px]
                    rounded-lg
                    border
                    border-[#E7DED4]
                    bg-[#F7F2EB]/50
                    px-4
                    py-3
                    text-sm
                    capitalize
                    text-[#341A36]
                  "
                >
                  {user.role || "Customer"}
                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* SAVE BUTTON */}
            {/* ================================================= */}

            {isEditing && (
              <div
                className="
                  mt-8
                  flex
                  flex-col-reverse
                  gap-3
                  border-t
                  border-[#E7DED4]
                  pt-6
                  sm:flex-row
                  sm:justify-end
                "
              >

                {/* CANCEL */}

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-[#E7DED4]
                    px-6
                    py-3
                    text-sm
                    text-[#4A294B]
                    transition
                    duration-300
                    hover:border-[#341A36]
                    hover:text-[#341A36]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <FiX />
                  Cancel
                </button>

                {/* SAVE */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#C7A05A]
                    px-6
                    py-3
                    font-medium
                    text-[#341A36]
                    transition
                    duration-300
                    hover:bg-[#B48D4B]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <FiCheck />

                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>
            )}

            {/* ================================================= */}
            {/* ACCOUNT STATUS */}
            {/* ================================================= */}

            {!isEditing && (
              <div
                className="
                  mt-8
                  rounded-xl
                  border
                  border-[#E7DED4]
                  bg-[#F7F2EB]/60
                  p-5
                "
              >

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
                        font-[Cinzel]
                        text-sm
                        text-[#341A36]
                      "
                    >
                      Account Status
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#6B5A68]
                      "
                    >
                      Your current account verification
                      status.
                    </p>

                  </div>

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        user.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-[#C7A05A]/15 text-[#8A6B28]"
                      }
                    `}
                  >
                    {user.isVerified
                      ? "Verified"
                      : "Not Verified"}
                  </span>

                </div>

              </div>
            )}

          </form>

        </div>

      </Container>
    </section>
  );
};

export default Profile;