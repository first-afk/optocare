import React from "react";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  return (
    <section className="mt-50 py-5 relative">
      <div className="py-3 mx-3">
      <h1 className="text-4xl font-bold">Professional Dashboard</h1>
      <p className="text-sm font-medium text-tertiary py-2">Your central hub for practice management and professional growth.</p>
      </div>

      <div className="flex-center md:flex-row flex-wrap">
      <DashboardCard
        topic="Find Your Next Career"
        description="Access listings for clinical positions, specialised fellowships, and practice partnership opportunities nationwide"
        variant="primary"
        icon="job"
        className="max-w-full lg:w-1/2 lg:grow"
      >
      </DashboardCard>
      <DashboardCard
        topic="Latest industry news"
        description="FDA approves new revolutionary treatment for advanced macular degeneration"
        variant="secondary"
        icon="news"
        className="w-full lg:w-1/3"
      ></DashboardCard>

      <DashboardCard
        topic="Clinical resources"
        description="Evidence-based guidelines, diagnostic criteria, and continuing education modules"
        variant="tertiary"
        icon="resources"
        className="w-full lg:w-1/3"
      ></DashboardCard>
      <DashboardCard
        topic="Member Community"
        description="Join peers in discussing clinical cases, practice management strategies, and industry trends"
        variant="primary"
        icon="community"
        className="w-full lg:w-1/2 lg:grow "
      ></DashboardCard>
      </div>

    </section>
  );
};

export default Dashboard;
