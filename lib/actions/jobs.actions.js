"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

export const createJob = async (formData) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient();

  console.log("formData", formData);
  const payload = {
    title: formData.job,
    clinic_name: formData.clinic,
    description: formData.description,
    job_type: formData.type,
    salary_range: formData.range,
    posted_by: userId,
  };
  console.log("payload", payload);
  const { data, error } = await supabase.from("jobs").insert(payload).select();

  if (error || !data)
    throw new Error(
      "Database error: " + error.message || "failed to create database",
    );

  // This clears the cache so the public sees the new job immediately
  //   revalidatePath("/jobs");
  return data[0];
};

export const getAllJobs = async () => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("jobs")
    .select(`*, clinics(name, location)`)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
};
