import type { BreadCrumbItem } from "../models/BreadCrumbItem";

export function breadCrumbItemsHandler(items: BreadCrumbItem[], message: BreadCrumbItem[]): void {
  items.splice(0, items.length, ...message); // Mantiene la reattività dell'array
}
