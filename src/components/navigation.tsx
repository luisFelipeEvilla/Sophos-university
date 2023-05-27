import Link from "next/link"

type link = { href: string, label: string, icon: JSX.Element}
type propsType = {links: link[]}

export const Navigation = (props: propsType) => {
    return (
        <nav className='w-[250px] bg-slate-900 h-screen text-white flex flex-col'>
            <div className='mt-14 flex flex-col items-center'>
                <div className='rounded-full w-[100px] h-[100px] bg-gray-500'></div>
                <Link className='mt-2 text-xl' href={'/'}>Sophos</Link>
            </div>

            <ul className='mt-14 flex flex-col'>
                {
                    props.links.map(({ href, label, icon }) => (
                        <li className='p-2 text-center border-t-[1px] border-slate-400 hover:bg-slate-800 flex flex-col justify-center'>

                            <Link className='flex pl-4 items-center gap-4' href={href}>{icon} {label}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}