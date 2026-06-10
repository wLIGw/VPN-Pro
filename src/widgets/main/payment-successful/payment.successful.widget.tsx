// Компонент полностью написан мной

import { Box, Modal, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

const SuccessIcon = ({ isMobile }: { isMobile: boolean }) => (
    <svg
        fill="none"
        height={isMobile ? 35 : 53}
        viewBox="0 0 53 53"
        width={isMobile ? 35 : 53}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M26.25 0C21.0583 0 15.9831 1.53954 11.6663 4.42392C7.3495 7.30831 3.98497 11.408 1.99817 16.2046C0.0113737 21.0011 -0.508464 26.2791 0.504398 31.3711C1.51726 36.4631 4.01733 41.1404 7.68846 44.8115C11.3596 48.4827 16.0369 50.9827 21.1289 51.9956C26.2209 53.0085 31.4989 52.4886 36.2954 50.5018C41.092 48.515 45.1917 45.1505 48.0761 40.8337C50.9605 36.5169 52.5 31.4418 52.5 26.25C52.5 19.2881 49.7344 12.6113 44.8116 7.68845C39.8887 2.76562 33.2119 0 26.25 0ZM22.5 36.7312L13.125 27.3562L16.1063 24.375L22.5 30.7687L36.3938 16.875L39.3863 19.8487L22.5 36.7312Z"
            fill="url(#success_gradient)"
        />
        <defs>
            <linearGradient
                gradientUnits="userSpaceOnUse"
                id="success_gradient"
                x1="0"
                x2="54.1402"
                y1="0"
                y2="1.74977"
            >
                <stop stopColor="#30987A" />
                <stop offset="0.5" stopColor="#30E5B1" />
                <stop offset="1" stopColor="#179671" />
            </linearGradient>
        </defs>
    </svg>
)

const textGradient = 'linear-gradient(90deg, #30987a 0%, #30e5b1 50%, #179671 100%)'
const btnGradient = 'linear-gradient(90deg, #30987a 0%, #30e5b1 50%, #179671 100%)'

interface IProps {
    date?: string
    onClose: () => void
    opened: boolean
}

export const PaymentSuccessfulWidget = ({ date = '14.06.2026', opened, onClose }: IProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <Modal
            centered
            onClose={onClose}
            opened={opened}
            padding={0}
            radius="xl"
            size={778}
            styles={{
                content: {
                    background: 'transparent',
                    boxShadow: 'none',
                    overflow: 'visible'
                },
                overlay: {
                    backdropFilter: 'blur(4px)'
                }
            }}
            withCloseButton={false}
        >
            <Box
                style={{
                    background: '#fff',
                    borderRadius: 16,
                    overflow: 'hidden',
                    marginBottom: 2
                }}
            >
                <Box
                    style={{
                        padding: '24px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 12,
                        textAlign: 'center'
                    }}
                >
                    <SuccessIcon isMobile={!!isMobile} />

                    <Text
                        style={{
                            fontWeight: 700,
                            fontSize: isMobile ? 24 : 32,
                            background: textGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Успешно!
                    </Text>

                    <Text
                        style={{
                            fontWeight: 500,
                            fontSize: isMobile ? 14 : 16,
                            background: textGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Подписка продлена до {date}
                    </Text>
                </Box>
            </Box>

            <Box
                onClick={onClose}
                onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                }}
                style={{
                    background: btnGradient,
                    borderRadius: 14,
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'opacity 0.15s ease'
                }}
            >
                <Text style={{ fontWeight: 600, fontSize: 16, color: '#EEFFF9' }}>Закрыть</Text>
            </Box>
        </Modal>
    )
}
