interface User {
  id: string,
  userName: string,
  password: string,
  email:string,
  company:string,
  activationDate:Date | null,
  locale:string,
  enabled: boolean
}
