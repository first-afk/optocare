import { getJob } from "@/lib/actions/jobs.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Breadcrumbs, Button } from "@heroui/react";
import { Briefcase, MapPin, Calendar, Banknote } from "lucide-react";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const job = await getJob(id);
  const user = await currentUser();

  if (!job) {
    return (
      <main className="mx-3 p-3">
        <p>Job posting not found.</p>
      </main>
    );
  }

  const {
    title,
    clinic_name,
    description,
    job_type,
    salary_range,
    posted_by,
    created_at,
  } = job;

  return (
    <main className=" p-3 relative bg-surface">
      <div className="breadcrumb py-5">
        <Breadcrumbs className="inline-flex items-center gap-1.5 text-sm font-semibold">
          <Breadcrumbs.Item
            href="/jobs"
            className="inline-flex items-center hover:underline hover:underline-offset-8 hover:decoration-secondary gap-2"
          >
            Job Library
          </Breadcrumbs.Item>
          <Breadcrumbs.Item className="line-clamp-1 w-fit">
            {title}
          </Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <header className="mb-8 rounded-lg border border-gray-200 p-6 bg-surface shadow-sm">
        <div className="flex items-start justify-between gap-4 max-md:flex-col">
          <div className="flex-1">
            <h1 className="heading-h3 mb-2">{title}</h1>
            <div className="flex items-center gap-2 mb-4 text-lg font-medium text-gray-700 dark:text-slate-400">
              <MapPin size={20} />
              <span>{clinic_name}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mt-6 items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-blue-400/20 dark:bg-primary flex items-center justify-center rounded-xl">
                  <Briefcase size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Job Type</p>
                  <p className="font-semibold text-sm">{job_type || "N/A"}</p>
                </div>
              </div>

              {salary_range && (
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-yellow-300/20 dark:bg-secondary flex items-center justify-center rounded-xl">
                    <Banknote size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Salary</p>
                    <p className="font-semibold text-sm">{salary_range}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-slate-300/40 dark:bg-tertiary flex items-center justify-center rounded-xl">
                  <Calendar size={18} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Posted</p>
                  <p className="font-semibold text-sm">
                    {created_at
                      ? new Date(created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 max-md:w-full">
            <Button
              className="bg-secondary text-white flex-1 sm:flex-none px-2 py-1 rounded-lg font-semibold"
              size="lg"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </header>

      <article className="bg-surface rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Job Description</h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-slate-300 leading-relaxed">
          {description ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <p>No description available for this job posting.</p>
          )}
        </div>
      </article>
    </main>
  );
};

export default page;
