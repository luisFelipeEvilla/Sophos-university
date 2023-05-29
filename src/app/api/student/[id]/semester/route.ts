import { serverRequest } from "@/utils/requests";
import { NextResponse } from "next/server";

export async function POST (req: Request, {params}: any) {
    const data = await req.json();
    return await serverRequest(`student/${params.id}/semester`, 'POST', data);    
}