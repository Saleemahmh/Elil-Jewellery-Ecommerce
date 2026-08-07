import { Link } from "react-router-dom";
import {
  PiInstagramLogoBold,
  PiFacebookLogoBold,
  PiPinterestLogoBold,
  PiWhatsappLogoBold,
} from "react-icons/pi";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

import Container from "../common/Container";

/**
 * Assumes this lives at src/components/layout/Footer.jsx, so
 * "../common/Container" is one level up into components/common/.
 * Adjust if placed elsewhere.
 *
 * Swap the href="#" placeholders (social links, policy pages) for
 * your real URLs/routes once they exist.
 */

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
];

const customerCare = [
  { label: "Shipping Info", to: "/shipping" },
  { label: "Returns & Exchanges", to: "/returns" },
  { label: "FAQs", to: "/faq" },
  { label: "Track Order", to: "/track-order" },
];

const socialLinks = [
  { icon: PiInstagramLogoBold, href: "#", label: "Instagram" },
  { icon: PiFacebookLogoBold, href: "#", label: "Facebook" },
  { icon: PiPinterestLogoBold, href: "#", label: "Pinterest" },
  { icon: PiWhatsappLogoBold, href: "#", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="bg-[#341A36] pt-16 lg:pt-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10 lg:gap-8 pb-14">
          {/* ================= BRAND ================= */}
          <div>
            <h3 className="font-[Cinzel] text-2xl text-[#F7F2EB] tracking-wide">
              ELIL
            </h3>
            <p className="mt-4 text-[#C9BFC6] text-sm leading-7 max-w-xs">
              Timeless designs crafted for every story. Handcrafted
              jewellery made to be worn, loved, and passed down.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-9 h-9
                    rounded-full
                    border border-[#C7A05A]/40
                    flex items-center justify-center
                    text-[#E6C37A]
                    transition-all duration-300
                    hover:bg-[#C7A05A]
                    hover:text-[#341A36]
                    hover:border-[#C7A05A]
                  "
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <p className="uppercase tracking-[0.25em] text-[#C7A05A] text-xs font-medium">
              Quick Links
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[#C9BFC6] text-sm hover:text-[#E6C37A] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CUSTOMER CARE ================= */}
          <div>
            <p className="uppercase tracking-[0.25em] text-[#C7A05A] text-xs font-medium">
              Customer Care
            </p>
            <ul className="mt-5 space-y-3">
              {customerCare.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[#C9BFC6] text-sm hover:text-[#E6C37A] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= GET IN TOUCH ================= */}
          <div>
            <p className="uppercase tracking-[0.25em] text-[#C7A05A] text-xs font-medium">
              Get in Touch
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#C7A05A] mt-0.5 shrink-0" size={16} />
                <span className="text-[#C9BFC6] text-sm leading-6">
                  123 Anna Salai, Chennai,
                  <br />
                  Tamil Nadu 600002, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-[#C7A05A] shrink-0" size={16} />
                <a
                  href="tel:+911234567890"
                  className="text-[#C9BFC6] text-sm hover:text-[#E6C37A] transition-colors duration-300"
                >
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-[#C7A05A] shrink-0" size={16} />
                <a
                  href="mailto:hello@elil.com"
                  className="text-[#C9BFC6] text-sm hover:text-[#E6C37A] transition-colors duration-300"
                >
                  hello@elil.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Gold hairline, same motif used across the site */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C7A05A]/40 to-transparent" />

        {/* ================= BOTTOM BAR ================= */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8F8390] text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Elil Jewellery. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-[#8F8390] text-xs hover:text-[#E6C37A] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-[#8F8390] text-xs hover:text-[#E6C37A] transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;