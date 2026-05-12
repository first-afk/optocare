import { getAllJobs } from "@/lib/actions/jobs.actions";
import React from "react";
import SearchInput from "../components/SearchInput";
import JobFilter from "../components/JobFilter";

const jobsPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const title = filters.title ? filters.title : "";
  const clinic_name = filters.clinic_name ? filters.clinic_name : "";

  const jobs = await getAllJobs({ title, clinic_name });
  console.log(jobs);

  return (
    <section className="job-section">
      <div className="title heading-h2">Job Library</div>
      <aside className="filter">
        <SearchInput />
        <JobFilter />
      </aside>
      <div className="job-grid">
        {/* {jobs.map((job) => (
          
        ))} */}
      </div>
    </section>
  );
};

export default jobsPage;
