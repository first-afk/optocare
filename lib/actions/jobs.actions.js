'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * ACTION: Fetch all jobs for the public Job Board
 * Used by: /job-board (Public Page)
 */
export const getJobs = async () => {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
        .from('jobs')
        .select(`*, clinics(name, location)`)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) return [];
    return data;
};

/**
 * ACTION: Create a new job
 * Used by: /admin/post-job (Admin Page)
 */
export const createJob = async (formData) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createSupabaseClient();

    const payload = {
        title: formData.get('title'),
        clinic_id: formData.get('clinic_id'),
        description: formData.get('description'),
        job_type: formData.get('job_type'),
        posted_by: userId,
    };

    const { data, error } = await supabase.from('jobs').insert(payload);

    if (error) throw new Error("Database error: " + error.message);

    // This clears the cache so the public sees the new job immediately
    revalidatePath('/jobs'); 
    return data;
};


// 'use server';

// import { auth } from "@clerk/nextjs/server"
// import { createSupabaseClient } from "../supabase";

// export const createJob = async () =>{
//     const {userId: author} = await auth();

//     const supabase = createSupabaseClient();

//     const {data, error} = await supabase.from('jobs').insert(author).select();

//     if(error || !data) throw new Error(error?.message || "Failed to retrieve jobs");

//     return data[0];
// }