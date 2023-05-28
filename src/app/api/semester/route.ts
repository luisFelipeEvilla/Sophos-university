import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = await fetch(`${process.env.API_BASE_URL}/semester`);

    const semesters = await res.json();

    return NextResponse.json(semesters);
}