import React from "react";

export const NewsLetterConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/news_letter",
      component: React.lazy(() => import("./NewsLetter")),
    },
  ],
};