import React from 'react';

export const Fontsconfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/custom_design/fonts',
            component: React.lazy(() => import('./Fonts'))
        }
    ]
}