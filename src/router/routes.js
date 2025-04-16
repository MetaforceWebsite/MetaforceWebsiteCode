
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/Home.vue') },
            { path: 'pricing', component: () => import('src/pages/PricingList.vue') },
            { path: 'privacy', component: () => import('src/pages/PrivacyPolicy.vue') }
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
