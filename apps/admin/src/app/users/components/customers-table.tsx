"use client"
import { Button, Column, Show } from "@core/components"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { useMutation, useQuery } from "@tanstack/react-query"
import React from "react"
import { USERS_PATH, createRoute, getUsers } from "../actions"
import CustomerTableSkeleton from "./customer-table-skeleton"
import RouteModal from "./route-modal"

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

export default function CustomersTable() {
  const [selected, setSelected] = React.useState<string[]>([])
  const [route, setRoute] = React.useState([])

  const { data: allCustomers, isLoading } = useQuery({
    queryFn: () => getUsers(),
    queryKey: [USERS_PATH]
  })

  const { mutate } = useMutation({
    mutationFn: createRoute,
    onSuccess: (data) => setRoute(data)
  })

  if (!allCustomers || allCustomers?.length < 1 || isLoading) {
    return (
      <div style={{ height: "100", width: "100%" }}>
        <CustomerTableSkeleton />
      </div>
    )
  }

  return (
    <div style={{ height: "100", width: "100%" }}>
      <DataGrid
        loading={isLoading}
        rows={allCustomers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = ids.map((id) => id.toString())
          setSelected(selectedIDs)
        }}
      />
      <Show when={selected?.length > 1}>
        <Column className="p-4">
          <Button
            intent="primary"
            label="Show route"
            onClick={() => mutate(selected)}
          />
        </Column>
      </Show>
      <RouteModal
        route={route}
        isOpen={route?.length > 0}
        onClose={() => setRoute([])}
      />
    </div>
  )
}
