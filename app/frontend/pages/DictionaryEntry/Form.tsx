import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { DictionaryEntryFormType, DictionaryEntryType } from './types'

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>

interface FormProps {
  dictionary_entry: DictionaryEntryType
  onSubmit: (form: InertiaFormProps<DictionaryEntryFormType>) => void
  submitText: string
}

export default function Form({ dictionary_entry, onSubmit, submitText }: FormProps) {
  const form = useForm<DictionaryEntryFormType>({
    term: dictionary_entry.term,
    definition: dictionary_entry.definition,
    draft: dictionary_entry.draft,
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ display: 'block' }} htmlFor="term">
          Term
        </label>
        <input
          type="text"
          name="term"
          id="term"
          value={data.term}
          onChange={(e) => setData('term', e.target.value)}
        />
        {errors.term && (
          <div style={{ color: 'red' }}>{errors.term}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="definition">
          Definition
        </label>
        <textarea
          name="definition"
          id="definition"
          value={data.definition}
          onChange={(e) => setData('definition', e.target.value)}
        />
        {errors.definition && (
          <div style={{ color: 'red' }}>{errors.definition}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="draft">
          Draft
        </label>
        <input
          type="checkbox"
          name="draft"
          id="draft"
          checked={data.draft}
          onChange={(e) => setData('draft', e.target.checked)}
        />
        {errors.draft && (
          <div style={{ color: 'red' }}>{errors.draft}</div>
        )}
      </div>
      <div>
        <button type="submit" disabled={processing}>
          {submitText}
        </button>
      </div>
    </form>
  )
}
