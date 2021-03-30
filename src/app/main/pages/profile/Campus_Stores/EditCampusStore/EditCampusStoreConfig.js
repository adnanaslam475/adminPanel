import React from 'react';

export const EditCampusStoreConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/campus_stores_edit/:id',
            component: React.lazy(() => import('./EditCampusStore'))
        },
       
    ]
};