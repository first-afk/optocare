import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OverviewCard from "./components/OverviewCard";
import RecentActivities from "./components/RecentActivities";
import {
  ChevronRight,
  Megaphone,
  NewspaperIcon,
  PlusCircle,
} from "lucide-react";
import Button from "../components/ui/Button";
import Link from "next/link";
import {
  getJobsCountThisMonth,
  getRecentActivities,
} from "@/lib/actions/jobs.actions";
import {
  getNewsCountThisMonth,
  getRecentNewsActivities,
} from "@/lib/actions/news.actions";

const page = async () => {
  const user = await currentUser();
  if (user?.publicMetadata.role !== "admin") {
    redirect("/");
  }

  let jobsCount = 0,
    newsCount = 0,
    totalPosts = 0,
    recentActivities = [];

  try {
    jobsCount = await getJobsCountThisMonth();
    newsCount = await getNewsCountThisMonth();
    totalPosts = jobsCount + newsCount;

    const recentJobs = await getRecentActivities({ limit: 5 });
    const recentNews = await getRecentNewsActivities({ limit: 5 });

    // Combine and sort by date
    recentActivities = [
      ...recentJobs.map((job) => ({
        ...job,
        type: "job",
      })),
      ...recentNews.map((news) => ({
        ...news,
        type: "news",
      })),
    ].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } catch (error) {
    console.error("Error fetching admin data:", error);
  }
  return (
    <div className="mx-5 py-10 px-4 space-y-12">
      <div className="w-full lg:w-2/3 mb-6">
        <h1 className="heading-h3 capitalize">Admin overview</h1>
        <p className="text-sm mt-3 font-medium dark:text-slate-300">
          Manage and monitor current open positions across clinic departments
          and news articles
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full overviews">
        <OverviewCard
          title="total new posts"
          insight={`+${totalPosts}% this month`}
          variant="primary"
          icon="overview"
        >
          {totalPosts}
        </OverviewCard>
        <OverviewCard
          title="active job listings"
          insight={`+${jobsCount} jobs this week`}
          variant="secondary"
          icon="jobs"
        >
          {jobsCount}
        </OverviewCard>
        <OverviewCard
          title="Active article listings"
          insight={`+${newsCount} articles this week`}
          variant="tertiary"
          icon="articles"
        >
          {newsCount}
        </OverviewCard>
      </div>
      <div className="flex md:flex-row flex-col gap-8 items-start">
        <RecentActivities initialActivities={recentActivities} />
        <div className="dashboard_card w-1/3 max-md:w-3/4 flex flex-col space-y-3 p-3">
          <h1 className="capitalize font-bold mb-8 text-xl">quick actions</h1>

          <Button
            variant="primary"
            className="items-center justify-center flex"
          >
            <Link
              href="/admin/jobs"
              className="inline-flex items-center justify-center capitalize space-x-3"
            >
              <PlusCircle /> create new job <ChevronRight />
            </Link>
          </Button>

          <Button
            variant="secondary"
            className="items-center justify-center flex"
          >
            <Link
              href="/admin/news"
              className="inline-flex capitalize justify-center items-center space-x-3"
            >
              <Megaphone /> post news updates <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
