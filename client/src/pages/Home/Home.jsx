
import CampaignSlider from "../../components/home/CampaignSlider";
import CategorySection from "../../components/home/CategorySection";
import FeaturedCollection from "../../components/home/FeaturedCollection";
import Hero from "../../components/home/Hero";

const Home = () => {
  return (
    <>
    <Hero></Hero>
    <CategorySection></CategorySection>
    <CampaignSlider></CampaignSlider>
      <FeaturedCollection></FeaturedCollection>
    </>
  );
};
 
export default Home;