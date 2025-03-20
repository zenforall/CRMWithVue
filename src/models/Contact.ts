interface Contact {
  id: string,
  code: string,
  name: string,
  surname: string,
  address: string,
  city: string,
  cap: string,
  nation: string,
  email:string,
  email1:string,
  email2:string,
  phone: string,
  phone1:string,
  phone2:string,
  notes:string,
  type: ContactType,
  files:ContactFile[],
  events:ContactEvent[] // Eventi accaduti al Customer
}

enum ContactType {
  CUSTOMER, // cliente
  PROSPECT, // cliente interessato
  LEAD // cliente potenzialmente interessato
}
