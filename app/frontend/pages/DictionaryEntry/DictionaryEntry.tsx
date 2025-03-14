import { DictionaryEntryType } from './types'

interface DictionaryEntryProps {
  dictionary_entry: DictionaryEntryType
}

export default function DictionaryEntry({ dictionary_entry }: DictionaryEntryProps) {
  return (
    <div>
      <p>
        <strong>Term:</strong>
        {dictionary_entry.term?.toString()}
      </p>
      <p>
        <strong>Definition:</strong>
        {dictionary_entry.definition?.toString()}
      </p>
      <p>
        <strong>Draft:</strong>
        {dictionary_entry.draft?.toString()}
      </p>
    </div>
  )
}
