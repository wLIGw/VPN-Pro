import { Box, SimpleGrid, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'

import { useAppConfig } from '@entities/app-config-store'

import classes from './plans.module.css'

type PlanType = 'basic' | 'pro'

const planStyles = {
    basic: {
        gradient: 'linear-gradient(90deg, #3162aa 0%, #4f94fd 50%, #1e4e97 100%)',
        descColor: '#93AFDB'
    },
    pro: {
        gradient: 'linear-gradient(90deg, #6831aa 0%, #b14ffd 50%, #7f1e97 100%)',
        descColor: '#AB93DB'
    }
}

const FireIcon = () => (
    <svg fill="none" height="28" viewBox="0 0 23 28" width="23" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.83533 9.24443L6.83283 9.24568L6.82908 9.24818L6.83533 9.24443ZM19.2778 9.01068C19.1912 8.92645 19.0946 8.853 18.9903 8.79193C18.843 8.70521 18.6795 8.64962 18.5099 8.6286C18.3402 8.60758 18.1681 8.62158 18.004 8.66973C17.84 8.71788 17.6876 8.79916 17.5563 8.90854C17.4249 9.01793 17.3174 9.15309 17.2403 9.30568C16.8093 10.154 16.2155 10.9092 15.4928 11.5282C15.6035 10.9051 15.6595 10.2735 15.6603 9.64068C15.6632 7.71575 15.1557 5.82447 14.1896 4.15957C13.2234 2.49468 11.8331 1.1157 10.1603 0.163183C9.97603 0.0584693 9.76814 0.00233984 9.55618 7.15882e-05C9.34423 -0.00219666 9.13518 0.0494708 8.94869 0.150217C8.7622 0.250963 8.60439 0.397479 8.49009 0.57599C8.3758 0.754501 8.30878 0.959145 8.29533 1.17068C8.22513 2.35576 7.91519 3.51427 7.38428 4.5761C6.85337 5.63792 6.11252 6.58098 5.20658 7.34818L4.91908 7.58193C3.97092 8.21952 3.13181 9.00587 2.43408 9.91068C1.34942 11.2771 0.598064 12.8774 0.239598 14.5847C-0.118868 16.2921 -0.0745824 18.0595 0.368944 19.7467C0.81247 21.4339 1.64303 22.9946 2.79476 24.305C3.94649 25.6153 5.3877 26.6393 7.00408 27.2957C7.19385 27.3729 7.3997 27.4023 7.60351 27.3813C7.80732 27.3603 8.00285 27.2895 8.17287 27.1752C8.34289 27.0609 8.4822 26.9065 8.57854 26.7256C8.67487 26.5448 8.72528 26.3431 8.72533 26.1382C8.72529 26.0057 8.7042 25.874 8.66283 25.7482C8.38382 24.6969 8.30328 23.6028 8.42533 22.5219C9.60811 24.7529 11.507 26.5211 13.8166 27.5419C14.0984 27.6675 14.4168 27.6845 14.7103 27.5894C16.5347 27.0005 18.1781 25.9549 19.4846 24.5519C20.791 23.149 21.7171 21.4353 22.1748 19.5737C22.6324 17.7121 22.6065 15.7644 22.0995 13.9156C21.5925 12.0668 20.6211 10.3784 19.2778 9.01068ZM14.3966 25.0494C13.3068 24.4976 12.3454 23.7224 11.575 22.7743C10.8046 21.8263 10.2425 20.7266 9.92533 19.5469C9.82848 19.1497 9.75337 18.7474 9.70033 18.3419C9.66476 18.0837 9.54936 17.8431 9.37028 17.6537C9.1912 17.4643 8.9574 17.3356 8.70158 17.2857C8.6229 17.2705 8.54295 17.263 8.46283 17.2632C8.2432 17.263 8.02739 17.3206 7.83714 17.4303C7.64688 17.5401 7.48889 17.698 7.37908 17.8882C6.3422 19.6773 5.82086 21.7185 5.87283 23.7857C4.96052 23.0766 4.19805 22.1934 3.6296 21.1874C3.06115 20.1814 2.69803 19.0726 2.56129 17.9252C2.42456 16.7779 2.51692 15.6148 2.83304 14.5034C3.14915 13.392 3.68272 12.3543 4.40283 11.4507C4.95035 10.7412 5.60982 10.1256 6.35533 9.62818C6.38763 9.60673 6.41891 9.58379 6.44908 9.55943C6.44908 9.55943 6.81908 9.25318 6.83158 9.24693C8.61295 7.74063 9.88013 5.7162 10.4566 3.45568C11.8184 4.71489 12.7263 6.38851 13.0393 8.21664C13.3524 10.0448 13.0531 11.9251 12.1878 13.5657C12.0733 13.7847 12.0263 14.0327 12.0527 14.2783C12.079 14.524 12.1776 14.7564 12.336 14.9461C12.4944 15.1358 12.7054 15.2742 12.9425 15.344C13.1795 15.4138 13.4319 15.4118 13.6678 15.3382C15.5823 14.7374 17.267 13.5649 18.4953 11.9782C19.2337 13.0685 19.7165 14.3114 19.9077 15.6142C20.0989 16.917 19.9935 18.2462 19.5995 19.5027C19.2055 20.7591 18.5331 21.9105 17.6322 22.8709C16.7313 23.8313 15.6253 24.576 14.3966 25.0494Z"
            fill="#F5F9FF"
        />
    </svg>
)

interface IPlanCardProps {
    isActive?: boolean
    isSelected?: boolean
    onClick?: () => void
    plan?: PlanType
    planDescription: string
    planName: string
    price: string
}

const PlanCard = ({
    planName,
    planDescription,
    price,
    isActive,
    isSelected,
    plan = 'basic',
    onClick
}: IPlanCardProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [descPart1, descPart2] = planDescription.split(',')
    const highlighted = isActive || isSelected
    const { gradient, descColor } = planStyles[plan]

    return (
        <Box
            onClick={onClick}
            style={{
                background: highlighted ? gradient : '#F5F9FF',
                borderRadius: 12,
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                cursor: 'pointer'
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}
            >
                <Text
                    className={highlighted ? classes.whiteText : classes.gradientText}
                    style={{
                        background: highlighted ? undefined : gradient,
                        fontSize: isMobile ? 17 : 24,
                        fontWeight: 600
                    }}
                >
                    {planName}
                </Text>
                {isActive && <FireIcon />}
            </Box>

            <Text
                className={classes.descText}
                style={{
                    color: highlighted ? 'rgba(255,255,255,0.8)' : descColor,
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 500,
                    marginBottom: 25,
                    lineHeight: 1.25
                }}
            >
                {descPart1},<br />
                {descPart2}
            </Text>

            <Text
                className={highlighted ? classes.whiteText : classes.gradientText}
                style={{
                    background: highlighted ? undefined : gradient,
                    alignSelf: 'flex-end',
                    fontSize: isMobile ? 16 : 24,
                    fontWeight: 600
                }}
            >
                {price}
            </Text>
        </Box>
    )
}

interface IProps {
    plans?: IPlanCardProps[]
}

const DEFAULT_PLANS_BASIC: IPlanCardProps[] = [
    { planName: '1 месяц', planDescription: 'Базовый план, никаких доплат', price: '199 ₽' },
    {
        planName: '3 месяца',
        planDescription: 'Базовый план, никаких доплат',
        price: '499 ₽',
        isActive: true
    },
    { planName: '6 месяцев', planDescription: 'Базовый план, никаких доплат', price: '899 ₽' },
    { planName: '12 месяцев', planDescription: 'Базовый план, никаких доплат', price: '1499 ₽' }
]

const DEFAULT_PLANS_PRO: IPlanCardProps[] = [
    { planName: '1 месяц', planDescription: 'Про план, никаких доплат', price: '399 ₽' },
    {
        planName: '3 месяца',
        planDescription: 'Про план, никаких доплат',
        price: '999 ₽',
        isActive: true
    },
    { planName: '6 месяцев', planDescription: 'Про план, никаких доплат', price: '1799 ₽' },
    { planName: '12 месяцев', planDescription: 'Про план, никаких доплат', price: '2999 ₽' }
]

export const SubscriptionRenewWidget = ({ plans }: IProps) => {
    const config = useAppConfig() as { userType?: PlanType }
    const planType: PlanType = config.userType || 'basic'
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
    const defaultPlans = planType === 'pro' ? DEFAULT_PLANS_PRO : DEFAULT_PLANS_BASIC
    const activePlans = plans ?? defaultPlans

    return (
        <Box pb={16} pt={0} px={{ base: 'sm', xs: 'md', sm: 'lg', md: 'xl' }}>
            <SimpleGrid cols={2} spacing={4}>
                {activePlans.map((p, index) => (
                    <PlanCard
                        key={index}
                        {...p}
                        isSelected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                        plan={planType}
                    />
                ))}
            </SimpleGrid>
        </Box>
    )
}
