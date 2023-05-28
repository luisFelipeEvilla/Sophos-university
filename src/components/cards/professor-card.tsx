type propsType = { professor: Professor, index: number }

export default function ProfessorCard(props: propsType) {
    return (
        <div className="shadow-md rounded-md p-8 flex flex-col gap-2 items-center w-[300px] my-10">
            <p className="font-bold text-xl text-center">{`${props.professor.first_name} ${props.professor.last_name}`}</p>
            <p className="text-lg text-center"> { props.professor.degrees[0].name}</p>
        </div>
    )
}