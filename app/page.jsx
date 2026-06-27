import React from "react";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

const page = () => {
  return (
    <main className="mx-auto max-w-full">
      <section>
        <Hero />
      </section>
      <section className="pb-20 pt-20 dark:bg-surface bg-[#ebf3fd] shadow-lg">
        <Dashboard />
      </section>
      <section className="pb-20 pt-20 ">
        <About />
      </section>
    </main>
  );
};

export default page;
