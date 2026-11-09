import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className="relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-full p-[1px] focus:outline-none"
      onClick={handleClick}
    >
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
        style={{
          backgroundImage:
            "conic-gradient(from 90deg at 50% 50%, #9996FE 0%, #5E64FD 50%, #BCED34 100%)",
        }}
      />

      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full
             bg-[#0E101B]/90 px-7 font-space text-xs font-bold uppercase tracking-[0.2em] text-[#F4F4FE] backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
