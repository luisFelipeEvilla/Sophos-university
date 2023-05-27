"use client"
import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from "next/link";


export default function Faculties() {
    const [faculties, setFaculties] = useState<Faculty[]>([])

    useEffect(() => {
        fetch('/api/faculty')
            .then(response => response.json())
            .then(data => { setFaculties(data) })
    }, [])

    const handleDelete = (id: number) => {
        fetch(`/api/faculty/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFaculties(faculties.filter(faculty => faculty.id !== id))
                    alert('Faculty deleted successfully')
                } else {
                    console.log(data)
                    alert('Error deleting faculty')
                }
            })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
                <div className="flex justify-around gap-2">
                    <Link href={`/faculty/${params.id}`}>
                        <button className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2">Edit</button>
                    </Link>

                    <button onClick={() => handleDelete(params.id as number)} className="bg-red-500 hover:bg-red-600 rounded-md text-white font-bold px-6 py-2">Delete</button>

                </div>
            )
        }

    ]

    return (
        <main className="flex flex-col items-center w-full py-20">
            <h1 className="text-4xl font-bold">Faculties</h1>
            <div className="flex justify-end mt-4 w-3/5">
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2" href={'/faculty/add'}>New</Link>
            </div>
            <div className="w-3/5 h-5/6 mt-6">
                <DataGrid
                    rows={faculties}
                    columns={columns}
                ></DataGrid>
            </div>
        </main>
    )
}