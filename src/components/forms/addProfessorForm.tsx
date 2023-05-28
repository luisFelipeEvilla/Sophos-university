import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddProfessorForm(props: any) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [professors, setProfessors] = useState<Professor[]>();

    useEffect(() => {
        const fetchProfessors = async () => {
            const res = await fetch(`/api/professor`);
            const professors = await res.json();
            setProfessors(professors);
        }

        fetchProfessors();
    }, [])

    const onSubmit = async (data: any) => {
        const res = await fetch(`/api/course/${props.id}/teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.status === 200) {
            toast('Professor added Successfully', { icon: '👏' });
            window.location.reload();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
            <div className="flex flex-col mt-4">
                <label className="text-lg font-bold">Select A Professor</label>
                <select
                    className="border-2 border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-green-500"
                    placeholder={props.placeholder}
                    {...register('teacherId', {required: true})}
                >
                    {
                        professors?.map((row, index) => (
                            <option key={index} value={row.id}>{`${row.first_name}  ${row.last_name}`}</option>
                        ))
                    }
                </select>
                <p className="text-red-500 text-sm">
                    {errors.teacherId && "Professor is required"}
                </p>
            </div>

            <div className="flex justify-center mt-6">
                <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Add'} />
            </div>
        </form>
    )
}