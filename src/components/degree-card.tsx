import { clientRequest } from "@/utils/requests";
import toast from "react-hot-toast";

type propsType = { teacher: number, degree: Degree, index: number, removeDegree: Function }
export default function DegreeCard(props: propsType) {
    const handleDelete = async (teacherId: number, id: number) => {
        try {
            await clientRequest(`professor/${teacherId}/degree/${id}`, 'DELETE', {}, 'Degree deleted successfully');
            props.removeDegree(props.degree);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div key={props.index} className="shadow-md rounded-md p-4 border-gray-300 flex flex-col gap-2 items-center mt-4 w-[300px]">
            <p className="font-semibold text-lg"> {props.degree.name}</p>
            <p> {props.degree.earned_at}</p>
            <button className="rounded-md px-5 py-2 text-white bg-red-500 w-24" onClick={() => { handleDelete(props.teacher, props.degree.id)}}>Eliminar</button>
        </div>
    )
}