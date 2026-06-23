import { NextResponse } from "next/server";
import {
  getJobs,
  updateJobVisibility,
  deleteJob,
} from "@/lib/actions/jobs.actions";

export async function GET(req) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || "1");

  try {
    const data = await getJobs({ page });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error?.message ?? "Unable to load jobs" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, is_active } = body;

    if (!id || typeof is_active !== "boolean") {
      return NextResponse.json(
        { message: "Job id and is_active flag are required" },
        { status: 400 },
      );
    }

    const job = await updateJobVisibility(id, is_active);
    return NextResponse.json({ job });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message ?? "Unable to update job visibility" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Job id is required" },
        { status: 400 },
      );
    }

    await deleteJob(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message ?? "Unable to delete job" },
      { status: 500 },
    );
  }
}
