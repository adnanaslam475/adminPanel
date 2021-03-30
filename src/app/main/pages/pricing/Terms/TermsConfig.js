import React from 'react';

export const TermsPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path : '/academics/terms',
            component: React.lazy(() => import('./Terms'))
        }
    ]
};
