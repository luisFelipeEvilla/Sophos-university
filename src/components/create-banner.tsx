import Image from "next/image"

type propsType = { title: string, imgPath: string }
export default function CreateBanner(props: propsType) {
    return (
        <div className="flex flex-col items-center justify-center ">
            <div >
                <Image className="rounded-full shadow-sm" src={`${props.imgPath}`} alt={props.imgPath} width={280} height={280} />
            </div>
            <h1 className="text-4xl font-bold mt-6">{props.title}</h1>
        </div>
    )
}