import React from 'react';

export const CourseMaterialConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/academics/course_material',
            component: React.lazy(() => import('./CourseMaterial'))
        }
    ]
};