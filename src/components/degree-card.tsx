type propsType = { teacher: number, degree: Degree, index: number }
export default function DegreeCard(props: propsType) {
    const handleDelete = async (teacherId: number, id: number) => {
        const res = await fetch(`/api/professor/${teacherId}/degree/${id}`, {
            method: 'DELETE'
        })

        if (res.status === 200) {
            alert('Degree deleted Successfully')
            window.location.reload();
        } else {
            console.log(res);
            alert('Error deleting Degree')
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