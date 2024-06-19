import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import OverviewIndex from "../pages/overview/overviewIndex";
import AlertSystemLayout from "../pages/alertSystem/alertSystemLayout";
import AlertSystemIndex from "../pages/alertSystem/alertSystemIndex";
import AlertSystemDashboard from "../pages/alertSystem/alertSystemDashboard";
import AlertSystemDetail from "../pages/alertSystem/alertSystemDetail";
import AiAnalysisLayout from "../pages/aiAnalysisAssistant/aiAnalysisLayout";
import AiAnalysisIndex from "../pages/aiAnalysisAssistant/aiAnalysisIndex";
import AiAnalysisAssistant from "../pages/aiAnalysisAssistant/aiAnalysisAssistant";
import AiAnalysis from "../pages/transactionsAnalytics/aiAnalysis";
import SinglePrediction from "../pages/transactionsAnalytics/singlePrediction";
import MultiplePrediction from "../pages/transactionsAnalytics/multiplePrediction";
import CustomersAnalyticsIndex from "../pages/customersAnalytics/customersAnalyticsIndex";
import AboutIndex from "../pages/about/aboutIndex";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
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
    path: "/alert-system",
    element: <AlertSystemLayout />,
    state: "alert-system",
    sidebarProps: {
      displayText: "Alert System",
      icon: <WarningAmberIcon />,
    },
    child: [
      {
        index: true,
        element: <AlertSystemIndex />,
        state: "alert-system.index"
      },
      {
        path: "/alert-system/dashboard",
        element: <AlertSystemDashboard />,
        state: "alert-system.dashboard",
        sidebarProps: {
          displayText: "Dashboard"
        }
      },
      {
        path: "/alert-system/detail",
        element: <AlertSystemDetail />,
        state: "alert-system.detail",
        sidebarProps: {
          displayText: "Detail"
        }
      },
    ],
  },
  {
    path: "/transactions-analysis",
    element: <MultiplePrediction />,
    state: "transactions-analysis",
    sidebarProps: {
      displayText: "Transactions Analysis",
      icon: <LocalAtmIcon />,
    },
  },
  {
    path: "/ai-assistant",
    element: <AiAnalysisLayout />,
    state: "ai-assistant",
    sidebarProps: {
      displayText: "AI Assistant",
      icon: <AssistantOutlinedIcon />,
    },
    child: [
      {
        index: true,
        element: <AiAnalysisIndex />,
        state: "ai-assistant.index"
      },
      {
        path: "/ai-assistant",
        element: <AiAnalysisIndex />,
        state: "ai-assistant.index",
        sidebarProps: {
          displayText: "Index"
        }
      },
      {
        path: "/ai-assistant/analysis",
        element: <AiAnalysisAssistant />,
        state: "ai-assistant.analysis",
        sidebarProps: {
          displayText: "AI Assistant Analysis"
        }
      },
    ],
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
];

export default appRoutes;
