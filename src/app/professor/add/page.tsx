"use client";
import CreateBanner from "@/components/create-banner";
import DateInput from "@/components/inputs/DateInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    first_name: string,
    last_name: string,
    birth_date: Date,
}

export default function addProfessor() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [faculties, setFaculties] = useState([]);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch('/api/professor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            alert('Professor Added Successfully')
        } else {
            alert('Error Adding Professor')
            console.log(res);
        }
    }

    useEffect(() => {
        const getFaculties = async () => {
            const res = await fetch('/api/faculty');
            const faculties = await res.json();
            setFaculties(faculties);
        }

        getFaculties();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full justify-center">
            <div className="flex flex-col items-center w-3/5 my-10">
                <CreateBanner title="Add New Profesor" imgPath={"/images/create-faculty-banner"} />

                <div className="flex flex-col mt-4">
                    <TextInput label="First Name" placeholder="John" register={register} fieldName="first_name" options={{ required: { value: true, message: "First Name is required" } }} errors={errors} />
                    <TextInput label="Last Name" placeholder="Doe" register={register} fieldName="last_name" options={{ required: { value: true, message: "Last Name is required" } }} errors={errors} />
                    <DateInput label="Birth Date" placeholder="John Doe Faculty" register={register} fieldName="birthday" options={{ required: { value: true, message: "Birth Date is required" } }} errors={errors} />
                    <SelectInput rows={faculties} rowsLabel="name" rowsValue="id" label="Faculty" placeholder="faculty" register={register} fieldName="facultyId" options={{ required: { value: true, message: "Select a valid faculty is required" } }} errors={errors} />
                </div>

                <div className="flex justify-center mt-6">
                    <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                </div>
            </div>
        </form>
    )
}