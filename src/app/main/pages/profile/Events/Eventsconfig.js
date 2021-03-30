import React from "react";

export const EventsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/events",
      component: React.lazy(() => import("./Events")),
    },
  ],
};