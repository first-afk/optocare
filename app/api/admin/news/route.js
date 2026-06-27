import { NextResponse } from "next/server";
import {
  getNewsPaginated,
  updateNewsPublication,
  deleteNews,
} from "@/lib/actions/news.actions";

export async function GET(req) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || "1");

  try {
    const data = await getNewsPaginated({ page });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error?.message ?? "Unable to load news" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "News id is required" },
        { status: 400 },
      );
    }

    const article = await updateNewsPublication(id);
    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message ?? "Unable to update news publication" },
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
        { message: "News id is required" },
        { status: 400 },
      );
    }

    await deleteNews(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message ?? "Unable to delete news" },
      { status: 500 },
    );
  }
}
