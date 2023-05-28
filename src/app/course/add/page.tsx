"use client";
import CreateBanner from "@/components/create-banner";
import NumericInput from "@/components/inputs/NumericInput";
import TextInput from "@/components/inputs/TextInput";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
    name: string
    description: string
    max_quota: number
    credits: number
}

export default function AddCourse() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch('/api/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            toast('Course created Successfully', { icon: '👏'});
            window.location.href = '/course';
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-center">
            <Toaster/>
            <div className="flex flex-col items-center w-3/5 my-10">
                <CreateBanner title="Add New Course"   imgPath={"/images/course-banner.jpg"} />

                <div className="flex flex-col mt-4">
                    <TextInput label="Name" placeholder="Physics" register={register} fieldName="name" options={{ required: { value: true, message: "Name is required" } }} errors={errors} />
                    <TextInput label="Description" placeholder="Physics Course for all students" register={register} fieldName="description" options={{ required: { value: true, message: "Description is required" } }} errors={errors} />
                    <NumericInput label="Max Quota" placeholder="1" register={register} fieldName="max_quota" options={{ required: { value: true, message: "Max quota is required" } }} errors={errors} />
                    <NumericInput label="Credits" placeholder="1" register={register} fieldName="credits" options={{ required: { value: true, message: "credits cost is required" } }} errors={errors} />
                </div>

                <div className="flex justify-center mt-6">
                    <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                </div>
            </div>
        </form>
    )
}