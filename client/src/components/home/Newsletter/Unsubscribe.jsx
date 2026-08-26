import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

import Container from "../../common/Container";
import Button from "../../common/Button";
import { unsubscribeFromNewsletter } from "../../../services/newsletterService";


const Unsubscribe = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      try {
        const response = await unsubscribeFromNewsletter(token);
        if (!isMounted) return;
        setStatus("success");
        setMessage(response.message || "You've been unsubscribed.");
      } catch (error) {
        if (!isMounted) return;
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "This unsubscribe link is invalid or has already been used."
        );
      }
    };

    if (token) {
      run();
    } else {
      setStatus("error");
      setMessage("No unsubscribe link was provided.");
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <section className="min-h-[70vh] flex items-center bg-[#F7F2EB] py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          {status === "loading" && (
            <>
              <div
                className="
                  mx-auto
                  mb-6
                  h-10
                  w-10
                  rounded-full
                  border-2
                  border-[#C7A05A]
                  border-t-transparent
                  animate-spin
                "
              />
              <p className="font-[Cinzel] text-lg text-[#4A294B]">
                Processing your request...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <FiCheckCircle
                size={44}
                className="mx-auto text-[#C7A05A] mb-5"
              />

              <p className="uppercase tracking-[0.3em] text-[11px] text-[#C7A05A]">
                The Elil Circle
              </p>

              <h1 className="mt-3 font-[Cinzel] text-2xl md:text-3xl text-[#4A294B]">
                You're unsubscribed
              </h1>

              <p className="mt-4 text-sm leading-6 text-[#7A6E68]">
                {message} You won't receive any more emails from us —
                you're always welcome back.
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <FiXCircle
                size={44}
                className="mx-auto text-[#B0453C] mb-5"
              />

              <p className="uppercase tracking-[0.3em] text-[11px] text-[#C7A05A]">
                The Elil Circle
              </p>

              <h1 className="mt-3 font-[Cinzel] text-2xl md:text-3xl text-[#4A294B]">
                Something went wrong
              </h1>

              <p className="mt-4 text-sm leading-6 text-[#7A6E68]">
                {message}
              </p>
            </>
          )}

          <div className="mt-8">
            <Button to="/shop" variant="gold">
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Unsubscribe;