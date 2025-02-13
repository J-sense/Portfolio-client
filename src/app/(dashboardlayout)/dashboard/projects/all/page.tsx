import { ProjectData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import assets from "@/assets/products.jpg";

import React from "react";
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
            className="  rounded-2xl p-3 mx-16 mt-10 py-10 bg-zinc-800 flex justify-between"
          >
            <div>
              <Image
                src={item.image ? item.image : assets}
                height={50}
                width={50}
                alt="alt"
              />
              <h1 className="text-white text-2xl">{item.title}</h1>
            </div>
            <div>
              <Link
                href={`/dashboard/blogs/${item._id}`}
                className="px-4 py-2  bg-blue-600 text-white rounded hover:bg-blue-500 transition"
              >
                Update
              </Link>
              <button className="px-4 py-2  bg-red-700 text-white rounded transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
