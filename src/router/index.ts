import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import Calendar from '@/views/activites/CalendarView.vue'
import UsersView from '@/views/users/UsersView.vue'
import UserFormView from '@/views/users/UserFormView.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import NotAvailableView from '@/views/NotAvailableView.vue'

import { useAppStore } from "@/stores/app"
import ContactsViewVue from '@/views/contacts/ContactsView.vue'
import ContactFormView from '@/views/contacts/ContactFormView.vue'
import PipelineKanbanView from '@/views/sales/pipelineKanbanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BlankLayout,
      children: [
        {path: '', component: LoginView}
      ]
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'dashboard', component: DashboardView },
      ],
      meta: { requiresAuth: true }
    },

    /*
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'customers', component: () => CustomersView },
      ],
      meta: { requiresAuth: true }
    },
    */
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/admin/users', component: UsersView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/admin/users/userDetail',name: 'userDetail', component: UserFormView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/admin/companies',name: 'Companies', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
 {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/admin/roles',name: 'Roles', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
    /*
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'scheduler',name: 'Scheduler', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
    */
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/contacts/customers',name: 'Customers', component: ContactsViewVue },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/contacts/contactDetail',name: 'contactDetail', component: ContactFormView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/contacts/prospects',name: 'Prospects', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/contacts/leads',name: 'Leads', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/activities/calendar',name: 'Calendar', component: Calendar },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/activities/tasks',name: 'Tasks', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '/sales/pipeline',name: 'Pipeline', component: PipelineKanbanView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'reports',name: 'Reports', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'tickets',name: 'Tickets', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: 'chronology',name: 'Chronology', component: NotAvailableView },
      ],
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to,from,next) => {
  //const authStore = useAuthStore();
  const appStore = useAppStore();

  appStore.checkIfSessionIsValid(); // Controlla se la sessione è valida ogni volta che l'utente si sposta nell'applicazione
  const isAuthenticated = appStore.isUserAutheticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/') // redirige alla pagina di login
  } else {
    appStore.renewCurrentSession(); // Se l'utente è autenticato prima di redirigere l'utente su un altra pagina aggiorna la sessione per continuarla a renderla valida
    next() // Se l'utente è autenticato allora prosegue con la navigazione
  }
})

export default router
