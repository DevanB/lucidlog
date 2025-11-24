import { Form, Head } from '@inertiajs/react'
import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { store } from '@/routes/password/confirm'

export default function ConfirmPassword() {
  return (
    <AuthLayout
      description="This is a secure area of the application. Please confirm your password before continuing."
      title="Confirm your password"
    >
      <Head title="Confirm password" />

      <Form {...store.form()} resetOnSuccess={['password']}>
        {({ processing, errors }) => (
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                autoComplete="current-password"
                autoFocus
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />

              <InputError message={errors.password} />
            </div>

            <div className="flex items-center">
              <Button className="w-full" data-test="confirm-password-button" disabled={processing}>
                {processing && <Spinner />}
                Confirm password
              </Button>
            </div>
          </div>
        )}
      </Form>
    </AuthLayout>
  )
}
