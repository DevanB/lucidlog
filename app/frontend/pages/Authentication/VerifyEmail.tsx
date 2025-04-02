import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { TextLink } from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/layouts/auth-layout';
import { FlashMessages } from '@/components/flash-messages';

export default function VerifyEmail() {
  const { post, processing } = useForm();

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    // @TODO: Add error handling
    post('/verify-email');
  };

  return (
    <AuthLayout title="Verify Email" description="Please verify your email address by clicking on the link we just emailed to you.">
      <Head title="Verify Email" />
      <FlashMessages />
      <form onSubmit={submit} className="space-y-6 text-center">
        <Button disabled={processing} variant="secondary">
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Resend Verification Email
        </Button>

        <TextLink href="/logout" method="delete" className="mx-auto block text-sm">
          Log out
        </TextLink>
      </form>
    </AuthLayout>
  );
}
