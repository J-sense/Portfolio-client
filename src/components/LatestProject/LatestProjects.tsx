import { featuredProjects } from "@/lib/featuredProjects";
import Projects from "../latest/Projects";

const LatestProjects = () => {
  return (
    <div>
      <Projects pr={featuredProjects} />
    </div>
  );
};

export default LatestProjects;
