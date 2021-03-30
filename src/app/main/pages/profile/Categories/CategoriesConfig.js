import React from 'react';

export const CategoriesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/categories',
            component: React.lazy(() => import('./Categories'))
        }
    ]
}