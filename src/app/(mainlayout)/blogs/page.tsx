import BlogCard from "@/components/BlogCard";

import { ArticleData } from "@/types/types";

const Blogs = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}/blogs`);
  const projects = await res.json();
  console.log(projects);

  return (
    <>
      <div className="w-[90%] mx-auto grid grid-cols-3 gap-3 ">
        {projects?.data.map((item: ArticleData, index: string) => (
          <BlogCard blog={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
