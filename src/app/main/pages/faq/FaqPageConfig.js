import React from 'react';

export const FaqPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/products',
            component: React.lazy(() => import('./FaqPage'))
        }
    ]
};
