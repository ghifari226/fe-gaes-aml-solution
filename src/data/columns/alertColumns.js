const alertColumns = [
  {
    field: "alert_status",
    headerName: "Status",
    width: 130,
  },
  {
    field: "alert_id",
    headerName: "ID Alert",
    width: 150,
  },
  {
    field: "alert_timestamp",
    headerName: "Tanggal Alert",
    width: 130,
  },
  {
    field: "alert_aml_ismoneylaundering",
    headerName: "Status Money Laundering",
    width: 150,
  },
  {
    field: "alert_aml_issuspicious",
    headerName: "Status Kecurigaan P2PL",
    width: 150,
  },
  {
    field: "alert_aml_transaction_id",
    headerName: "ID Transaksi",
    width: 150,
  },
  {
    field: "alert_aml_timestamp",
    headerName: "Tanggal Transaksi",
    width: 150,
  },
  {
    field: "alert_aml_rp_amount",
    headerName: "Nominal Transaksi",
    width: 150,
  },
  {
    field: "alert_customer_id",
    headerName: "ID Nasabah",
    width: 150,
  },
];

export default alertColumns;