import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"
import { USERS_PATH, getUsers } from "../actions"
import ClientTableSkeleton from "./client-table-skeleton"

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 300 },
  { field: "email", headerName: "Email", width: 180 },
  {
    field: "phone",
    headerName: "Phone number",
    headerAlign: "right",
    align: "right",
    width: 130
  },
  {
    field: "coords",
    headerName: "Coordinates",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 130,
    headerAlign: "right",
    align: "right",
    valueGetter: (params: GridValueGetterParams) =>
      `(${params.row.coordX || ""}, ${params.row.coordY || ""})`
  }
]

export default function ClientsTable() {
  const { data: allClients, isLoading } = useQuery({
    queryFn: () => getUsers(),
    queryKey: [USERS_PATH]
  })

  if (!allClients || allClients?.length < 1 || isLoading) {
    return (
      <div style={{ height: "100", width: "100%" }}>
        <ClientTableSkeleton />
      </div>
    )
  }

  return (
    <div style={{ height: "100", width: "100%" }}>
      <DataGrid
        loading={isLoading}
        rows={allClients}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
