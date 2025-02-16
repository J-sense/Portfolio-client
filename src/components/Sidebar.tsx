"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  PenTool,
  Folder,
  MessageSquare,
  PlusCircle,
  List,
} from "lucide-react";

import { signOut } from "next-auth/react";

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
      bg-gradient-to-b bg-slate-950  to-[#c77dff] backdrop-blur-lg 
      shadow-lg rounded-r-xl m-2 text-white border border-white/30`}
    >
      {/* Toggle button for mobile */}
      <button
        className="absolute top-4 right-[-35px] z-50 bg-purple-100 md:hidden border p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="space-y-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
              pathName === link.href
                ? "bg-white/40 shadow-md border border-white/50"
                : "hover:bg-white/20"
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}

        {/* Projects Dropdown */}
        <div>
          <button
            onClick={() => setProjectOpen(!projectOpen)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all bg-white/20 hover:bg-white/30"
          >
            <span className="flex items-center gap-3">
              <Folder size={20} /> Projects
            </span>
            {projectOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {projectOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <Link
                href="/dashboard/projects/create"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20"
              >
                <PlusCircle size={18} /> Create Project
              </Link>
              <Link
                href="/dashboard/projects/all"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20"
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
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all bg-white/20 hover:bg-white/30"
          >
            <span className="flex items-center gap-3">
              <PenTool size={20} /> Blogs
            </span>
            {blogOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {blogOpen && (
            <div className="ml-6 mt-2 space-y-2">
              <Link
                href="/dashboard/blogs/create"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20"
              >
                <PlusCircle size={18} /> Create Blog
              </Link>
              <Link
                href="/dashboard/blogs/all"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/20"
              >
                <List size={18} /> View Blogs
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: `https://portfolio-client-seven-phi.vercel.app/login`,
            })
          }
          className="flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-400 transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
