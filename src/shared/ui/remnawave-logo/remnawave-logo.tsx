import { Box, BoxProps } from '@mantine/core'

interface RemnawaveLogoProps extends BoxProps {
    size?: number | string
}

export function RemnawaveLogo({ size = 40, style, ...props }: RemnawaveLogoProps) {
    const src = `${import.meta.env.BASE_URL}icons/logo.svg`
    return (
        <Box
            component="img"
            src={src}
            style={{
                width: size,
                height: size,
                objectFit: 'contain',
                ...style
            }}
            {...props}
        />
    )
}
