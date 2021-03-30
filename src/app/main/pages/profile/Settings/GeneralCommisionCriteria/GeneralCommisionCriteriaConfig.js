import React from "react";

export const GeneralCommisionCriteriaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/settings/general_commision_criteria",
      component: React.lazy(() => import("./GeneralCommisionCriteria"))
    },
  ],
};