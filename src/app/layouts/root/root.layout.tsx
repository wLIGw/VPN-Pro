import type { TSubscriptionPageRawConfig } from '@remnawave/subscription-page-types'

import {
    APP_CONFIG_ROUTE_LEADING_PATH,
    SubscriptionPageRawConfigSchema
} from '@remnawave/subscription-page-types'
import { GetSubscriptionInfoByShortUuidCommand } from '@remnawave/backend-contract'
import { Outlet } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import consola from 'consola/browser'
import { ofetch } from 'ofetch'

import {
    useSubscriptionInfoStoreActions,
    useSubscriptionInfoStoreInfo
} from '@entities/subscription-info-store'
import { useAppConfigStoreActions, useIsConfigLoaded } from '@entities/app-config-store'
import { LoadingScreen } from '@shared/ui'

import classes from './root.module.css'

const MOCK_SUBSCRIPTION: GetSubscriptionInfoByShortUuidCommand.Response['response'] = {
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
        trafficLimit: '∞',
        lifetimeTrafficUsed: '50 GB',
        trafficUsedBytes: '11274289152',
        trafficLimitBytes: '107374182400',
        lifetimeTrafficUsedBytes: '53687091200',
        expiresAt: new Date('2026-09-22T00:00:00.000Z'),
        isActive: true,
        userStatus: 'ACTIVE',
        trafficLimitStrategy: 'MONTH'
    }
}

// userType basic или pro меняет страницы для обычной и про версии, но так как у нас нет серверной части,
// то мы просто мокируем конфиг и инфу о подписке. Когда серверная часть будет готова, нужно удалить весь
// этот код и раскомментировать реальные запросы к серверу.

const MOCK_CONFIG = {
    version: '1' as const,
    userType: 'pro',
    locales: ['en', 'ru'] as ('en' | 'ru')[],
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
        installationGuideHeader: { en: 'Installation', ru: 'Установка' },
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
    svgLibrary: {
        ios: `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.09266 3.81L8.69172 3.56789C9.1782 3.37799 9.80701 3.18414 10.5492 3.30678C12.0698 3.55839 13.1183 4.36623 13.7431 5.43755C13.9843 5.85057 13.7897 6.39494 13.3394 6.56821C12.9537 6.7167 12.6239 6.97879 12.3952 7.31864C12.1666 7.6585 12.0501 8.05955 12.0618 8.46699C12.0735 8.87442 12.2128 9.26836 12.4606 9.59496C12.7084 9.92157 13.0527 10.1649 13.4464 10.2917C13.8629 10.4262 14.0977 10.8812 13.961 11.291C13.6056 12.3529 13.0942 13.3332 12.4887 14.1244C11.8904 14.9062 11.1603 15.555 10.3474 15.8722C9.80701 16.0827 9.22966 15.9988 8.67644 15.862L8.34836 15.7749L7.87796 15.6459L7.62145 15.5834C7.49558 15.5526 7.36675 15.5348 7.23709 15.5304C7.13256 15.5304 7.00792 15.5494 6.85273 15.5834L6.59542 15.6467L5.96259 15.8192C5.36112 15.9798 4.72105 16.1041 4.12682 15.8722C3.1032 15.4735 2.20019 14.543 1.51751 13.4456C0.779339 12.2366 0.291787 10.8958 0.0829873 9.5005C-0.0995441 8.27093 -0.000639411 6.89024 0.577511 5.72239C1.17255 4.51894 2.26291 3.58213 3.92499 3.30678C4.60044 3.19522 5.181 3.34476 5.64577 3.51646L5.91193 3.61932L6.38153 3.81C6.70317 3.93422 6.95646 4.00702 7.23709 4.00702C7.51692 4.00702 7.77102 3.93422 8.09266 3.81ZM5.78167 5.27931L5.50184 5.16616C4.91404 4.92405 4.58677 4.8022 4.19115 4.86708C3.07184 5.05302 2.40524 5.64406 2.02329 6.41551C1.62445 7.22098 1.52474 8.26065 1.67431 9.27183C1.85764 10.5046 2.30874 11.6851 2.88931 12.6203C3.48273 13.5737 4.15255 14.1806 4.71864 14.4006C4.91163 14.4757 5.18904 14.4164 5.44635 14.3388L5.80257 14.2233L5.90067 14.1933L6.24885 14.0983C6.55923 14.0192 6.90902 13.948 7.23709 13.948C7.56436 13.948 7.91495 14.0192 8.22534 14.0983L8.57351 14.1933L8.67161 14.2233L9.02783 14.3388C9.28514 14.4164 9.56256 14.4757 9.75554 14.4006C10.1954 14.2297 10.7068 13.8214 11.2029 13.1726C11.5728 12.6899 11.9105 12.1028 12.1863 11.4501C11.6571 11.1321 11.2197 10.6856 10.9163 10.1534C10.6128 9.6212 10.4535 9.0212 10.4535 8.41098C10.4535 7.26608 11.0019 6.24935 11.8526 5.59817C11.4723 5.24212 10.9625 4.98022 10.283 4.86708C9.92682 4.80853 9.62608 4.9011 9.14121 5.09733L8.97235 5.16616C8.53733 5.34577 7.94631 5.58947 7.23709 5.58947C6.6702 5.58947 6.17809 5.4336 5.78167 5.27931ZM7.05054 0.710769C7.83534 -0.0622583 9.0407 -0.128721 9.32454 0.151373C9.6092 0.430676 9.54165 1.61672 8.75604 2.38896C7.97124 3.1612 6.76589 3.22766 6.48204 2.94836C6.19739 2.66905 6.26493 1.48301 7.05054 0.710769Z" fill="#ffffff" />
    </svg>`,

        android: `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.35631 3.00723C6.35631 3.08287 6.33968 3.15777 6.30737 3.22766C6.27506 3.29754 6.22771 3.36104 6.168 3.41453C6.1083 3.46801 6.03743 3.51044 5.95942 3.53939C5.88142 3.56834 5.79782 3.58323 5.71339 3.58323C5.62896 3.58323 5.54535 3.56834 5.46735 3.53939C5.38935 3.51044 5.31847 3.46801 5.25877 3.41453C5.19907 3.36104 5.15171 3.29754 5.1194 3.22766C5.08709 3.15777 5.07046 3.08287 5.07046 3.00723C5.07046 2.85446 5.1382 2.70796 5.25877 2.59993C5.37934 2.49191 5.54287 2.43123 5.71339 2.43123C5.8839 2.43123 6.04743 2.49191 6.168 2.59993C6.28858 2.70796 6.35631 2.85446 6.35631 3.00723ZM8.28585 3.58323C8.45637 3.58323 8.6199 3.52255 8.74047 3.41453C8.86104 3.30651 8.92878 3.16 8.92878 3.00723C8.92878 2.85446 8.86104 2.70796 8.74047 2.59993C8.6199 2.49191 8.45637 2.43123 8.28585 2.43123C8.11534 2.43123 7.95181 2.49191 7.83124 2.59993C7.71066 2.70796 7.64293 2.85446 7.64293 3.00723C7.64293 3.16 7.71066 3.30651 7.83124 3.41453C7.95181 3.52255 8.11534 3.58323 8.28585 3.58323Z" fill="#1C2029" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.73814 0.149679C2.79107 0.102227 2.85392 0.0645842 2.9231 0.0389016C2.99227 0.013219 3.06642 0 3.1413 0C3.21618 0 3.29033 0.013219 3.3595 0.0389016C3.42868 0.0645842 3.49153 0.102227 3.54446 0.149679L4.47769 0.985089C5.21648 0.590498 6.06085 0.38273 6.92096 0.383894H7.07828C7.97123 0.383894 8.80643 0.603129 9.52155 0.985089L10.4548 0.149679C10.5628 0.0594795 10.7057 0.010374 10.8534 0.0127081C11.0011 0.0150422 11.1419 0.0686337 11.2464 0.162192C11.3508 0.255751 11.4106 0.381971 11.4132 0.514262C11.4158 0.646553 11.361 0.774586 11.2603 0.871386L10.4312 1.61488C11.2437 2.33018 11.7433 3.28259 11.8394 4.29949C12.0031 4.25047 12.1761 4.22551 12.3585 4.2246C12.7938 4.2246 13.2114 4.37954 13.5192 4.65534C13.8271 4.93114 14 5.30521 14 5.69525V9.15195C14.0002 9.38366 13.9392 9.61212 13.8221 9.81872C13.705 10.0253 13.5351 10.2042 13.3262 10.3408C13.1172 10.4774 12.8753 10.5678 12.6199 10.6047C12.3646 10.6416 12.1032 10.624 11.8569 10.5532V11.8229C11.8569 12.4446 11.5187 12.9947 10.9989 13.3358V14.3367C10.9989 14.7776 10.8034 15.2005 10.4554 15.5123C10.1073 15.8241 9.63528 15.9993 9.14309 15.9993C8.65089 15.9993 8.17886 15.8241 7.83082 15.5123C7.48279 15.2005 7.28727 14.7776 7.28727 14.3367V13.6953H6.71198V14.3374C6.71198 14.7783 6.51645 15.2012 6.16842 15.513C5.82038 15.8248 5.34835 16 4.85615 16C4.36396 16 3.89192 15.8248 3.54388 15.513C3.19585 15.2012 3.00033 14.7783 3.00033 14.3374V13.3358C2.73458 13.1619 2.51843 12.9343 2.36946 12.6714C2.2205 12.4085 2.14294 12.1178 2.14309 11.8229V10.5532C1.89683 10.624 1.63539 10.6416 1.38006 10.6047C1.12473 10.5678 0.882754 10.4774 0.673843 10.3408C0.464932 10.2042 0.295001 10.0253 0.177901 9.81872C0.0608004 9.61212 -0.000155805 9.38366 2.99071e-07 9.15195V5.69525C-5.91463e-05 5.46226 0.0616719 5.23259 0.180108 5.02516C0.298543 4.81773 0.470294 4.63848 0.681211 4.50218C0.892128 4.36588 1.13617 4.27642 1.39324 4.24118C1.65031 4.20594 1.91305 4.22593 2.15981 4.29949C2.25594 3.28259 2.75553 2.33018 3.56802 1.61488L2.73814 0.871386C2.6314 0.775641 2.57145 0.645853 2.57145 0.510533C2.57145 0.375212 2.6314 0.245425 2.73814 0.149679ZM3.4715 5.24588C3.42138 5.24624 3.37344 5.26434 3.33814 5.29622C3.30284 5.3281 3.28303 5.37119 3.28303 5.4161V11.8229C3.28303 12.0481 3.38259 12.264 3.55992 12.4235C3.73725 12.5831 3.9779 12.6731 4.22918 12.674H9.77006C10.0213 12.6731 10.262 12.5831 10.4393 12.4235C10.6166 12.264 10.7162 12.0481 10.7162 11.8229V5.4161C10.7162 5.37119 10.6964 5.3281 10.6611 5.29622C10.6258 5.26434 10.5779 5.24624 10.5277 5.24588H3.4715ZM10.6835 4.2246C10.5642 3.4438 10.1333 2.72814 9.47048 2.20996C8.80772 1.69178 7.95793 1.40614 7.07828 1.40586H6.92096C6.04131 1.40614 5.19153 1.69178 4.52876 2.20996C3.86599 2.72814 3.43508 3.4438 3.31571 4.2246H10.6835ZM8.42721 14.3374V13.6953H9.85897V14.3374C9.85897 14.4216 9.84046 14.505 9.80448 14.5828C9.7685 14.6606 9.71577 14.7313 9.6493 14.7909C9.58282 14.8504 9.5039 14.8977 9.41705 14.9299C9.33019 14.9621 9.2371 14.9787 9.14309 14.9787C9.04908 14.9787 8.95599 14.9621 8.86913 14.9299C8.78228 14.8977 8.70336 14.8504 8.63688 14.7909C8.57041 14.7313 8.51768 14.6606 8.4817 14.5828C8.44572 14.505 8.42721 14.4216 8.42721 14.3374ZM5.57203 13.6953V14.3374C5.57203 14.5075 5.49661 14.6706 5.36236 14.7909C5.2281 14.9111 5.04601 14.9787 4.85615 14.9787C4.66629 14.9787 4.4842 14.9111 4.34994 14.7909C4.21569 14.6706 4.14027 14.5075 4.14027 14.3374V13.6953H5.57203ZM12.3585 9.602C12.2257 9.602 12.0984 9.55484 12.0044 9.47087C11.9103 9.38689 11.8573 9.27294 11.8569 9.154V5.69321C11.8572 5.57403 11.9103 5.45984 12.0046 5.37576C12.0513 5.33412 12.1067 5.30114 12.1676 5.27868C12.2285 5.25622 12.2938 5.24473 12.3596 5.24486C12.4255 5.245 12.4907 5.25675 12.5515 5.27946C12.6123 5.30217 12.6675 5.33538 12.714 5.3772C12.7604 5.41902 12.7972 5.46864 12.8223 5.52321C12.8474 5.57778 12.8602 5.63624 12.8601 5.69525V9.15195C12.8601 9.27113 12.8072 9.38543 12.7132 9.4697C12.6191 9.55397 12.4915 9.602 12.3585 9.602ZM2.14233 5.69184C2.14193 5.57267 2.0887 5.45851 1.99435 5.37449C1.9 5.29048 1.77226 5.24348 1.63924 5.24384C1.50621 5.2442 1.37879 5.29189 1.28501 5.37642C1.19124 5.46095 1.13878 5.57539 1.13918 5.69457V9.15127C1.13868 9.27045 1.19104 9.38493 1.28475 9.46952C1.37845 9.55411 1.50583 9.60189 1.63886 9.60234C1.77188 9.60279 1.89966 9.55588 1.99408 9.47193C2.0885 9.38797 2.14183 9.27386 2.14233 9.15468V5.69184Z" fill="#ffffff" />
    </svg>`,

        windows: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.55556 13.0873L14.2222 14.1417V8.89984H7.55556V13.0873ZM1.77778 12.1743L5.77778 12.8064V8.89984H1.77778V12.1743ZM7.55556 2.91182V7.10194H14.2222V1.85749L7.55556 2.91182ZM1.77778 3.82482V7.10194H5.77778V3.19274L1.77778 3.82482ZM16 14.5613L15.9922 14.7158C15.9757 14.8701 15.9342 15.021 15.8698 15.1626C15.7839 15.3513 15.6587 15.5192 15.5026 15.6543C15.3465 15.7893 15.163 15.8891 14.9653 15.9457C14.8172 15.9881 14.6635 16.0057 14.5104 15.9984L14.3576 15.9826L1.20226 13.9029H1.20139C0.866967 13.8497 0.562229 13.6775 0.342014 13.4174C0.12289 13.1585 0.000460819 12.829 2.05504e-09 12.4851V3.51756C-1.82016e-05 3.17481 0.120901 2.84313 0.341146 2.58261L0.427951 2.48956C0.638494 2.28127 0.908379 2.14283 1.20139 2.09627H1.20226L14.3576 0.0174492L14.5104 0.00164731C14.6126 -0.00325443 14.7151 0.00275196 14.816 0.0200828L14.9653 0.0543201L15.1111 0.104359C15.2058 0.143095 15.2959 0.192656 15.3802 0.250965L15.5026 0.345776L15.6137 0.452878C15.6837 0.528141 15.7453 0.610918 15.7977 0.699562L15.8698 0.836511L15.9262 0.981362C15.9749 1.12848 16.0001 1.2829 16 1.43874V14.5613Z" fill="#ffffff" />
        </svg>`,

        download: `<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v4h16v-4"/></svg>`,

        link: `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1"/></svg>`,

        check: `<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`,

        googleplay: `<svg viewBox="0 0 24 24"><path d="M3 2l18 10-18 10z"/></svg>`,

        appstore: `<svg viewBox="0 0 24 24"><path d="M6 2h12l4 20H2z"/></svg>`
    },
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
                            title: { en: 'Install app', ru: 'Установка приложения' },
                            description: {
                                en: 'Download Streisand from the App Store',
                                ru: 'Скачайте приложение Streisand из App Store'
                            },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'appstore',
                                    link: 'https://apps.apple.com/app/streisand/id6450534064',
                                    text: { en: 'App Store', ru: 'App Store' }
                                }
                            ]
                        },
                        {
                            svgIconKey: 'link',
                            title: { en: 'Add subscription', ru: 'Добавление подписки' },
                            description: {
                                en: 'Press the button below — the app will open and add the subscription automatically.',
                                ru: 'Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.'
                            },
                            buttons: [
                                {
                                    type: 'subscriptionLink' as const,
                                    svgIconKey: 'link',
                                    link: 'streisand://import/{{subscriptionUrl}}',
                                    text: { en: 'Add subscription', ru: 'Добавить подписку' }
                                }
                            ]
                        },
                        {
                            svgIconKey: 'check',
                            title: { en: 'Connect and use', ru: 'Подключение и использование' },
                            description: {
                                en: "In the main section, press the big connect button. Don't forget to select a server from the list if needed.",
                                ru: 'В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой сервер из списка серверов.'
                            },
                            buttons: []
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
                            title: { en: 'Install app', ru: 'Установка приложения' },
                            description: {
                                en: 'Download V2RayNG from Google Play',
                                ru: 'Скачайте приложение V2RayNG из Google Play'
                            },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'googleplay',
                                    link: 'https://play.google.com/store/apps/details?id=com.v2ray.ang',
                                    text: { en: 'Google Play', ru: 'Google Play' }
                                }
                            ]
                        },
                        {
                            svgIconKey: 'link',
                            title: { en: 'Add subscription', ru: 'Добавление подписки' },
                            description: {
                                en: 'Press the button below — the app will open and add the subscription automatically.',
                                ru: 'Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.'
                            },
                            buttons: [
                                {
                                    type: 'subscriptionLink' as const,
                                    svgIconKey: 'link',
                                    link: 'v2rayng://install-sub/url={{subscriptionUrl}}',
                                    text: { en: 'Add subscription', ru: 'Добавить подписку' }
                                }
                            ]
                        },
                        {
                            svgIconKey: 'check',
                            title: { en: 'Connect and use', ru: 'Подключение и использование' },
                            description: {
                                en: "In the main section, press the big connect button. Don't forget to select a server from the list if needed.",
                                ru: 'В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой сервер из списка серверов.'
                            },
                            buttons: []
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
                    name: 'Happ',
                    svgIconKey: 'happ',
                    featured: true,
                    blocks: [
                        {
                            svgIconKey: 'download',
                            title: { en: 'Install app', ru: 'Установка приложения' },
                            description: {
                                en: 'Download the .exe installer via direct link',
                                ru: 'Загрузите установщик приложения .exe по прямой ссылке'
                            },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'download',
                                    link: 'https://github.com/hiddify/hiddify-next/releases/latest',
                                    text: { en: 'Download app', ru: 'Скачать приложение' }
                                }
                            ]
                        },
                        {
                            svgIconKey: 'link',
                            title: { en: 'Add subscription', ru: 'Добавление подписки' },
                            description: {
                                en: 'Press the button below — the app will open and add the subscription automatically.',
                                ru: 'Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.'
                            },
                            buttons: [
                                {
                                    type: 'subscriptionLink' as const,
                                    svgIconKey: 'link',
                                    link: 'hiddify://install-sub/url={{subscriptionUrl}}',
                                    text: { en: 'Add subscription', ru: 'Добавить подписку' }
                                }
                            ]
                        },
                        {
                            svgIconKey: 'check',
                            title: { en: 'Connect and use', ru: 'Подключение и использование' },
                            description: {
                                en: "In the main section, press the big connect button. Don't forget to select a server from the list if needed.",
                                ru: 'В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой сервер из списка серверов.'
                            },
                            buttons: []
                        }
                    ]
                },
                {
                    name: 'V2RayTun',
                    svgIconKey: 'v2raytun',
                    featured: false,
                    blocks: [
                        {
                            svgIconKey: 'download',
                            title: { en: 'Install app', ru: 'Установка приложения' },
                            description: {
                                en: 'Download the .exe installer via direct link',
                                ru: 'Загрузите установщик приложения .exe по прямой ссылке'
                            },
                            buttons: [
                                {
                                    type: 'external' as const,
                                    svgIconKey: 'download',
                                    link: 'https://github.com/hiddify/hiddify-next/releases/latest',
                                    text: { en: 'Download app', ru: 'Скачать приложение' }
                                }
                            ]
                        },
                        {
                            svgIconKey: 'link',
                            title: { en: 'Add subscription', ru: 'Добавление подписки' },
                            description: {
                                en: 'Press the button below — the app will open and add the subscription automatically.',
                                ru: 'Нажмите кнопку ниже — приложение откроется, и подписка добавится автоматически.'
                            },
                            buttons: [
                                {
                                    type: 'subscriptionLink' as const,
                                    svgIconKey: 'link',
                                    link: 'v2raytun://install-sub/url={{subscriptionUrl}}',
                                    text: { en: 'Add subscription', ru: 'Добавить подписку' }
                                }
                            ]
                        },
                        {
                            title: { en: 'Connect and use', ru: 'Подключение и использование' },
                            description: {
                                en: "In the main section, press the big connect button. Don't forget to select a server from the list if needed.",
                                ru: 'В главном разделе нажмите большую кнопку включения в центре для подключения к VPN. Не забудьте выбрать сервер в списке серверов. При необходимости выберите другой сервер из списка серверов.'
                            },
                            buttons: []
                        }
                    ]
                }
            ]
        }
    }
} as unknown as TSubscriptionPageRawConfig

export function RootLayout() {
    const subscriptionActions = useSubscriptionInfoStoreActions()
    const configActions = useAppConfigStoreActions()
    const { subscription } = useSubscriptionInfoStoreInfo()
    const isConfigLoaded = useIsConfigLoaded()

    useLayoutEffect(() => {
        // Always use mocked data to ensure the page works on GitHub Pages
        // and to avoid infinite preloader when no server is available.
        subscriptionActions.setSubscriptionInfo({ subscription: MOCK_SUBSCRIPTION })
        configActions.setConfig(MOCK_CONFIG)
    }, [])

    if (!isConfigLoaded || !subscription) {
        return (
            <div className={classes.root}>
                <div className="animated-background"></div>
                <div className={classes.content}>
                    <main className={classes.main}>
                        <LoadingScreen height="100vh" />
                    </main>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <div className="animated-background"></div>
            <div className={classes.content}>
                <main className={classes.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
