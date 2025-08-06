import type { User } from "./User";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UserFilter extends User {
  activationDateFrom:Date | null,
  activationDateTo:Date | null,
}
