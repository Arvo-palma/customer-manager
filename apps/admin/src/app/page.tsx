import { Column } from "@core/components"
import Webpage from "@core/components/webpage"
import CustomersTable from "./users/components/customers-table"

export default function Home() {
  return (
    <Webpage title="Customers list" className="w-full h-full bg-gray-100">
      <Column className="bg-white h-full w-full max-w-[900px] self-center p-8">
        <CustomersTable />
      </Column>
    </Webpage>
  )
}
