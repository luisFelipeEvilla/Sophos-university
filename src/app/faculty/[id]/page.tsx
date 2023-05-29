"use client";
import CreateBanner from "@/components/create-banner";
import TextInput from "@/components/inputs/TextInput";
import { clientRequest } from "@/utils/requests";
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
       await clientRequest(`faculty/${params.id}`, 'PATCH', data, 'Faculty updated successfully');
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-center">
            <div className="flex flex-col items-center w-3/5 my-10">
                <CreateBanner title="Edit Faculty" imgPath="/images/faculty-banner.png" />

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