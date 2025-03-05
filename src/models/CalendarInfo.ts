import type { VIEWS } from "./CalendarInfoConstants";

export interface CalendarInfo {
  //today:Date |null,
  //next:boolean, // forse non serve
  //prev:boolean, // forse non serve
  //actualDay:number,
  day:number | null,
  month:number | null,
  year:number | null,
  viewType:VIEWS
}
