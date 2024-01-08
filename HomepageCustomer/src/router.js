import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('./App.vue'),
        props: { showDefaultContent: true }
    },

    {
        path: '/ListApp',
        component: () => import('./ListAppointment.vue'),
        // props: { showDefaultContent: true }

    },
    {
        path: '/Niengrang',
        component: () => import('./NiengRang.vue'),
        // props: { showDefaultContent: true }

    }, 
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
