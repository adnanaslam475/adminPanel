import React from "react";

export const EditMetaProductsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/e_commerce/meta_products_edit/:id",
      component: React.lazy(() => import("./EditMetaProducts")),
    },
  ],
};
