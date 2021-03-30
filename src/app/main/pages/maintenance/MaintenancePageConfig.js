import React,{lazy} from 'react';

export const MaintenancePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/maintenance',
            component: lazy(() => import('./MaintenancePage'))
        }
    ]
};