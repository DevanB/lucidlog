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

type RegisterForm = {
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset, transform } = useForm<RegisterForm>({
    first_name: '',
    last_name: '',
    email_address: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    transform((data) => ({
      user: { ...data }
    }))
    post('/register', {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout layout="split" title="Create an account" description="Enter your details below to create your account">
      <Head title="Register" />
      <FlashMessages />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="given-name"
              value={data.first_name}
              onChange={(e) => setData('first_name', e.target.value)}
              disabled={processing}
              placeholder="First name"
            />
            <InputError message={errors.first_name} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              type="text"
              required
              tabIndex={2}
              autoComplete="family-name"
              value={data.last_name}
              onChange={(e) => setData('last_name', e.target.value)}
              disabled={processing}
              placeholder="Last name"
            />
            <InputError message={errors.last_name} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email_address">Email address</Label>
            <Input
              id="email_address"
              type="email"
              required
              tabIndex={3}
              autoComplete="email"
              value={data.email_address}
              onChange={(e) => setData('email_address', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email_address} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Password"
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required
              tabIndex={5}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button type="submit" className="cursor-pointer mt-2 w-full" tabIndex={6} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <TextLink href='/login' tabIndex={7}>
            Log in
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}

