"use client";

import { updateProject } from "@/lib/actions/updateProject";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function UpdateProject({ id }: { id: string }) {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedData = {
      title: data.title,
      content: data.content,
    };
    const res = await updateProject(id, updatedData);
    if (res) {
      alert(res.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Update Content</h2>

        <label className="block mb-2">Title:</label>
        <input
          {...register("title", { required: true })}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mt-4 mb-2">Content:</label>
        <textarea
          {...register("content", { required: true })}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
