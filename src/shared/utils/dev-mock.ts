import { GetSubscriptionInfoByShortUuidCommand } from '@remnawave/backend-contract'

export const MOCK_SUBSCRIPTION: GetSubscriptionInfoByShortUuidCommand.Response['response'] = {
    isFound: true,
    subscriptionUrl: 'https://mock.example.com/sub/mock-short-uuid',
    links: [
        'vless://mock-uuid@mock.example.com:443?type=tcp&security=tls#DEV-Node-1',
        'vless://mock-uuid2@mock.example.com:443?type=tcp&security=tls#DEV-Node-2'
    ],
    ssConfLinks: {},
    user: {
        username: 'dev_user',
        shortUuid: 'mock-short-uuid',
        daysLeft: 30,
        trafficUsed: '10.00 GB',
        trafficLimit: '100.00 GB',
        lifetimeTrafficUsed: '50 GB',
        trafficUsedBytes: '11274289152',
        trafficLimitBytes: '107374182400',
        lifetimeTrafficUsedBytes: '53687091200',
        expiresAt: new Date('2026-04-22T00:00:00.000Z'),
        isActive: true,
        userStatus: 'ACTIVE',
        trafficLimitStrategy: 'MONTH'
    }
}

export const MOCK_CONFIG = {
    version: '1' as const,
    locales: ['en', 'ru'] as const,
    brandingSettings: {
        title: 'Official VPN',
        logoUrl: '',
        supportUrl: 'https://t.me/mock'
    },
    uiConfig: {
        subscriptionInfoBlockType: 'expanded' as const,
        installationGuidesBlockType: 'cards' as const
    },
    baseSettings: {
        metaTitle: 'Official VPN',
        metaDescription: 'Mock subscription page',
        showConnectionKeys: true,
        hideGetLinkButton: false
    },
    baseTranslations: {
        installationGuideHeader: { en: 'Installation Guide', ru: 'Руководство по установке' },
        connectionKeysHeader: { en: 'Connection Keys', ru: 'Ключи подключения' },
        linkCopied: { en: 'Copied!', ru: 'Скопировано!' },
        linkCopiedToClipboard: { en: 'Link copied to clipboard', ru: 'Ссылка скопирована' },
        getLink: { en: 'Get Link', ru: 'Получить ссылку' },
        scanQrCode: { en: 'Scan QR Code', ru: 'Сканировать QR' },
        scanQrCodeDescription: { en: 'Scan to import', ru: 'Сканируйте для импорта' },
        copyLink: { en: 'Copy Link', ru: 'Копировать ссылку' },
        name: { en: 'Name', ru: 'Имя' },
        status: { en: 'Status', ru: 'Статус' },
        active: { en: 'Active', ru: 'Активен' },
        inactive: { en: 'Inactive', ru: 'Неактивен' },
        expires: { en: 'Expires', ru: 'Истекает' },
        bandwidth: { en: 'Bandwidth', ru: 'Трафик' },
        scanToImport: { en: 'Scan to import', ru: 'Сканировать для импорта' },
        expiresIn: { en: 'Expires in', ru: 'Истекает через' },
        expired: { en: 'Expired', ru: 'Истёк' },
        unknown: { en: 'Unknown', ru: 'Неизвестно' },
        indefinitely: { en: 'Indefinitely', ru: 'Бессрочно' }
    },
    svgLibrary: {},
    platforms: {
        ios: {
            svgIconKey: 'ios',
            displayName: { en: 'iOS', ru: 'iOS' },
            apps: [
                {
                    name: 'Streisand',
                    svgIconKey: 'streisand',
                    featured: true,
                    blocks: [
                        {
                            svgIconKey: 'download',
                            svgIconColor: '#4CAF50',
                            title: { en: 'Download', ru: 'Скачать' },
                            description: { en: 'Download from App Store', ru: 'Скачайте из App Store' },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'appstore',
                                    link: 'https://apps.apple.com/app/streisand/id6450534064',
                                    text: { en: 'App Store', ru: 'App Store' }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        android: {
            svgIconKey: 'android',
            displayName: { en: 'Android', ru: 'Android' },
            apps: [
                {
                    name: 'V2RayNG',
                    svgIconKey: 'v2rayng',
                    featured: true,
                    blocks: [
                        {
                            svgIconKey: 'download',
                            svgIconColor: '#4CAF50',
                            title: { en: 'Download', ru: 'Скачать' },
                            description: { en: 'Download from Google Play', ru: 'Скачайте из Google Play' },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'googleplay',
                                    link: 'https://play.google.com/store/apps/details?id=com.v2ray.ang',
                                    text: { en: 'Google Play', ru: 'Google Play' }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        windows: {
            svgIconKey: 'windows',
            displayName: { en: 'Windows', ru: 'Windows' },
            apps: [
                {
                    name: 'Hiddify',
                    svgIconKey: 'hiddify',
                    featured: true,
                    blocks: [
                        {
                            svgIconKey: 'download',
                            svgIconColor: '#4CAF50',
                            title: { en: 'Download', ru: 'Скачать' },
                            description: { en: 'Download from GitHub', ru: 'Скачайте с GitHub' },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'github',
                                    link: 'https://github.com/hiddify/hiddify-next/releases/latest',
                                    text: { en: 'GitHub', ru: 'GitHub' }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        macos: {
            svgIconKey: 'macos',
            displayName: { en: 'macOS', ru: 'macOS' },
            apps: [
                {
                    name: 'Hiddify',
                    svgIconKey: 'hiddify',
                    featured: true,
                    blocks: [
                        {
                            svgIconKey: 'download',
                            svgIconColor: '#4CAF50',
                            title: { en: 'Download', ru: 'Скачать' },
                            description: { en: 'Download from GitHub', ru: 'Скачайте с GitHub' },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'github',
                                    link: 'https://github.com/hiddify/hiddify-next/releases/latest',
                                    text: { en: 'GitHub', ru: 'GitHub' }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        linux: {
            svgIconKey: 'linux',
            displayName: { en: 'Linux', ru: 'Linux' },
            apps: [
                {
                    name: 'Hiddify',
                    svgIconKey: 'hiddify',
                    featured: true,
                    blocks: [
                        {
                            svgIconKey: 'download',
                            svgIconColor: '#4CAF50',
                            title: { en: 'Download', ru: 'Скачать' },
                            description: { en: 'Download from GitHub', ru: 'Скачайте с GitHub' },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'github',
                                    link: 'https://github.com/hiddify/hiddify-next/releases/latest',
                                    text: { en: 'GitHub', ru: 'GitHub' }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
