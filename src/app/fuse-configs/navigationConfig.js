
const navigationConfig = [
  {
    id: "pages",
    // title: "Pages",
    type: "group",
    icon: "pages",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "dashboard",
        url: "/dashboard",
      },
      {
        id: "store",
        title: "Stores",
        type: "collapse",
        icon: "store",
        children: [
          //campus stores
          {
            id: "campus_stores_config",
            title: "Campus Stores",
            type: "collapse",
            icon: "attach_money",
            children: [
              {
                id: "list_campus",
                title: "Campuses",
                type: "item",
                url: "/campus_stores/all",
              },
              {
                id: "create_campus",
                title: "Add Campus",
                type: "item",
                url: "/campus_stores/create",
              }

            ],
          },
          //fund raiser
          {
            id: "fund_raiser",
            title: "Fund Raiser",
            type: "collapse",
            icon: "attach_money",
            children: [
              {
                id: "active_campaigns",
                title: "Active Campaigns",
                type: "item",
                url: "/fund_raiser/active_campaigns",
              },
              {
                id: "disable_campaigns",
                title: "Disable Campaigns",
                type: "item",
                url: "/fund_raiser/disable_campaigns",
              },
            ],
          },

          //academics
          {
            id: "Academics",
            title: "Academics",
            type: "collapse",
            icon: "localbibraryutlined",
            children: [
              {
                id: "Courses",
                title: "Courses",
                type: "item",
                url: "/academics/courses",
              },
              {
                id: "Section",
                title: "Section",
                type: "item",
                url: "/academics/sections",
              },
              {
                id: "Course_material",
                title: "Course Material",
                type: "item",
                url: "/academics/course_material",
              },
              {
                id: "Departments",
                title: "Departments",
                type: "item",
                url: "/academics/departments",
              },
              {
                id: "Terms",
                title: "Terms",
                type: "item",
                url: "/academics/terms",
              },
            ],
          },

          //custom design
          {
            id: "custom_design",
            title: "Custom Design",
            type: "collapse",
            icon: "attach_money",
            children: [
              {
                id: "Arts",
                title: "Arts",
                type: "item",
                url: "/custom_design/arts",
              },
              {
                id: "Fonts",
                title: "Fonts",
                type: "item",
                url: "/custom_design/fonts",
              },
              {
                id: "Colors",
                title: "Colors",
                type: "item",
                url: "/custom_design/colors",
              },
            ],
          },
          //customers
          {
            id: "customers",
            title: "Customers",
            type: "collapse",
            icon: "person_outline_outlined",
            children: [
              {
                id: "customers_import",
                title: "Customers Import",
                type: "item",
                url: "/customers/customers_import",
              },
            ]
          },

          // CONFIGURATION
          {
            id: "configuration",
            title: "Configuration",
            type: "collapse",
            icon: "configuration",
            children: [
              {
                id: "Modules",
                title: "Modules",
                type: "item",
                url: "/configuration/modules",
              },
              {
                id: "Product_Settings",
                title: "Product Settings",
                type: "item",
                url: "/configuration/product_settings",
              },
              {
                id: "Custom_Design_Settings",
                title: "Custom Design Settings",
                type: "item",
                url: "/configuration/Custom_design_settings",
              },
              {
                id: "CMS",
                title: "Product Settings",
                type: "item",
                url: "/configuration/cms",
              },
              {
                id: "social_media_settings",
                title: "Social Media Settings",
                type: "item",
                url: "/configuration/social_media_settings",
              },
              {
                id: "commission_criteria",
                title: "Commission Criteria",
                type: "item",
                url: "/configuration/commission_criteria",
              },
            ],
          },
          //products
          {
            id: "products",
            title: "Products",
            type: "item",
            icon: "help",
            url: "/products",
          },
          //orders
          {
            id: "orders",
            title: "Orders",
            type: "item",
            icon: "import_contacts",
            url: "/orders",
          },
          //categories
          {
            id: "Categories",
            title: "Categories",
            type: "item",
            icon: "import_contacts",
            url: "/categories",
          },
          //newsletter
          {
            id: "news_letter",
            title: "News Letter",
            type: "item",
            icon: "mailoutlineoutlined",
            url: "/news_letter",
          },
          {
            id: "reports",
            title: "Reports",
            type: "item",
            icon: "import_contacts",
            url: "/reports",
          },
        ],
      },

      // e commerce
      {
        id: "e_commerce",
        title: "E-Commerce",
        type: "collapse",
        icon: "import_contacts",
        children: [
          {
            id: "meta_categories_list",
            title: "Meta Categories",
            type: "item",
            url: "/e_commerce/meta_categories",
          },
          {
            id: "meta_products_list",
            title: "Meta Products",
            type: "item",
            url: "/e_commerce/meta_products",
          },

          {
            id: "meta_custom_design",
            title: "Meta Custom Designs",
            type: "item",
            url: "/e_commerce/meta_custom_design",
          },
        ],
      },
      //blog
      {
        id: "blog",
        title: "Blog",
        type: "collapse",
        icon: "import_contacts",
        children: [
          {
            id: "create_article",
            title: "Create Article",
            type: "item",
            url: "/blog/create_article",
          },
          {
            id: "list_article",
            title: "Articles",
            type: "item",
            url: "/blog/list_articles",
          },
        ],
      },



      //settings
      {
        id: "settings",
        title: "Settings",
        type: "collapse",
        icon: "import_contacts",
        children: [
          {
            id: "general_settings",
            title: "General Settings",
            type: "item",
            url: "/settings/general_settings",
          },
          {
            id: "settings_configuration",
            title: "Configuration",
            type: "item",
            url: "/settings/settings_configuration",
          },
          {
            id: "currency_settings",
            title: "Currency Settings",
            type: "item",
            url: "/settings/currency_settings",
          },
          {
            id: "settings_cms",
            title: "CMS",
            type: "item",
            url: "/settings/CMS",
          },
          {
            id: "general_comission_criteria",
            title: "General Commision",
            type: "item",
            url: "/settings/general_commision_criteria",
          },
        ],
      },
      {
        id: "logout",
        title: "Logout",
        type: "item",
        url: "/settings/logout",
      },
    ],
  },
];

export default navigationConfig;
