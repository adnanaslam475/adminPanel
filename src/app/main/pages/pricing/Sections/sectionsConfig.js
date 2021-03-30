import React from 'react';

export const sectionspageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/academics/sections',
            component: React.lazy(() => import('./Sections'))
        }
    ]
};
