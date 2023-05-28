import { Student } from "./Student";

export type Semester = {
    id: number;
    year: number;
    period: number;
    students: Student[];
}