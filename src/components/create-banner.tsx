type propsType = { title: string, imgPath: string }
export default function CreateBanner(props: propsType) {
    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="w-[160px] h-[160px] rounded-full bg-gray-500"></div>
            <h1 className="text-4xl font-bold mt-6">{props.title}</h1>
        </div>
    )
}