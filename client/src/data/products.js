import ring from "../assets/images/products/ring_1.jpeg";
import necklace from "../assets/images/products/necklace_1.jpg";
import bracelet from "../assets/images/products/bracelet_1.jpg";
import earrings from "../assets/images/products/earring_1.jpg";

export const products = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    slug: "diamond-solitaire-ring",
    category: "Rings",
    price: 24999,
    featured: true,
    image: ring,
  },
  {
    id: 2,
    name: "Pearl Gold Necklace",
    slug: "pearl-necklace",
    category: "Necklaces",
    price: 31999,
    featured: false,
    image: necklace,
  },
  {
    id: 3,
    name: "Rose Gold Bracelet",
    slug: "rose-gold-bracelet",
    category: "Bracelets",
    price: 18999,
    featured: true,
    image: bracelet,
  },
  {
    id: 4,
    name: "Emerald Drop Earrings",
    slug: "emerald-earrings",
    category: "Earrings",
    price: 15999,
    featured: true,
    image: earrings,
  },
];
