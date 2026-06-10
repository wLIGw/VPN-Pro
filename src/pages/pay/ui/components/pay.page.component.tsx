// Здесь все написанно мной

import { Box } from '@mantine/core'
import { useEffect } from 'react'

import { PayMethodWidget } from '@widgets/pay/pay-method/pay.method.widget'
import { PayFooterWidget } from '@widgets/pay/pay-footer/pay.footer.widget'
import { PayHeader } from '@widgets/pay/pay-header/pay.header.widget'
import { PayInfoWidget } from '@widgets/pay/pay-info/pay.info.widget'

const PayPage = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#fff'
        document.body.style.backgroundImage = 'none'
        document.documentElement.style.backgroundColor = '#fff'
        document.documentElement.style.backgroundImage = 'none'

        return () => {
            document.body.style.backgroundColor = ''
            document.body.style.backgroundImage = ''
            document.documentElement.style.backgroundColor = ''
            document.documentElement.style.backgroundImage = ''
        }
    }, [])

    return (
        <Box
            style={{
                minHeight: '100vh',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <PayHeader />
            <Box style={{ flex: 1, padding: '20px' }}>
                <PayInfoWidget />
                <Box mt={16}>
                    <PayMethodWidget />
                </Box>
            </Box>
            <PayFooterWidget />
        </Box>
    )
}

export default PayPage
