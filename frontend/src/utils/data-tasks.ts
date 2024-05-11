export type Status = 'a fazer' | 'em andamento' | 'feito'
export type Priority = 'low' | 'medium' | 'high'
export type Task = {
  title: string,
  id: string,
  status: Status,
  priority: Priority,
  points?: number
}

export const statuses: Status[] = ['a fazer', 'em andamento', 'feito']
export const priorities: Priority[] = ['low', 'medium', 'high']
