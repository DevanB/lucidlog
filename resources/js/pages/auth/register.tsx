import { Form, Head } from '@inertiajs/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/routes'
import { store } from '@/routes/register'

type PasswordFieldProps = {
  autoComplete: string
  error?: string
  id: string
  label: string
  name: string
  placeholder: string
}

function PasswordField({ autoComplete, error, id, label, name, placeholder }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const toggleVisibility = () => setShowPassword((v) => !v)
  const visibilityLabel = showPassword ? 'Hide password' : 'Show password'
  const VisibilityIcon = showPassword ? EyeOffIcon : EyeIcon

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          autoComplete={autoComplete}
          className="pr-10"
          id={id}
          name={name}
          placeholder={placeholder}
          required
          tabIndex={0}
          type={showPassword ? 'text' : 'password'}
        />
        <Button
          aria-label={visibilityLabel}
          className="absolute top-1.5 right-2 h-6 w-6 cursor-pointer text-muted-foreground"
          onClick={toggleVisibility}
          size="icon"
          tabIndex={0}
          title={visibilityLabel}
          type="button"
          variant="ghost"
        >
          <VisibilityIcon aria-hidden="true" />
        </Button>
      </div>
      <InputError message={error} />
    </div>
  )
}

export default function Register() {
  return (
    <AuthLayout description="Enter your details below to create your account" title="Create an account">
      <Head title="Register" />
      <Form
        {...store.form()}
        className="flex flex-col gap-6"
        disableWhileProcessing
        resetOnSuccess={['password', 'password_confirmation']}
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  autoComplete="name"
                  autoFocus
                  id="name"
                  name="name"
                  placeholder="Full name"
                  required
                  tabIndex={0}
                  type="text"
                />
                <InputError className="mt-2" message={errors.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  autoComplete="email"
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  required
                  tabIndex={0}
                  type="email"
                />
                <InputError message={errors.email} />
              </div>

              <PasswordField
                autoComplete="new-password"
                error={errors.password}
                id="password"
                label="Password"
                name="password"
                placeholder="Password"
              />

              <PasswordField
                autoComplete="new-password"
                error={errors.password_confirmation}
                id="password_confirmation"
                label="Confirm password"
                name="password_confirmation"
                placeholder="Confirm password"
              />

              <Button className="mt-2 w-full" data-test="register-user-button" tabIndex={0} type="submit">
                {processing && <Spinner />}
                Create account
              </Button>
            </div>

            <div className="text-center text-muted-foreground text-sm">
              Already have an account?{' '}
              <TextLink href={login()} tabIndex={0}>
                Log in
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
