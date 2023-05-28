"use client";
import ProfessorCard from "@/components/cards/professor-card";
import NumericInput from "@/components/inputs/NumericInput";
import TextInput from "@/components/inputs/TextInput";
import { Course } from "@/types/Course";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
    name: number,
    description: string,
    max_quota: number,
    credits: number,
}

export default function EditFaculty({params}: any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Inputs>();
    const [course, setCourse] = useState<Course>();

    useEffect(() => {
        const fetCourse = async () => {
            const res = await fetch(`/api/course/${params.id}`);
            const faculty = await res.json();
            setCourse(faculty);

            setValue('name', faculty.name);
            setValue('description', faculty.description);
            setValue('max_quota', faculty.max_quota);
            setValue('credits', faculty.credits);
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
            toast('Course updated Successfully', { icon: '👏'});
        }
    }
    return (
        <div className="flex flex-col w-full items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-3/5 my-10">
                <div className="flex flex-col items-center justify-center ">
                    <div className="w-[160px] h-[160px] rounded-full bg-gray-500"></div>
                    <h1 className="text-4xl font-bold mt-6">Add Faculty</h1>
                </div>

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

            <div className="flex">
                {
                    course?.teachers.map((professor) => (
                        <ProfessorCard index={professor.id} professor={professor} />
                    ))
                }
            </div>
        </div>
    )
}