import { Student } from "./Student";

export type Course = {
    id: number,
    name: string,
    description: string,
    max_quota: number,
    credits: number,
    teachers: Professor[],
    students: Student[],
}