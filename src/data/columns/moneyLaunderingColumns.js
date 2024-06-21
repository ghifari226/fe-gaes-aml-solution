const moneyLaunderingColumns = [
  {
    field: "isMoneyLaundering",
    headerName: "Money Laundering",
    width: 150,
    editable: true,
  },
  {
    field: "fuzzyAnalysis",
    headerName: "Analisa Fuzzy",
    width: 150,
    editable: true,
  },
  {
    field: "idTransaction",
    headerName: "ID Transaksi",
    width: 150,
    editable: true,
  },
  {
    field: "idCustomer",
    headerName: "ID Nasabah",
    width: 150,
    editable: true,
  },
  {
    field: "transactionDate",
    headerName: "Tanggal Transaksi",
    width: 150,
    editable: true,
  },
  {
    field: "customerInstitution",
    headerName: "Institusi Nasabah",
    width: 150,
    editable: true,
  },
  {
    field: "bankCode",
    headerName: "Kode Bank",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "transactionAmount",
    headerName: "Jumlah Transaksi",
    type: "number",
    width: 150,
    editable: true,
  },
];

export default moneyLaunderingColumns;
