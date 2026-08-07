import CampaignSlider from "../../components/home/CampaignSlider";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts/FeaturedProducts";

import Hero from "../../components/home/Hero";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Newsletter from "../../components/home/Newsletter/Newsletter";
import PriceEdit from "../../components/home/PriceEdit/PriceEdit";
import Services from "../../components/home/Services/Services";
import SetCollection from "../../components/home/SetCollection/SetCollection";
import Testimonials from "../../components/home/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <CategorySection></CategorySection>
      <CampaignSlider></CampaignSlider>
      <SetCollection></SetCollection>
      <FeaturedProducts></FeaturedProducts>
      <NewArrivals></NewArrivals>
      <Services></Services>
      
      <PriceEdit></PriceEdit>
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
    </>
  );
};

export default Home;