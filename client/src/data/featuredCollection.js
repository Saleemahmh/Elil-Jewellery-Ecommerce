import hero from "../assets/images/featured/featured_1.jpg";
import product1 from "../assets/images/featured/preview1.jpg";
import product2 from "../assets/images/featured/preview2.jpg";

export const featuredCollection = {
  title: "Celestial Pearl",

  subtitle:
    "A timeless collection inspired by moonlight, delicate pearls and modern elegance.",

  button: "Explore Collection",

  heroImage: hero,

  products: [
    {
      id: 1,
      name: "Pearl Necklace",
      image: product1,
      price: "₹5,499",
    },

    {
      id: 2,
      name: "Golden Bracelet",
      image: product2,
      price: "₹3,999",
    },
  ],
};
