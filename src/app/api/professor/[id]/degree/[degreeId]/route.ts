import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: any) {
    const { id, degreeId } = params;

    const response = await fetch(`http://127.0.0.1:3000/teacher/${id}/degrees/${degreeId}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    
    return NextResponse.json(result);
}