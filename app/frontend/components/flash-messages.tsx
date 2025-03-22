import { usePage } from "@inertiajs/react";
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'

export function FlashMessages() {
  const { flash } = usePage().props;

  if (flash.alert) {
    return (
      <div className="rounded-md bg-red-50 p-4" data-testid="flash-alert">
        <div className="flex">
          <div className="shrink-0">
            <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-red-700">{flash.alert}</p>
          </div>
        </div>
      </div>
    );
  }

  if (flash.notice) {
    return (
      <div className="rounded-md bg-blue-50 p-4" data-testid="flash-notice">
        <div className="flex">
          <div className="shrink-0">
            <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">{flash.notice}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
