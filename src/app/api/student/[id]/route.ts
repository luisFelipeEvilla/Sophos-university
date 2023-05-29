import { serverRequest } from "@/utils/requests";
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
    return await serverRequest(`student/${params.id}`, 'PATCH', data);
}

export async function DELETE(req: Request, { params}: any) {
    return await serverRequest(`student/${params.id}`, 'DELETE', {});
}