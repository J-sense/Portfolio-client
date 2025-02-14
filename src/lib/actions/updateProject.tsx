"use server";

import { ArticleData } from "@/types/types";

export const updateProject = async (
  id: string,
  updatedData: Partial<ArticleData>
) => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed to update the Project.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Update failed." };
  }
};
