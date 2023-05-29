import { Course } from "./Course"

export type Professor = {
    id: number,
    first_name: string,
    last_name: string,
    birthday: Date,
    degrees: Degree[],
    courses: Course[],
}

export type Degree = {
    id: number,
    name: string,
    earned_at: string,
    teacherId: number,
}