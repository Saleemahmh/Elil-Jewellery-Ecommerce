
import CampaignSlider from "../../components/home/CampaignSlider";
import CategorySection from "../../components/home/CategorySection";

import Hero from "../../components/home/Hero";
import SetCollection from "../../components/home/SetCollection/SetCollection";

const Home = () => {
  return (
    <>
    <Hero></Hero>
    <CategorySection></CategorySection>
    <CampaignSlider></CampaignSlider>
      <SetCollection></SetCollection>
    </>
  );
};
 
export default Home;