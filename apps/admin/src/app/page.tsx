import { Column } from "@core/components"
import Webpage from "@core/components/webpage"
import ClientsTable from "./users/components/clients-table"

export default function Home() {
  return (
    <Webpage title="Clients list" className="w-full h-full bg-gray-100">
      <Column className="bg-white h-full w-full max-w-[900px] self-center p-8">
        <ClientsTable />
      </Column>
    </Webpage>
  )
}
