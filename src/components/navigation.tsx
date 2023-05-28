import Image from "next/image"
import Link from "next/link"

type link = { href: string, label: string, icon: JSX.Element}
type propsType = {links: link[]}

export const Navigation = (props: propsType) => {
    return (
        <nav className='w-[250px] bg-slate-900 h-screen text-white flex flex-col'>
            <div className='mt-14 flex flex-col items-center'>
                <div >
                    <Image className='rounded-full' src={'/images/sophos-logo.png'} width={120} height={120} alt='Logo'></Image>
                </div>
                 <Link className='mt-2 text-xl' href={'/'}>Admin</Link>
            </div>

            <ul className='mt-14 flex flex-col'>
                {
                    props.links.map(({ href, label, icon, }, index) => (
                        <li key={index} className='p-2 text-center border-t-[1px] border-slate-400 hover:bg-slate-800 flex flex-col justify-center'>

                            <Link className='flex pl-4 items-center gap-4' href={href}>{icon} {label}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}