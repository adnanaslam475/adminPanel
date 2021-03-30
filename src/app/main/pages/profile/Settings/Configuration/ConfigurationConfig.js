import React from "react";

export const ConfigurationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/settings/configuration",
      component: React.lazy(() => import("./Configuration"))
    },
  ],
};