import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'

import { PlansPageConnector } from '@pages/subscription-renew/ui/connectors/plans.page.connector'
import { ErrorPageComponent } from '@pages/errors/5xx-error/server-error.component'
import { MainPageConnector } from '@pages/main/ui/connectors/main.page.connector'
import { PayPageConnector } from '@pages/pay/ui/connectors/pay.page.connector'
import { ErrorBoundaryHoc } from '@shared/hocs/error-boundary'

import { RootLayout } from '../layouts/root/root.layout'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<ErrorBoundaryHoc fallback={<ErrorPageComponent />} />}>
            <Route element={<RootLayout />} path="*">
                <Route element={<MainPageConnector />} path="*" />
                <Route element={<PlansPageConnector />} path="renew" />
                <Route element={<PayPageConnector />} path="pay" />
            </Route>
        </Route>
    )
)

export function Router() {
    return <RouterProvider router={router} />
}

// Не знаю как комментировать, просто подключил новые страницы в роутер: renew и pay
