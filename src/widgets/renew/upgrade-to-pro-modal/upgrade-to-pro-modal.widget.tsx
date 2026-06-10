import { Box, Group, Modal, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

interface IProps {
    daysLeft?: number
    extraPrice?: number
    onClose: () => void
    onConfirm?: () => void
    opened: boolean
}

const features = [
    { basic: 'Всего\n4 локации', pro: 'Более 6 локаций\n+ новые точки' },
    { basic: 'До 3\nустройств', pro: 'До 6\nустройств' },
    { basic: null, pro: 'Обход белых\nсписков на LTE' },
    { basic: null, pro: 'Youtube\nбез рекламы' }
]

const purpleGradient = 'linear-gradient(90deg, #6831aa 0%, #b14ffd 50%, #7f1e97 100%)'
const HEADER_HEIGHT = 52
const ROW_HEIGHT = 62

export const UpgradeToProModal = ({
    opened,
    onClose,
    onConfirm,
    daysLeft = 66,
    extraPrice = 100
}: IProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <Modal
            centered
            onClose={onClose}
            opened={opened}
            padding={0}
            radius="xl"
            size="778px"
            styles={{
                content: {
                    background: '#AB93DB',
                    overflow: 'hidden',
                    borderRadius: 16
                },
                overlay: {
                    backdropFilter: 'blur(4px)'
                }
            }}
            withCloseButton={false}
        >
            {/* Header */}
            <Box
                style={{
                    padding: '32px 24px 24px',
                    textAlign: 'center',
                    background: purpleGradient,
                    marginBottom: 12
                }}
            >
                <Title c="white" fw={700} fz={isMobile ? 24 : 32} mb={8} order={2}>
                    Подключаем Pro
                </Title>
                <Text c="rgba(255,255,255,0.85)" fw={500} fz={isMobile ? 10 : 14}>
                    Останутся {daysLeft}% дней и добавится +{extraPrice} ₽ в месяц
                </Text>
            </Box>

            {/* Table */}
            <Box style={{ padding: '0 16px' }}>
                <Box style={{ display: 'flex', gap: 8 }}>
                    {/* Basic */}
                    <Box
                        style={{
                            flex: 1,
                            borderRadius: 16,
                            boxShadow: 'inset 0 0 0 2px #FAF5FF',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            style={{
                                height: HEADER_HEIGHT,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottom: '2px solid #FAF5FF'
                            }}
                        >
                            <Title c="white" fw={800} fz={isMobile ? 16 : 24} order={4}>
                                Basic
                            </Title>
                        </Box>
                        {features.map((feature, index) => (
                            <Box
                                key={`basic-${index}`}
                                style={{
                                    minHeight: ROW_HEIGHT,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: isMobile ? '8px 12px' : '0 12px',
                                    margin: '0 12px',
                                    borderBottom:
                                        index < features.length - 1
                                            ? '1.5px solid rgba(255,255,255,0.4)'
                                            : 'none'
                                }}
                            >
                                <Text
                                    c="white"
                                    fw={500}
                                    fz={isMobile ? 10 : 14}
                                    style={{ whiteSpace: 'pre-line', lineHeight: 1.4 }}
                                    ta="center"
                                >
                                    {feature.basic ?? '—'}
                                </Text>
                            </Box>
                        ))}
                    </Box>

                    {/* Pro */}
                    <Box
                        style={{
                            flex: 1,
                            borderRadius: 16,
                            boxShadow: 'inset 0 0 0 2px #FAF5FF',
                            background: '#FAF5FF',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            style={{
                                height: HEADER_HEIGHT,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: purpleGradient
                            }}
                        >
                            <Title c="white" fw={800} fz={isMobile ? 16 : 24} order={4}>
                                Pro
                            </Title>
                        </Box>
                        {features.map((feature, index) => (
                            <Box
                                key={`pro-${index}`}
                                style={{
                                    minHeight: ROW_HEIGHT,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    ьфк: isMobile ? '8px 12px' : '0 12px',
                                    margin: '0 12px',
                                    borderBottom:
                                        index < features.length - 1
                                            ? '1.5px solid rgba(177,79,253,0.3)'
                                            : 'none'
                                }}
                            >
                                <Text
                                    fw={500}
                                    fz={isMobile ? 10 : 14}
                                    style={{
                                        whiteSpace: 'pre-line',
                                        lineHeight: 1.4,
                                        background: purpleGradient,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                    ta="center"
                                >
                                    {feature.pro}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Telegram */}
            <Box style={{ padding: '12px 24px 8px', textAlign: 'center' }}>
                <Group gap={6} justify="center">
                    <Text c="#FAF5FF" fz={isMobile ? 10 : 12}>
                        Вы будете перенаправлены в Telegram
                    </Text>
                    <svg
                        fill="none"
                        height="12"
                        viewBox="0 0 14 12"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="M12.0113 0.0783101C12.176 0.00897069 12.3563 -0.014944 12.5334 0.00905486C12.7106 0.0330537 12.878 0.104089 13.0184 0.214767C13.1587 0.325445 13.2669 0.471719 13.3315 0.638365C13.3961 0.805011 13.4149 0.985937 13.3859 1.16231L11.8739 10.3336C11.7273 11.2183 10.7566 11.7256 9.94526 11.285C9.26659 10.9163 8.25859 10.3483 7.35192 9.75564C6.89859 9.45898 5.50993 8.50898 5.68059 7.83298C5.82726 7.25498 8.16059 5.08298 9.49392 3.79164C10.0173 3.28431 9.77859 2.99164 9.16059 3.45831C7.62593 4.61698 5.16192 6.37898 4.34726 6.87498C3.62859 7.31231 3.25392 7.38698 2.80592 7.31231C1.98859 7.17631 1.23059 6.96564 0.611925 6.70898C-0.224075 6.36231 -0.183408 5.21298 0.611259 4.87831L12.0113 0.0783101Z"
                            fill="#FAF5FF"
                            fillRule="evenodd"
                        />
                    </svg>
                </Group>
            </Box>

            {/* Buttons */}
            <Box style={{ display: 'flex', gap: 12, padding: '0 16px 16px' }}>
                <Box
                    onClick={onClose}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                    }}
                    style={{
                        flex: 1,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 0 0 2px #FAF5FF',
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'opacity 0.15s ease'
                    }}
                >
                    <Text c="white" fw={700} fz={isMobile ? 12 : 16}>
                        В другой раз
                    </Text>
                </Box>
                <Box
                    onClick={onConfirm}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1'
                    }}
                    style={{
                        flex: 1,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#FAF5FF',
                        boxShadow: 'inset 0 0 0 2px #FAF5FF',
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'opacity 0.15s ease'
                    }}
                >
                    <span
                        style={{
                            background: purpleGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 700,
                            fontSize: isMobile ? 12 : 16
                        }}
                    >
                        Перейти на Pro
                    </span>
                </Box>
            </Box>
        </Modal>
    )
}
