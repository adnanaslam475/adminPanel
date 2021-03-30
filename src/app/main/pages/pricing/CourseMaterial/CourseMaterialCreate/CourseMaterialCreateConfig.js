import React from 'react';

export const CreateCourseMaterialConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/academics/courses_material_create',
            component: React.lazy(() => import('./CourseMaterialCreate'))
        }
    ]
};