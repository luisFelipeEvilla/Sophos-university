import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch('http://127.0.0.1:3000/faculty')

    const faculties = await res.json();
    
    return NextResponse.json(faculties);
}