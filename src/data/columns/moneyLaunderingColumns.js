const moneyLaunderingColumns = [
  {
    field: "isMoneyLaundering",
    headerName: "Money Laundering",
    width: 150,
    editable: true,
  },
  {
    field: "suspiciousScore",
    headerName: "Suscipious Score",
    width: 150,
    editable: true,
  },
  {
    field: "suspiciousScoreSna",
    headerName: "Suspicious Score (+SNA)",
    width: 150,
    editable: true,
  },
  {
    field: "bankCode",
    headerName: "Bank Code",
    width: 150,
    editable: true,
  },
  {
    field: "transactionReference",
    headerName: "Transaction Reference",
    width: 150,
    editable: true,
  },
  {
    field: "transactionCurrency",
    headerName: "Transaction Currency",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "createdDate",
    headerName: "Created Date",
    type: "number",
    width: 150,
    editable: true,
  },
];

export default moneyLaunderingColumns;
