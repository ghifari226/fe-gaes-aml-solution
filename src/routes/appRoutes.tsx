import { RouteType } from "./config";

// Overview
import OverviewIndex from "../pages/overview/overviewIndex";

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

// SNA
import SocialNetworkAnalysis from "../pages/socialNetworkAnalysis/socialNetworkAnalysis";

// About
import AboutIndex from "../pages/about/aboutIndex";

// Icons
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

  // SNA
  {
    path: "/sna",
    element: <SocialNetworkAnalysis />,
    state: "sna",
    sidebarProps: {
      displayText: "Analisis Jaringan Sosial",
      icon: <InfoOutlinedIcon />,
    },
  },
];

export default appRoutes;
