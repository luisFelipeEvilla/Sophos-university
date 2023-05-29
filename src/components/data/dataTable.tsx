import { clientRequest } from "@/utils/requests";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import toast from "react-hot-toast";

type propsType = { rows: any, columns: GridColDef[], entityName: string, setData: any }
export default function DataTable(props: propsType) {

    const handleDelete = async (id: number) => {
        try {
            await clientRequest(`${props.entityName}/${id}`, 'DELETE', {}, 'Deleted successfully');
            props.setData(props.rows.filter((row: any) => row.id != id));
        } catch (error) {
            console.log(error);
        }
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
        }
    );

    return (
        <div className="w-3/5 h-5/6 mt-6">
            <DataGrid
                rows={props.rows}
                columns={props.columns}
            ></DataGrid>
        </div>

    )
}