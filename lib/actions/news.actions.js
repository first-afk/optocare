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

export const getUniqueGenre = async () => {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.rpc("get_unique_genres");

  if (error) {
    console.error("Failed to fetch genres:", error.message);
    throw new Error(error.message);
  }

  return data.map((item) => item.genre);
};
