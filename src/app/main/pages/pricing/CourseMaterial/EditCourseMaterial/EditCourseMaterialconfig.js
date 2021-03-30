import React from 'react';

export const EditCourseMaterialConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/academics/course_material_edit/:id',
            component: React.lazy(() => import('./EditCourseMaterial'))
        }
    ]
};  