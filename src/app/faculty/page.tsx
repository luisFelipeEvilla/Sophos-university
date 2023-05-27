"use client"
import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from "next/link";


export default function Faculties() {
    const [faculties, setFaculties] = useState<Faculty[]>([])

    useEffect(() => {
        fetch('/api/faculty')
            .then(response => response.json())
            .then(data => {setFaculties(data)})
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 250 },
    ] 

    return (
        <main className="flex flex-col items-center w-full py-20">
            <h1 className="text-4xl font-bold">Faculties</h1>
            <div className="flex justify-end mt-4 w-3/5">
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2" href={'/faculties/create'}>New</Link>
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