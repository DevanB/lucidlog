import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { FlashMessages } from '@/components/flash-messages';
import { InputError } from '@/components/input-error';
import { TextLink } from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword() {
  const { data, setData, post, processing, errors, reset, transform } = useForm({
    email_address: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    transform((data) => ({
      user: { ...data }
    }))
    post('/forgot-password', {
      onFinish: () => reset('email_address'),
    });
  };

  return (
    <AuthLayout layout="simple" title="Forgot password" description="Enter your email to receive a password reset link">
      <Head title="Forgot password" />
      <FlashMessages />
      <div className="space-y-6">
        <form onSubmit={submit}>
          <div className="grid gap-2">
            <Label htmlFor="email_address">Email address</Label>
            <Input
              id="email_address"
              type="email"
              name="email_address"
              autoComplete="off"
              value={data.email_address}
              autoFocus
              onChange={(e) => setData('email_address', e.target.value)}
              placeholder="email@example.com"
            />

            <InputError message={errors.email_address} />
          </div>

          <div className="my-6 flex items-center justify-start">
            <Button className="cursor-pointer w-full" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Email password reset link
            </Button>
          </div>
        </form>

        <div className="text-muted-foreground space-x-1 text-center text-sm">
          <span>Or, return to</span>
          <TextLink href="/login">log in</TextLink>
        </div>
      </div>
    </AuthLayout>
  );
}

