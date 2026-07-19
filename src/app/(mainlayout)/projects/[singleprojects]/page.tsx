import ViewDetails from "@/components/viewDetails/ViewDetails";
import { featuredProjects } from "@/lib/featuredProjects";

export const dynamic = "force-dynamic";

const page = async ({
  params,
}: {
  params: Promise<{ singleprojects: string }>;
}) => {
  const paramId = (await params).singleprojects;
  
  // Find match using slug or id
  const project = featuredProjects.find(
    (p) => p.slug === paramId || String(p.id) === paramId
  );

  // Fallback / Format data to match what ViewDetails expects
  const formattedData = project
    ? {
        _id: String(project.id),
        title: project.title,
        image: project.image,
        description: project.description,
        technologies: project.technologies,
        liveLink: project.liveUrl,
        createdAt: new Date().toISOString(), // Mock date
      }
    : null;

  return (
    <div>
      <ViewDetails data={formattedData} />
    </div>
  );
};

export default page;
