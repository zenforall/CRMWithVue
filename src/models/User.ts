// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface User {
  id: string,
  name:string | null,
  surname:string | null,
  phone?:string | null ,
  address: string | null,
  cap:string | null,
  city:string |null,
  userName: string,
  password: string,
  email:string,
  company:string,
  activationDate:Date | null,
  type:UserType | null,
  locale:string,          // https://www.science.co.il/language/Locale-codes.php
  localeLanguage:string,  // https://www.science.co.il/language/Locale-codes.php
  enabled: boolean
}

export enum UserType {
  SELLER,
  EMPLOYEE
}
