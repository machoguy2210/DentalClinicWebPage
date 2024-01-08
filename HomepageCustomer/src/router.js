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
    {
        path: '/Rangthammi',
        component: () => import('./RangThamMi.vue'),
        // props: { showDefaultContent: true }

    },
    {
        path: '/Rangtreem',
        component: () => import('./RangTreEm.vue'),
        // props: { showDefaultContent: true }

    },
    {
        path: '/Banggia',
        component: () => import('./Banggia.vue'),
        // props: { showDefaultContent: true }

    },
    {
        path: '/MyReview',
        component: () => import('./MyReview.vue'),
        // props: { showDefaultContent: true }
    },
    {
        path: '/CreateReview',
        component: () => import('./CreateReview.vue'),
        // props: { showDefaultContent: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
