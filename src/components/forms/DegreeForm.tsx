import { SubmitHandler, useForm } from "react-hook-form";
import DateInput from "../inputs/DateInput";
import TextInput from "../inputs/TextInput";

type Inputs = {
    name: string,
    earned_at: string
}

type propsType = { id: string }

export default function DegreeForm(props: propsType) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        data.teacherId = parseInt(props.id);

        const res = await fetch(`/api/professor/${props.id}/degree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            alert('Degree added Successfully')
        } else {
            console.log(res);
            alert('Error adding Degree')
        }
    }


    return (
        <form key={2} onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
            <TextInput label="Degree Name" placeholder="Degree Name" register={register} fieldName="name" options={{}} errors={errors} />
            <DateInput label="Earned At" placeholder="Earned At" register={register} fieldName="earned_at" options={{}} errors={errors} />

            <div className="flex justify-center mt-6">
                <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
            </div>
        </form>)
}