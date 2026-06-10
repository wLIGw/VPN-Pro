// Здесь все написанно мной

import { Box, Container, Group, Image, Title } from '@mantine/core'

import { useAppConfig } from '@entities/app-config-store'
import { SubscriptionLinkWidget } from '@widgets/main'

import { RemnawaveLogo } from '../remnawave-logo'

export const MainHeader = () => {
    const config = useAppConfig()

    const brandName = config.brandingSettings.title
    let hasCustomLogo = !!config.brandingSettings.logoUrl

    if (hasCustomLogo && config.brandingSettings.logoUrl.includes('docs.rw')) {
        hasCustomLogo = false
    }

    return (
        <Box className="header-wrapper" py="md">
            <Container maw={1200} px={{ base: 'md', sm: 'lg', md: 'xl' }}>
                <Group justify="space-between">
                    <Group gap="sm" style={{ userSelect: 'none' }} wrap="nowrap">
                        {hasCustomLogo ? (
                            <Image
                                alt="logo"
                                fit="contain"
                                src={config.brandingSettings.logoUrl}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    flexShrink: 0
                                }}
                            />
                        ) : (
                            <RemnawaveLogo c="cyan" size={40} />
                        )}
                        <Title c="white" fw={700} order={4} size="lg">
                            {brandName}
                        </Title>
                    </Group>

                    <SubscriptionLinkWidget
                        hideGetLink={config.baseSettings.hideGetLinkButton}
                        supportUrl={config.brandingSettings.supportUrl}
                    />
                </Group>
            </Container>
        </Box>
    )
}
