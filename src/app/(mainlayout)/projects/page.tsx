import Projects from "@/components/latest/Projects";
import { featuredProjects } from "@/lib/featuredProjects";

export const dynamic = "force-dynamic";

const ProjectsPage = () => {
  return (
    <div className="w-full">
      <Projects pr={featuredProjects} showAll={true} />
    </div>
  );
};

export default ProjectsPage;
