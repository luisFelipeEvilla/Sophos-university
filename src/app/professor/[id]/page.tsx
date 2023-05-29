"use client";
import CreateBanner from "@/components/create-banner";
import DateInput from "@/components/inputs/DateInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import DegreeForm from "@/components/forms/DegreeForm";
import DegreeCard from "../../../components/degree-card";
import { clientRequest } from "@/utils/requests";
import Spinner from "@/components/spinner";
import CoursesTable from "@/components/data/coursesTable";
import { Degree, Professor } from "@/types/Profesor";

type Inputs = {
    first_name: string,
    last_name: string,
    birthday: string,
    facultyId: number
}

export default function addProfessor({ params }: any) {
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Inputs>();
    const [professor, setProfessor] = useState<Professor>();
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        await clientRequest(`professor/${params.id}`, 'PATCH', data, 'Professor updated successfully');
    }

    const addDegree = (degree: Degree) => {
        professor?.degrees.push(degree);
        setProfessor(professor);
    }

    const removeDegree = (degree: Degree) => {
        if (!professor) return;

        const degrees = professor?.degrees.filter(d => d.id !== degree.id);
        professor.degrees = degrees;
        setProfessor(professor);
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

            setLoading(false);
        };

        getProfessor();

        const getFaculties = async () => {
            const res = await fetch('/api/faculty');
            const faculties = await res.json();
            setFaculties(faculties);
        }

        getFaculties();

    }, [setValue]);

    return (
        loading ? <Spinner /> :
            <div key={1} onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center py-10">
                <form className="flex w-full justify-center">
                    <div className="flex flex-col items-center w-3/5 ">
                        <CreateBanner title="Edit Professor" imgPath={"/images/professor-banner.jpg"} />

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

                    <DegreeForm id={params.id} addDegree={addDegree} />

                    <div className="flex justify-center gap-4 w-full">
                        {
                            professor?.degrees.map((degree, index) => (
                                <DegreeCard removeDegree={removeDegree} teacher={params.id} key={index} degree={degree} index={0} />
                            ))
                        }
                    </div>
                </div>

                <CoursesTable courses={professor?.courses || []}/>

            </div>
    )
}