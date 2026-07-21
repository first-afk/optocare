import { HousePlus } from "lucide-react";
import Link from "next/link";

const JobCard = ({ job }) => {
  const { id, title, clinic_name, description, job_type, salary_range } = job;
  const summary =
    description?.length > 130
      ? `${description.substring(0, 130).trim()}...`
      : description;

  return (
    <article className="relative job-card rounded-4xl border border-outline/70 bg-surface shadow-[0_10px_30px_rgba(37,99,235,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl max-h-fit">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-2 px-3 mb-4">
          <span className="inline-flex rounded-full bg-white/10 py-1 px-2 text-xs font-semibold uppercase tracking-[0.20em] w-fit">
            {job_type || "Job"}
          </span>
          <h3 className="text-xl font-semibold text-foreground capitalize">
            {title}
          </h3>
          <div className="pill active w-fit">{salary_range}</div>
        </div>

        <p className="text-slate-900 font-medium dark:text-slate-50 px-3 first-letter:capitalize">
          {summary}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 px-3">
          <span className="pill w-fit font-semibold capitalize">
            {clinic_name}
          </span>

          <Link
            href={`/jobs/${id}`}
            className="underline underline-offset-4 decoration-secondary px-4 py-2 text-sm font-semibold"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
