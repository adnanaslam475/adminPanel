import React from "react";

export const UsersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/users",
      component: React.lazy(() => import("./Users")),
    },
  ],
};