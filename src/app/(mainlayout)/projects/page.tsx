import Card from "@/components/Card";
import { ProjectData } from "@/types/types";

const ProjectsPage = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}/projects`);
  const projects = await res.json();
  console.log(projects);

  return (
    <>
      <div className="w-[90%] mx-auto grid lg:grid-cols-3 gap-3 min-h-screen">
        {projects?.data.map((item: ProjectData, index: string) => (
          <Card project={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
