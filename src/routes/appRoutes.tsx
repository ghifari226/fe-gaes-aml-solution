import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import OverviewIndex from "../pages/overview/overviewIndex";
import TransactionsAnalyticsLayout from "../pages/transactionsAnalytics/transactionsAnalyticsLayout";
import TransactionsAnalyticsIndex from "../pages/transactionsAnalytics/transactionsAnalyticsIndex";
import AiAnalysis from "../pages/transactionsAnalytics/aiAnalysis";
import SinglePrediction from "../pages/transactionsAnalytics/singlePrediction";
import MultiplePrediction from "../pages/transactionsAnalytics/multiplePrediction";
import PeopleAnalyticsIndex from "../pages/peopleAnalytics/peopleAnalyticsIndex";
import AboutIndex from "../pages/about/aboutIndex";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
import InstallationPage from "../pages/installation/InstallationPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";

const appRoutes: RouteType[] = [
  {
    path: "/",
    element: <OverviewIndex />,
    state: "overview",
    sidebarProps: {
      displayText: "Overview",
      icon: <DashboardOutlinedIcon />,
    },
  },
  {
    path: "/transactions-analytics",
    element: <TransactionsAnalyticsLayout />,
    state: "transactions-analytics",
    sidebarProps: {
      displayText: "Transactions analytics",
      icon: <LocalAtmIcon />,
    },
    child: [
      {
        index: true,
        element: <TransactionsAnalyticsIndex />,
        state: "transactions-analytics.index"
      },
      {
        path: "/transactions-analytics/ai-analysis",
        element: <AiAnalysis />,
        state: "transactions-analytics.ai-analysis",
        sidebarProps: {
          displayText: "AI Analysis"
        },
      },
      {
        path: "/transactions-analytics/single-prediction",
        element: <SinglePrediction />,
        state: "transactions-analytics.single-prediction",
        sidebarProps: {
          displayText: "Single Prediction"
        }
      },
      {
        path: "/transactions-analytics/multiple-prediction",
        element: <MultiplePrediction />,
        state: "transactions-analytics.multiple-prediction",
        sidebarProps: {
          displayText: "Multiple Prediction"
        }
      }
    ]
  },
  {
    path: "/people-analytics",
    element: <PeopleAnalyticsIndex />,
    state: "people-analytics",
    sidebarProps: {
      displayText: "People analytics",
      icon: <PeopleOutlineIcon />,
    },
  },
  {
    path: "/about",
    element: <AboutIndex />,
    state: "about",
    sidebarProps: {
      displayText: "About",
      icon: <InfoOutlinedIcon />,
    },
  },

  // {
  //   index: true,
  //   element: <HomePage />,
  //   state: "home"
  // },
  // {
  //   path: "/installation",
  //   element: <InstallationPage />,
  //   state: "installation",
  //   sidebarProps: {
  //     displayText: "Installation",
  //     icon: <FileDownloadOutlinedIcon />
  //   }
  // },
  // {
  //   path: "/dashboard",
  //   element: <DashboardPageLayout />,
  //   state: "dashboard",
  //   sidebarProps: {
  //     displayText: "Dashboard",
  //     icon: <DashboardOutlinedIcon />
  //   },
  //   child: [
  //     {
  //       index: true,
  //       element: <DashboardIndex />,
  //       state: "dashboard.index"
  //     },
  //     {
  //       path: "/dashboard/default",
  //       element: <DefaultPage />,
  //       state: "dashboard.default",
  //       sidebarProps: {
  //         displayText: "Default"
  //       },
  //     },
  //     {
  //       path: "/dashboard/analytics",
  //       element: <AnalyticsPage />,
  //       state: "dashboard.analytics",
  //       sidebarProps: {
  //         displayText: "Analytic"
  //       }
  //     },
  //     {
  //       path: "/dashboard/saas",
  //       element: <SaasPage />,
  //       state: "dashboard.saas",
  //       sidebarProps: {
  //         displayText: "Saas"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/component",
  //   element: <ComponentPageLayout />,
  //   state: "component",
  //   sidebarProps: {
  //     displayText: "Components",
  //     icon: <AppsOutlinedIcon />
  //   },
  //   child: [
  //     {
  //       path: "/component/alert",
  //       element: <AlertPage />,
  //       state: "component.alert",
  //       sidebarProps: {
  //         displayText: "Alert"
  //       },
  //     },
  //     {
  //       path: "/component/button",
  //       element: <ButtonPage />,
  //       state: "component.button",
  //       sidebarProps: {
  //         displayText: "Button"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/documentation",
  //   element: <DocumentationPage />,
  //   state: "documentation",
  //   sidebarProps: {
  //     displayText: "Documentation",
  //     icon: <ArticleOutlinedIcon />
  //   }
  // },
  // {
  //   path: "/changelog",
  //   element: <ChangelogPage />,
  //   state: "changelog",
  //   sidebarProps: {
  //     displayText: "Changelog",
  //     icon: <FormatListBulletedOutlinedIcon />
  //   }
  // }
];

export default appRoutes;
