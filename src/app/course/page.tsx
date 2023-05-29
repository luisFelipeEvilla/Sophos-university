"use client"
import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from "next/link";
import DataTable from "@/components/data/dataTable";
import { Course } from "@/types/Course";


export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        fetch('/api/course')
            .then(response => response.json())
            .then(data => { setCourses(data) })
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'description', headerName: 'Name', flex: 1 },
        { field: 'max_quota', headerName: 'Max Quota', flex: 0.5 },
        { field: 'credits', headerName: 'Credits', flex: 0.5 },
    ]

    return (
        <main className="flex flex-col items-center w-full py-20">
            <h1 className="text-4xl font-bold">Courses</h1>
            <div className="flex justify-end mt-4 w-3/5">
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2" href={'/course/add'}>New</Link>
            </div>
            <DataTable rows={courses} columns={columns} setData={setCourses} entityName="course"></DataTable>
        </main>
    )
}