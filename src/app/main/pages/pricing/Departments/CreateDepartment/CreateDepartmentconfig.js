import React from 'react';

export const CreateDepartmentsConfig = {
    settings: {
        layout: {
            config: {}
        }
    }, 
    routes  : [
        {
            path : '/academics/departments_create',
            component: React.lazy(() => import('./CreateDepartment'))
        }
    ]
};