import {
    IconAlertCircle,
    IconArrowsUpDown,
    IconCalendar,
    IconCheck,
    IconUserScan,
    IconX
} from '@tabler/icons-react'
// /////// МОЙ КОД ///////
import { Box, Card, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
// /////// КОНЕЦ ///////

import {
    formatDate,
    getColorGradientSolid,
    getExpirationTextUtil
} from '@shared/utils/config-parser'
import { InfoBlockShared } from '@shared/ui/info-block/info-block.shared'
import { useSubscription } from '@entities/subscription-info-store'
// /////// МОЙ КОД ///////
import { useAppConfig } from '@entities/app-config-store'
// /////// КОНЕЦ ///////
import { useTranslation } from '@shared/hooks'

interface IProps {
    isMobile: boolean
}

// /////// МОЙ КОД ///////
const planConfig = {
    basic: {
        background: 'linear-gradient(90deg, #3162aa 0%, #4f94fd 50%, #1e4e97 100%)',
        border: '1px solid #6298E8',
        label: 'Basic'
    },
    pro: {
        background: 'linear-gradient(90deg, #6831aa 0%, #b14ffd 50%, #7f1e97 100%)',
        border: '1px solid #9A62E8',
        label: 'Pro'
    }
}
// /////// КОНЕЦ ///////

export const SubscriptionInfoExpandedWidget = ({ isMobile }: IProps) => {
    const { t, currentLang, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    // /////// МОЙ КОД ///////
    const isMobileLocal = useMediaQuery('(max-width: 768px)')
    // /////// КОНЕЦ ///////
    const { user } = subscription

    // /////// МОЙ КОД ///////
    type UserType = 'basic' | 'pro'
    const config = useAppConfig() as { userType?: UserType }
    const planType: UserType = config.userType || 'basic'
    const plan = planConfig[planType]
    // /////// КОНЕЦ ///////

    const getStatusAndIcon = (): {
        color: string
        icon: React.ReactNode
        status: string
    } => {
        if (user.userStatus === 'ACTIVE' && user.daysLeft > 0) {
            return {
                color: 'teal',
                icon: <IconCheck size={isMobile ? 18 : 22} />,
                status: t(baseTranslations.active)
            }
        }
        if (
            (user.userStatus === 'ACTIVE' && user.daysLeft === 0) ||
            (user.daysLeft >= 0 && user.daysLeft <= 3)
        ) {
            return {
                color: 'orange',
                icon: <IconAlertCircle size={isMobile ? 18 : 22} />,
                status: t(baseTranslations.active)
            }
        }
        return {
            color: 'red',
            icon: <IconX size={isMobile ? 18 : 22} />,
            status: t(baseTranslations.inactive)
        }
    }

    const statusInfo = getStatusAndIcon()
    const gradientColor = getColorGradientSolid(statusInfo.color)

    return (
        <Card p={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }} radius="lg">
            <Stack gap={isMobile ? 'sm' : 'md'}>
                {/* /////// МОЙ КОД /////// */}
                <Group gap="sm" justify="space-between" wrap="nowrap">
                    {/* /////// КОНЕЦ /////// */}
                    <Group
                        gap={isMobile ? 'xs' : 'sm'}
                        style={{ minWidth: 0, flex: 1 }}
                        wrap="nowrap"
                    >
                        <ThemeIcon
                            color={statusInfo.color}
                            radius="xl"
                            size={isMobile ? 36 : 44}
                            style={{
                                background: gradientColor.background,
                                border: gradientColor.border,
                                boxShadow: gradientColor.boxShadow,
                                flexShrink: 0
                            }}
                            variant="light"
                        >
                            {statusInfo.icon}
                        </ThemeIcon>

                        <Stack gap={2} style={{ minWidth: 0, flex: 1 }}>
                            <Title
                                c="white"
                                fw={600}
                                order={5}
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {user.username}
                            </Title>
                            <Text
                                c={user.daysLeft === 0 ? 'red' : 'dimmed'}
                                fw={600}
                                size={isMobile ? 'xs' : 'sm'}
                            >
                                {getExpirationTextUtil(
                                    user.expiresAt,
                                    currentLang,
                                    baseTranslations
                                )}
                            </Text>
                        </Stack>
                    </Group>

                    {/* /////// МОЙ КОД /////// */}
                    <Box
                        style={{
                            background: plan.background,
                            border: plan.border,
                            borderRadius: '8px',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: isMobileLocal ? '10px 21.5px' : '20px 21.5px'
                        }}
                    >
                        <Title
                            style={{
                                fontWeight: 600,
                                color: 'white',
                                fontSize: 16
                            }}
                        >
                            {plan.label}
                        </Title>
                    </Box>
                    {/* /////// КОНЕЦ /////// */}
                </Group>

                <SimpleGrid cols={{ base: 2, xs: 2, sm: 2 }} spacing="xs" verticalSpacing="xs">
                    <InfoBlockShared
                        color="blue"
                        icon={<IconUserScan size={16} />}
                        title={t(baseTranslations.name)}
                        value={user.username}
                    />

                    <InfoBlockShared
                        color={user.userStatus === 'ACTIVE' ? 'green' : 'red'}
                        icon={
                            user.userStatus === 'ACTIVE' ? (
                                <IconCheck size={16} />
                            ) : (
                                <IconX size={16} />
                            )
                        }
                        title={t(baseTranslations.status)}
                        value={
                            user.userStatus === 'ACTIVE'
                                ? t(baseTranslations.active)
                                : t(baseTranslations.inactive)
                        }
                    />

                    <InfoBlockShared
                        color="red"
                        icon={<IconCalendar size={16} />}
                        title={t(baseTranslations.expires)}
                        value={formatDate(user.expiresAt, currentLang, baseTranslations)}
                    />

                    <InfoBlockShared
                        color="yellow"
                        icon={<IconArrowsUpDown size={16} />}
                        title={t(baseTranslations.bandwidth)}
                        value={`${user.trafficUsed} / ${user.trafficLimit === '0' ? '∞' : user.trafficLimit}`}
                    />
                </SimpleGrid>
            </Stack>
        </Card>
    )
}
