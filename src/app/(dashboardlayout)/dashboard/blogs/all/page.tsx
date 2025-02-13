// import DeleteBlog from "@/components/deleteBlog/DeleteBlog";
// import { data } from "motion/react-client";
// import Image from "next/image";
// import Link from "next/link";
// import DeleteBlog from "./delete-blog";

import DeleteBlog from "@/components/deleteBlog/DeleteBlog";
import { ArticleData } from "@/types/types";
import Link from "next/link";

const getBlogs = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}/blogs`, {
    cache: "no-store", // Fetch fresh data every time
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

export default async function Dashboard() {
  const blogs = await getBlogs();
  //   console.log(blogs);
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs?.data.length > 0 ? (
          blogs.data.map((blog: ArticleData) => (
            <div
              key={blog._id}
              className="bg-gray-900 p-4 rounded-lg shadow-lg relative h-[180px]"
            >
              <h2 className="text-lg font-semibold mt-4">{blog.title}</h2>
              <p className="text-gray-400 mt-2">
                {blog.content.slice(0, 50)}...
              </p>
              <div className="flex gap-12 bottom-2 absolute">
                {/* Update Button */}
                <Link
                  href={`/dashboard/blogs/${blog._id}`}
                  className="px-4 py-2  bg-blue-600 text-white rounded hover:bg-blue-500 transition"
                >
                  Update
                </Link>

                {/* Delete Button (Client Component) */}
                <div className="ml-auto">
                  <DeleteBlog blogId={blog._id} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
}
