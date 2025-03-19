interface Order {
  id:string,
  code:string,
  creationDate: Date | null,
  customer: Contact,
  rows: OrderRow[]
  returns: OrderReturn[],
  documents: OrderDocument[],
}
