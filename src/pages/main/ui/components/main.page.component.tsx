import { TSubscriptionPagePlatformKey } from '@remnawave/subscription-page-types'
import { Center, Container, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'

import {
    AccordionBlockRenderer,
    CardsBlockRenderer,
    InstallationGuideConnector,
    MinimalBlockRenderer,
    // /////// МОЙ КОД ///////
    PaymentSuccessfulWidget,
    // /////// КОНЕЦ ///////
    RawKeysWidget,
    SubscriptionInfoCardsWidget,
    SubscriptionInfoCollapsedWidget,
    SubscriptionInfoExpandedWidget,
    TimelineBlockRenderer
} from '@widgets/main'
import { useAppConfig, useAppConfigStoreActions, useCurrentLang } from '@entities/app-config-store'
import { LanguagePicker } from '@shared/ui/language-picker/language-picker.shared'
// /////// МОЙ КОД ///////
import { MainHeader } from '@shared/ui/header/MainHeader'
import { GradientButtonWidget } from '@widgets/general'
import { Page } from '@shared/ui'
// /////// КОНЕЦ ///////

interface IMainPageComponentProps {
    isMobile: boolean
    platform: TSubscriptionPagePlatformKey | undefined
}

const BLOCK_RENDERERS = {
    cards: CardsBlockRenderer,
    timeline: TimelineBlockRenderer,
    accordion: AccordionBlockRenderer,
    minimal: MinimalBlockRenderer
} as const

const SUBSCRIPTION_INFO_BLOCK_RENDERERS = {
    cards: SubscriptionInfoCardsWidget,
    collapsed: SubscriptionInfoCollapsedWidget,
    expanded: SubscriptionInfoExpandedWidget,
    hidden: null
} as const

export const MainPageComponent = ({ isMobile, platform }: IMainPageComponentProps) => {
    const config = useAppConfig()
    const currentLang = useCurrentLang()
    const { setLanguage } = useAppConfigStoreActions()

    // /////// МОЙ КОД ///////
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        if (params.get('payment') === 'success') {
            setShowSuccess(true)
            window.history.replaceState({}, '', window.location.pathname)
        }
    }, [])
    // /////// КОНЕЦ ///////

    let hasCustomLogo = !!config.brandingSettings.logoUrl
    if (hasCustomLogo && config.brandingSettings.logoUrl.includes('docs.rw')) {
        hasCustomLogo = false
    }

    const hasPlatformApps: Record<TSubscriptionPagePlatformKey, boolean> = {
        ios: Boolean(config.platforms.ios?.apps.length),
        android: Boolean(config.platforms.android?.apps.length),
        linux: Boolean(config.platforms.linux?.apps.length),
        macos: Boolean(config.platforms.macos?.apps.length),
        windows: Boolean(config.platforms.windows?.apps.length),
        androidTV: Boolean(config.platforms.androidTV?.apps.length),
        appleTV: Boolean(config.platforms.appleTV?.apps.length)
    }

    const atLeastOnePlatformApp = Object.values(hasPlatformApps).some((value) => value)

    const SubscriptionInfoBlockRenderer =
        SUBSCRIPTION_INFO_BLOCK_RENDERERS[config.uiConfig.subscriptionInfoBlockType]

    return (
        <Page>
            {/* /////// МОЙ КОД /////// */}
            <MainHeader />
            {/* /////// КОНЕЦ /////// */}

            <Container
                maw={1200}
                px={{ base: 'md', sm: 'lg', md: 'xl' }}
                py="xl"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <Stack gap="xl">
                    {/* /////// МОЙ КОД /////// */}
                    {showSuccess && (
                        <PaymentSuccessfulWidget
                            onClose={() => setShowSuccess(false)}
                            opened={showSuccess}
                        />
                    )}
                    {/* /////// КОНЕЦ /////// */}

                    {SubscriptionInfoBlockRenderer && (
                        <SubscriptionInfoBlockRenderer isMobile={isMobile} />
                    )}

                    {/* /////// МОЙ КОД /////// */}
                    <GradientButtonWidget
                        href="/renew"
                        iconType="arrow"
                        label="Продлить подписку"
                        sublabel="Устройств: 3"
                    />
                    {/* /////// КОНЕЦ /////// */}

                    {atLeastOnePlatformApp && (
                        <InstallationGuideConnector
                            BlockRenderer={
                                BLOCK_RENDERERS[config.uiConfig.installationGuidesBlockType]
                            }
                            hasPlatformApps={hasPlatformApps}
                            isMobile={isMobile}
                            platform={platform}
                        />
                    )}

                    <RawKeysWidget isMobile={isMobile} />

                    {/* /////// МОЙ КОД /////// */}
                    <GradientButtonWidget
                        href="https://t.me/support"
                        iconType="support"
                        label="Написать в поддержку"
                        type="support"
                    />
                    {/* /////// КОНЕЦ /////// */}

                    <Center>
                        <LanguagePicker
                            currentLang={currentLang}
                            locales={config.locales}
                            onLanguageChange={setLanguage}
                        />
                    </Center>
                </Stack>
            </Container>
        </Page>
    )
}
