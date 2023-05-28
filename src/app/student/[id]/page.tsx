"use client";
import CreateBanner from "@/components/create-banner";
import DateInput from "@/components/inputs/DateInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import { Course } from "@/types/Course";
import { Student } from "@/types/Student";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
    first_name: string,
    last_name: string,
    birthday: string,
    facultyId: number
}

export default function addstudent({ params }: any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Inputs>();
    const [student, setStudent] = useState<Student>();
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const colums: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'credits', headerName: 'Credits', flex: 0.5 },
        { field: 'semester', headerName: 'Semester', flex: 0.5 }
    ];

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch(`/api/student/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            toast('Student updated Successfully', { icon: '👏' })
        } else {
            console.log(res);
            toast('Error updating student', { icon: '❌' })
        }
    }

    const handleEnroll = async () => {
        const res = await fetch(`/api/student/${params.id}/semester`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ credits: 17 })
        });

        const result = await res.json();
        if (result.success === true) {
            toast('Student enrolled Successfully', { icon: '👏' })
        } else {
            toast('Error enrolling student', { icon: '❌' })
        }
    }

    useEffect(() => {
        const getStudent = async () => {
            const res = await fetch(`/api/student/${params.id}`);
            const student: Student = await res.json();
            student.birthday = new Date(student.birthday);

            setStudent(student);
            setValue('first_name', student.first_name);
            setValue('last_name', student.last_name);
            setValue('birthday', student.birthday as unknown as string);
            setValue('facultyId', student.faculty.id);


            const courses: any = []

            student.semesters?.forEach((semester) => {
                semester.courses.forEach((course) => {
                    courses.push({
                        id: course.id,
                        name: course.name,
                        credits: course.credits,
                        semester: semester.semester.year + '-' + semester.semester.period
                    })
                })
            })

            setCourses(courses);
        };

        getStudent();

        const getFaculties = async () => {
            const res = await fetch('/api/faculty');
            const faculties = await res.json();
            setFaculties(faculties);
        }

        getFaculties();

        setLoading(false);
    }, [setValue]);

    return (
        loading ? <div>Loading...</div> :
            <div key={1} onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center py-10">
                <form className="flex w-full justify-center">
                    <div className="flex flex-col items-center w-3/5 ">
                        <CreateBanner title="Add New Profesor" imgPath={"/images/student-banner.jpg"} />

                        <div className="flex flex-col mt-4">
                            <TextInput label="First Name" placeholder="John" register={register} fieldName="first_name" options={{}} errors={errors} />
                            <TextInput label="Last Name" placeholder="Doe" register={register} fieldName="last_name" options={{}} errors={errors} />
                            <DateInput defaultValue={student?.birthday} label="Birth Date" placeholder="John Doe Faculty" register={register} fieldName="birthday" options={{}} errors={errors} />
                            <SelectInput rows={faculties} rowsLabel="name" rowsValue="id" label="Faculty" placeholder="faculty" register={register} fieldName="facultyId" options={{}} errors={errors} />
                        </div>

                        <div className="flex items-center gap-2 justify-center mt-6">
                            <button type="button" onClick={handleEnroll} className="rounded-md bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-1 w-fit cursor-pointer">Enroll To Semester</button>
                            <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                        </div>
                    </div>
                </form>

                <div className="flex flex-col mt-8 w-3/5 gap-4 text-center">
                    <div className="text-2xl font-bold">Courses</div>
                    <div className="h-[600px]" >
                        <DataGrid
                            rows={courses}
                            columns={colums}
                        />
                    </div>
                </div >

            </div>
    )
}