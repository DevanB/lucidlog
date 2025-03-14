export interface DictionaryEntryType {
  id: number
  term: string
  definition: string
  draft: boolean
}

export type DictionaryEntryFormType = Omit<DictionaryEntryType, 'id'>
