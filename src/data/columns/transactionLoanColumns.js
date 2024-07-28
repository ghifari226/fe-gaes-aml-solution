const transactionLoanColumns = [
    {
      field: "p2p_issuspicious",
      headerName: "Status Kecurigaan P2PL",
      width: 150,
    },
    {
      field: "p2p_transaction_id",
      headerName: "ID Transaksi",
      width: 150,
    },
    {
      field: "p2p_repay_timestamp",
      headerName: "Tanggal Pembayaran",
      width: 150,
    },
    {
      field: "p2p_sender_account_number",
      headerName: "Rekening Pengirim",
      width: 150,
    },
    {
      field: "p2p_sender_institution",
      headerName: "Bank Pengirim",
      width: 150,
    },
    {
      field: "p2p_sender_country",
      headerName: "Negara Pengirim",
      width: 150,
    },
    {
      field: "p2p_bene_account_number",
      headerName: "Rekening Penerima",
      width: 150,
    },
    {
      field: "p2p_bene_institution",
      headerName: "Bank Penerima",
      width: 150,
    },
    {
      field: "p2p_bene_country",
      headerName: "Negara Penerima",
      width: 150,
    },
    {
      field: "p2p_transaction_type",
      headerName: "Tipe Transaksi",
      type: "number",
      width:100,
    },
    {
      field: "p2p_customer_sender_id",
      headerName: "ID Pengirim",
      width: 150,
    },
    {
      field: "p2p_customer_sender_name",
      headerName: "Negara Pengirim",
      width: 150,
    },
    {
      field: "p2p_customer_bene_id",
      headerName: "ID Penerima",
      width: 150,
    },
    {
      field: "p2p_customer_bene_name",
      headerName: "Negara Penerima",
      width: 150,
    },
    {
      field: "p2p_paid_amount_rp",
      headerName: "Nominal Transaksi",
      type: "number",
      width:100,
    },
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
      headerName: "Pemasukan Peminjam",
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
  
  export default transactionLoanColumns;