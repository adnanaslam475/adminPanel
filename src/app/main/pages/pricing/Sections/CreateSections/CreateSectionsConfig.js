import React from 'react';

export const CreateSectionsConfig = {
    settings: {
        layout: {
            config: {}
        }
    }, 
    routes  : [
        {
            path : '/academics/sections_create',
            component: React.lazy(() => import('./CreateSections'))
        }
    ]
};