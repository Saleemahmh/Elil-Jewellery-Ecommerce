
import CampaignSlider from "../../components/home/CampaignSlider";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts/FeaturedProducts";

import Hero from "../../components/home/Hero";
import PriceEdit from "../../components/home/PriceEdit/PriceEdit";
import SetCollection from "../../components/home/SetCollection/SetCollection";

const Home = () => {
  return (
    <>
    <Hero></Hero>
    <CategorySection></CategorySection>
    <CampaignSlider></CampaignSlider>
    <PriceEdit></PriceEdit>
      <SetCollection></SetCollection>
      <FeaturedProducts></FeaturedProducts>
    </>
  );
};
 
export default Home;