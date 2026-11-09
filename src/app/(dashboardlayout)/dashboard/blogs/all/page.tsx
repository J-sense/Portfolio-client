import DeleteBlog from "@/components/deleteBlog/DeleteBlog";
import { ArticleData } from "@/types/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

const getBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
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

export default async function Dashboard() {
  const blogs = await getBlogs();
  return (
    <div className="min-h-screen bg-[#07080E] text-[#F4F4FE] p-6">
      <h1 className="font-syne text-3xl font-extrabold text-center mb-6">All Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs?.data.length > 0 ? (
          blogs.data.map((blog: ArticleData) => (
            <div
              key={blog._id}
              className="kail-glass p-5 rounded-2xl relative h-[180px]"
            >
              <h2 className="font-syne text-lg font-bold mt-2 text-[#F4F4FE]">{blog.title}</h2>
              <p className="font-outfit text-sm text-[#8E92BC] mt-2">
                {blog.content.slice(0, 50)}...
              </p>
              <div className="flex gap-12 bottom-4 absolute">
                {/* Update Button */}
                <Link
                  href={`/dashboard/blogs/${blog._id}`}
                  className="px-4 py-2 bg-[#5E64FD] hover:bg-[#BCED34] text-[#F4F4FE] hover:text-[#07080E] font-space text-xs font-bold uppercase tracking-wider rounded-full transition"
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
          <p className="font-outfit text-[#8E92BC]">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
