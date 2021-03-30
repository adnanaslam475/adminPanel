import React from 'react';

export const EditSectionsConfig = {
    settings: {
        layout: {
            config: {}
        }
    }, 
    routes  : [
        {
            path : '/academics/sections_edit/:id',
            component: React.lazy(() => import('./EditSections'))
        }
    ]
};