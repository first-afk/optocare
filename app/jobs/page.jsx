import { getAllJobs } from "@/lib/actions/jobs.actions";
import React from "react";
import SearchInput from "./components/SideSearch";
import JobCard from "./components/JobCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { JobLoading } from "../components/ui/Loading";
import Link from "next/link";

const jobsPage = async ({ searchParams }) => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="job_skeleton relative">
        <div className="job_skeleton__container">
          <JobLoading />
        </div>
        <div className="job_skeleton__text absolute top-52 left-[40%] flex flex-col items-center justify-center">
          <p className=" font-medium text-sm ">
            Oops, seems you&apos;re not logged in yet.
          </p>
          <span>
            <Link
              className="text-secondary font-bold underline"
              href="./sign-in"
            >
              {" "}
              Sign up
            </Link>{" "}
            to view jobs
          </span>
        </div>
      </div>
    );
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
      <aside className="filter min-h-screen">
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
