import React from 'react';

export const EditTermsConfig = {
    settings: {
        layout: {
            config: {}
        }
    }, 
    routes  : [
        {
            path : '/academics/terms_edit/:id',
            component: React.lazy(() => import('./EditTerms'))
        }
    ]
};