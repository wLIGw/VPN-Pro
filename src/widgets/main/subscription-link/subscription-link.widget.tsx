import { ActionIcon, Button, Group, Image, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCopy } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useClipboard } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { renderSVG } from 'uqr'
import { FC } from 'react'

import { constructSubscriptionUrl } from '@shared/utils/construct-subscription-url'
import { useSubscription } from '@entities/subscription-info-store'
import { vibrate } from '@shared/utils/vibrate'
import { useTranslation } from '@shared/hooks'

import classes from './subscription-link.module.css'

interface IProps {
    hideGetLink: boolean
    // /////// МОЙ КОД ///////
    onProfileClick?: () => void
    // /////// КОНЕЦ ///////
    supportUrl: string
}

// /////// МОЙ КОД ///////
const QrCodeIcon: FC = () => (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
        <path
            d="M11.1111 20V17.7778H13.3333V20H11.1111ZM8.88889 17.7778V12.2222H11.1111V17.7778H8.88889ZM17.7778 14.4444V10H20V14.4444H17.7778ZM15.5556 10V7.77778H17.7778V10H15.5556ZM2.22222 12.2222V10H4.44444V12.2222H2.22222ZM0 10V7.77778H2.22222V10H0ZM10 2.22222V0H12.2222V2.22222H10ZM1.66667 5H5V1.66667H1.66667V5ZM0 5.55555V1.11111C0 0.796296 0.106667 0.532593 0.32 0.32C0.533333 0.107408 0.797037 0.000740741 1.11111 0H5.55555C5.87037 0 6.13444 0.106667 6.34778 0.32C6.56111 0.533333 6.66741 0.797037 6.66667 1.11111V5.55555C6.66667 5.87037 6.56 6.13444 6.34667 6.34778C6.13333 6.56111 5.86963 6.66741 5.55555 6.66667H1.11111C0.796296 6.66667 0.532593 6.56 0.32 6.34667C0.107408 6.13333 0.000740741 5.86963 0 5.55555ZM1.66667 18.3333H5V15H1.66667V18.3333ZM0 18.8889V14.4444C0 14.1296 0.106667 13.8659 0.32 13.6533C0.533333 13.4407 0.797037 13.3341 1.11111 13.3333H5.55555C5.87037 13.3333 6.13444 13.44 6.34778 13.6533C6.56111 13.8667 6.66741 14.1304 6.66667 14.4444V18.8889C6.66667 19.2037 6.56 19.4678 6.34667 19.6811C6.13333 19.8944 5.86963 20.0007 5.55555 20H1.11111C0.796296 20 0.532593 19.8933 0.32 19.68C0.107408 19.4667 0.000740741 19.203 0 18.8889ZM15 5H18.3333V1.66667H15V5ZM13.3333 5.55555V1.11111C13.3333 0.796296 13.44 0.532593 13.6533 0.32C13.8667 0.107408 14.1304 0.000740741 14.4444 0H18.8889C19.2037 0 19.4678 0.106667 19.6811 0.32C19.8944 0.533333 20.0007 0.797037 20 1.11111V5.55555C20 5.87037 19.8933 6.13444 19.68 6.34778C19.4667 6.56111 19.203 6.66741 18.8889 6.66667H14.4444C14.1296 6.66667 13.8659 6.56 13.6533 6.34667C13.4407 6.13333 13.3341 5.86963 13.3333 5.55555ZM15.5556 20V16.6667H13.3333V14.4444H17.7778V17.7778H20V20H15.5556ZM11.1111 12.2222V10H15.5556V12.2222H11.1111ZM6.66667 12.2222V10H4.44444V7.77778H11.1111V10H8.88889V12.2222H6.66667ZM7.77778 6.66667V2.22222H10V4.44444H12.2222V6.66667H7.77778ZM2.5 4.16667V2.5H4.16667V4.16667H2.5ZM2.5 17.5V15.8333H4.16667V17.5H2.5ZM15.8333 4.16667V2.5H17.5V4.16667H15.8333Z"
            fill="#F5F9FF"
        />
    </svg>
)

const SupportIcon: FC = () => (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
        <path
            clipRule="evenodd"
            d="M18.1631 8.18001C17.8467 5.00001 15.9284 0 9.99992 0C4.0714 0 2.15304 5.00001 1.83674 8.18001C0.727057 8.59274 -0.00490188 9.63684 2.47168e-05 10.8V12.2C2.47168e-05 13.7464 1.27922 15 2.85712 15C4.43506 15 5.71426 13.7464 5.71426 12.2V10.8C5.70909 9.66191 5.00406 8.63929 3.92853 8.21001C4.13263 6.36998 5.13263 2.00001 9.99992 2.00001C14.8672 2.00001 15.857 6.36998 16.0611 8.21001C14.9877 8.64023 14.2862 9.66355 14.2856 10.8V12.2C14.2878 12.7269 14.4411 13.2425 14.7279 13.6881C15.0148 14.1337 15.4237 14.4912 15.908 14.72C15.4794 15.51 14.3876 16.58 11.7039 16.9C11.1675 16.1017 10.1296 15.787 9.22687 16.1489C8.32416 16.5108 7.80887 17.4481 7.99714 18.386C8.1854 19.3239 9.02455 20 9.99992 20C10.3778 19.9979 10.7478 19.8931 11.0685 19.6971C11.3892 19.5011 11.648 19.2217 11.8162 18.89C16.1937 18.4 17.5917 16.19 18.0304 14.89C19.2174 14.5131 20.0158 13.4227 19.9998 12.2V10.8C20.0047 9.63684 19.2727 8.59274 18.1631 8.18001ZM3.67345 12.2C3.67345 12.6418 3.30797 13 2.85712 13C2.40626 13 2.04083 12.6418 2.04083 12.2V10.8C2.04001 10.6944 2.06051 10.5897 2.10117 10.492C2.14182 10.3942 2.20182 10.3053 2.2777 10.2303C2.35358 10.1554 2.44385 10.0959 2.5433 10.0553C2.64275 10.0147 2.74941 9.99385 2.85714 9.99385C2.96487 9.99385 3.07153 10.0147 3.17098 10.0553C3.27043 10.0959 3.3607 10.1554 3.43658 10.2303C3.51246 10.3053 3.57246 10.3942 3.61311 10.492C3.65377 10.5897 3.67427 10.6944 3.67345 10.8V12.2ZM16.3263 10.8C16.3263 10.3581 16.6918 9.99998 17.1427 9.99998C17.5935 9.99998 17.959 10.3581 17.959 10.8V12.2C17.959 12.6418 17.5935 13 17.1427 13C16.6918 13 16.3263 12.6418 16.3263 12.2V10.8Z"
            fill="#F5F9FF"
            fillRule="evenodd"
        />
    </svg>
)

const ProfileIcon: FC = () => (
    <svg fill="none" height="21" viewBox="0 0 21 21" width="21">
        <path
            d="M4.98898 11.0608C5.43677 11.0608 5.79978 11.4238 5.79978 11.8716C5.79978 12.3194 5.43677 12.6824 4.98898 12.6824H4.61947C4.0245 12.6823 3.46146 12.8782 3.03482 13.2166C2.61004 13.5537 2.35544 14.0027 2.29053 14.4687L1.87985 17.4238V17.4248C1.86065 17.5636 1.87412 17.7051 1.92103 17.8418C1.96821 17.9792 2.0497 18.113 2.16595 18.2314C2.2824 18.35 2.43071 18.4504 2.60408 18.5207C2.77753 18.591 2.96911 18.6284 3.16468 18.6284H17.3347C17.5302 18.6284 17.7218 18.591 17.8953 18.5207C18.0686 18.4504 18.217 18.35 18.3334 18.2314C18.4497 18.113 18.5312 17.9792 18.5783 17.8418C18.6252 17.7051 18.6387 17.5636 18.6195 17.4248L18.2078 14.4698V14.4687C18.1429 14.003 17.8888 13.5547 17.4645 13.2177C17.0381 12.8791 16.4748 12.6826 15.8799 12.6824H15.5104C15.0626 12.6824 14.6996 12.3194 14.6996 11.8716C14.6996 11.4238 15.0626 11.0608 15.5104 11.0608H15.8809C16.8241 11.0612 17.7463 11.3708 18.4728 11.9476C19.2011 12.526 19.6886 13.3397 19.8146 14.246L20.2253 17.201L20.2422 17.3488C20.2695 17.6937 20.2251 18.04 20.1123 18.3687C19.9834 18.7439 19.7691 19.0836 19.4905 19.3674C19.2121 19.6509 18.8748 19.8728 18.5044 20.023C18.1342 20.1731 17.7355 20.25 17.3347 20.25H3.16468V20.2489C2.76381 20.2489 2.36519 20.1731 1.99493 20.023C1.62452 19.8728 1.28728 19.6509 1.00887 19.3674C0.730227 19.0836 0.515915 18.7439 0.38705 18.3687C0.258104 17.9931 0.219423 17.5943 0.274087 17.201L0.68371 14.246L0.712215 14.0771C0.872296 13.2383 1.3432 12.4889 2.0266 11.9466C2.75376 11.3696 3.67678 11.0605 4.62053 11.0608H4.98898ZM14.3037 5.92568C14.3037 3.68668 12.4886 1.87162 10.2497 1.87162C8.01072 1.87162 6.19568 3.68668 6.19568 5.92568C6.19568 8.16467 8.01072 9.97973 10.2497 9.97973C12.4886 9.97973 14.3037 8.16467 14.3037 5.92568ZM15.9253 5.92568C15.9253 9.06026 13.3842 11.6014 10.2497 11.6014C7.11513 11.6014 4.57408 9.06026 4.57408 5.92568C4.57408 2.79109 7.11513 0.25 10.2497 0.25C13.3842 0.25 15.9253 2.79109 15.9253 5.92568Z"
            fill="#6298E8"
            stroke="#6298E8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
        />
    </svg>
)
// /////// КОНЕЦ ///////

export const SubscriptionLinkWidget = ({ supportUrl, hideGetLink, onProfileClick }: IProps) => {
    const { t, baseTranslations } = useTranslation()
    const subscription = useSubscription()
    const clipboard = useClipboard({ timeout: 10000 })

    const subscriptionUrl = constructSubscriptionUrl(
        window.location.href,
        subscription.user.shortUuid
    )

    const handleCopy = () => {
        notifications.show({
            title: t(baseTranslations.linkCopied),
            message: t(baseTranslations.linkCopiedToClipboard),
            color: 'cyan'
        })
        clipboard.copy(subscriptionUrl)
    }

    const handleGetLink = () => {
        vibrate('tap')

        const subscriptionQrCode = renderSVG(subscriptionUrl, {
            whiteColor: '#161B22',
            blackColor: '#22d3ee'
        })

        modals.open({
            centered: true,
            title: t(baseTranslations.getLink),
            classNames: {
                content: classes.modalContent,
                header: classes.modalHeader,
                title: classes.modalTitle
            },
            children: (
                <Stack align="center">
                    <Image
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                        style={{ borderRadius: 'var(--mantine-radius-md)' }}
                    />
                    <Text c="white" fw={600} size="lg" ta="center">
                        {t(baseTranslations.scanQrCode)}
                    </Text>
                    <Text c="dimmed" size="sm" ta="center">
                        {t(baseTranslations.scanQrCodeDescription)}
                    </Text>
                    <Button
                        fullWidth
                        leftSection={<IconCopy />}
                        onClick={handleCopy}
                        radius="md"
                        variant="light"
                    >
                        {t(baseTranslations.copyLink)}
                    </Button>
                </Stack>
            )
        })
    }

    // /////// МОЙ КОД ///////
    const navigate = useNavigate()

    const handleProfileClick = () => {
        if (onProfileClick) {
            onProfileClick()
            return
        }

        navigate('/')
    }
    // /////// КОНЕЦ ///////

    return (
        // /////// МОЙ КОД ///////
        <Group gap={4} ml="auto" wrap="nowrap">
            {!hideGetLink && (
                <ActionIcon
                    className={classes.actionIcon}
                    onClick={handleGetLink}
                    radius="md"
                    // /////// МОЙ КОД ///////
                    size={40}
                    // /////// КОНЕЦ ///////
                    variant="default"
                >
                    {/* /////// МОЙ КОД /////// */}
                    <QrCodeIcon />
                    {/* /////// КОНЕЦ /////// */}
                </ActionIcon>
            )}

            {supportUrl !== '' && (
                <ActionIcon
                    className={classes.actionIcon}
                    onClick={() => window.open(supportUrl, '_blank', 'noopener,noreferrer')}
                    radius="md"
                    // /////// МОЙ КОД ///////
                    size={40}
                    // /////// КОНЕЦ ///////
                    variant="default"
                >
                    {/* /////// МОЙ КОД /////// */}
                    <SupportIcon />
                    {/* /////// КОНЕЦ /////// */}
                </ActionIcon>
            )}

            {/* /////// МОЙ КОД /////// */}
            <ActionIcon
                className={classes.actionIcon}
                onClick={handleProfileClick}
                radius="md"
                size={40}
                variant="default"
            >
                <ProfileIcon />
            </ActionIcon>
            {/* /////// КОНЕЦ /////// */}
        </Group>
    )
}
