import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { staticBlogs } from "@/lib/staticBlogs";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const id = (await params).blogId;
  const blog = staticBlogs.find((item) => item._id === id);

  if (!blog) {
    notFound();
  }

  const readingTime = Math.ceil(blog.content.split(" ").length / 200);

  return (
    <article className="relative py-12 text-left pointer-events-auto max-w-2xl">
      <div className="flex flex-col gap-8">
        
        {/* Back Link */}
        <Link 
          href="/blogs"
          className="flex items-center gap-2 font-space text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E92BC] hover:text-[#F4F4FE] transition-colors w-fit group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Articles</span>
        </Link>

        {/* Header Metadata */}
        <div className="flex items-center gap-3">
          <span className="font-space text-[9px] font-bold uppercase tracking-[0.22em] text-[#BCED34] px-3 py-1 rounded-full kail-glass-pill">
            {blog.category}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
          <div className="flex items-center gap-1 font-space text-[#8E92BC] text-[9px] font-bold uppercase tracking-wider">
            <Clock size={10} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F4F4FE] leading-tight">
          {blog.title}
        </h1>

        {/* Date */}
        <div className="flex items-center gap-2 font-space text-[#8E92BC] text-[10px] font-bold uppercase tracking-wider pb-6 border-b border-white/10">
          <Calendar size={11} className="text-[#BCED34]" />
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Feature Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden kail-glass">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Detailed Body Paragraphs */}
        <div className="font-outfit text-[#CDCDE7] text-sm leading-relaxed space-y-6 pt-4">
          <p className="font-semibold text-[#F4F4FE] text-base leading-relaxed">
            {blog.content}
          </p>
          
          <p>
            In modern frontend engineering, building a robust architecture is not merely about writing code that works. It is about crafting codebases that can scale alongside team growth, evolve with design trends, and maintain peak runtime efficiency under heavy load. By locking down core design tokens and decoupling them from transient state changes, we pave the way for sustainable digital interfaces.
          </p>

          <p>
            Key components of this architecture revolve around modular components, atomic folder hierarchies, and strict dependency boundaries. Design systems should serve as standard specifications that frontend engines consume seamlessly, leaving logic operations isolated from visual elements. By doing so, code remains clean, predictable, and highly testable.
          </p>

          <p className="border-l-2 border-[#9996FE] pl-4 py-2 italic text-[#F4F4FE] bg-[#5E64FD]/[0.06] rounded-r-xl">
            &ldquo;Decoupling the visual representation from business state operations is the foundation of structural stability in contemporary web layers.&rdquo;
          </p>

          <p>
            Ultimately, adopting these paradigms results in less technical debt, happier development teams, and exceptionally responsive user experiences that keep visitors engaged and delighted.
          </p>
        </div>

      </div>
    </article>
  );
};

export default BlogDetailPage;
