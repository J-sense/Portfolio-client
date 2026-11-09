import Image from "next/image";

const page = async () => {
  return (
    <div className="kail-glass h-screen overflow-hidden md:h-[90vh] md:rounded-3xl">
      <div
        className="mt-2 text-[#F4F4FE] py-2 text-center text-2xl font-medium tracking-tight flex flex-col justify-center items-center h-full"
      >
        <div className="h-full flex flex-col justify-center items-center">
          <div className="w-[100px] h-[100px] rounded-full bg-[#5E64FD]/15 border border-[#9996FE]/40 flex items-center justify-center mb-6">
             <Image 
               src="/images/about-me-real.png" 
               alt="Guest" 
               width={100} 
               height={100} 
               className="rounded-full object-cover"
             />
          </div>
          <h1 className="font-syne uppercase text-3xl my-3 font-extrabold tracking-tight">Welcome to Dashboard</h1>
          <div className="px-6 py-2 rounded-full kail-glass-pill font-space text-[10px] font-bold uppercase tracking-[0.35em] text-[#8E92BC]">
             Guest_Perspective / পাবলিক_ভিউ
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
