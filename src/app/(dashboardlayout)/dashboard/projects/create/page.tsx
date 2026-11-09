"use client";
import CreateProjects from "@/lib/actions/CretateProjects";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function CreateProject() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const technologies = data.technologies
      .split(",")
      .map((tech: string) => tech.trim()); // Splitting input into an array

    const projectData = {
      title: data.title,
      image: data.image,
      liveLink: data.liveLink,
      description: data.description,
      technologies,
    };

    try {
      const res = await CreateProjects(projectData);

      if (res?.success) {
        alert(res.message);
        reset(); // Reset form after successful submission
      } else {
        // Handle multiple validation errors
        if (res?.errorSource && Array.isArray(res.errorSource)) {
          const errorMessages = res.errorSource
            .map(
              (err: { path: any; message: any }) =>
                `${err.path}: ${err.message}`
            )
            .join("\n");
          alert(`Validation Error:\n${errorMessages}`);
        } else {
          alert(res?.message || "Something went wrong!");
        }
      }
    } catch (error: any) {
      console.error("Submission Error:", error);

      if (error.response) {
        alert(error.response.data?.message || "Server error occurred!");
      } else if (error.message) {
        alert(error.message);
      } else {
        alert("Failed to submit project. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080E] text-[#F4F4FE] p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="kail-glass p-6 sm:p-8 rounded-3xl w-full max-w-2xl"
      >
        <h2 className="font-syne text-2xl font-extrabold mb-6 text-center text-[#F4F4FE]">Project Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Title:</label>
            <input
              {...register("title", { required: true })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Image URL:</label>
            <input
              {...register("image", { required: true })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Live Link:</label>
            <input
              {...register("liveLink", { required: true })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
              placeholder="Enter live project URL"
            />
          </div>

          <div>
            <label className="block mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">
              Technologies (comma separated):
            </label>
            <input
              {...register("technologies", { required: true })}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
              placeholder="React, Node.js, MongoDB, Express"
            />
          </div>
        </div>

        <label className="block mt-4 mb-2 font-space text-xs uppercase tracking-wider text-[#8E92BC]">Description:</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/12 text-[#F4F4FE] focus:outline-none focus:border-[#9996FE]"
          placeholder="Enter project description"
        ></textarea>

        <button
          type="submit"
          className="mt-6 w-full bg-[#5E64FD] hover:bg-[#BCED34] text-[#F4F4FE] hover:text-[#07080E] font-space font-bold uppercase tracking-widest text-xs py-3.5 rounded-full transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
