import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { FlashMessages } from '@/components/flash-messages';
import { InputError } from '@/components/input-error';
import { TextLink } from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';

type LoginForm = {
  email_address: string;
  password: string;
};

export default function Login() {
  const { data, setData, post, processing, errors, reset, transform } = useForm<LoginForm>({
    email_address: '',
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    transform((data) => ({
      user: { ...data }
    }))
    // @TODO: Add error handling
    post('/login', {
      onSuccess: () => reset('password'),
    });
  };

  return (
    <AuthLayout layout="simple" title="Log In" description="Enter your email and password below to log in">
      <Head title="Log In" />

      <FlashMessages />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email_address">Email Address</Label>
            <Input
              id="email_address"
              type="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              value={data.email_address}
              onChange={(e) => setData('email_address', e.target.value)}
              placeholder="email@example.com"
            />
            <InputError message={errors.email_address} />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <TextLink href='/forgot-password' className="ml-auto text-sm" tabIndex={5}>
                Forgot Password?
              </TextLink>
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password"
            />
            <InputError message={errors.password} />
          </div>

          <Button type="submit" className="cursor-pointer mt-4 w-full" tabIndex={3} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Log In
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Don't have an account?{' '}
          <TextLink href='/register' tabIndex={4}>
            Create An Account
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}
