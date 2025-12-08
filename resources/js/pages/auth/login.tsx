import { Form, Head } from '@inertiajs/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { register } from '@/routes'
import { store } from '@/routes/login'
import { request } from '@/routes/password'

type LoginProps = {
  status?: string
  canResetPassword: boolean
  canRegister: boolean
}

export default function Login({ status, canResetPassword, canRegister }: LoginProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <AuthLayout description="Enter your email and password below to log in" title="Log in to your account">
      <Head title="Log in" />

      <Form {...store.form()} className="flex flex-col gap-6" resetOnSuccess={['password']}>
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  autoComplete="email"
                  autoFocus
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {canResetPassword && (
                    <TextLink className="ml-auto text-sm" href={request()} tabIndex={0}>
                      Forgot password?
                    </TextLink>
                  )}
                </div>
                <div className="relative">
                  <Input
                    aria-describedby="password-help"
                    autoComplete="current-password"
                    className="pr-10"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    tabIndex={0}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <Button
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute top-1.5 right-2 h-6 w-6 cursor-pointer text-muted-foreground"
                    onClick={() => setShowPassword((v) => !v)}
                    size="icon"
                    tabIndex={0}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
                  </Button>
                </div>
                <InputError message={errors.password} />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="remember" name="remember" tabIndex={0} />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              <Button className="mt-4 w-full" data-test="login-button" disabled={processing} tabIndex={0} type="submit">
                {processing && <Spinner />}
                Log in
              </Button>
            </div>

            {canRegister && (
              <div className="text-center text-muted-foreground text-sm">
                Don't have an account?{' '}
                <TextLink href={register()} tabIndex={0}>
                  Sign up
                </TextLink>
              </div>
            )}
          </>
        )}
      </Form>

      {status && <div className="mb-4 text-center font-medium text-green-600 text-sm">{status}</div>}
    </AuthLayout>
  )
}
