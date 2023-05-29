"use client"
import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from "next/link";
import DataTable from "@/components/data/dataTable";
import Spinner from "@/components/spinner";


export default function Faculties() {
    const [faculties, setFaculties] = useState<Faculty[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/faculty')
            .then(response => response.json())
            .then(data => {
                setFaculties(data) 
                setLoading(false)
            })
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1 }
    ]

    return (
        loading ? <Spinner /> :
        <main className="flex flex-col items-center w-full py-20">
            <h1 className="text-4xl font-bold">Faculties</h1>
            <div className="flex justify-end mt-4 w-3/5">
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2" href={'/faculty/add'}>New</Link>
            </div>
            <DataTable rows={faculties} columns={columns} setData={setFaculties} entityName="faculty"></DataTable>
        </main>
    )
}