import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"

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

const rows = [
  {
    id: "62f16617-1e34-40fd-a79d-76d939312472",
    name: "João Correia dos Santos",
    email: "joaocs@gmail.com",
    phone: "999990000",
    coordX: 2,
    coordY: 2
  },
  {
    id: "3faeaae0-6441-4c66-ac39-a36f3d71c458",
    name: "Maria Aparecida Lima",
    email: "malima@gmail.com",
    phone: "999990001",
    coordX: 4,
    coordY: 2
  },
  {
    id: "cd98af02-6f80-4e3c-8c93-014f1e6bd23c",
    name: "José Antônio Nogueira",
    email: "jantonion@gmail.com",
    phone: "999990002",
    coordX: -3,
    coordY: -3
  },
  {
    id: "eefea804-e742-4bae-a845-af4deed97795",
    name: "Adamastor Tambalascos",
    email: "adamastortambalascos@gmail.com",
    phone: "999990003",
    coordX: 100,
    coordY: 50
  }
]

export default function ClientsTable() {
  return (
    <div style={{ height: "100", width: "100%" }}>
      <DataGrid
        rows={rows}
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
