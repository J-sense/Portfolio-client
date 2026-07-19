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
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#998f8f] hover:text-white transition-colors w-fit group"
        >
          <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Articles</span>
        </Link>

        {/* Header Metadata */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#c5ff41] px-2.5 py-0.5 rounded-full bg-[#c5ff41]/5 border border-[#c5ff41]/20">
            {blog.category}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="flex items-center gap-1 text-[#998f8f] text-[9px] font-bold uppercase tracking-wider">
            <Clock size={10} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
          {blog.title}
        </h1>

        {/* Date */}
        <div className="flex items-center gap-2 text-[#998f8f] text-[10px] font-bold uppercase tracking-wider pb-6 border-b border-white/[0.06]">
          <Calendar size={11} className="text-[#f46c38]" />
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Feature Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/[0.05] bg-[#1b1918]">
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
        <div className="text-white/80 text-sm leading-relaxed space-y-6 pt-4">
          <p className="font-semibold text-white/95 text-base leading-relaxed">
            {blog.content}
          </p>
          
          <p>
            In modern frontend engineering, building a robust architecture is not merely about writing code that works. It is about crafting codebases that can scale alongside team growth, evolve with design trends, and maintain peak runtime efficiency under heavy load. By locking down core design tokens and decoupling them from transient state changes, we pave the way for sustainable digital interfaces.
          </p>

          <p>
            Key components of this architecture revolve around modular components, atomic folder hierarchies, and strict dependency boundaries. Design systems should serve as standard specifications that frontend engines consume seamlessly, leaving logic operations isolated from visual elements. By doing so, code remains clean, predictable, and highly testable.
          </p>

          <p className="border-l-2 border-[#c5ff41] pl-4 py-1 italic text-white/90 bg-[#c5ff41]/[0.02]">
            "Decoupling the visual representation from business state operations is the foundation of structural stability in contemporary web layers."
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
