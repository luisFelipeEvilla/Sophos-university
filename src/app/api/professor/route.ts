import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = await fetch(`http://127.0.0.1:3000/teacher`);

    const professors = await res.json();

    return NextResponse.json(professors);
};

export async function POST(req: Request) {
    const data = await req.json();
    const res = await fetch(`http://127.0.0.1:3000/teacher`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const professors = await res.json();

    return NextResponse.json(professors);
}