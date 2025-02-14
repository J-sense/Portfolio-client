import { ProjectData } from "@/types/types";

import Link from "next/link";

import React from "react";

import DeleteProject from "@/components/DeleteProject/DeleteProject";
const getProjects = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}/projects`, {
    cache: "force-cache", // Fetch fresh data every time
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

const page = async () => {
  const projects = await getProjects();
  console.log(projects);
  return (
    <div>
      <div>
        {projects.data.map((item: ProjectData) => (
          <div
            key={item._id}
            className="  rounded-2xl px-4  mt-10 py-6 bg-zinc-800 flex justify-between"
          >
            <h1>{item.title}</h1>
            <div className="flex gap-3 items-center">
              <Link
                href={`/dashboard/projects/${item._id}`}
                className="px-4 py-2  bg-blue-600 text-white rounded hover:bg-blue-500 transition"
              >
                Update
              </Link>
              <div className="ml-auto">
                <DeleteProject blogId={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
