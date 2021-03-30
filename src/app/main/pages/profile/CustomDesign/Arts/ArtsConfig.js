import React from 'react';

export const ArtsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/custom_design/arts',
            component: React.lazy(() => import('./Arts'))
        }
    ]
}