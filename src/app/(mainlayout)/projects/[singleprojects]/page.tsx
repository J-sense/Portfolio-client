import ViewDetails from "@/components/viewDetails/ViewDetails";

const page = async ({
  params,
}: {
  params: Promise<{ singleprojects: string }>;
}) => {
  const id = (await params).singleprojects;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`);
  const project = await res.json();

  return (
    <div>
      <ViewDetails data={project.data} />
    </div>
  );
};

export default page;
