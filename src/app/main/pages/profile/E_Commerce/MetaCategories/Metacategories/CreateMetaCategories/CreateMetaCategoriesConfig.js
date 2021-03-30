import React from "react";

export const CreateMetaCategoriesConfig = {

  settings: {
    layout: {
      config: {
      },
    },
  },
  routes: [
    {
      path: "/e_commerce/meta_categories_create",
      component: React.lazy(() => import('./CreateMetaCategories'))
    },
  ],
};