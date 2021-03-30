import React from 'react';

export const CreateCourseConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/academics/courses_create',
            component: React.lazy(() => import('./CreateCourse'))
        }
    ]
};