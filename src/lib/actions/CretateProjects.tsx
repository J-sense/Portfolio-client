"use server";

import { ProjectData } from "@/types/types";

const CreateProjects = async (projectData: ProjectData) => {
  const res = await fetch(`${process.env.DATABASE_URL}/create-projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData), // Ensure you pass the project data here
  });

  const data = await res.json();
  return data;
};

export default CreateProjects;
