// Здесь все написанно мной

import { Box, Stack, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useAppConfig } from '@entities/app-config-store'

type PlanType = 'basic' | 'pro'
type LocalType = 'blue' | 'purple' | 'support'
type IconType = 'arrow' | 'none' | 'support'

type IProps = {
    href?: string
    iconType?: IconType
    label: string
    onClick?: () => void
    sublabel?: string
    type?: LocalType
}

type StyleType = {
    background: string
    border: string
}

const planStyles: Record<LocalType | PlanType, StyleType> = {
    basic: {
        background: 'linear-gradient(135deg, #3162aa 0%, #4f94fd 50%, #1e4e97 100%)',
        border: '1.5px solid #6298E8'
    },
    pro: {
        background: 'linear-gradient(135deg, #6831aa 0%, #b14ffd 50%, #7f1e97 100%)',
        border: '1.5px solid #9A62E8'
    },
    support: {
        background: 'linear-gradient(135deg, #88d1ff 0%, #1894e2 50%, #6ebdee 100%)',
        border: '1.5px solid #6ebdee'
    },
    purple: {
        background: 'linear-gradient(135deg, #6831aa 0%, #b14ffd 50%, #7f1e97 100%)',
        border: '1.5px solid #9A62E8'
    },
    blue: {
        background: 'linear-gradient(135deg, #3162aa 0%, #4f94fd 50%, #1e4e97 100%)',
        border: '1.5px solid #6298E8'
    }
}

const ArrowIcon = () => (
    <svg fill="none" height="13" viewBox="0 0 8 13" width="8">
        <path
            clipRule="evenodd"
            d="M7.071 7.071L1.414 12.728L0 11.314L4.95 6.364L0 1.414L1.414 0L7.071 5.657C7.25847 5.84453 7.36379 6.09884 7.36379 6.364C7.36379 6.62916 7.25847 6.88347 7.071 7.071Z"
            fill="#F5F9FF"
            fillRule="evenodd"
        />
    </svg>
)

const SupportIcon = () => (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
            clip-rule="evenodd"
            d="M14.5304 6.54401C14.2774 4.00001 12.7427 0 7.99993 0C3.25712 0 1.72243 4.00001 1.46939 6.54401C0.581645 6.87419 -0.0039215 7.70947 1.97734e-05 8.63999V9.76C1.97734e-05 10.9971 1.02337 12 2.28569 12C3.54805 12 4.5714 10.9971 4.5714 9.76V8.63999C4.56727 7.72953 4.00325 6.91143 3.14283 6.56801C3.3061 5.09598 4.1061 1.60001 7.99993 1.60001C11.8938 1.60001 12.6856 5.09598 12.8489 6.56801C11.9902 6.91218 11.429 7.73084 11.4285 8.63999V9.76C11.4302 10.1815 11.5528 10.594 11.7823 10.9505C12.0118 11.3069 12.339 11.593 12.7264 11.776C12.3836 12.408 11.5101 13.264 9.36316 13.52C8.93402 12.8814 8.10371 12.6296 7.3815 12.9191C6.65933 13.2086 6.2471 13.9585 6.39771 14.7088C6.54832 15.4591 7.21964 16 7.99993 16C8.30228 15.9983 8.59822 15.9144 8.85477 15.7577C9.11132 15.6009 9.31841 15.3773 9.45297 15.112C12.955 14.72 14.0733 12.952 14.4243 11.912C15.374 11.6105 16.0126 10.7382 15.9998 9.76V8.63999C16.0038 7.70947 15.4182 6.87419 14.5304 6.54401ZM2.93876 9.76C2.93876 10.1134 2.64638 10.4 2.28569 10.4C1.92501 10.4 1.63267 10.1135 1.63267 9.76V8.63999C1.63201 8.55554 1.64841 8.47179 1.68093 8.39357C1.71346 8.31536 1.76145 8.24422 1.82216 8.18427C1.88287 8.12432 1.95508 8.07674 2.03464 8.04427C2.1142 8.0118 2.19953 7.99508 2.28571 7.99508C2.37189 7.99508 2.45723 8.0118 2.53678 8.04427C2.61634 8.07674 2.68856 8.12432 2.74926 8.18427C2.80997 8.24422 2.85797 8.31536 2.89049 8.39357C2.92301 8.47179 2.93942 8.55554 2.93876 8.63999V9.76ZM13.0611 8.63999C13.0611 8.28652 13.3535 7.99998 13.7141 7.99998C14.0748 7.99998 14.3672 8.28652 14.3672 8.63999V9.76C14.3672 10.1134 14.0748 10.4 13.7141 10.4C13.3535 10.4 13.0611 10.1135 13.0611 9.76V8.63999Z"
            fill="#F5F9FF"
            fill-rule="evenodd"
        />
    </svg>
)

const ICONS: Record<Exclude<IconType, 'none'>, React.ReactNode> = {
    arrow: <ArrowIcon />,
    support: <SupportIcon />
}

export const GradientButtonWidget = ({
    label,
    sublabel,
    type,
    href,
    onClick,
    iconType = 'none'
}: IProps) => {
    const config = useAppConfig() as { userType?: PlanType } // ✅ как в другом компоненте
    const [hovered, setHovered] = useState(false)

    const planType: PlanType = config.userType || 'basic'

    const styles = planStyles[type ?? planType]

    const navigate = useNavigate()

    const handleClick = () => {
        if (href) {
            if (href.startsWith('http')) {
                window.open(href, '_blank', 'noopener,noreferrer')
            } else {
                navigate(href)
            }
        }
        if (onClick) onClick()
    }

    return (
        <Box
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...styles,
                borderRadius: '12px',
                padding: '14px 20px',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                opacity: hovered ? 0.7 : 1,
                transition: 'opacity 0.15s ease'
            }}
        >
            <Stack align="center" gap={2}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Title c="white" order={4}>
                        {label}
                    </Title>

                    {iconType !== 'none' && (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {ICONS[iconType]}
                        </span>
                    )}
                </Box>

                {sublabel && (
                    <Text
                        style={{
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#fff'
                        }}
                    >
                        {sublabel}
                    </Text>
                )}
            </Stack>
        </Box>
    )
}
