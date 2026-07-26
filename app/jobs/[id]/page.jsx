import { getJob } from "@/lib/actions/jobs.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Breadcrumbs } from "@heroui/react";
import ApplyPage from "../components/ApplyPage";

const Page = async ({ params }) => {
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

      <section>
        <ApplyPage
          title={title}
          salary_range={salary_range}
          clinic_name={clinic_name}
          job_type={job_type}
          created_at={created_at}
          description={description}
        />
      </section>
    </main>
  );
};

export default Page;
