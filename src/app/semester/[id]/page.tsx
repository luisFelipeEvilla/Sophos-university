"use client";
import CreateBanner from "@/components/create-banner";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import NumericInput from "@/components/inputs/NumericInput";
import Spinner from "@/components/spinner";

type Inputs = {
    year: number,
    period: number
}

export default function addProfessor({ params }: any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Inputs>();
    const [semester, setSemester] = useState<Professor>();
    const [loading, setLoading] = useState(true);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await fetch(`/api/semester/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
           toast('Professor updated Successfully', { icon: '👏'})
        } else {
            console.log(res);
            toast('Error updating professor', { icon: '❌'})
        }
    }

    useEffect(() => {
       const getSemester = async () => {
            const res = await fetch(`/api/semester/${params.id}`);
            const semester = await res.json();
            
            setSemester(semester);

            setValue('year', semester.year);
            setValue('period', semester.period);

            setLoading(false);
       };

       getSemester();
    }, [setValue]);

    return (
        loading ? <Spinner /> :
            <div key={1} onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center py-10">
                <form className="flex w-full justify-center">
                    <div className="flex flex-col items-center w-3/5 ">
                        <CreateBanner title="Edit Semester" imgPath={"/images/faculty-banner.png"} />

                        <div className="flex flex-col mt-4">
                            <NumericInput label="Year" placeholder="John" register={register} fieldName="year" options={{}} errors={errors} />
                            <NumericInput label="Period" placeholder="Doe" register={register} fieldName="period" options={{}} errors={errors} />
                        </div>

                        <div className="flex justify-center mt-6">
                            <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
                        </div>


                    </div>
                </form>

                <div className="flex flex-col mt-8 w-3/5 gap-4 text-center">
                    <h4 className="font-bold text-3xl text-center">Students</h4>

                    <div className="flex justify-center gap-4 w-full">
                    </div>
                </div>
            </div>
    )
}