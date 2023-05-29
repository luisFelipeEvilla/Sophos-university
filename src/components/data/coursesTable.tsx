import { DataGrid, GridColDef } from "@mui/x-data-grid";

type propsType = { courses: any}
export default function CoursesTable(props: propsType) {
    const colums: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'credits', headerName: 'Credits', flex: 0.5 },
        { field: 'semester', headerName: 'Semester', flex: 0.5 }
    ];

    return (
        <div className="flex flex-col mt-8 w-3/5 gap-4 text-center">
            <div className="text-2xl font-bold">Courses</div>
            <div className="h-[600px]" >
                <DataGrid
                    rows={props.courses}
                    columns={colums}
                />
            </div>
        </div >
    )
}