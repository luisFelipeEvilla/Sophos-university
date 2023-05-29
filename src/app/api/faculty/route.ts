import { serverRequest } from "@/utils/requests";
import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch(`${process.env.API_BASE_URL}/faculty`)

    const faculties = await res.json();
    
    return NextResponse.json(faculties);
}

export async function POST(req: Request, res: Response) {
    const data = await req.json();
    return await serverRequest('faculty', 'POST', data);
}