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
  enabled:boolean,
  locale:string,          // https://www.science.co.il/language/Locale-codes.php
  localeLanguage:string,  // https://www.science.co.il/language/Locale-codes.php
  type: ContactType |null,
  files:ContactFile[] |null,
  events:ContactEvent[] |null // Eventi accaduti al Customer
}

enum ContactType {
  CUSTOMER, // cliente
  PROSPECT, // cliente interessato
  LEAD // cliente potenzialmente interessato
}
