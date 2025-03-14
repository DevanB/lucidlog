import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { DreamFormType, DreamType } from './types'

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>

interface FormProps {
  dream: DreamType
  onSubmit: (form: InertiaFormProps<DreamFormType>) => void
  submitText: string
}

export default function Form({ dream, onSubmit, submitText }: FormProps) {
  const form = useForm<DreamFormType>({
    title: dream.title,
    body: dream.body,
    dream_date: dream.dream_date,
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ display: 'block' }} htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={(e) => setData('title', e.target.value)}
        />
        {errors.title && (
          <div style={{ color: 'red' }}>{errors.title}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="body">
          Body
        </label>
        <textarea
          name="body"
          id="body"
          value={data.body}
          onChange={(e) => setData('body', e.target.value)}
        />
        {errors.body && (
          <div style={{ color: 'red' }}>{errors.body}</div>
        )}
      </div>
      <div>
        <label style={{ display: 'block' }} htmlFor="dream_date">
          Dream date
        </label>
        <input
          type="date"
          name="dream_date"
          id="dream_date"
          value={data.dream_date}
          onChange={(e) => setData('dream_date', e.target.value)}
        />
        {errors.dream_date && (
          <div style={{ color: 'red' }}>{errors.dream_date}</div>
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
