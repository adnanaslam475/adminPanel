import React from 'react';

export const CreateBlogConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/blog/create_article',
            component: React.lazy(() => import('./CreateBlog'))
        }
    ]
};