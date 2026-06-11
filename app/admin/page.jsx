import React from "react";
import JobForm from "./components/JobForm";
import NewsForm from "./components/NewsForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (user?.publicMetadata.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <h1>Welcome to admin</h1>

      <article>
        Create new job
        <JobForm />
      </article>

      <article>
        create news article
        <NewsForm />
      </article>
    </div>
  );
};

export default page;
