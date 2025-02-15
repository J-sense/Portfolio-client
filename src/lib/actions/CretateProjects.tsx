"use server";

import { ProjectData } from "@/types/types";

const CreateProjects = async (projectData: ProjectData) => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}/create-projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    // if (!res.ok) {
    //   throw new Error(`Error: ${res.status} - ${res.statusText}`);
    // }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, message: "Failed to create project" };
  }
};

export default CreateProjects;
