import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = async () => {
  const { getToken } = await auth();
  const token = await getToken({ template: "supabase" });
  const headers = token ? { Authorization: `Bearer ${token}`} : undefined;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      global: {
        headers
      },
    },
  );
};
