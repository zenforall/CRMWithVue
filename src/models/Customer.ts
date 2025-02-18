interface Customer {
  id: string,
  type:string,  // Customer, Lead, Prospect
  code: string,
  name: string,
  surname: string,
  address: string,
  city: string,
  cap: string,
  nation: string,
  phone: string,
  notes:string,
  events:CustomerEvent[] // Eventi accaduti al Customer
}
