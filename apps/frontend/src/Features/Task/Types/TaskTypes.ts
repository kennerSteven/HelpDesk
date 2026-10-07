export interface TaskType {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  dateInit: string;
  dateFinish: string;
  photo?: string;
  priority: string;
  status: string;
  category: string;
}
