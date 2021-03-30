import React from "react";

export const MetaCategoriesConfig = {
  settings: {
    layout: {
      config: {
      },
    },
  },
  routes: [
    {
      path: "/e_commerce/meta_categories",
      component: React.lazy(() => import('./MetaCategories')),
    },
  ],
};
