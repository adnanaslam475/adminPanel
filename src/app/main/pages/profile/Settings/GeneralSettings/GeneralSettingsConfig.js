import React from "react";

export const GeneralSettingsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/settings/general_settings",
      component: React.lazy(() => import("./GeneralSettings"))
    },
  ],
};