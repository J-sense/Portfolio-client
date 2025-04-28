import Projects from "../latest/Projects";

const LatestProjects = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}/projects`);
  const projects = await res.json();
  const { data } = projects;
  console.log(data);
  return (
    <div>
      <Projects pr={data} />
    </div>
  );
};

export default LatestProjects;
