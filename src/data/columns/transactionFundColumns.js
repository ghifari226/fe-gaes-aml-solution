const transactionFundColumns = [
    //   aml_fuzzy_result STRING | skenario money laundering
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
      field: "aml_sender_account_number",
      headerName: "Rekening Pengirim",
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
      field: "aml_bene_account_number",
      headerName: "Rekening Penerima",
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
      field: "aml_time_step",
      headerName: "Waktu Transaksi",
      width: 150,
    },
    {
      field: "aml_rp_amount",
      headerName: "Nominal Transaksi",
      width: 150,
    },
  ];
  
  export default transactionFundColumns;