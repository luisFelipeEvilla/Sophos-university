import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: any) {
    const { id } = params;
    
    const res = await fetch(`http://127.0.0.1:3000/teacher/${id}`, {
        method: 'DELETE',
    });

    const professors = await res.json();

    return NextResponse.json({success: true, professors});
}