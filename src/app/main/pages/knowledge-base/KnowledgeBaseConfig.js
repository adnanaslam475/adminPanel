import React from 'react';

export const KnowledgeBasePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/categories',
            component: React.lazy(() => import('./KnowledgeBasePage'))
        }
    ]
};
