import { serverRequest } from "@/utils/requests";

export async function POST(req: Request, {params}: any) {
    const {id} = params;
    const data = await req.json();
    return await serverRequest(`teacher/${id}/degrees`, 'POST', data);
}