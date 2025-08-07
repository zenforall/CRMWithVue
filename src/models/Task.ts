import type { User } from "./User";

export enum TaskStatus {
  OPEN,
  IN_PROGRESS,
  COMPLETED,
  ON_HOLD,
  CLOSED
}

export enum TaskPriority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedBy: User | null,
  assignedTo: User | null;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;

  notes: TaskNote[];
  attachments: TaskAttachment[];
  images: TaskImage[];
  history: TaskHistoryEntry[];

  createdAt: Date;
  updatedAt: Date;
}

export interface TaskNote {
  id: string;
  author: User;
  message: string;
  createdAt: Date;
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  url: string;
  uploadedAt: Date;
}

export interface TaskImage {
  id: string;
  caption?: string;
  url: string;
}

export interface TaskHistoryEntry {
  id: string;
  action: string;
  author: User;
  timestamp: Date;
}
