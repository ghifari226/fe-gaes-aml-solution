const alertColumns = [
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
    field: "alertId",
    headerName: "Alert ID",
    width: 130,
    editable: true,
  },
  {
    field: "bankCode",
    headerName: "Bank Code",
    width: 150,
    editable: true,
  },
  {
    field: "messageCategory",
    headerName: "Message Category",
    width: 170,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
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

export default alertColumns;
