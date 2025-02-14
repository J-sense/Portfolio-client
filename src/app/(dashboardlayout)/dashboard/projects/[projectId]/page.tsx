// import UpdateContent from "@/components/updateBlog/UpdateContent";
import UpdateProject from "@/components/UpdateProject/UpdateProject";
// import React from "react";

const dynamicPage = async ({ params }: { params: { projectId: string } }) => {
  const id = await params?.projectId;
  console.log("ddd", id);
  //   const res = await fetch(`${process.env.DATABASE_URL}/blogs/${id}`);
  //   const singleData = await res.json();
  //   console.log(singleData);
  return (
    <div>
      <UpdateProject id={id} />
    </div>
  );
};

export default dynamicPage;
