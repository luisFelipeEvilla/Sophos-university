import toast from "react-hot-toast";
type propsType = {courseId: string,  professor: Professor, index: number }

export default function ProfessorCard(props: propsType) {
    
    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/course/${props.courseId}/teacher/${id}`, {
            method: 'DELETE',
        })

        if (res.status === 200) {
            toast('Professor deleted successfully', { icon: '👏'})
            window.location.reload();
        } else {
            console.log(res);
            toast('Error deleting professor', { icon: '❌'})
        }
    }
    return (
        <div className="shadow-md rounded-md p-8 flex flex-col gap-2 items-center w-[350px] my-10">
            <p className="font-bold text-xl text-center">{`${props.professor.first_name} ${props.professor.last_name}`}</p>
            <p className="text-lg text-center"> { props.professor.degrees[0]?.name}</p>
            <div className="flex justify-center">
                <button className="rounded-md bg-red-500 text-white font-bold px-4 py-2"
                    onClick={() => { handleDelete( props.professor.id) }}
                >Remove</button>
            </div>
        </div>
    )
}