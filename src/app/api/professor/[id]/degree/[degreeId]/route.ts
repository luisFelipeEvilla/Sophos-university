import { serverRequest } from "@/utils/requests";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: any) {
    const { id, degreeId } = params;
    return await serverRequest(`teacher/${id}/degrees/${degreeId}`, 'DELETE', {});
}