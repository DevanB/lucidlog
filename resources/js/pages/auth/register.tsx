import { Form, Head } from '@inertiajs/react'
import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { login } from '@/routes'
import { store } from '@/routes/register'

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

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="new-password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  tabIndex={0}
                  type="password"
                />
                <InputError message={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input
                  autoComplete="new-password"
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Confirm password"
                  required
                  tabIndex={0}
                  type="password"
                />
                <InputError message={errors.password_confirmation} />
              </div>

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
