const alertColumns = [
  {
    field: "suspiciousScore",
    headerName: "Skor Fuzzy",
    width: 150,
    editable: true,
  },
  {
    field: "predictionScore",
    headerName: "Hasil Prediksi(ML)",
    width: 150,
    editable: true,
  },
  {
    field: "idAlert",
    headerName: "ID Peringatan",
    width: 130,
    editable: true,
  },
  {
    field: "statusAlert",
    headerName: "Status Peringatan",
    width: 130,
    editable: true,
  },
  {
    field: "dateAlert",
    headerName: "Tanggal Peringatan",
    width: 130,
    editable: true,
  },
  {
    field: "dateTransaction",
    headerName: "Tanggal Transaksi",
    width: 150,
    editable: true,
  },
  {
    field: "bankCode",
    headerName: "Kode Bank",
    width: 170,
    editable: true,
  },
  {
    field: "idCustomer",
    headerName: "ID Nasabah",
    width: 150,
    editable: true,
  },
  {
    field: "amountTransaction",
    headerName: "Nominal Transaksi",
    width: 150,
    editable: true,
  },
  {
    field: "transactionCurrency",
    headerName: "Mata Uang",
    width: 150,
    editable: true,
  }
];

export default alertColumns;
