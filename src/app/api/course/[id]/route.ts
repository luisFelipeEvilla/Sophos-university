import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
    const response = await fetch(`${process.env.API_BASE_URL}/course/${params.id}`, {
        method: 'GET'
    });

    const result = await response.json();

    return NextResponse.json(result);
}

export async function DELETE(req: Request, { params}: any) {
    const response = await fetch(`${process.env.API_BASE_URL}/course/${params.id}`, {
        method: 'DELETE'
    });

    const result = await response.json();

    return NextResponse.json({ success: true, result });
}

export async function PATCH(req: Request, {params}: any) {
    const data = await req.json();

    const response = await fetch(`${process.env.API_BASE_URL}/course/${params.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return NextResponse.json(result);
}