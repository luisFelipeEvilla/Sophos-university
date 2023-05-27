import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { FaSchool, FaUserGraduate, FaBuilding, FaChalkboardTeacher } from 'react-icons/fa';
import { Navigation } from '@/components/navigation';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sophos University',
  description: 'Generated by create next app',
}

const links = [
  { href: '/faculties', label: 'Faculties', icon: <FaBuilding/> },
  { href: '/courses', label: 'Courses', icon: <FaSchool/> },
  { href: '/students', label: 'Students', icon: <FaUserGraduate/> },
  { href: '/teachers', label: 'Teachers',  icon: <FaChalkboardTeacher/> },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex'>
          <Navigation links={links}/>
          {children}
        </div>
      </body>
    </html>
  )
}
