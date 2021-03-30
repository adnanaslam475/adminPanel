import React from "react";

export const CMSConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/settings/CMS",
      component: React.lazy(() => import('./CMS'))
    },
  ],
};