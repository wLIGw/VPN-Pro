import { useMediaQuery } from '@mantine/hooks'
import { Box, Text } from '@mantine/core'
import { useState } from 'react'

interface IProps {
    paymentDetails?: string
    price?: string
    timeLeft?: string
    title?: string
}

const ChevronIcon = ({ rotated }: { rotated: boolean }) => (
    <svg
        fill="none"
        height="7"
        style={{
            transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0
        }}
        viewBox="0 0 11 7"
        width="11"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            clipRule="evenodd"
            d="M4.71394 5.8925L-0.000222258 1.17833L1.17811 -4.12126e-07L5.30311 4.125L9.42811 -5.15066e-08L10.6064 1.17833L5.89228 5.8925C5.73601 6.04873 5.52408 6.13649 5.30311 6.13649C5.08214 6.13649 4.87022 6.04873 4.71394 5.8925Z"
            fill="#1C2029"
            fillRule="evenodd"
        />
    </svg>
)

export const PayInfoWidget = ({
    title = 'Продление подписки',
    price = '3 588 ₽',
    timeLeft = '9:52'
}: IProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [opened, setOpened] = useState(false)

    return (
        <Box>
            {/* Заголовок */}
            <Box mb={16}>
                <Text
                    style={{
                        fontWeight: 700,
                        fontSize: isMobile ? 32 : 48,
                        lineHeight: '110%',
                        color: '#141820'
                    }}
                >
                    {isMobile ? (
                        <>
                            Продление
                            <br />
                            подписки
                        </>
                    ) : (
                        title
                    )}
                </Text>
            </Box>

            {/* Цена */}
            <Box mb={16}>
                <Text
                    style={{
                        fontWeight: 700,
                        fontSize: isMobile ? 32 : 48,
                        lineHeight: '110%',
                        color: '#141820'
                    }}
                >
                    {price}
                </Text>
            </Box>

            {/* Таймер */}
            <Box mb={16}>
                <Text
                    style={{
                        fontWeight: 500,
                        fontSize: 14,
                        color: '#969696'
                    }}
                >
                    Завершите платеж в течение{' '}
                    <span style={{ fontWeight: 600, fontSize: 12, color: '#141820' }}>
                        {timeLeft}
                    </span>
                </Text>
            </Box>

            {/* Аккордион */}
            <Box mb={16}>
                <Box
                    onClick={() => setOpened(!opened)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 500,
                            fontSize: 14,
                            color: '#969696'
                        }}
                    >
                        Детали платежа
                    </Text>
                    <ChevronIcon rotated={opened} />
                </Box>

                {opened && (
                    <Box mt={8}>
                        <Text
                            style={{
                                fontWeight: 500,
                                fontSize: 14,
                                color: '#141820',
                                lineHeight: 1.25
                            }}
                        >
                            Оплата цифрового ключа Proxy для
                            <br />
                            000000001:1-Пробный ключ
                            <br />
                            на 92 дня, 0:00:00 д.
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
