import React from "react";

export function Loading({ className, ...props }) {
  return (
    <div
      aria-hidden
      className={`bg-surface dark:bg-tertiary animate-pulse rounded ${className}`}
      {...props}
    />
  );
}

export function JobLoading({ className }) {
  return (
    <div className={`border-outline/80 job-section p-10 ${className}`}>
      <Loading className="title h-24 w-full rounded-2xl" />
      <Loading className="filter min-h-screen rounded-2xl" />
      <div className="job-grid">
        <Loading className="job-card h-60" />
        <Loading className="job-card h-60" />
      </div>
    </div>
  );
}
