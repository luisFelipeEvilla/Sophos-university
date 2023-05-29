import { serverRequest } from "@/utils/requests";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : any) {
    const res = await fetch(`${process.env.API_BASE_URL}/teacher/${params.id}`);

    const professors = await res.json();

    return NextResponse.json(professors);
};

export async function DELETE(req: Request, { params }: any) {
    const { id } = params;
    return await serverRequest(`teacher/${id}`, 'DELETE', {});
}

export async function PATCH(req: Request, { params }: any) {
    const { id } = params;
    const data = await req.json();
    return await serverRequest(`teacher/${id}`, 'PATCH', data);
}