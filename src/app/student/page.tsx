"use client"
import { useEffect, useState } from "react"
import { GridColDef } from '@mui/x-data-grid';
import Link from "next/link";
import DataTable from "@/components/data/dataTable";
import { Student } from "@/types/Student";
import Spinner from "@/components/spinner";


export default function Students() {
    const [courses, setCourses] = useState<Student[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/student')
            .then(response => response.json())
            .then(data => {
                setCourses(data)
                setLoading(false)
            })
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1, valueGetter: (params: any) => params.row.first_name + ' ' + params.row.last_name },
        { field: 'birthday', headerName: 'Birth Date (M/D/Y)', flex: 1, valueFormatter: (params: any) => new Date(params.value).toLocaleDateString() }
    ]

    return (
        loading ? <Spinner /> :
        <main className="flex flex-col items-center w-full py-20">
            <h1 className="text-4xl font-bold">Students</h1>
            <div className="flex justify-end mt-4 w-3/5">
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2" href={'/student/add'}>New</Link>
            </div>
            <DataTable rows={courses} columns={columns} setData={setCourses} entityName="student"></DataTable>
        </main>
    )
}