import { usePage } from "@inertiajs/react";
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { SharedData } from '@/types';

export function EmailVerificationBanner() {
  const { auth } = usePage<SharedData>().props;
  const email_verified = auth.user?.email_verified_at === null;
  if (email_verified) {
    return (
      <div className="rounded-md bg-purple-50 p-4 dark:bg-purple-900" data-testid="email-verification-banner">
        <div className="flex">
          <div className="shrink-0">
            <InformationCircleIcon aria-hidden="true" className="size-5 text-purple-50" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-purple-200">Please verify your email address.</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
