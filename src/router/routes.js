
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/Home.vue') },
            { path: 'customer/:token?', component: () => import('src/pages/CustomerDetail.vue'), meta: { requiresAuth: true } },
            { path: 'guide', component: () => import('src/pages/UserGuide.vue') },
            { path: 'pricing/:token?', component: () => import('src/pages/PricingList.vue') },
            { path: 'privacy', component: () => import('src/pages/PrivacyPolicy.vue') },
            { path: 'terms', component: () => import('src/pages/TermOfUse.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        redirect: '/'
    }
]

export default routes
