import { NextResponse } from "next/server";

export async function GET(req: Request, { params}: any) {
    const res = await fetch(`${process.env.API_BASE_URL}/student/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await res.json();

    return NextResponse.json(result, { status: 200 })
}

export async function PATCH(req: Request, { params}: any) {
    const data = await req.json();
    
    const res = await fetch(`${process.env.API_BASE_URL}/student/${params.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    return NextResponse.json({success: true, result })
}

export async function DELETE(req: Request, { params}: any) {
    const res = await fetch(`${process.env.API_BASE_URL}/student/${params.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await res.json();

    return NextResponse.json({ success: true, result})
}