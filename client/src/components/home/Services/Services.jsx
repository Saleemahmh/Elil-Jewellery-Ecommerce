import {
  PiShieldCheckBold,
  PiDiamondBold,
  PiArrowsClockwiseBold,
} from "react-icons/pi";

import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import ServiceCard from "./ServiceCard";

const services = [
  {
    id: 1,
    hallmark: "925",
    title: "Fine Silver",
    description: "Certified 925 sterling silver in every piece we cast.",
  },
  {
    id: 2,
    icon: PiShieldCheckBold,
    title: "6-Month Warranty",
    description: "Craftsmanship guaranteed against tarnish and wear.",
  },
  {
    id: 3,
    icon: PiDiamondBold,
    title: "Lifetime Plating",
    description: "Complimentary re-plating for as long as you own it.",
  },
  {
    id: 4,
    icon: PiArrowsClockwiseBold,
    title: "Easy 15-Day Returns",
    description: "Not the one? Send it back, no questions asked.",
  },
];

const Services = () => {
  return (
    <section className="bg-[#F7F2EB] py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionTitle
          subtitle="The Elil Standard"
          title="Why Choose Elil"
          description="Every piece is held to the same quiet standard — honest materials, careful finishing, and a promise that outlasts the occasion."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;