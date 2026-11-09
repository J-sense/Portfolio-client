"use client";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { sentMessage } from "./message/SentMessage";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Connect = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedBudget, setSelectedBudget] = useState("< $3k");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    "< $3k",
    "$3k - $5k",
    "$5k - $10k",
    "> $10k",
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    // Combine selected budget into the message text to fit the database schema
    const combinedMessage = `[Selected Budget: ${selectedBudget}] \n\n${data.message}`;
    
    const inputData = {
      name: data.name,
      email: data.email,
      message: combinedMessage,
    };

    const res = await sentMessage(inputData);
    setIsSubmitting(false);

    if (res) {
      alert("Message sent successfully!");
      reset();
      setSelectedBudget("< $3k");
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-12 bg-transparent overflow-hidden pointer-events-auto w-full">
      {/* Background accent glow */}
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#5E64FD]/10 blur-[150px] rounded-full -z-10" />

      <div className="w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Contact details & Callout */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <span className="inline-flex items-center gap-2 font-space text-[10px] font-bold tracking-[0.28em] text-[#BCED34] uppercase mb-4 kail-glass-pill px-3.5 py-1.5 rounded-full w-fit">
              Get in Touch
            </span>
            
            <h2 className="font-syne text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold mb-8 tracking-tight text-white uppercase leading-[1.02]">
              LET&apos;S WORK<br />
              <span className="text-[#BCED34]">TOGETHER</span>
            </h2>
            
            <p className="font-outfit text-white/85 text-sm leading-relaxed mb-10 max-w-sm">
              I am always excited to collaborate on new and challenging projects. Feel free to reach out to discuss how we can work together to achieve your goals.
            </p>

            {/* Direct Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full kail-glass-pill flex items-center justify-center text-white group-hover:text-[#BCED34] transition-colors">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-[8px] font-bold text-white/80 uppercase tracking-[0.22em]">Email me</span>
                  <a href="mailto:jishan1873@gmail.com" className="font-syne text-sm font-bold text-white hover:text-[#BCED34] transition-colors">
                    jishan1873@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full kail-glass-pill flex items-center justify-center text-white group-hover:text-[#BCED34] transition-colors">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-[8px] font-bold text-white/80 uppercase tracking-[0.22em]">Call me</span>
                  <a href="tel:+8801914667297" className="font-syne text-sm font-bold text-white hover:text-[#BCED34] transition-colors">
                    +880 1914-667297
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full kail-glass-pill flex items-center justify-center text-white group-hover:text-[#BCED34] transition-colors">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-space text-[8px] font-bold text-white/80 uppercase tracking-[0.22em]">Location</span>
                  <span className="font-syne text-sm font-bold text-white">
                    Feni, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative p-6 sm:p-10 rounded-[2rem] kail-glass">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name */}
                <div className="flex flex-col text-left">
                  <label className="font-space text-[9px] font-bold uppercase tracking-[0.22em] text-white/85 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/25 font-outfit text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#BCED34] focus:bg-white/15 transition-all"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col text-left">
                  <label className="font-space text-[9px] font-bold uppercase tracking-[0.22em] text-white/85 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/25 font-outfit text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#BCED34] focus:bg-white/15 transition-all"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>

                {/* Budget Range selector */}
                <div className="flex flex-col text-left">
                  <label className="font-space text-[9px] font-bold uppercase tracking-[0.22em] text-white/85 mb-3">Project Budget</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5">
                    {budgetOptions.map((option) => {
                      const isSelected = selectedBudget === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedBudget(option)}
                          className={`py-3 px-2 rounded-2xl font-space text-[10px] font-bold uppercase tracking-[0.16em] text-center border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#BCED34] text-[#1728F4] border-transparent shadow-[0_8px_24px_rgba(188,237,52,0.35)]"
                              : "bg-white/10 text-white/85 border-white/25 hover:text-white hover:border-white/50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col text-left">
                  <label className="font-space text-[9px] font-bold uppercase tracking-[0.22em] text-white/85 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/25 font-outfit text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#BCED34] focus:bg-white/15 transition-all resize-none"
                    placeholder="Write details about your project..."
                    {...register("message", { required: "Message is required" })}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#BCED34] hover:bg-white text-[#1728F4] font-space font-bold text-xs uppercase tracking-[0.22em] rounded-full transition-all duration-300 disabled:opacity-50 shadow-[0_12px_32px_rgba(188,237,52,0.35)]"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  <ArrowUpRight size={14} />
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Connect;
