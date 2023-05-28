import { Course } from "./Course";
import { EnrollSemester } from "./EnrollSemester";

export type Student = {
    id: number;
    first_name: string;
    last_name: string;
    birthday: Date;
    faculty: Faculty;
    courses: Course[];
    semesters?: EnrollSemester[];
}