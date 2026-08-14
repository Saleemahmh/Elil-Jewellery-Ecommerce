import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import TestimonialCard from "./Testimonialcard";

import { testimonials } from "../../../data/textimonials.js";

/**
 * Assumes this lives at src/components/home/Testimonials/Testimonials.jsx
 * (matching your Services/PriceEdit folder pattern) — adjust the
 * "../../" import depth above if placed elsewhere.
 */
const Testimonials = () => {
  return (
    <section className="bg-[#F7F2EB] py-16 lg:py-20">
      <Container>
        <SectionTitle
          subtitle="What They're Saying"
          title="Loved, Worn, Cherished"
          description="Real words from people who found their piece with Elil."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;