"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createNewsArticle = async (formData) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient();
  const payload = {
    title: formData.title,
    content: formData.content,
    genre: formData.genre,
    duration: formData.duration,
    posted_by: userId,
  };
  const { data, error } = await supabase.from("news").insert(payload).select();

  if (error || !data)
    throw new Error(
      "Database error: " + error.message || "failed to create database",
    );

  return data[0];
};

export const getAllNews = async ({ limit = 10, page = 1, title, genre }) => {
  const supabase = await createSupabaseClient();
  let query = supabase.from("news").select();

  if (title && genre) {
    query = query.ilike("title", `%${title}%`).ilike("genre", `%${genre}%`);
  } else if (title) {
    query = query.ilike("title", `%${title}%`);
  } else if (genre) {
    query = query.ilike("genre", `%${genre}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const getNewsPaginated = async ({ limit = 5, page = 1 } = {}) => {
  const supabase = await createSupabaseClient();

  const { data, count, error } = await supabase
    .from("news")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw new Error(error.message);

  return {
    news: data || [],
    total: count || 0,
  };
};

export const updateNewsPublication = async (id) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("news")
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteNews = async (id) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("news")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getUniqueGenre = async () => {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.rpc("get_unique_genres");

  if (error) {
    console.error("Failed to fetch genres:", error.message);
    throw new Error(error.message);
  }

  return data.map((item) => item.genre);
};

export const getNewsCountThisMonth = async () => {
  const supabase = await createSupabaseClient();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  const { data, error, count } = await supabase
    .from("news")
    .select("*", { count: "exact" })
    .gte("created_at", startOfMonth.toISOString())
    .lte("created_at", endOfMonth.toISOString());

  if (error) throw new Error(error.message);
  return count || 0;
};

export const getRecentNewsActivities = async ({ limit = 10 } = {}) => {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from("news")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data || [];
};

export const getNews = async (id) => {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.from("news").select().eq("id", id);
  if (error) return console.log(error);
  return data[0];
};
