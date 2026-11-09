import BlogCard from "@/components/BlogCard";
import { staticBlogs } from "@/lib/staticBlogs";

export const dynamic = "force-dynamic";

const Blogs = () => {
  return (
    <section className="relative py-12 text-left pointer-events-auto">
      <div className="flex flex-col gap-12 w-full">
        
        {/* Page Header */}
        <div>
          <span className="inline-flex items-center gap-2 font-space text-[9px] font-bold tracking-[0.28em] text-[#BCED34] uppercase mb-4 kail-glass-pill px-3.5 py-1.5 rounded-full w-fit">
            Writing
          </span>
          <h1 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F4F4FE] leading-[1.04]">
            DESIGN &<br />
            <span className="text-[#9996FE]">TECH THOUGHTS</span>
          </h1>
        </div>

        {/* Blogs Grid (2 Columns inside scrollable panel) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {staticBlogs.map((item, index) => (
            <BlogCard blog={item} key={item._id} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blogs;
