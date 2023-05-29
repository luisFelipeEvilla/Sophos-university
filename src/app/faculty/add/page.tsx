"use client";
import CreateBanner from "@/components/create-banner";
import TextInput from "@/components/inputs/TextInput";
import { clientRequest } from "@/utils/requests";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string
}

export default function addFaculty() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    
    const onSubmit: SubmitHandler<Inputs> = async data => {
        await clientRequest('faculty', 'POST', data, 'Faculty added successfully');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-center">
            <div className="flex flex-col items-center w-3/5 my-10">
                <CreateBanner title="Add New Faculty"   imgPath={"/images/faculty-banner.png"} />

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