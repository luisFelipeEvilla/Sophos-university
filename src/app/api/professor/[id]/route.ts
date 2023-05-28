import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : any) {
    const res = await fetch(`http://127.0.0.1:3000/teacher/${params.id}`);

    const professors = await res.json();

    return NextResponse.json(professors);
};

export async function DELETE(req: Request, { params }: any) {
    const { id } = params;
    
    const res = await fetch(`http://127.0.0.1:3000/teacher/${id}`, {
        method: 'DELETE',
    });

    const professors = await res.json();

    return NextResponse.json({success: true, professors});
}

export async function PATCH(req: Request, { params }: any) {
    const { id } = params;
    const data = await req.json();
    
    const res = await fetch(`http://127.0.0.1:3000/teacher/${id}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const professors = await res.json();

    console.log(professors);

    return NextResponse.json({status: 200, professors});
}