import React from "react";

export const CreateMetaProductsConfig = {
  settings: {
    layout: {
      config: {
      },
    },
  },
  routes: [
    {
      path: '/e_commerce/meta_products_create',
      component: React.lazy(() => import("./CreateMetaProducts"))
    },
  ],
};









