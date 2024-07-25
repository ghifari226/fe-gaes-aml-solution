const alertColumns = [
  // {
  //   field: "suspiciousScore",
  //   headerName: "Skor Fuzzy",
  //   width: 150,
  //   editable: true,
  // },
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
    field: "alert_status",
    headerName: "Status",
    width: 130,
  },
  {
    field: "alert_aml_issuspicious",
    headerName: "Transaksi mencurigakan",
    width: 150,
  },
  {
    field: "alert_aml_ismoneylaundering",
    headerName: "Pencucian Uang",
    width: 150,
  },
  {
    field: "alert_aml_rp_amount",
    headerName: "Jumlah",
    width: 150,
  },
  // {
  //   field: "aml_bene_account",
  //   headerName: "Akun Tujuan",
  //   width: 150,
  // },
  // {
  //   field: "aml_bene_institution",
  //   headerName: "Institusi Tujuan",
  //   width: 150,
  // },
  // {
  //   field: "aml_bene_country",
  //   headerName: "Negara Tujuan",
  //   width: 150,
  // },
];

export default alertColumns;

// {
//   "alert_id": 100,
//   "alert_timestamp": "2024-07-20 10:11:56",
//   "alert_status": "Active - Unacknowledged",
//   "alert_aml_issuspicious": "0",
//   "alert_aml_ismoneylaundering": "0",
//   "alert_customer_id": "NON_102677",
//   "alert_aml_transaction_id": "100000364859",
//   "alert_aml_timestamp": "2022-09-14 23:19:00",
//   "alert_aml_rp_amount": 1651880.5597015617,
//   "agent_user_id": "1",
//   "alert_created_by": "System",
//   "alert_created_at": "2024-07-20 10:11:56",
//   "alert_updated_by": "",
//   "alert_updated_at": ""
// },