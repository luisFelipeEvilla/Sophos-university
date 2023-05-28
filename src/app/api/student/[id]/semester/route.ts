import { NextResponse } from "next/server";

export async function POST (req: Request, {params}: any) {
    const {id} = params;

    const data = await req.json();

    const res = await fetch(`${process.env.API_BASE_URL}/student/${id}/semester`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    return NextResponse.json(result, {status: res.status})
}