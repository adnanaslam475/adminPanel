import React from 'react';

export const ColorsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/custom_design/colors',
            component: React.lazy(() => import('./Colors'))
        }
    ]
}