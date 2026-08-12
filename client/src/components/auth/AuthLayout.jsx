import { motion } from "framer-motion";
import AuthBrandPanel from "./AuthBrandPanel";

const AuthLayout = ({
  children,
  type = "login",
}) => {
  return (
    <main className="min-h-screen bg-[#F7F2EB]">

      <div className="flex min-h-screen">

        {/* ================= BRAND PANEL ================= */}

        <AuthBrandPanel type={type} />

        {/* ================= FORM PANEL ================= */}

        <div
          className="
            w-full
            lg:w-1/2
            min-h-screen
            flex
            items-center
            justify-center
            px-6
            py-12
            md:px-10
            xl:px-20
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>

        </div>

      </div>

    </main>
  );
};

export default AuthLayout;