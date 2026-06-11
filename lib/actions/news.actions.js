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
