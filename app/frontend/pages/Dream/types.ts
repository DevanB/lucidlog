export interface DreamType {
  id: number
  title: string
  body: string
  dream_date: string
}

export type DreamFormType = Omit<DreamType, 'id'>
