import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import CustomersView from '../views/CustomersView.vue'
import BlankLayout from '../layouts/BlankLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BlankLayout,
      children: [
        {path: '', component: () => LoginView}
      ]
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'dashboard', component: () => DashboardView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'customers', component: () => CustomersView },
      ],
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to,from,next) => {
  //const authStore = useAuthStore();
  const isAuthenticated = true; //authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/') // redirige alla pagina di login
  } else {
    next() // Se l'utente è autenticato allora prosegue con la navigazione
  }
})

export default router
