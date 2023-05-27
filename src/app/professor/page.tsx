"use client";
import DataTable from "@/components/data/dataTable";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Profesors() {
    const [ professors, setProfessors ] = useState<Profesor[]>([]);

    useEffect(() => {
        fetch('/api/professor')
            .then(response => response.json())
            .then(data => { setProfessors(data) }) 
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'first_name', headerName: 'First Name', flex: 1  },
        { field: 'last_name', headerName: 'Last Name', flex: 1  },
        { field: 'birthday', headerName: 'Birthday (M/D/Y)', flex: 1, 
            valueFormatter: (params: any) => {  
                return new Date(params.value).toLocaleDateString()
            },
        }
    ];
    
    return (
        <main className="flex flex-col items-center w-full py-20">
            <h1 className="text-4xl font-bold">Professors</h1>
            <div className="flex justify-end mt-4 w-3/5">
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2" href={'/professor/add'}>New</Link>
            </div>
            <DataTable rows={professors} columns={columns} setData={setProfessors} entityName="professor"></DataTable>
        </main>
    )
}