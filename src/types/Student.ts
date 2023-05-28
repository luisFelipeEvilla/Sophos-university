import { Course } from "./Course";

export type Student = {
    id: number;
    first_name: string;
    last_name: string;
    birthday: Date;
    faculty: Faculty;
    courses: Course[];
}