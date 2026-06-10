// Здесь все написанно мной

import { Box, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'

import { UpgradeToProModal } from '@widgets/renew/upgrade-to-pro-modal'
import { SubscriptionRenewWidget } from '@widgets/renew/plans'
import { MainHeader } from '@shared/ui/header/MainHeader'
import { useAppConfig } from '@entities/app-config-store'
import { GradientButtonWidget } from '@widgets/general'
import { DevicesWidget } from '@widgets/renew/devices'
import { Page } from '@shared/ui'

const PlansPage = () => {
    const config = useAppConfig() as { userType?: 'basic' | 'pro' }
    const planType = config.userType || 'basic'
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [proModalOpened, setProModalOpened] = useState(false)

    return (
        <Page>
            <MainHeader />

            <UpgradeToProModal
                onClose={() => setProModalOpened(false)}
                onConfirm={() => {
                    setProModalOpened(false)
                    window.open('https://t.me/your_bot', '_blank')
                }}
                opened={proModalOpened}
            />

            <Box my={16} px={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }}>
                <Title
                    order={1}
                    style={{
                        fontWeight: 600,
                        fontSize: isMobile ? 32 : 48,
                        lineHeight: '110%',
                        color: '#F5F9FF',
                        marginBottom: 8
                    }}
                >
                    Продление подписки {planType === 'basic' ? 'Basic' : 'Pro'}
                </Title>
                <Text
                    style={{
                        fontWeight: 500,
                        fontSize: isMobile ? 14 : 16,
                        color: '#F5F9FF'
                    }}
                >
                    Выберите период и сохраните свой план подписки на будущее.
                </Text>
            </Box>

            <SubscriptionRenewWidget />

            <Box mb={16} px={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }}>
                <GradientButtonWidget
                    href="/pay"
                    iconType="arrow"
                    label="Продлить подписку"
                    type="blue"
                />
            </Box>

            {planType === 'basic' && (
                <Box
                    pb={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }}
                    px={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }}
                >
                    <GradientButtonWidget
                        iconType="arrow"
                        label="Обновить тариф на Pro"
                        onClick={() => setProModalOpened(true)}
                        type="purple"
                    />
                </Box>
            )}

            <Box
                pb={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }}
                px={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }}
            >
                <DevicesWidget />
            </Box>
        </Page>
    )
}

export default PlansPage
