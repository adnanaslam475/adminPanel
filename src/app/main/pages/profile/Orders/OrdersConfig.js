import React from 'react';

export const OrdersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/orders',
            component: React.lazy(() => import('./Orders'))
        }
    ]
};
