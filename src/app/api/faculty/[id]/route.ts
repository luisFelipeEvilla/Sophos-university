import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : any) {
    const { id } = params;

    const res = await fetch(`http://127.0.0.1:3000/faculty/${id}`);

    const faculty = await res.json();

    return NextResponse.json(faculty);
}

export async function PATCH(req: Request, {params} : any) {
    const { id } = params;

    const data = await req.json();

    const response = await fetch(`http://127.0.1:3000/faculty/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return NextResponse.json(result);
}

export async function DELETE(req: Request, {params}: any) {
    const { id } = params;

    const response = await fetch(`http://127.0.0.1:3000/faculty/${id}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    
    return NextResponse.json({ success: true, ...result});
}