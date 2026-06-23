"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createJob = async (formData) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient();

  const payload = {
    title: formData.job,
    clinic_name: formData.clinic,
    description: formData.description,
    job_type: formData.type,
    salary_range: formData.range,
    posted_by: userId,
    is_active: true,
  };

  const { data, error } = await supabase.from("jobs").insert(payload).select();

  if (error || !data)
    throw new Error(
      "Database error: " + error?.message || "failed to create database",
    );

  return data[0];
};

export const getAllJobs = async ({
  limit = 10,
  page = 1,
  title,
  clinic_name,
  job_type,
  is_active = true,
} = {}) => {
  const supabase = await createSupabaseClient();
  let query = supabase.from("jobs").select();

  if (title && clinic_name && job_type) {
    query = query
      .ilike("title", `%${title}%`)
      .or(
        `clinic_name.ilike.%${clinic_name}%,description.ilike.%${clinic_name}%`,
      )
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

  if (typeof is_active === "boolean") {
    query = query.eq("is_active", is_active);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const getJobs = async ({ limit = 5, page = 1 } = {}) => {
  const supabase = await createSupabaseClient();

  const { data, count, error } = await supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw new Error(error.message);

  return {
    jobs: data || [],
    total: count || 0,
  };
};

export const updateJobVisibility = async (id, is_active) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("jobs")
    .update({ is_active })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteJob = async (id) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getJob = async (id) => {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from("jobs").select().eq("id", id);
  if (error) return console.log(error);
  return data[0];
};
