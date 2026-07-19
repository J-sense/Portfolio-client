import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import LatestProjects from "@/components/LatestProject/LatestProjects";
import Work from "@/components/Work";

export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 w-full">
      <Hero />
      <Grid />
      <LatestProjects />
      <Work />
    </div>
  );
};

export default Home;
