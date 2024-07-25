import { RouteType } from "./config";

// Alert
import AlertLayout from "../pages/alert/alertLayout";
import AlertIndex from "../pages/alert/alertIndex";
import AlertDashboard from "../pages/alert/alertDashboard";
import AlertDetail from "../pages/alert/alertDetail";

// Transaction
import TransactionsAnalysisLayout from "../pages/transactionsAnalysis/transactionsAnalysisLayout";
import TransactionsAnalysisIndex from "../pages/transactionsAnalysis/transactionsAnalysisIndex";
import TransactionFund from "../pages/transactionsAnalysis/transactionFund";
import TransactionLoan from "../pages/transactionsAnalysis/transactionLoan";

// Chat
import ChatAiIndex from "../pages/chatAi/chatAiIndex";
import ChatAiInterface from "../pages/chatAi/chatAiInterface";

import DefaultPage from "../pages/dashboard/DefaultPage";
import OverviewIndex from "../pages/overview/overviewIndex";
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";

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
  // Overview
  {
    path: "/",
    element: <OverviewIndex />,
    state: "overview",
    sidebarProps: {
      displayText: "Beranda",
      icon: <DashboardOutlinedIcon />,
    },
  },

  // Alert
  {
    path: "/alert",
    element: <AlertLayout />,
    state: "alert",
    sidebarProps: {
      displayText: "Alert AML",
      icon: <WarningAmberIcon />,
    },
    child: [
      {
        index: true,
        element: <AlertIndex />,
        state: "alert.index"
      },
      {
        path: "/alert/dashboard",
        element: <AlertDashboard />,
        state: "alert.dashboard",
        sidebarProps: {
          displayText: "Dasbor"
        }
      },
      {
        path: "/alert/detail",
        element: <AlertDetail />,
        state: "alert.detail",
        sidebarProps: {
          displayText: "Detail Peringatan"
        }
      },
    ],
  },

  // Transactions
  {
    path: "/transactions-analysis",
    element: <TransactionsAnalysisLayout />,
    state: "transactions-analysis",
    sidebarProps: {
      displayText: "Analisis Transaksi",
      icon: <LocalAtmIcon />,
    },
    child: [
      {
        index: true,
        element: <TransactionsAnalysisIndex />,
        state: "transactions-analysis.index"
      },
      {
        path: "/transactions-analysis/fund",
        element: <TransactionFund />,
        state: "transaction-analysis.fund",
        sidebarProps: {
          displayText: "Pencucian Uang"
        }
      },
      {
        path: "/transactions-analysis/loan",
        element: <TransactionLoan />,
        state: "transaction-analysis.loan",
        sidebarProps: {
          displayText: "Pinjaman Online"
        }
      },
    ],
  },

  // Chat AI
  {
    path: "/chat",
    element: <ChatAiIndex />,
    state: "chat",
    sidebarProps: {
      displayText: "Asisten AI",
      icon: <AssistantOutlinedIcon />,
    },
  },
  {
    path: "/chat/:id",
    element: <ChatAiInterface />,
    state: "chat",
  },

  {
    path: "/about",
    element: <AboutIndex />,
    state: "about",
    sidebarProps: {
      displayText: "Tentang Kami",
      icon: <InfoOutlinedIcon />,
    },
  },
  {
    path: "/social-network-analysis",
    element: <CustomersAnalyticsIndex />,
    state: "social-network-analysis",
  },
];

export default appRoutes;
