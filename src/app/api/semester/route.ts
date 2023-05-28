import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = await fetch(`${process.env.API_BASE_URL}/semester`);

    const semesters = await res.json();

    return NextResponse.json(semesters);
}

export async function POST(req: Request) {
    const data = await req.json();

    const res = await fetch(`${process.env.API_BASE_URL}/semester`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    console.log(result);

    return NextResponse.json({ success: true, result});
}