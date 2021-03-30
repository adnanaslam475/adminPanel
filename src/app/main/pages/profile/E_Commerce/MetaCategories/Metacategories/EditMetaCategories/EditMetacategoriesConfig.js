import React from "react";

export const EditMetaCategoriesConfig = {
  settings: {
    layout: {
      config: {
        
      },
    },
  },
  routes: [
    {
      path: "/e_commerce/meta_categories/edit/:id",
      component: React.lazy(() => import('./EditMetacategories')),
    },
  ],
};