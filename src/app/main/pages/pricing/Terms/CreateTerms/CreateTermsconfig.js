import React from 'react';

export const CreateTermsConfig = {
    settings: {
        layout: {
            config: {}
        }
    }, 
    routes  : [
        {
            path : '/academics/terms_create',
            component: React.lazy(() => import('./CreateTerms'))
        }
    ]
};