import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const inventoryData = [
  { name: "3-Eye Solar Light", price: "₦15,000", stock: 45 },
  { name: "4-Eye Solar Light", price: "₦18,500", stock: 32 },
  { name: "3 Lens 4G Solar Camera", price: "₦85,000", stock: 18 },
  { name: "2 Lens 4G Solar Camera", price: "₦65,000", stock: 24 },
]

export function InventoryTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryData.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="text-right">{item.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
