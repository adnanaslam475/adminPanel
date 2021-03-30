import React from "react";

export const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/dashboard",
      component: React.lazy(() => import("./Dashboard")),
    },
  ],
};
