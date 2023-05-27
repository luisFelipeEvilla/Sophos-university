import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch('http://127.0.0.1:3000/faculty')

    const faculties = await res.json();
    
    return NextResponse.json(faculties);
}

export async function POST(req: Request, res: Response) {
    const data = await req.json();

    const response = await fetch('http://127.0.0.1:3000/faculty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return NextResponse.json(result);
}