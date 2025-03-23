import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { FlashMessages } from '@/components/flash-messages';
import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';

interface ResetPasswordProps {
  token: string;
}

type ResetPasswordForm = {
  password: string;
  password_confirmation: string;
};

export default function ResetPassword({ token }: ResetPasswordProps) {
  const { data, setData, patch, processing, errors, reset, transform } = useForm<ResetPasswordForm>({
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    transform((data) => ({
      user: { ...data }
    }))
    patch(`/reset-password/${token}/`, {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout layout="simple" title="Reset password" description="Please enter your new password below">
      <Head title="Reset password" />
      <FlashMessages />
      <form onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              tabIndex={1}
              autoComplete="new-password"
              value={data.password}
              className="mt-1 block w-full"
              autoFocus
              onChange={(e) => setData('password', e.target.value)}
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
              tabIndex={2}
              autoComplete="new-password"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <Button type="submit" tabIndex={3} className="mt-4 w-full" disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Reset password
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

