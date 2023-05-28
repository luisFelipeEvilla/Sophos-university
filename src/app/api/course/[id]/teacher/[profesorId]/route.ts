import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: any ) {
    const { id, profesorId } = params;
    
    const res = await fetch(`${process.env.API_BASE_URL}/course/${id}/teacher/${profesorId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await res.json();

    return NextResponse.json({ success: true , status: 201})
}