"use server";

import { ArticleData } from "@/types/types";

export const updateBlog = async (
  id: string,
  updatedData: Partial<ArticleData>
) => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed to update the blog.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Update failed." };
  }
};
