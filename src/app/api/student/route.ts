import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = await fetch(`${process.env.API_BASE_URL}/student`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await res.json();

    return NextResponse.json(result, { status: 200 })
}