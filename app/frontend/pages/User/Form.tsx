import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { UserFormType, UserType } from './types'

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>

interface FormProps {
  user: UserType
  onSubmit: (form: InertiaFormProps<UserFormType>) => void
  submitText: string
}

export default function Form({ user, onSubmit, submitText }: FormProps) {
  const form = useForm<UserFormType>({
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="submit" disabled={processing}>
          {submitText}
        </button>
      </div>
    </form>
  )
}
