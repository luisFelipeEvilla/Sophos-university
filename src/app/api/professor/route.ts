import { serverRequest } from "@/utils/requests";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = await fetch(`${process.env.API_BASE_URL}/teacher`);

    const professors = await res.json();

    return NextResponse.json(professors);
};

export async function POST(req: Request) {
    const data = await req.json();
    return await serverRequest('teacher', 'POST', data);
}