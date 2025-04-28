import About from "@/components/ABout";
// import Contact from "@/components/Contact";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";

import LatestProjects from "@/components/LatestProject/LatestProjects";
import Work from "@/components/Work";

// import { Inter } from 'next/font/google'

const Home = () => {
  return (
    <main className="relative bg-[#000] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="md:max-w-7xl w-full">
        <Hero />
        <Grid />
        <LatestProjects />
        <About />
        <Work />
        {/* <Contact /> */}
      </div>
    </main>
  );
};

export default Home;
