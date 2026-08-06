import CampaignSlider from "../../components/home/CampaignSlider";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts/FeaturedProducts";

import Hero from "../../components/home/Hero";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import PriceEdit from "../../components/home/PriceEdit/PriceEdit";
import Services from "../../components/home/Services/Services";
import SetCollection from "../../components/home/SetCollection/SetCollection";

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
    </>
  );
};

export default Home;