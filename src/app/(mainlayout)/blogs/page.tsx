import BlogCard from "@/components/BlogCard";

import { ArticleData } from "@/types/types";

const Blogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
  const projects = await res.json();


  return (
    <>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 gap-3 ">
        {projects?.data.map((item: ArticleData, index: string) => (
          <BlogCard blog={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
