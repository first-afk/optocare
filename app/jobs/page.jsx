import { getAllJobs } from "@/lib/actions/jobs.actions";
import React from "react";
import SearchInput from "./components/SideSearch";
import JobCard from "./components/JobCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const jobsPage = async ({ searchParams }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
    // create a page that non authorised users will stop at and theyll be asked to login first
  }

  const filters = await searchParams;
  const title = filters.title ? filters.title : "";
  const clinic_name = filters.clinic_name ? filters.clinic_name : "";
  const job_type = filters.job_type ? filters.job_type : "";

  const jobs = await getAllJobs({ title, clinic_name, job_type });

  return (
    <section className="relative job-section">
      <div className="title heading-h2">Job Library</div>
      <aside className="filter">
        <SearchInput />
      </aside>
      <div className="job-grid">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="empty-state rounded-3xl border border-outline/70 bg-surface p-10 text-center text-sm text-tertiary shadow-sm">
            No jobs found. Try a different filter or add a new opening.
          </div>
        )}
      </div>
    </section>
  );
};

export default jobsPage;
