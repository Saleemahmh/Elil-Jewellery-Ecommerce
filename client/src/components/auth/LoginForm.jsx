import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

import Button from "../common/Button";
import { login } from "../../redux/slices/authSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===============================
  // INPUT CHANGE
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ===============================
  // SUBMIT
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // dispatch(login(...)) runs the authSlice thunk, which updates
      // state.auth.isAuthenticated / state.auth.user on success — this
      // is what Navbar's useSelector actually reads. Calling
      // loginUser() directly (the old code) hit the backend fine but
      // never told Redux anything changed.
      const response = await dispatch(login(formData)).unwrap();

      toast.success(response.message || "Welcome back!");

      navigate("/shop");
    } catch (errorMessage) {
      // .unwrap() throws whatever rejectWithValue() returned in the
      // thunk — already a plain string, not an axios error object.
      toast.error(errorMessage || "Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* ================= HEADER ================= */}

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
          Welcome back
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
          Sign In
        </h1>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-[#7A6E68]
          "
        >
          Sign in to access your account,
          wishlist and orders.
        </p>
      </motion.div>

      {/* ================= FORM ================= */}

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
            "
          />
        </div>

        {/* PASSWORD */}

        <div>
          <div className="flex items-center justify-between mb-2">

            <label
              htmlFor="password"
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-[#6D6460]
              "
            >
              Password
            </label>

            <button
              type="button"
              className="
                text-xs
                text-[#5F2147]
                hover:text-[#C7A05A]
                transition
              "
            >
              Forgot password?
            </button>

          </div>

          <div className="relative">

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
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
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
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
          {loading ? "Signing In..." : "Sign In"}
        </Button>

      </motion.form>

      {/* ================= REGISTER ================= */}

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
        Don't have an account?{" "}

        <Link
          to="/register"
          className="
            font-medium
            text-[#5F2147]
            hover:text-[#C7A05A]
            transition-colors
          "
        >
          Create one
        </Link>
      </motion.p>

    </div>
  );
};

export default LoginForm;