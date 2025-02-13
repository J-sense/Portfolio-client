"use client";

import { useState } from "react";

export default function DeleteBlog({ blogId }: { blogId: string | undefined }) {
  console.log(blogId);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const api = process.env.DATABASE_URL;
      console.log(api);
      const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("Blog deleted successfully!");
        window.location.reload(); // Refresh page after deletion
      } else {
        alert(data.message || "Failed to delete blog.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
