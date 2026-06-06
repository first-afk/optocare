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

export const getAllJobs = async ({
  limit = 10,
  page = 1,
  title,
  clinic_name,
  job_type,
}) => {
  const supabase = await createSupabaseClient();
  let query = supabase.from("jobs").select();

  if (title && clinic_name && job_type) {
    query = query
      .ilike("title", `%${title}%`)
      .or(`clinic_name.ilike.%${clinic_name}%,description.ilike.%${clinic_name}%`,)
      .ilike("job_type", `%${job_type}%`);
  } else if (title) {
    query = query.ilike("title", `%${title}%`);
  } else if (clinic_name) {
    query = query.or(
      `clinic_name.ilike.%${clinic_name}%,description.ilike.%${clinic_name}%`,
    );
  } else if (job_type) {
    query = query.ilike("job_type", `%${job_type}%`);
  }

  query = query
    .eq("is_active", true)
    .range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};
