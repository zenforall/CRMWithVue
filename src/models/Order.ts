interface Order {
  id:string,
  code:string,
  creationDate: Date | null,
  customer: Customer,
  rows: OrderRow[]
  returns: OrderReturn[],
  documents: OrderDocument[],
}
