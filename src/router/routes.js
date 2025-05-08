
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/Home.vue') },
            { path: 'customer/:token?', component: () => import('src/pages/CustomerDetail.vue') },
            { path: 'guide', component: () => import('src/pages/UserGuide.vue') },
            { path: 'pricing/:token?', component: () => import('src/pages/PricingList.vue') },
            { path: 'privacy', component: () => import('src/pages/PrivacyPolicy.vue') }
        ]
    },
    {
        path: '/appLogin',
        component: () => import("src/pages/AppLogin.vue"),
    },
    {
        path: '/appPricing/:token',
        component: () => import("src/pages/AppPricing.vue"),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        redirect: '/'
    }
]

export default routes
