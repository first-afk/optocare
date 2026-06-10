import React from "react";
import JobForm from "./components/JobForm";

const page = () => {
  return (
    <div>
      <h1>Welcome to admin</h1>

      <article>
        Create new job
        <JobForm />
      </article>
    </div>
  );
};

export default page;
