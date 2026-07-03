import { BriefcaseBusiness, LayoutDashboard, Newspaper } from "lucide-react";
import React from "react";

const icons = {
  overview: <LayoutDashboard size={24} className="text-blue-600" />,
  jobs: <BriefcaseBusiness size={24} className="text-green-600" />,
  articles: <Newspaper size={24} className="text-purple-600" />,
};
const variants = {
  primary: "bg-blue-400/10 text-blue-600",
  secondary: "bg-emerald-400/10 text-emerald-600",
  tertiary: "bg-purple-400/10 text-purple-600",
};
const OverviewCard = ({
  icon = "",
  variant = "",
  insight = "",
  title = "",
  children,
}) => {
  return (
    <div className="dashboard_card flex flex-col justify-start space-y-3 flex-1 w-full">
      <div className="flex justify-between items-start gap-10 mb-8">
        <div
          className={`h-12 w-12 rounded-lg flex p-2 justify-center items-center ${variants[variant]}`}
        >
          {icons[icon]}
        </div>
        <div className={`${variants[variant]} rounded-full p-2`}>
          <p className={`font-semibold text-xs capitalize `}>{insight}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="uppercase text-xs text-gray-500">{title}</h1>
        <p className="font-bold text-lg tracking-wider">{children}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
