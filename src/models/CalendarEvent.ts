export interface CalendarEvent {
  id:string,
  name:string,
  description:string,
  contact:Contact,
  day:number,
  month:number,
  year:number,
  dateStart:Date,
  dateEnd:Date,
}
