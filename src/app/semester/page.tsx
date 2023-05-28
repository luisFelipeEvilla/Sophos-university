"use client"
import { useEffect, useState } from "react"
import { GridColDef } from '@mui/x-data-grid';
import Link from "next/link";
import DataTable from "@/components/data/dataTable";
import { Semester } from "@/types/Semester";


export default function Semesters() {
    const [semesters, setSemesters] = useState<Semester[]>([])

    useEffect(() => {
        fetch('/api/semester')
            .then(response => response.json())
            .then(data => { setSemesters(data) })
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'period', headerName: 'Period', flex: 1, 
        valueGetter: (params) => { return `${params.row.year} - ${params.row.period}` } },
    ]

    return (
        <main className="flex flex-col items-center w-full py-20">
            <h1 className="text-4xl font-bold">Semesters</h1>
            <div className="flex justify-end mt-4 w-3/5">
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2" href={'/semester/add'}>New</Link>
            </div>
            <DataTable rows={semesters} columns={columns} setData={setSemesters} entityName="semester"></DataTable>
        </main>
    )
}