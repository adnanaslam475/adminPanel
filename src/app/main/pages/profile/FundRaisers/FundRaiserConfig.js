import React from "react";

export const FundRaiserConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/fund_raiser",
      component: React.lazy(() => import("./FundRaisers")),
    },
  ],
};