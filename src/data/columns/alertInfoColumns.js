const alertInfoColumns = [
  {
    field: "aml_ismoneylaundering",
    headerName: "Status Pencucian Uang",
    width: 50,
  },
  {
    field: "p2p_issuspicious",
    headerName: "Status Kecurigaan P2PL",
    width: 50,
  },
  {
    field: "aml_transaction_id",
    headerName: "ID Transaksi",
    width: 150,
  },
  {
    field: "aml_time_step",
    headerName: "Waktu Transaksi",
    width: 150,
  },
  {
    field: "aml_sender_account",
    headerName: "Rekening Pengirim",
    width: 150,
  },
  {
    field: "aml_sender_account_number",
    headerName: "No. Rekening Pengirim",
    width: 150,
  },
  {
    field: "aml_sender_institution",
    headerName: "Bank Pengirim",
    width: 150,
  },
  {
    field: "aml_sender_country",
    headerName: "Negara Pengirim",
    width: 150,
  },
  {
    field: "aml_bene_account",
    headerName: "Rekening Penerima",
    width: 150,
  },
  {
    field: "aml_bene_account_number",
    headerName: "No. Rekening Penerima",
    width: 150,
  },
  {
    field: "aml_bene_institution",
    headerName: "Bank Penerima",
    width: 150,
  },
  {
    field: "aml_bene_country",
    headerName: "Negara Penerima",
    width: 150,
  },
  {
    field: "aml_transaction_type",
    headerName: "Tipe Transaksi",
    width: 150,
  },
  {
    field: "customer_sender_pinjol_account",
    headerName: "Akun Pinjol Pengirim",
    width: 150,
  },
  {
    field: "customer_sender_id",
    headerName: "ID Pengirim",
    width: 150,
  },
  {
    field: "customer_sender_name",
    headerName: "Nama Pengirim",
    width: 150,
  },
  {
    field: "customer_bene_pinjol_account",
    headerName: "Akun Pinjol Penerima",
    width: 150,
  },
  {
    field: "customer_bene_id",
    headerName: "ID Penerima",
    width: 150,
  },
  {
    field: "customer_bene_name",
    headerName: "Nama Penerima",
    width: 150,
  },
  {
    field: "aml_rp_amount",
    headerName: "Nominal Transaksi",
    width: 150,
  },
  {
    field: "aml_sequence",
    headerName: "Sekuens AML",
    width: 150,
  },
  {
    field: "aml_validation",
    headerName: "Validasi AML-P2PL",
    width: 150,
  },
  {
    field: "aml_risk_score",
    headerName: "Skor Risiko",
    width: 150,
  },
  // aml_fuzzy_result STRING,
  {
    field: "p2p_loan_purpose",
    headerName: "Tujuan Peminjaman",
    width: 150,
  },
  {
    field: "p2p_income_range",
    headerName: "Tingkat Pendapatan Peminjam",
    width: 150,
  },
  {
    field: "p2p_borrower_income",
    headerName: "Nominal Pendapatan Peminjam",
    width: 150,
  },
  {
    field: "p2p_repayment_time_delta",
    headerName: "Selisih Tanggal Pembayaran",
    width: 150,
  },
  {
    field: "p2p_gender_simulated",
    headerName: "Jenis Kelamin Peminjam",
    width: 150,
  },
  {
    field: "p2p_age",
    headerName: "Usia Peminjam",
    width: 150,
  },
  {
    field: "p2p_province",
    headerName: "Provinsi Peminjam",
    width: 150,
  },
];

export default alertInfoColumns;