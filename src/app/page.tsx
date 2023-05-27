import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <div className='mt-20 text-center'>
        <h1 className='text-4xl font-bold'>Welcome to Sophos University</h1>
        <p className='text-lg mt-6'>Here you can find all the information about the university</p>
      </div>
    </main>
  )
}
