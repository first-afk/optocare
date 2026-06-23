"use client";
import React, { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import Button from "@/app/components/ui/Button";
import {
  PlusCircle,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  MoveLeft,
} from "lucide-react";

const JOBS_PER_PAGE = 5;

function JobListing() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async (pageNumber = 1) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/jobs?page=${pageNumber}`, {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load jobs");
      }

      setJobs(data.jobs || []);
      setTotalJobs(data.total || 0);
    } catch (err) {
      setError(err?.message || "Unable to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJobs(page);
  }, [page]);

  const handleToggleVisibility = async (job) => {
    const newStatus = !job.is_active;

    const response = await fetch("/api/admin/jobs", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: job.id, is_active: newStatus }),
    });

    if (!response.ok) {
      console.error("Unable to update visibility");
      return;
    }

    setJobs((current) =>
      current.map((item) =>
        item.id === job.id ? { ...item, is_active: newStatus } : item,
      ),
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job permanently?")) return;

    const response = await fetch("/api/admin/jobs", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.error("Unable to delete job");
      return;
    }

    const remainingJobs = jobs.filter((job) => job.id !== id);
    setJobs(remainingJobs);
    setTotalJobs((count) => Math.max(count - 1, 0));

    if (remainingJobs.length === 0 && page > 1) {
      setPage(page - 1);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/jobs/${id}`;
  };

  const pageCount = Math.max(Math.ceil(totalJobs / JOBS_PER_PAGE), 1);
  const displayedFrom = totalJobs === 0 ? 0 : (page - 1) * JOBS_PER_PAGE + 1;
  const displayedTo = Math.min(page * JOBS_PER_PAGE, totalJobs);

  const formattedDate = (job) => {
    const dateValue =
      job.created_at || job.inserted_at || job.posted_at || job.date_posted;
    if (!dateValue) return "—";

    const date = new Date(dateValue);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="py-10 px-4 mx-3">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="job_listing__header w-full lg:w-2/3">
          <h1 className="heading-h3 capitalize">job listings</h1>
          <p className="text-sm">
            Manage and monitor current open positions across all clinic
            departments
          </p>
        </div>
        <div className="flex-1 w-full lg:w-1/3">
          <Button variant="secondary" onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <span className="capitalize inline-flex items-center justify-center space-x-3 w-full">
                {" "}
                <MoveLeft />
                <p>cancel</p>
              </span>
            ) : (
              <span className="capitalize inline-flex items-center justify-center space-x-3 w-full">
                {" "}
                <PlusCircle />
                <p>add new job</p>{" "}
              </span>
            )}
          </Button>
        </div>
      </div>

      {showForm ? (
        <div className="py-10 mb-6 gap-4">
          <h2 className="heading-h4">Create new job</h2>

          <JobForm />
        </div>
      ) : (
        <div className="py-10 space-y-12">
          <div className="job_layout flex flex-col xl:flex-row justify-around w-full gap-4">
            <div className="dashboard_card flex-1">
              <h1 className="text-xs uppercase tracking-wider font-medium text-gray-500">
                total vacancies
              </h1>
              <p className="text-2xl font-bold">{totalJobs}</p>
            </div>
            <div className="dashboard_card flex-1">
              <h1 className="text-xs uppercase tracking-wider font-medium text-gray-500">
                active published
              </h1>
              <p className="text-2xl font-bold">
                {jobs.filter((job) => job.is_active).length}
              </p>
              <p className="text-xs font-medium text-gray-400">
                Currently visible to the public on this page.
              </p>
            </div>
          </div>

          <div className="dashboard_card job_vacancy overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700">
                <thead className="bg-transparent text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-4 px-3">Job title</th>
                    <th className="py-4 px-3">Company/clinic</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Date posted</th>
                    <th className="py-4 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 px-3 text-center text-slate-500"
                      >
                        Loading jobs...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 px-3 text-center text-red-600"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 px-3 text-center text-slate-500"
                      >
                        No jobs found.
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50">
                        <td className="py-4 px-3 font-medium text-slate-900 capitalize">
                          {job.title}
                        </td>
                        <td className="py-4 px-3">{job.clinic_name}</td>
                        <td className="py-4 px-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              job.is_active
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {job.is_active ? "published" : "disabled"}
                          </span>
                        </td>
                        <td className="py-4 px-3">{formattedDate(job)}</td>
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label={
                                job.is_active ? "Disable job" : "Publish job"
                              }
                              onClick={() => handleToggleVisibility(job)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                            >
                              {job.is_active ? (
                                <Eye size={16} />
                              ) : (
                                <EyeOff size={16} />
                              )}
                            </button>
                            <button
                              type="button"
                              aria-label="Edit job"
                              onClick={() => handleEdit(job.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              type="button"
                              aria-label="Delete job"
                              onClick={() => handleDelete(job.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-red-100 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>
                Showing {displayedFrom} - {displayedTo} of {totalJobs} jobs
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {Array.from({ length: pageCount }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      type="button"
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`min-w-9.5 rounded-full px-3 py-2 text-sm transition ${
                        pageNumber === page
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default JobListing;
