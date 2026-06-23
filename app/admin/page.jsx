import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OverviewCard from "./components/OverviewCard";
import {
  ChevronRight,
  Megaphone,
  NewspaperIcon,
  PlusCircle,
} from "lucide-react";
import Button from "../components/ui/Button";
import Link from "next/link";

const page = async () => {
  const user = await currentUser();
  if (user?.publicMetadata.role !== "admin") {
    redirect("/");
  }
  return (
    <div className="mx-5 py-10 px-4 space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
        <OverviewCard
          title="total new posts"
          insight="+12% this month"
          variant="primary"
          icon="overview"
        ></OverviewCard>
        <OverviewCard
          title="active job listings"
          insight="+2 jobs this week"
          variant="secondary"
          icon="jobs"
        ></OverviewCard>
        <OverviewCard
          title="Active article listings"
          insight="+4 articles this week"
          variant="tertiary"
          icon="articles"
        ></OverviewCard>
      </div>
      <div className="flex md:flex-row flex-col gap-8 items-start">
        <div className="dashboard_card md:w-2/3 w-full flex-1">
          <div className="flex justify-between">
            <h1 className="capitalize font-bold text-xl">recent activity</h1>
            <p className="text-primary text-sm font-semibold tracking-wide">
              View All History
            </p>
          </div>
          <div className="recent_activities"></div>
        </div>
        <div className="dashboard_card w-1/3 max-md:w-3/4 flex flex-col space-y-3 p-3">
          <h1 className="capitalize font-bold mb-8 text-xl">quick actions</h1>

          <Button variant="primary">
            <Link
              href="/admin/jobs"
              className="inline-flex items-center justify-center capitalize space-x-3"
            >
              <PlusCircle /> create new job <ChevronRight />
            </Link>
          </Button>

          <Button variant="secondary">
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
