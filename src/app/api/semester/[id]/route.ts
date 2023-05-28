import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: any) {
    const { id } = params;

    const res = await fetch(`${process.env.API_BASE_URL}/semester/${id}`, {
        method: 'DELETE'
    });

    const result = await res.json();

    return NextResponse.json({ success: true, result});
}