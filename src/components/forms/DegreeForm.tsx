import { SubmitHandler, useForm } from "react-hook-form";
import DateInput from "../inputs/DateInput";
import TextInput from "../inputs/TextInput";
import toast from "react-hot-toast";
import { clientRequest } from "@/utils/requests";

type Inputs = {
    name: string,
    earned_at: string
}

type propsType = { id: string, addDegree: Function }
export default function DegreeForm(props: propsType) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        try {
            const degree = await clientRequest(`professor/${props.id}/degree`, 'POST', data, 'Degree added successfully');
            props.addDegree(degree);
        } catch (error) {   
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
            <TextInput label="Degree Name" placeholder="Degree Name" register={register} fieldName="name" options={{}} errors={errors} />
            <DateInput label="Earned At" placeholder="Earned At" register={register} fieldName="earned_at" options={{}} errors={errors} />

            <div className="flex justify-center mt-6">
                <input className="rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-1 w-24 cursor-pointer " type='submit' value={'Save'} />
            </div>
        </form>)
}