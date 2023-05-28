"use client";
import CreateBanner from "@/components/create-banner";
import DateInput from "@/components/inputs/DateInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { getDate } from "../../utils/getDate";
import DegreeForm from "@/components/forms/DegreeForm";
import DegreeCard from "@/components/degree-card";

type Inputs = {
    first_name: string,
    last_name: string,
    birthday: string,
    facultyId: number
}

export default function addProfessor({ params }: any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Inputs>();
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm<Inputs>();
    const [professor, setProfessor] = useState<Profesor>();
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch(`/api/professor/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            alert('Professor updated Successfully')
        } else {
            console.log(res);
            alert('Error updating Professor')
        }
    }

    useEffect(() => {
        const getProfessor = async () => {
            const res = await fetch(`/api/professor/${params.id}`);
            const professor = await res.json();
            professor.birthday = new Date(professor.birthday);

            setProfessor(professor);
            setValue('first_name', professor.first_name);
            setValue('last_name', professor.last_name);
            setValue('birthday', professor.birthday);
            setValue('facultyId', professor.facultyId);
        };

        getProfessor();

        const getFaculties = async () => {
            const res = await fetch('/api/faculty');
            const faculties = await res.json();
            setFaculties(faculties);
        }

        getFaculties();

        setLoading(false);
    }, [setValue]);

    return (
        loading ? <div>Loading...</div> :
            <div key={1} onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center py-10">
                <form className="flex w-full justify-center">
                    <div className="flex flex-col items-center w-3/5 ">
                        <CreateBanner title="Add New Profesor" imgPath={"/images/create-faculty-banner"} />

                        <div className="flex flex-col mt-4">
                            <TextInput label="First Name" placeholder="John" register={register} fieldName="first_name" options={{}} errors={errors} />
                            <TextInput label="Last Name" placeholder="Doe" register={register} fieldName="last_name" options={{}} errors={errors} />
                            <DateInput defaultValue={professor?.birthday} label="Birth Date" placeholder="John Doe Faculty" register={register} fieldName="birthday" options={{}} errors={errors} />
                            <SelectInput rows={faculties} rowsLabel="name" rowsValue="id" label="Faculty" placeholder="faculty" register={register} fieldName="facultyId" options={{}} errors={errors} />
                        </div>

                        <div className="flex justify-center mt-6">
                            <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                        </div>


                    </div>
                </form>

                <div className="flex flex-col mt-8 w-3/5 gap-4 text-center">
                    <h4 className="font-bold text-3xl text-center">Degrees</h4>

                    <DegreeForm id={params.id} />

                    <div className="flex justify-center gap-4 w-full">
                        {
                            professor?.degrees.map((degree, index) => (
                                <DegreeCard teacher={params.id} key={index} degree={degree} index={0} />
                            ))
                        }
                    </div>
                </div>
            </div>
    )
}