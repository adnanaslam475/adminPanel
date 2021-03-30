import React from "react";

export const CurrencySettingsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/settings/currency_settings",
      component: React.lazy(() => import("./CurrencySettings"))
    },
  ],
};