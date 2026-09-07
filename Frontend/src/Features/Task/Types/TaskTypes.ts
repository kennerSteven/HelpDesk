export interface TaskType {
  id: string;
  name: string;
  description?: string;
  dateInit: string;
  dateFinish: string;
  photo?: string;
  priority: string;
  status: string;
  category: string;
}
