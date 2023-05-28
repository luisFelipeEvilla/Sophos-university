"use client";
import TextInput from "@/components/inputs/TextInput";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
    name: number
}

export default function EditFaculty({params}: any) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [faculty, setFaculty] = useState({name: ''});

    useEffect(() => {
        const fetchFaculty = async () => {
            const res = await fetch(`/api/faculty/${params.id}`);
            const faculty = await res.json();
            setFaculty(faculty);
        }

        fetchFaculty();
    }, [params])
    
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch(`/api/faculty/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            toast('Faculty updated Successfully', { icon: '👏'})
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-center">
            <div className="flex flex-col items-center w-3/5 my-10">
                <div className="flex flex-col items-center justify-center ">
                    <div className="w-[160px] h-[160px] rounded-full bg-gray-500"></div>
                    <h1 className="text-4xl font-bold mt-6">Add Faculty</h1>
                </div>

                <div className="flex flex-col mt-4">
                    <TextInput
                        defaultValue={faculty.name}
                        label="Name"
                        placeholder="John Doe Faculty"
                        register={register} fieldName="name" options={{ required: { value: true, message: "Name is required" } }} errors={errors} />
                </div>

                <div className="flex justify-center mt-6">
                    <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                </div>
            </div>
        </form>
    )
}