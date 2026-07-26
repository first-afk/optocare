"use client";
import Button from "@/app/components/ui/Button";
import { Banknote, Briefcase, Calendar, MapPin, X } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import ApplicationForm from "./ApplicationForm";

const ApplyPage = ({
  title,
  salary_range,
  clinic_name,
  job_type,
  created_at,
  description,
}) => {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  return (
    <>
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

          <Button
            className="bg-secondary text-white flex-1 sm:flex-none px-2 py-1 rounded-lg font-semibold max-md:w-full"
            size="lg"
            onClick={() => setIsApplicationFormOpen(true)}
          >
            Apply Now
          </Button>
        </div>
      </header>
      {isApplicationFormOpen ? (
        <section
          aria-labelledby="application-form-title"
          aria-modal="true"
          className="relative w-full rounded-lg bg-surface border border-gray-200 p-6 flex flex-col space-y-5"
          role="dialog"
        >
          <div className=" flex flex-row-reverse justify-between items-center">
            <Button
              aria-label="Close application form"
              className="flex items-center justify-center"
              onClick={() => setIsApplicationFormOpen(false)}
              variant="ghost"
            >
              <X size={18} />
            </Button>
            <h2 className="text-xl font-bold" id="application-form-title">
              Apply for this position
            </h2>
          </div>
          <ApplicationForm title={title} />
        </section>
      ) : (
        <article className="bg-surface rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Job Description</h2>
          <div className="prose max-w-none dark:prose-invert text-gray-700 dark:text-slate-300 leading-relaxed">
            {description ? (
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {description}
              </ReactMarkdown>
            ) : (
              <p>No description available for this job posting.</p>
            )}
          </div>
        </article>
      )}
    </>
  );
};

export default ApplyPage;
