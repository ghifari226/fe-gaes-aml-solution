import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";

// Transaction
import TransactionFund from "../pages/transactionsAnalysis/transactionFund";
import TransactionLoan from "../pages/transactionsAnalysis/transactionLoan";

// Chat
import ChatAiIndex from "../pages/chatAi/chatAiIndex";
import ChatAiInterface from "../pages/chatAi/chatAiInterface";

import DefaultPage from "../pages/dashboard/DefaultPage";
import OverviewIndex from "../pages/overview/overviewIndex";
import AlertSystemLayout from "../pages/alertSystem/alertSystemLayout";
import AlertSystemIndex from "../pages/alertSystem/alertSystemIndex";
import AlertSystemDashboard from "../pages/alertSystem/alertSystemDashboard";
import AlertSystemDetail from "../pages/alertSystem/alertSystemDetail";
import TransactionsAnalysisLayout from "../pages/transactionsAnalysis/transactionsAnalysisLayout";
import TransactionsAnalysisIndex from "../pages/transactionsAnalysis/transactionsAnalysisIndex";
import TransactionsAnalysis from "../pages/transactionsAnalysis/transactionsAnalysis";
import AiAssistantLayout from "../pages/aiAssistant/aiAssistantLayout";
import AiAssistantIndex from "../pages/aiAssistant/aiAssistantIndex";
import AiAssistantDashboard from "../pages/aiAssistant/aiAssistantDashboard";
import AiAssistantAnalysis from "../pages/aiAssistant/aiAssistantAnalysis";
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
    path: "/alert-system",
    element: <AlertSystemLayout />,
    state: "alert-system",
    sidebarProps: {
      displayText: "Alert AML",
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
          displayText: "Manajemen Peringatan"
        }
      },
      {
        path: "/alert-system/detail",
        element: <AlertSystemDetail />,
        state: "alert-system.detail",
        sidebarProps: {
          displayText: "Rincian"
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
        path: "/transactions-analysis/fund/new",
        element: <TransactionFund />,
        state: "transaction-analysis.fund",
        sidebarProps: {
          displayText: "CUCI UANG BARU"
        }
      },
      {
        path: "/transactions-analysis/loan/new",
        element: <TransactionLoan />,
        state: "transaction-analysis.loan",
        sidebarProps: {
          displayText: "PINJOL BARU"
        }
      },
      {
        path: "/transactions-analysis/loan",
        element: <TransactionsAnalysis />,
        state: "transactions-analysis.loan",
        sidebarProps: {
          displayText: "Pinjaman Online"
        }
      },
      {
        path: "/transactions-analysis/money-laundering",
        element: <TransactionsAnalysis />,
        state: "transactions-analysis.money-laundering",
        sidebarProps: {
          displayText: "Pencucian Uang"
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
    path: "/ai-assistant",
    element: <AiAssistantLayout />,
    state: "ai-assistant",
    sidebarProps: {
      displayText: "Scrapped",
      // icon: <AssistantOutlinedIcon />,
    },
    child: [
      {
        index: true,
        element: <AiAssistantIndex />,
        state: "ai-assistant.index"
      },
      {
        path: "/ai-assistant/index",
        element: <AiAssistantDashboard />,
        state: "ai-assistant.dashboard",
        sidebarProps: {
          displayText: "Indeks Riwayat Obrolan"
        }
      },
      {
        path: "/ai-assistant/analysis",
        element: <AiAssistantAnalysis />,
        state: "ai-assistant.analysis",
        sidebarProps: {
          displayText: "Asisten AI"
        }
      },
      {
        path: "/ai-assistant/analysis/:accountNumber",
        element: <AiAssistantAnalysis />,
        state: "ai-assistant.analysis",
      },
    ],
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
