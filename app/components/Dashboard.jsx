import React from "react";
import DashboardCard from "./ui/DashboardCard";

const Dashboard = () => {
  return (
    <section className="relative p-5 bg-surface">
      <div className="flex justify-center py-5 mx-3">
        <h1 className="text-pretty text-center py-2 text-xl font-bold capitalize">
          Your <span className="border-b-2 border-b-secondary"> central </span>{" "}
          hub for practice management and{" "}
          <span className="border-b-2 border-b-secondary">professional </span>{" "}
          growth.
        </h1>
      </div>

      <div className="flex items-center justify-center md:flex-row flex-wrap">
        <DashboardCard
          topic="Find Your Next Career"
          description="Access listings for clinical positions, specialised fellowships, and practice partnership opportunities nationwide"
          variant="primary"
          icon="job"
          className="max-w-full lg:w-1/2 lg:grow"
        />
        <DashboardCard
          topic="Latest industry news"
          description="FDA approves new revolutionary treatment for advanced macular degeneration"
          variant="secondary"
          icon="news"
          className="w-full lg:w-1/3"
        />

        <DashboardCard
          topic="Clinical resources"
          description="Evidence-based guidelines, diagnostic criteria, and continuing education modules"
          variant="tertiary"
          icon="resources"
          className="w-full lg:w-1/3"
        />
        <DashboardCard
          topic="Member Community"
          description="Join peers in discussing clinical cases, practice management strategies, and industry trends"
          variant="primary"
          icon="community"
          className="w-full lg:w-1/2 lg:grow "
        />
      </div>
    </section>
  );
};

export default Dashboard;
