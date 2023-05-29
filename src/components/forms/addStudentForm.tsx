import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Student } from "@/types/Student";

export default function AddStudentForm(props: any) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [students, setStudents] = useState<Student[]>();

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetch(`/api/student`);
            const students = await res.json();
            setStudents(students);
        }

        fetchStudents();
    }, [])

    const onSubmit = async (data: any) => {
        console.log(data);
        
        const res = await fetch(`/api/course/${props.id}/student/${data.student}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const result = await res.json();

        if (res.status === 201) {
            toast('Student added Successfully', { icon: '👏' });
            window.location.reload();
        } else {
            toast.error(result.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
            <div className="flex flex-col mt-4">
                <label className="text-lg font-bold">Select a Student</label>
                <select
                    className="border-2 border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-green-500"
                    placeholder={props.placeholder}
                    {...register('student', {required: true})}
                >
                    {
                        students?.map((row, index) => (
                            <option key={index} value={row.id}>{`${row.first_name}  ${row.last_name}`}</option>
                        ))
                    }
                </select>
                <p className="text-red-500 text-sm">
                    {errors.teacherId && "Professor is required"}
                </p>
            </div>

            <div className="flex justify-center mt-6">
                <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Add'} />
            </div>
        </form>
    )
}