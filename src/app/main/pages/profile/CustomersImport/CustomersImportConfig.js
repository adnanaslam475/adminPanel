import React from "react";

export const CustomersImportConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/customers/customers_import",
      component: React.lazy(() => import("../CustomersImport/CustomersImport")),
    },
  ],
};
