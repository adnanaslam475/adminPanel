import React from 'react';

export const CampusStoreConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/campus_stores/all',
            component: React.lazy(() => import('./CampusStores'))
        },
       
    ]
};