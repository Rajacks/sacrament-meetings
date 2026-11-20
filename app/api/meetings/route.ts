import { NextResponse } from "next/server";
import { getMeetings, getMeetingsPaginated } from "@/lib/meetings-db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date");
    const query = searchParams.get("query") ?? "";
    const page = Number(searchParams.get("page") ?? "1");

    // Validate pagination
    if (!Number.isInteger(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 },
      );
    }

    // Date filtering takes priority for this API
    if (date) {
      const meetings = await getMeetings(date);
      return NextResponse.json(meetings);
    }

    const result = await getMeetingsPaginated(query, page, 5);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching meetings:", error);

    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 },
    );
  }
}
