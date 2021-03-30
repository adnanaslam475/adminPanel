import { Error404PageConfig } from "./errors/404/Error404PageConfig";
import { Error500PageConfig } from "./errors/500/Error500PageConfig";

import { CoursePageConfig } from "./pricing/Courses/CoursePageConfig";
import { CreateCourseConfig } from "./pricing/Courses/CreateCourse/CreateCourseConfig";
import { EditCourseConfig } from "./pricing/Courses/EditCourse/EditCourseConfig";

import { CourseMaterialConfig } from "./pricing/CourseMaterial/CourseMaterialConfig";
import { CreateCourseMaterialConfig } from "./pricing/CourseMaterial/CourseMaterialCreate/CourseMaterialCreateConfig";
import { EditCourseMaterialConfig } from "./pricing/CourseMaterial/EditCourseMaterial/EditCourseMaterialconfig";


import { sectionspageConfig } from "./pricing/Sections/sectionsConfig";
import { CreateSectionsConfig } from "./pricing/Sections/CreateSections/CreateSectionsConfig";
import { EditSectionsConfig } from "./pricing/Sections/EditSections/EditSectionConfig";


import { DepartmentsPageConfig } from "./pricing/Departments/DepartmentsConfig";
import { CreateDepartmentsConfig } from './pricing/Departments/CreateDepartment/CreateDepartmentconfig';
import { EditDepartmentsConfig } from './pricing/Departments/EditDepartment/EditDepartmentConfig';

import { TermsPageConfig } from "./pricing/Terms/TermsConfig";
import { CreateTermsConfig } from "./pricing/Terms/CreateTerms/CreateTermsconfig";
import { EditTermsConfig } from "./pricing/Terms/EditTerms/EditTermsConfig";

import { DashboardConfig } from "./profile/Dashboard/DashboardConfig";
import { CampusStoreConfig } from "./profile/Campus_Stores/CampusStoreConfig";
import { CreateCampusConfig } from "./profile/Campus_Stores/CreateCampusStore/Createcampusconfig";
import { EditCampusStoreConfig } from "./profile/Campus_Stores/EditCampusStore/EditCampusStoreConfig";

// import { ProductsConfig } from "./profile/Products/ProductsConfig";
// import { CategoriesConfig } from "./profile/Categories/CategoriesConfig";

import { MetaCategoriesConfig } from "./profile/E_Commerce/MetaCategories/Metacategories/MetaCategoriesList/MetaCategoriesConfig";
import { CreateMetaCategoriesConfig } from '../pages/profile/E_Commerce/MetaCategories/Metacategories/CreateMetaCategories/CreateMetaCategoriesConfig'
import { EditMetaCategoriesConfig } from '../pages/profile/E_Commerce/MetaCategories/Metacategories/EditMetaCategories/EditMetacategoriesConfig'
import { NewsLetterConfig } from "./profile/NewsLetter/NewsLetterConfig";
import { ReportsConfig } from "./profile/Reports/ReportsConfig";

import { ArtsConfig } from "./profile/CustomDesign/Arts/ArtsConfig";
import { Fontsconfig } from "./profile/CustomDesign/Fonts/Fontsconfig";
import { ColorsConfig } from "./profile/CustomDesign/Colors/Colorsconfigs";

import { MetaProductsConfig } from "./profile/E_Commerce/MetaProducts/Metaproducts/MetaProductsList/MetaProductsConfig";
import { CreateMetaProductsConfig } from "./profile/E_Commerce/MetaProducts/Metaproducts/CreateMetaProducts/CreateMetaProductsConfig";
import { EditMetaProductsConfig } from "./profile/E_Commerce/MetaProducts/Metaproducts/EditMetaProducts/EditMetaProductsConfig";

import { MetaCustomDesignsConfig } from "./profile/E_Commerce/MetaCustomDesigns/MetaCustomDesignsConfig";

import { CreateBlogConfig } from "./profile/Blog/CreateBlogsConfig";
import { ArticlesListConfig } from "./profile/Blog/ArticlesList/ArticlesListConfig";

import { ConfigurationConfig } from "./profile/Settings/Configuration/ConfigurationConfig";
import { CurrencySettingsConfig } from "./profile/Settings/CurrencySettings/CurrencySettingsConfig";
import { GeneralSettingsConfig } from "./profile/Settings/GeneralSettings/GeneralSettingsConfig";
import { CMSConfig } from "./profile/Settings/CMS/CMSconfig";
import { GeneralCommisionCriteriaConfig } from "./profile/Settings/GeneralCommisionCriteria/GeneralCommisionCriteriaConfig";

import { CustomersImportConfig } from "./profile/CustomersImport/CustomersImportConfig";
import { EventsConfig } from "./profile/Events/Eventsconfig";
import { UsersConfig } from "./profile/Users/Usersconfig";
import { FundRaiserConfig } from "./profile/FundRaisers/FundRaiserConfig";
import { OrdersConfig } from "./profile/Orders/OrdersConfig";

export const pagesConfigs = [
  CoursePageConfig,
  CreateCourseConfig,
  EditCourseConfig,

  CourseMaterialConfig,
  CreateCourseMaterialConfig,
  EditCourseMaterialConfig,

  DepartmentsPageConfig,
  CreateDepartmentsConfig,
  EditDepartmentsConfig,

  sectionspageConfig,
  CreateSectionsConfig,
  EditSectionsConfig,

  TermsPageConfig,
  CreateTermsConfig,
  EditTermsConfig,
  DashboardConfig,
  Error404PageConfig,
  Error500PageConfig,
  CustomersImportConfig,

  ArtsConfig,
  Fontsconfig,
  ColorsConfig,

  //meta products
  MetaProductsConfig,
  CreateMetaProductsConfig,
  EditMetaProductsConfig,

  //meta categories
  CreateMetaCategoriesConfig,
  EditMetaCategoriesConfig,
  MetaCategoriesConfig,

  MetaCustomDesignsConfig,
  CreateBlogConfig,
  ArticlesListConfig,

  GeneralSettingsConfig,
  CurrencySettingsConfig,
  ConfigurationConfig,
  CMSConfig,
  GeneralCommisionCriteriaConfig,

  CampusStoreConfig,
  CreateCampusConfig,
  EditCampusStoreConfig,

  // ProductsConfig,
  // CategoriesConfig,
  NewsLetterConfig,
  ReportsConfig,
  EventsConfig,
  UsersConfig,
  OrdersConfig,
  FundRaiserConfig,
];
