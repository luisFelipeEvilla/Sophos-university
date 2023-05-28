type propsType = { degree: Degree, index: number }
export default function DegreeCard(props: propsType) {

    return (
        <div className="flex gap-4">
            <div key={props.index} className="shadow-md rounded-md p-4 border-gray-300 flex flex-col gap-2 items-center mt-4 w-1/2">
                <p className="font-semibold text-lg"> {props.degree.name}</p>
                <p> {props.degree.earned_at}</p>
                <button className="rounded-md px-5 py-2 text-white bg-red-500 w-24" onClick={() => { }}>Eliminar</button>
            </div>
        </div>
    )
}