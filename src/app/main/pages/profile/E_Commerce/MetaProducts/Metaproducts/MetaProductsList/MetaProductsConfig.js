import React from "react";

export const MetaProductsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/e_commerce/meta_products",
      component: React.lazy(() => import("./MetaProducts")),
    },
  ],
};
