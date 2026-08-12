import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

import Button from "../common/Button";
import { register } from "../../redux/slices/authSlice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE REGISTER
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      fullName,
      email,
      password,
      confirmPassword,
    } = formData;

    // ------------------------------------------
    // FRONTEND VALIDATION
    // ------------------------------------------

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (fullName.trim().length < 3) {
      toast.error(
        "Full name must be at least 3 characters.",
      );
      return;
    }

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // ------------------------------------------
    // SEND TO BACKEND — via the authSlice thunk,
    // so Redux (and therefore Navbar) actually
    // finds out registration succeeded.
    // ------------------------------------------

    try {
      setLoading(true);

      const response = await dispatch(
        register({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
        })
      ).unwrap();

      // ------------------------------------------
      // SUCCESS TOAST
      // ------------------------------------------

      toast.success(
        response?.message ||
          "Your account has been created successfully!",
      );

      // ------------------------------------------
      // REDIRECT
      // ------------------------------------------

      setTimeout(() => {
        navigate("/shop");
      }, 700);

    } catch (errorMessage) {
      // .unwrap() throws whatever rejectWithValue() returned in the
      // thunk (already a plain string) — no more digging through
      // error.response here.
      toast.error(
        errorMessage || "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* ======================================
          HEADER
      ====================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <p
          className="
            uppercase
            tracking-[0.3em]
            text-[11px]
            font-medium
            text-[#C7A05A]
          "
        >
          Become a member
        </p>

        <h1
          className="
            mt-3
            font-[Cinzel]
            text-3xl
            md:text-4xl
            text-[#4A294B]
          "
        >
          Create Account
        </h1>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-[#7A6E68]
          "
        >
          Join Elil Jewellery and keep your
          favourite pieces close.
        </p>
      </motion.div>

      {/* ======================================
          FORM
      ====================================== */}

      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.15,
        }}
        className="mt-8 space-y-5"
      >

        {/* FULL NAME */}

        <div>

          <label
            htmlFor="fullName"
            className="
              block
              mb-2
              text-xs
              uppercase
              tracking-[0.18em]
              text-[#6D6460]
            "
          >
            Full Name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            autoComplete="name"
            disabled={loading}
            className="
              w-full
              rounded-xl
              border
              border-[#E7DED4]
              bg-white
              px-4
              py-3.5
              text-sm
              text-[#4A294B]
              outline-none
              transition
              focus:border-[#C7A05A]
              focus:ring-2
              focus:ring-[#C7A05A]/10
              disabled:opacity-60
            "
          />

        </div>

        {/* EMAIL */}

        <div>

          <label
            htmlFor="email"
            className="
              block
              mb-2
              text-xs
              uppercase
              tracking-[0.18em]
              text-[#6D6460]
            "
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loading}
            className="
              w-full
              rounded-xl
              border
              border-[#E7DED4]
              bg-white
              px-4
              py-3.5
              text-sm
              text-[#4A294B]
              outline-none
              transition
              focus:border-[#C7A05A]
              focus:ring-2
              focus:ring-[#C7A05A]/10
              disabled:opacity-60
            "
          />

        </div>

        {/* PASSWORD */}

        <div>

          <label
            htmlFor="password"
            className="
              block
              mb-2
              text-xs
              uppercase
              tracking-[0.18em]
              text-[#6D6460]
            "
          >
            Password
          </label>

          <div className="relative">

            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DED4]
                bg-white
                px-4
                py-3.5
                pr-12
                text-sm
                text-[#4A294B]
                outline-none
                transition
                focus:border-[#C7A05A]
                focus:ring-2
                focus:ring-[#C7A05A]/10
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previous) => !previous,
                )
              }
              disabled={loading}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[#7A6E68]
                hover:text-[#4A294B]
              "
            >
              {showPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* CONFIRM PASSWORD */}

        <div>

          <label
            htmlFor="confirmPassword"
            className="
              block
              mb-2
              text-xs
              uppercase
              tracking-[0.18em]
              text-[#6D6460]
            "
          >
            Confirm Password
          </label>

          <div className="relative">

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DED4]
                bg-white
                px-4
                py-3.5
                pr-12
                text-sm
                text-[#4A294B]
                outline-none
                transition
                focus:border-[#C7A05A]
                focus:ring-2
                focus:ring-[#C7A05A]/10
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (previous) => !previous,
                )
              }
              disabled={loading}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[#7A6E68]
                hover:text-[#4A294B]
              "
            >
              {showConfirmPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* SUBMIT */}

        <Button
          type="submit"
          variant="gold"
          disabled={loading}
          className="
            w-full
            rounded-xl
            py-3.5
            mt-2
          "
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </Button>

      </motion.form>

      {/* ======================================
          LOGIN LINK
      ====================================== */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          delay: 0.4,
        }}
        className="
          mt-7
          text-center
          text-sm
          text-[#7A6E68]
        "
      >
        Already have an account?{" "}

        <Link
          to="/login"
          className="
            font-medium
            text-[#5F2147]
            hover:text-[#C7A05A]
            transition-colors
          "
        >
          Sign in
        </Link>
      </motion.p>

    </div>
  );
};

export default RegisterForm;