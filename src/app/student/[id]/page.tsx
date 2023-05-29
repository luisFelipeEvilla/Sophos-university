"use client";
import CreateBanner from "@/components/create-banner";
import DateInput from "@/components/inputs/DateInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import Spinner from "@/components/spinner";
import { Course } from "@/types/Course";
import { Student } from "@/types/Student";
import { clientRequest } from "@/utils/requests";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
       try {
            const student = await clientRequest(`student/${params.id}`, 'PATCH', data, 'Student updated successfully'); 
            setStudent(student);
       } catch (error) {
            console.log(error);
       }
    }

    const handleEnroll = async () => {
        try {
            const res = await clientRequest(`student/${params.id}/semester`, 'POST', {
                credits: 17,
            }, 'Student enrolled successfully');
        } catch (error) {
            console.log(error);
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
        loading ? <Spinner/> :
            <div key={1} onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center py-10">
                <form className="flex w-full justify-center">
                    <div className="flex flex-col items-center w-3/5 ">
                        <CreateBanner title="Add New Profesor" imgPath={"/images/student-banner.jpg"} />

                        <div className="flex flex-col mt-4">
                            <TextInput label="First Name" placeholder="John" register={register} fieldName="first_name" options={{}} errors={errors} />
                            <TextInput label="Last Name" placeholder="Doe" register={register} fieldName="last_name" options={{}} errors={errors} />
                            <DateInput defaultValue={student?.birthday} label="Birth Date" placeholder="John Doe Faculty" register={register} fieldName="birthday" options={{}} errors={errors} />
                            <SelectInput rows={faculties} rowsLabel="name" rowsValue="id" label="Faculty" placeholder="faculty" register={register} fieldName="facultyId" options={{valueAsNumber: true }} errors={errors} />
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