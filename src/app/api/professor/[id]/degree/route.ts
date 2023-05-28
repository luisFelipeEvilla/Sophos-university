import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: any) {
    const {id} = params;
    const data = await req.json();

    console.log(data);
    

    const response = await fetch(`http://127.0.0.1:3000/teacher/${id}/degrees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return NextResponse.json(result);
}