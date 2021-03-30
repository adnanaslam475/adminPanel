import React from 'react';

export const DepartmentsPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    }, 
    routes  : [
        {
            path : '/academics/departments',
            component: React.lazy(() => import('./Departments'))
        }
    ]
};