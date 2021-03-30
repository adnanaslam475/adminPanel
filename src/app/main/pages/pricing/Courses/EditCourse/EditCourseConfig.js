import React from 'react';

export const EditCourseConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/academics/courses_edit/:id',
            component: React.lazy(() => import('./EditCourse'))
        }
    ]
};