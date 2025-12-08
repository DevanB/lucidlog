import { Form, Head } from '@inertiajs/react'
import { ShieldBan, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import HeadingSmall from '@/components/heading-small'
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes'
import TwoFactorSetupModal from '@/components/two-factor-setup-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { disable, enable, show } from '@/routes/two-factor'
import type { BreadcrumbItem } from '@/types'

type TwoFactorProps = {
  requiresConfirmation?: boolean
  twoFactorEnabled?: boolean
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Two-Factor Authentication',
    href: show.url(),
  },
]

export default function TwoFactor({ requiresConfirmation = false, twoFactorEnabled = false }: TwoFactorProps) {
  const {
    qrCodeSvg,
    hasSetupData,
    manualSetupKey,
    clearSetupData,
    fetchSetupData,
    recoveryCodesList,
    fetchRecoveryCodes,
    errors,
  } = useTwoFactorAuth()
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Two-Factor Authentication" />

      <h1 className="sr-only">Two-factor authentication settings</h1>

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            description="Manage your two-factor authentication settings"
            title="Two-Factor Authentication"
          />
          {twoFactorEnabled ? (
            <div className="flex flex-col items-start justify-start space-y-4">
              <Badge variant="default">Enabled</Badge>
              <p className="text-muted-foreground">
                With two-factor authentication enabled, you will be prompted for a secure, random pin during login,
                which you can retrieve from the TOTP-supported application on your phone.
              </p>

              <TwoFactorRecoveryCodes
                errors={errors}
                fetchRecoveryCodes={fetchRecoveryCodes}
                recoveryCodesList={recoveryCodesList}
              />

              <div className="relative inline">
                <Form {...disable.form()}>
                  {({ processing }) => (
                    <Button disabled={processing} type="submit" variant="destructive">
                      <ShieldBan /> Disable 2FA
                    </Button>
                  )}
                </Form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-start space-y-4">
              <Badge variant="destructive">Disabled</Badge>
              <p className="text-muted-foreground">
                When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin
                can be retrieved from a TOTP-supported application on your phone.
              </p>

              <div>
                {hasSetupData ? (
                  <Button onClick={() => setShowSetupModal(true)}>
                    <ShieldCheck />
                    Continue Setup
                  </Button>
                ) : (
                  <Form {...enable.form()} onSuccess={() => setShowSetupModal(true)}>
                    {({ processing }) => (
                      <Button disabled={processing} type="submit">
                        <ShieldCheck />
                        Enable 2FA
                      </Button>
                    )}
                  </Form>
                )}
              </div>
            </div>
          )}

          <TwoFactorSetupModal
            clearSetupData={clearSetupData}
            errors={errors}
            fetchSetupData={fetchSetupData}
            isOpen={showSetupModal}
            manualSetupKey={manualSetupKey}
            onClose={() => setShowSetupModal(false)}
            qrCodeSvg={qrCodeSvg}
            requiresConfirmation={requiresConfirmation}
            twoFactorEnabled={twoFactorEnabled}
          />
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
