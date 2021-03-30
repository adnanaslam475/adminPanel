import React from 'react';

export const CoursePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/academics/courses',
            component: React.lazy(() => import('./Courses'))
        }
    ]
};