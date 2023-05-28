type Profesor = {
    id: number,
    first_name: string,
    last_name: string,
    birthday: Date,
    degrees: Degree[],
}

type Degree = {
    id: number,
    name: string,
    earned_at: string,
    teacherId: number,
}