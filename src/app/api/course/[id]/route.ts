import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params}: any) {
    const response = await fetch(`${process.env.API_BASE_URL}/course/${params.id}`, {
        method: 'DELETE'
    });

    const result = await response.json();

    return NextResponse.json({ success: true, result });
}