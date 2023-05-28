"use client";
import CreateBanner from "@/components/create-banner";
import TextInput from "@/components/inputs/TextInput";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
    name: string
}

export default function addFaculty() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch('/api/faculty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            toast('Faculty added Successfully', { icon: '👏'})
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-center">
            <div className="flex flex-col items-center w-3/5 my-10">
                <CreateBanner title="Add New Faculty"   imgPath={"/images/create-faculty-banner"} />

                <div className="flex flex-col mt-4">
                    <TextInput label="Name" placeholder="John Doe Faculty" register={register} fieldName="name" options={{ required: { value: true, message: "Name is required" } }} errors={errors} />
                </div>

                <div className="flex justify-center mt-6">
                    <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                </div>
            </div>
        </form>
    )
}