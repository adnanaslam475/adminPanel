import React from 'react';

export const ClassicSearchPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/search/classic',
            component: React.lazy(() => import('./ClassicSearchPage'))
        }
    ]
};
