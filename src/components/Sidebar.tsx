"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  PenTool,
  Folder,
  MessageSquare,
  PlusCircle,
  List,
} from "lucide-react";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const pathName = usePathname();

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: "/dashboard/messages",
      label: "Messages",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 p-5 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0 transition-transform duration-300 ease-in-out 
      kail-glass rounded-r-2xl m-2 text-[#F4F4FE] font-outfit`}
    >
      {/* Toggle button for mobile */}
      <button
        className="absolute top-4 right-[-35px] z-50 bg-[#0E101B] text-[#BCED34] md:hidden border border-white/15 p-2 rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <h2 className="font-syne text-2xl font-extrabold mb-6 text-[#F4F4FE]">Dashboard</h2>
      <nav className="space-y-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
              pathName === link.href
                ? "bg-[#5E64FD] text-[#F4F4FE] font-semibold shadow-md border border-[#9996FE]/50"
                : "text-[#8E92BC] hover:text-[#F4F4FE] hover:bg-white/10"
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}

        {/* Projects Dropdown */}
        <div>
          <button
            onClick={() => setProjectOpen(!projectOpen)}
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all bg-white/[0.04] border border-white/12 text-[#F4F4FE] hover:border-[#9996FE]/50"
          >
            <span className="flex items-center gap-3">
              <Folder size={20} className="text-[#9996FE]" /> Projects
            </span>
            {projectOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {projectOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <Link
                href="/dashboard/projects/create"
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#8E92BC] hover:text-[#BCED34] hover:bg-white/5"
              >
                <PlusCircle size={18} /> Create Project
              </Link>
              <Link
                href="/dashboard/projects/all"
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#8E92BC] hover:text-[#BCED34] hover:bg-white/5"
              >
                <List size={18} /> View Projects
              </Link>
            </div>
          )}
        </div>

        {/* Blogs Dropdown */}
        <div>
          <button
            onClick={() => setBlogOpen(!blogOpen)}
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all bg-white/[0.04] border border-white/12 text-[#F4F4FE] hover:border-[#9996FE]/50"
          >
            <span className="flex items-center gap-3">
              <PenTool size={20} className="text-[#9996FE]" /> Blogs
            </span>
            {blogOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {blogOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <Link
                href="/dashboard/blogs/create"
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#8E92BC] hover:text-[#BCED34] hover:bg-white/5"
              >
                <PlusCircle size={18} /> Create Blog
              </Link>
              <Link
                href="/dashboard/blogs/all"
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#8E92BC] hover:text-[#BCED34] hover:bg-white/5"
              >
                <List size={18} /> View Blogs
              </Link>
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;
