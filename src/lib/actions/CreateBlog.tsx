"use server";

import { ArticleData } from "@/types/types";

const CreateBlog = async (blogData: ArticleData) => {
  try {
    // Debugging log

    const res = await fetch(`${process.env.DATABASE_URL}/create-blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("CreateBlog API Error:", error);
    return { success: false, message: "Failed to create blog" };
  }
};

export default CreateBlog;
