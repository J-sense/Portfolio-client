/* eslint-disable @typescript-eslint/no-explicit-any */
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
      console.log("Response:", res);

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Project Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Title:</label>
            <input
              {...register("title", { required: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block mb-2">Image URL:</label>
            <input
              {...register("image", { required: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block mb-2">Live Link:</label>
            <input
              {...register("liveLink", { required: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter live project URL"
            />
          </div>

          <div>
            <label className="block mb-2">
              Technologies (comma separated):
            </label>
            <input
              {...register("technologies", { required: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, MongoDB, Express"
            />
          </div>
        </div>

        <label className="block mt-4 mb-2">Description:</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter project description"
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
