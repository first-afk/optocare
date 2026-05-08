"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

export const getJobs = async () => {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from("jobs")
    .select(`*, clinics(name, location)`)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
};

export const createJob = async (formData) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = createSupabaseClient();

  const payload = {
    title: formData.job,
    clinic_name: formData.clinic,
    description: formData.description,
    job_type: formData.type,
    salary_range: formData.range,
    posted_by: userId,
  };

  const { data, error } = await supabase.from("jobs").insert(payload);

  if (error) throw new Error("Database error: " + error.message);

  // This clears the cache so the public sees the new job immediately
  //   revalidatePath("/jobs");
  return data[0];
};
