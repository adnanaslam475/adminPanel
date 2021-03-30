import React from "react";

export const MetaCustomDesignsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/e_commerce/meta_custom_design",
      component: React.lazy(() => import("./MetaCustomDesigns")),
    },
  ],
};
