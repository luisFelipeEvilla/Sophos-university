import { serverRequest } from "@/utils/requests";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : any) {
    const { id } = params;

    const res = await fetch(`${process.env.API_BASE_URL}/faculty/${id}`);

    const faculty = await res.json();

    return NextResponse.json(faculty);
}

export async function PATCH(req: Request, {params} : any) {
    const data = await req.json();
    return await serverRequest(`faculty/${params.id}`, 'PATCH', data);
}

export async function DELETE(req: Request, {params}: any) {
    return await serverRequest(`faculty/${params.id}`, 'DELETE', {});
}