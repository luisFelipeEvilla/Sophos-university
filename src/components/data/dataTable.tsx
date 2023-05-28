import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

type propsType = { rows: any, columns: GridColDef[], entityName: string, setData: any }
export default function DataTable(props: propsType) {

    const handleDelete = (id: number) => {
        fetch(`/api/${props.entityName}/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    props.setData(props.rows.filter((row: { id: number; }) => row.id !== id))
                    alert(`${props.entityName} deleted successfully`)
                } else {
                    console.log(data)
                    alert(`Error deleting ${props.entityName}}`)
                }
            })
    }

    props.columns.push(
        {
            field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
                <div className="flex justify-around gap-2">
                    <Link href={`/${props.entityName}/${params.id}`}>
                        <button className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-6 py-2">Edit</button>
                    </Link>

                    <button onClick={() => handleDelete(params.id as number)} className="bg-red-500 hover:bg-red-600 rounded-md text-white font-bold px-6 py-2">Delete</button>

                </div>
            )
        });

    return (
        <div className="w-3/5 h-5/6 mt-6">
            <DataGrid
                rows={props.rows}
                columns={props.columns}
            ></DataGrid>
        </div>

    )
}