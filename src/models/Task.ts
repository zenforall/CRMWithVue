enum TaskStatus {
  OPEN,
  IN_PROGRESS,
  COMPLETED,
  ON_HOLD,
  CLOSED
}

enum TaskPriority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedBy: User,
  assignedTo: User;
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
