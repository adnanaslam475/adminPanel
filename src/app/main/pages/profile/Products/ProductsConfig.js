import React from 'react';

export const ProductsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/products',
            component: React.lazy(() => import('./Products'))
        }
    ]
};
