export default [
    {
        path: '/calc-3/s9-7',
        name: 'calc-3_s9-7',
        component: () => import('./S9_7.vue'),
        children: [
            {
                path: '/calc-3/s9-7/1',
                component: () => import('../../../components/calc-3/s9-7/S9_7_1.vue')
            },
            {
                path: '/calc-3/s9-7/2',
                component: () => import('../../../components/calc-3/s9-7/S9_7_2.vue')
            },
            {
                path: '/calc-3/s9-7/3',
                component: () => import('../../../components/calc-3/s9-7/S9_7_3.vue')
            },
        ]
    },
]