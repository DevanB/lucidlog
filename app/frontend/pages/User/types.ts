export interface UserType {
  id: number
}

export type UserFormType = Omit<UserType, 'id'>
