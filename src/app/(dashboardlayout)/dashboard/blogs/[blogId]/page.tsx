import UpdateContent from "@/components/updateBlog/UpdateContent";
// import React from "react";

const dynamicPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const id = await (await params).blogId;

  //   const res = await fetch(`${process.env.DATABASE_URL}/blogs/${id}`);
  //   const singleData = await res.json();
  //   console.log(singleData);
  return (
    <div>
      <UpdateContent id={id} />
    </div>
  );
};

export default dynamicPage;
