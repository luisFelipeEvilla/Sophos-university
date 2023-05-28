import { Course } from "./Course";
import { Semester } from "./Semester";

export type EnrollSemester = {
    id: number;
    credits: number;
    semester: Semester;
    courses: Course[];
}