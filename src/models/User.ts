interface User {
  id: string,
  userName: string,
  password: string,
  email:string,
  company:string,
  activationDate:Date | null,
  locale:string,          // https://www.science.co.il/language/Locale-codes.php
  localeLanguage:string,  // https://www.science.co.il/language/Locale-codes.php
  enabled: boolean
}
