/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TMessage } from "@/types/types";

export const sentMessage = async (message: TMessage) => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message), // Removed extra object wrapping
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send message");
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error sending message:", error);
    return { success: false, message: error.message };
  }
};

const SentMessage = () => {
  return <div></div>;
};

export default SentMessage;
