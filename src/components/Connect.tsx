"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { sentMessage } from "./message/SentMessage";

const Connect = () => {
  // Initialize the form hook
  const { register, handleSubmit } = useForm();

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const inputData = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    const res = await sentMessage(inputData);
    if (res) {
      alert("Message sent successfully");
    } else {
      alert("Something went wrong");
    }
    // You can send data to your API here
  };

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center px-6 py-12 bg-black text-white">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center">
        CONTACT
      </h1>

      {/* Form */}
      <div className="shadow-lg rounded-lg p-6 sm:p-10 w-full max-w-md bg-zinc-950 border border-gray-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              className="p-3 bg-zinc-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-white"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="p-3 bg-zinc-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-white"
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

          {/* Message Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-300">Message</label>
            <textarea
              className="p-3 bg-zinc-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 text-white"
              placeholder="Write your message here..."
              rows={4}
              {...register("message", { required: "Message is required" })}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-lime-400 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Connect;
