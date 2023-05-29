"use client";
import ProfessorCard from "@/components/cards/professor-card";
import NumericInput from "@/components/inputs/NumericInput";
import TextInput from "@/components/inputs/TextInput";
import { Course } from "@/types/Course";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import AddProfessorForm from "../../../components/forms/addProfessorForm";
import { DataGrid } from "@mui/x-data-grid";
import { Student } from "@/types/Student";
import CreateBanner from "@/components/create-banner";
import AddStudentForm from "@/components/forms/addStudentForm";

type Inputs = {
    name: number,
    description: string,
    max_quota: number,
    credits: number,
}

export default function EditFaculty({ params }: any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Inputs>();
    const [course, setCourse] = useState<Course>();
    const [ students , setStudents ] = useState<Student[]>([]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1, valueGetter: (params: any) => `${params.row.first_name} ${params.row.last_name}` },
        { field: 'semester', headerName: 'Semester', flex: 1 }
    ]

    useEffect(() => {
        const fetCourse = async () => {
            const res = await fetch(`/api/course/${params.id}`);
            const course = await res.json();
            setCourse(course);

            setValue('name', course.name);
            setValue('description', course.description);
            setValue('max_quota', course.max_quota);
            setValue('credits', course.credits);

            const students = course.students?.map((student: any) => {
                const semester = student.semester;
                return {
                    ...student.student,
                    semester: `${semester.year}-${semester.period}` 
                }
            })

            setStudents(students);
        }

        fetCourse();
    }, [params])

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch(`/api/course/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            toast('Course updated Successfully', { icon: '👏' });
        }
    }
    return (
        <div className="flex flex-col w-full items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-3/5 my-10">
                <CreateBanner title="Edit Course" imgPath={"/images/course-banner.jpg"} />

                <div className="flex flex-col mt-4">
                    <TextInput
                        defaultValue={course?.name}
                        label="Name"
                        placeholder="Physics"
                        register={register} fieldName="name" options={{ required: { value: true, message: "Name is required" } }} errors={errors} />
                    <TextInput
                        defaultValue={course?.description}
                        label="Name"
                        placeholder="Physics Course for all students"
                        register={register} fieldName="description" options={{ required: { value: true, message: "Description is required" } }} errors={errors} />
                    <NumericInput
                        defaultValue={course?.max_quota}
                        label="Max Quota"
                        placeholder="100"
                        register={register} fieldName="max_quota" options={{ required: { value: true, message: "Max Quota is required" } }} errors={errors} />
                    <NumericInput
                        defaultValue={course?.credits}
                        label="Credits"
                        placeholder="3"
                        register={register} fieldName="credits" options={{ required: { value: true, message: "Credits is required" } }} errors={errors} />

                </div>

                <div className="flex justify-center mt-6">
                    <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                </div>
            </form>

            <div className="flex justify-center w-3/5 flex-col">
                <h4 className="text-xl text-center font-semibold">Teachers</h4>
                
                < AddProfessorForm id={params.id} />
                <div className="flex justify-center gap-4">
                    {
                        course?.teachers.map((professor) => (
                            <ProfessorCard courseId={params.id} index={professor.id} professor={professor} />
                        ))
                    }
                </div>

            </div>

            <div className="flex flex-col gap-4">
                <h4 className="text-xl text-center font-semibold">Students</h4>
                
                <AddStudentForm id={params.id} />
                
                <div className="flex h-[600px]">
                    <DataGrid
                        rows={students || []}
                        columns={columns}
                        sortModel={[{ field: 'semester', sort: 'desc' }]}
                    />
                </div>
            </div>
        </div>
    )
}