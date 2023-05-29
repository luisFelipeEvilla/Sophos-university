import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`${process.env.API_BASE_URL}/course`, {
        method: 'GET'
    })

    const result = await res.json(); 

    return NextResponse.json(result, { status: res.status })
}

export async function POST(req: Request) {
    const data = await req.json();

    const res= await fetch(`${process.env.API_BASE_URL}/course`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    return NextResponse.json(result, { status: res.status })
}