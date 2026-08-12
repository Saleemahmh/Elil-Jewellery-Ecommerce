import { motion } from "framer-motion";

import loginImage from "../../assets/images/loginregister/login.jpg";
import registerImage from "../../assets/images/loginregister/register.jpg";

const AuthBrandPanel = ({ type = "login" }) => {
  const isLogin = type === "login";

  const image = isLogin ? loginImage : registerImage;

  return (
    <div className="relative hidden lg:flex w-1/2 min-h-screen overflow-hidden">

      {/* ================= IMAGE ================= */}

      <motion.img
        key={image}
        src={image}
        alt="Elil Jewellery"
        initial={{
          scale: 1.08,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* ================= PLUM OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-[#4A294B]/65
        "
      />

      {/* Soft gold glow */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#4A294B]/20
          via-transparent
          to-[#C7A05A]/20
        "
      />

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          justify-between
          w-full
          p-12
          xl:p-16
          text-white
        "
      >

        {/* Logo */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <h1
            className="
              font-[Cinzel]
              text-3xl
              tracking-[0.15em]
            "
          >
            ELIL
          </h1>

          <p
            className="
              mt-1
              text-[10px]
              tracking-[0.45em]
              text-[#E6C37A]
            "
          >
            JEWELLERY
          </p>
        </motion.div>

        {/* Main message */}

        <motion.div
          key={type}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="max-w-md"
        >

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-xs
              text-[#E6C37A]
              mb-5
            "
          >
            {isLogin
              ? "Welcome Back"
              : "Begin Your Journey"}
          </p>

          <h2
            className="
              font-[Cinzel]
              text-4xl
              xl:text-5xl
              leading-tight
            "
          >
            {isLogin
              ? "Where elegance becomes timeless."
              : "A world of elegance awaits."}
          </h2>

          <p
            className="
              mt-6
              text-sm
              leading-7
              text-white/75
              max-w-sm
            "
          >
            {isLogin
              ? "Return to your collection of carefully crafted jewellery and discover pieces made to become part of your story."
              : "Create your Elil account and discover jewellery designed to celebrate every beautiful moment."}
          </p>

        </motion.div>

        {/* Bottom decorative text */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="flex items-center gap-4"
        >

          <div className="h-px w-12 bg-[#C7A05A]" />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-white/60
            "
          >
            Crafted with elegance
          </span>

        </motion.div>

      </div>
    </div>
  );
};

export default AuthBrandPanel;