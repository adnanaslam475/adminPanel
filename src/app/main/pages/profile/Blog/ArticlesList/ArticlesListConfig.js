import React from "react";

export const ArticlesListConfig = {
  
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/blog/list_articles",
      component: React.lazy(() => import("./ArticlesList")),
    },
  ],
};
