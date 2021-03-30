import React from "react";

export const ReportsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/reports",
      component: React.lazy(() => import("./Reports"))
    },
  ],
};