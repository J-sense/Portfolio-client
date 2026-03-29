// import UpdateContent from "@/components/updateBlog/UpdateContent";
import UpdateProject from "@/components/UpdateProject/UpdateProject";
// import React from "react";

const dynamicPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const id = await (await params)?.projectId;

  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
  //   const singleData = await res.json();
  //   console.log(singleData);
  return (
    <div>
      <UpdateProject id={id} />
    </div>
  );
};

export default dynamicPage;
