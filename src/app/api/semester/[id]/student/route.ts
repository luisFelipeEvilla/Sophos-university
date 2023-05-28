import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: any) {
    const { id } = params;

    const data = await req.json();

    const res = await fetch(`${process.env.API_BASE_URL}/semester/${id}/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    return NextResponse.json(result);
}

export async function DELETE(req: Request, {params}: any) {
    const { id, studentId } = params;

    const res = await fetch(`${process.env.API_BASE_URL}/semester/${id}/student/${studentId}`, {
        method: 'DELETE'
    });

    const result = await res.json();

    return NextResponse.json({ success: true, result});
}