import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

import { useCustomerStore } from 'src/stores/customer'

let globalRouter = null;

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
    });

    router.beforeEach(async (to) => {
        const customer = useCustomerStore();
        if (to.meta.requiresAuth) {
            if (to.query?.token) {
                await customer.updateLoginToken(to.query?.token);

                //remove token param if login chekc
                let queryParams = { ...to.query };
                delete queryParams.token;
                router.push({ path: to.path, query: queryParams });
            }

            if (!customer.isLoggedIn) {
                return '/login';
            }
        }
    });

    globalRouter = router;
    return router;
})

export { globalRouter };