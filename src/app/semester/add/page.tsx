"use client";
import CreateBanner from "@/components/create-banner";
import NumericInput from "@/components/inputs/NumericInput";
import TextInput from "@/components/inputs/TextInput";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
    year: number,
    period: number
}

export default function addFaculty() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch('/api/semester', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            toast('Semester added Successfully', { icon: '👏'})
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-center">
            <div className="flex flex-col items-center w-3/5 my-10">
                <CreateBanner title="Add New Semester"   imgPath={"/images/faculty-banner.png"} />

                <div className="flex flex-col mt-4">
                    <NumericInput defaultValue={new Date().getFullYear()} label="Year" placeholder="2023" register={register} fieldName="year" options={{ required: { value: true, message: "year is required" } }} errors={errors} />
                    <NumericInput label="Period" placeholder="1" register={register} fieldName="period" options={{ required: { value: true, message: "period is required" } }} errors={errors} />
                </div>

                <div className="flex justify-center mt-6">
                    <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                </div>
            </div>
        </form>
    )
}