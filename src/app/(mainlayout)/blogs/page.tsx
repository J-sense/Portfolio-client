import BlogCard from "@/components/BlogCard";
import { staticBlogs } from "@/lib/staticBlogs";

export const dynamic = "force-dynamic";

const Blogs = () => {
  return (
    <section className="relative py-12 text-left pointer-events-auto">
      <div className="flex flex-col gap-12 w-full">
        
        {/* Page Header */}
        <div>
          <span className="inline-flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-[#38bdf8] uppercase mb-4 border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3 py-1 rounded-full w-fit">
            Writing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#e2e8f0] leading-none">
            DESIGN &<br />
            <span className="text-[#94a3b8]">TECH THOUGHTS</span>
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
