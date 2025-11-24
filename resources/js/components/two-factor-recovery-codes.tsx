import { Form } from '@inertiajs/react'
import { Eye, EyeOff, LockKeyhole, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { regenerateRecoveryCodes } from '@/routes/two-factor'
import AlertError from './alert-error'

type TwoFactorRecoveryCodesProps = {
  recoveryCodesList: string[]
  fetchRecoveryCodes: () => Promise<void>
  errors: string[]
}

export default function TwoFactorRecoveryCodes({
  recoveryCodesList,
  fetchRecoveryCodes,
  errors,
}: TwoFactorRecoveryCodesProps) {
  const [codesAreVisible, setCodesAreVisible] = useState<boolean>(false)
  const codesSectionRef = useRef<HTMLUListElement | null>(null)
  const canRegenerateCodes = recoveryCodesList.length > 0 && codesAreVisible

  // Generate stable UUIDs for skeleton loaders once per component mount
  const skeletonKeys = useMemo(() => Array.from({ length: 8 }, () => uuidv4()), [])

  const toggleCodesVisibility = useCallback(async () => {
    if (!(codesAreVisible || recoveryCodesList.length)) {
      await fetchRecoveryCodes()
    }

    setCodesAreVisible(!codesAreVisible)

    if (!codesAreVisible) {
      setTimeout(() => {
        codesSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      })
    }
  }, [codesAreVisible, recoveryCodesList.length, fetchRecoveryCodes])

  useEffect(() => {
    if (!recoveryCodesList.length) {
      fetchRecoveryCodes()
    }
  }, [recoveryCodesList.length, fetchRecoveryCodes])

  const RecoveryCodeIconComponent = codesAreVisible ? EyeOff : Eye

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-3">
          <LockKeyhole aria-hidden="true" className="size-4" />
          2FA Recovery Codes
        </CardTitle>
        <CardDescription>
          Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex select-none flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            aria-controls="recovery-codes-section"
            aria-expanded={codesAreVisible}
            className="w-fit"
            onClick={toggleCodesVisibility}
          >
            <RecoveryCodeIconComponent aria-hidden="true" className="size-4" />
            {codesAreVisible ? 'Hide' : 'View'} Recovery Codes
          </Button>

          {canRegenerateCodes && (
            <Form {...regenerateRecoveryCodes.form()} onSuccess={fetchRecoveryCodes} options={{ preserveScroll: true }}>
              {({ processing }) => (
                <Button aria-describedby="regenerate-warning" disabled={processing} type="submit" variant="secondary">
                  <RefreshCw /> Regenerate Codes
                </Button>
              )}
            </Form>
          )}
        </div>
        <div
          aria-hidden={!codesAreVisible}
          className={`relative overflow-hidden transition-all duration-300 ${codesAreVisible ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}
          id="recovery-codes-section"
        >
          <div className="mt-3 space-y-3">
            {errors?.length ? (
              <AlertError errors={errors} />
            ) : (
              <>
                <ul
                  aria-label="Recovery codes"
                  className="grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm"
                  ref={codesSectionRef}
                >
                  {recoveryCodesList.length ? (
                    recoveryCodesList.map((code) => (
                      <li className="select-text" key={code}>
                        {code}
                      </li>
                    ))
                  ) : (
                    <li aria-label="Loading recovery codes" className="space-y-2">
                      {Array.from({ length: 8 }, (_, index) => (
                        <div
                          aria-hidden="true"
                          className="h-4 animate-pulse rounded bg-muted-foreground/20"
                          key={skeletonKeys[index]}
                        />
                      ))}
                    </li>
                  )}
                </ul>

                <div className="select-none text-muted-foreground text-xs">
                  <p id="regenerate-warning">
                    Each recovery code can be used once to access your account and will be removed after use. If you
                    need more, click <span className="font-bold">Regenerate Codes</span> above.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
