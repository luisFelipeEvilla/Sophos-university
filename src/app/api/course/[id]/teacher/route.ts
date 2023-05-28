import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any ) {
    const { id } = params;
    const { teacherId } = await req.json();

    const res = await fetch(`${process.env.API_BASE_URL}/course/${id}/teacher/${teacherId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return NextResponse.json({ success: true , status: 201})
}