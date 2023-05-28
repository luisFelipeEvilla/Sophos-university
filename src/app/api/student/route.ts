import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = await fetch(`${process.env.API_BASE_URL}/student`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result = await res.json();

    return NextResponse.json(result, { status: 200 })
}

export async function POST(req: Request) {     
    const data = await req.json();

    console.log(data);
    
    const res = await fetch(`${process.env.API_BASE_URL}/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    console.log(result);
    

    return NextResponse.json(result, { status: 200 })
}