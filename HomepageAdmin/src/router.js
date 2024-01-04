import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./App.vue'),
    props: { showDefaultContent: true }
  },
  {
    path: '/DoctorInfo',
    component: () => import('./DoctorInfo.vue'),
    props: { showDefaultContent: true }
  },
  {
    path: '/Dichvu',
    component: () => import('./Dichvu.vue'),
    props: { showDefaultContent: true }
  },
  {
    path: '/Combo',
    component: () => import('./Combo.vue'),
  },
  {
    path:'/CusManager',
    component:()=> import('./CusManager.vue'),
    props: { showDefaultContent: true }

  },
  {
    path:'/EmManager',
    component:()=> import('./EmManager.vue'),
    props: { showDefaultContent: true }

  },
  {
    path: '/ReviewDoctor',
    component: () => import('./ReviewDoctor.vue'),
  },
  {
    path: '/ReviewService',
    component: () => import('./ReviewService.vue'),
  },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;