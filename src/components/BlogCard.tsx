import { ArticleData } from "@/types/types";
import Image from "next/image";

const BlogCard = ({ blog }: { blog: ArticleData }) => {
  return (
    <div className="max-w-sm my-32 bg-zinc-950 text-white-100 border border-slate-500 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative w-full h-48 ">
        <Image
          src={blog.image}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">
          {blog.content}
        </p>
        <div className="mt-4 flex justify-between items-center">
          {/* <span className="text-sm text-gray-500">
            {new Date(blog.createdAt).toDateString()}
          </span> */}
          <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-600 transition">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
