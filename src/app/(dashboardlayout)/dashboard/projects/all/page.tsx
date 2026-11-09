import { ProjectData } from "@/types/types";
import Link from "next/link";
import React from "react";
import DeleteProject from "@/components/DeleteProject/DeleteProject";

export const dynamic = "force-dynamic";

const getProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { data: [] };
    }

    return await res.json().catch(() => ({ data: [] }));
  } catch {
    return { data: [] };
  }
};

const page = async () => {
  const projects = await getProjects();

  return (
    <div>
      <div>
        {projects.data.map((item: ProjectData) => (
          <div
            key={item._id}
            className="rounded-2xl px-6 mt-6 py-5 kail-glass text-[#F4F4FE] flex justify-between items-center"
          >
            <h1 className="font-syne font-bold text-lg">{item.title}</h1>
            <div className="flex gap-3 items-center">
              <Link
                href={`/dashboard/projects/${item._id}`}
                className="px-4 py-2 bg-[#5E64FD] hover:bg-[#BCED34] text-[#F4F4FE] hover:text-[#07080E] font-space text-xs font-bold uppercase tracking-wider rounded-full transition"
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
