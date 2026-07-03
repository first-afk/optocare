/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Newspaper, Calendar } from "lucide-react";

const RecentActivities = ({ initialActivities }) => {
  const [activities, setActivities] = useState(initialActivities);

  useEffect(() => {
    setNewActivity;
  }, [initialActivities]);

  const setNewActivity = () => {
    setActivities(initialActivities);
  };

  const clearHistory = () => {
    setActivities([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard_card md:w-2/3 w-full flex-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="capitalize font-bold text-xl">recent activity</h1>
        <button
          onClick={clearHistory}
          className="text-primary text-sm font-semibold tracking-wide hover:underline cursor-pointer"
        >
          Clear History
        </button>
      </div>
      <div className="recent_activities space-y-3">
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0">
                  {activity.type === "job" ? (
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Newspaper className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm dark:text-slate-200">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {activity.type === "job"
                      ? "Job Posted"
                      : "News Article Posted"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 flex-shrink-0">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(activity.created_at)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 dark:text-slate-500">
            <p className="text-sm">No recent activities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
