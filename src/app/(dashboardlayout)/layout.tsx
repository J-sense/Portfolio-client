import Sidebar from "@/components/Sidebar";
import { authOptions } from "@/lib/authOptions";
import { TUser } from "@/types/types";
import { getServerSession } from "next-auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session: TUser = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex min-h-screen bg-[#000000]">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed inset-y-0 left-0 w-64 z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 w-full overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
