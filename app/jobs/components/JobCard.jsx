import Link from "next/link";

const JobCard = ({ job }) => {
  const { id, title, clinic_name, description, job_type, salary_range } = job;
  const summary =
    description?.length > 130
      ? `${description.substring(0, 130).trim()}...`
      : description;

  return (
    <article className="relative job-card rounded-4xl border border-outline/70 bg-surface shadow-[0_10px_30px_rgba(37,99,235,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl max-h-100">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-2 px-3">
          <span className="inline-flex rounded-full bg-primary/10 py-1 px-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary w-fit">
            {job_type || "Job"}
          </span>
          <h3 className="text-xl font-semibold text-foreground capitalize">
            {title}
          </h3>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1 text-sm font-medium text-secondary w-fit capitalize">
            {salary_range}
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600 px-3">
          {summary} Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Iure, quam maiores eius eos veritatis id cumque repellat aut sed ea,
          dolor eveniet mollitia cum nisi debitis unde vero perspiciatis.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <span className="rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary capitalize">
            {clinic_name}
          </span>
          <Link
            href={`/jobs/${id}`}
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
