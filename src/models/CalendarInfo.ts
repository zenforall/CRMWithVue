import type { VIEWS } from "./CalendarInfoConstants";

export interface CalendarInfo {
  today:Date,
  next:boolean,
  prev:boolean,
  actualDay:number,
  actualMonth:number,
  actualYear:number,
  choosedDate:Date,
  viewType:VIEWS
}
