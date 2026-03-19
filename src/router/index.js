import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        redirect: '/dashboard/cooperatives',
      },
      {
        path: 'cooperatives',
        name: 'Cooperatives',
        component: () => import('@/pages/CooperativesPage.vue'),
      },
      {
        path: 'cooperatives/create',
        name: 'CreateCooperative',
        component: () => import('@/pages/CooperativeFormPage.vue'),
      },
      {
        path: 'cooperatives/:id',
        name: 'CooperativeDetail',
        component: () => import('@/pages/CooperativeDetailPage.vue'),
      },
      {
        path: 'cooperatives/:id/edit',
        name: 'EditCooperative',
        component: () => import('@/pages/CooperativeFormPage.vue'),
      },
      {
        path: 'farmers/:id',
        name: 'FarmerDetail',
        component: () => import('@/pages/FarmerDetailPage.vue'),
      },
      {
        path: 'farmers/:id/edit',
        name: 'EditFarmer',
        component: () => import('@/pages/FarmerFormPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
