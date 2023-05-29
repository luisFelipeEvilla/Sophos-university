import { NextResponse } from "next/server";

export async function POST(req: Request, { params}: any ) {
    const { id, studentId } = params;

    const res = await fetch(`${process.env.API_BASE_URL}/course/${id}/student/${studentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await res.json();

    return NextResponse.json(result, { status: res.status })
}