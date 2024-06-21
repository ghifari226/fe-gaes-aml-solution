const loanAnalysisColumns = [
  {
    field: "isSuspicious",
    headerName: "Status",
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
    field: "paymentType",
    headerName: "Tipe Pembayaran",
    width: 150,
    editable: true,
  },
  {
    field: "loanAmount",
    headerName: "Nominal Pinjaman",
    width: 150,
    editable: true,
  },
  {
    field: "tenor",
    headerName: "Tenor Pinjaman",
    type: "number",
    width:100,
    editable: true,
  },
  {
    field: "amountTransaction",
    headerName: "Nominal Transaksi",
    type: "number",
    width:100,
    editable: true,
  },
  {
    field: "borrowDate",
    headerName: "Tanggal Pinjaman",
    width: 150,
    editable: true,
  },
  {
    field: "repayDate",
    headerName: "Tanggal Jatuh Tempo",
    width: 150,
    editable: true,
  },
];

export default loanAnalysisColumns;
