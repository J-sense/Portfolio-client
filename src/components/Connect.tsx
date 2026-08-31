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
      {/* Background neon light glow */}
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#38bdf8]/5 blur-[150px] rounded-full -z-10" />

      <div className="w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Contact details & Callout */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-[#38bdf8] uppercase mb-4 border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3 py-1 rounded-full w-fit">
              Get in Touch
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black mb-8 tracking-tighter text-[#e2e8f0] uppercase leading-none">
              LET&apos;S WORK<br />
              <span className="text-[#94a3b8]">TOGETHER</span>
            </h2>
            
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-10 max-w-sm">
              I am always excited to collaborate on new and challenging projects. Feel free to reach out to discuss how we can work together to achieve your goals.
            </p>

            {/* Direct Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[#334155] bg-[#121212] flex items-center justify-center text-[#38bdf8]">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-[#94a3b8] uppercase tracking-widest">Email me</span>
                  <a href="mailto:jishan1873@gmail.com" className="text-sm font-bold text-[#e2e8f0] hover:text-[#38bdf8] transition-colors">
                    jishan1873@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[#334155] bg-[#121212] flex items-center justify-center text-[#38bdf8]">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-[#94a3b8] uppercase tracking-widest">Call me</span>
                  <a href="tel:+8801914667297" className="text-sm font-bold text-[#e2e8f0] hover:text-[#38bdf8] transition-colors">
                    +880 1914-667297
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[#334155] bg-[#121212] flex items-center justify-center text-[#38bdf8]">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-[#94a3b8] uppercase tracking-widest">Location</span>
                  <span className="text-sm font-bold text-[#e2e8f0]">
                    Feni, Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative p-6 sm:p-10 rounded-[2rem] border border-[#334155] bg-[#121212] shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name */}
                <div className="flex flex-col text-left">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-2xl bg-[#050505] border border-[#334155] text-sm text-[#e2e8f0] focus:outline-none focus:border-[#38bdf8] transition-colors"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col text-left">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-4 rounded-2xl bg-[#050505] border border-[#334155] text-sm text-[#e2e8f0] focus:outline-none focus:border-[#38bdf8] transition-colors"
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
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] mb-3">Project Budget</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5">
                    {budgetOptions.map((option) => {
                      const isSelected = selectedBudget === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedBudget(option)}
                          className={`py-3 px-2 rounded-2xl text-[10px] font-bold uppercase tracking-wider text-center border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#38bdf8] text-[#050505] border-transparent shadow-lg shadow-[#38bdf8]/20"
                              : "bg-[#050505] text-[#94a3b8] border-[#334155] hover:text-[#e2e8f0] hover:border-[#38bdf8]/50"
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
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full p-4 rounded-2xl bg-[#050505] border border-[#334155] text-sm text-[#e2e8f0] focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
                    placeholder="Write details about your project..."
                    {...register("message", { required: "Message is required" })}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#38bdf8] text-[#050505] font-black text-xs uppercase tracking-[0.25em] rounded-full hover:bg-[#e2e8f0] transition-all duration-300 disabled:opacity-50 shadow-lg shadow-[#38bdf8]/20"
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
