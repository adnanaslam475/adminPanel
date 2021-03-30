import React from 'react';

export const EditDepartmentsConfig = {
    settings: {
        layout: {
            config: {}
        }
    }, 
    routes  : [
        {
            path : '/academics/departments_edit/:id',
            component: React.lazy(() => import('./EditDepartment'))
        }
    ]
};