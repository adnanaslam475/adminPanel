import React from 'react';

export const CreateCampusConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/campus_stores/create',
            component: React.lazy(() => import('./CreateCampus'))
        },
    ]
};