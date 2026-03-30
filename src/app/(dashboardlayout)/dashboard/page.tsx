// import { LampContainer } from "@/components/ui/lamp";
import Image from "next/image";
// import { LampContainer } from "../ui/lamp";
// import { LampContainer } from "../ui/lamp";
const page = async () => {
  return (
    <div className="shadow-md bg-[#020617] h-screen overflow-hidden md:h-[90vh] md:border md:rounded-xl">
      <div
        //   initial={{ opacity: 0.5, y: 100 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   transition={{
        //     delay: 0.3,
        //     duration: 0.8,
        //     ease: "easeInOut",

        className="mt-2  text-white py-2 bg-clip-text text-center text-2xl font-medium tracking-tight  flex flex-col justify-center items-center h-full"
      >
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-[100px] h-[100px] rounded-full bg-purple/20 border border-purple/40 flex items-center justify-center mb-6">
             <Image 
               src="/images/about-me-real.png" 
               alt="Guest" 
               width={100} 
               height={100} 
               className="rounded-full object-cover"
             />
          </div>
          <h1 className="uppercase text-3xl my-3 font-bold tracking-tighter">Welcome to Dashboard</h1>
          <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
             Guest_Perspective / পাবলিক_ভিউ
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
