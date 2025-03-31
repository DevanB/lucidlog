import { usePage } from "@inertiajs/react";
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { SharedData } from '@/types';

export function EmailVerificationBanner() {
  const { auth } = usePage<SharedData>().props;
  const email_not_verified = auth.user?.email_verified_at === null;
  if (email_not_verified) {
    return (
      <div className="rounded-md bg-purple-50 p-4 dark:bg-purple-900" data-testid="email-verification-banner" aria-label="Email verification notice">
        <div className="flex">
          <div className="shrink-0">
            <InformationCircleIcon aria-hidden="true" className="size-5 text-purple-400 dark:text-purple-50" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-purple-700 dark:text-purple-200">Please verify your email address.</p>
            <div className="mt-3 shrink-0 md:ml-4 md:mt-0">
              <a href="/verify-email" className="text-sm font-medium text-purple-700 hover:text-purple-600 dark:text-purple-200 dark:hover:text-purple-100">
                Resend verification email
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
