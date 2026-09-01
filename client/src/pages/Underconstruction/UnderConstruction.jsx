import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import Container from "../../components/common/Container";

const UnderConstruction = () => {
  const location = useLocation();

  // Optional page name from navigation state
  const pageName = location.state?.pageName || "This Page";

  return (
    <div className="min-h-screen bg-[#FDFBF8]">
      <Container>
        <div className="flex min-h-[80vh] items-center justify-center py-20">
          <div className="w-full max-w-2xl text-center">

            {/* Decorative Icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#C7A05A]/40 bg-[#F8F1E8]">
              <span className="text-3xl text-[#C7A05A]">✦</span>
            </div>

            {/* Small Heading */}
            <p className="text-xs uppercase tracking-[0.35em] text-[#C7A05A]">
              Coming Soon
            </p>

            {/* Main Heading */}
            <h1 className="mt-4 font-[Cinzel] text-4xl text-[#341A36] md:text-6xl">
              {pageName}
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#8A7985] md:text-base">
              We're carefully crafting this experience for you.
              This page is currently under construction and will be
              available soon.
            </p>

            {/* Decorative Line */}
            <div className="mx-auto mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-[#C7A05A]/40" />
              <span className="text-[#C7A05A]">✦</span>
              <span className="h-px w-16 bg-[#C7A05A]/40" />
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-xl border border-[#341A36] px-6 py-3 text-sm font-medium text-[#341A36] transition hover:bg-[#341A36] hover:text-white"
              >
                <FiArrowLeft />
                Go Back
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#341A36] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4A254C]"
              >
                <FiHome />
                Back to Home
              </Link>

            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default UnderConstruction;
