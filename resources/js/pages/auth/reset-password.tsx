import { Form, Head } from '@inertiajs/react'
import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { update } from '@/routes/password'

type ResetPasswordProps = {
  token: string
  email: string
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  return (
    <AuthLayout description="Please enter your new password below" title="Reset password">
      <Head title="Reset password" />

      <Form
        {...update.form()}
        resetOnSuccess={['password', 'password_confirmation']}
        transform={(data) => ({ ...data, token, email })}
      >
        {({ processing, errors }) => (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="email"
                className="mt-1 block w-full"
                id="email"
                name="email"
                readOnly
                type="email"
                value={email}
              />
              <InputError className="mt-2" message={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                autoComplete="new-password"
                autoFocus
                className="mt-1 block w-full"
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
              <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirm password</Label>
              <Input
                autoComplete="new-password"
                className="mt-1 block w-full"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Confirm password"
                type="password"
              />
              <InputError className="mt-2" message={errors.password_confirmation} />
            </div>

            <Button className="mt-4 w-full" data-test="reset-password-button" disabled={processing} type="submit">
              {processing && <Spinner />}
              Reset password
            </Button>
          </div>
        )}
      </Form>
    </AuthLayout>
  )
}
