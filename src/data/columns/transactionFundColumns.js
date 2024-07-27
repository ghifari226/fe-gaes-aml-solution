const transactionFundColumns = [
    {
      field: "aml_ismoneylaundering",
      headerName: "Pencucian Uang?",
      width: 50,
    },
    {
      field: "p2p_issuspicious",
      headerName: "Transaksi Mencurigakan?",
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
      field: "aml_rp_amount",
      headerName: "Nominal Transaksi",
      width: 150,
    },
    // {
    //   field: "aml_transaction_id",
    //   headerName: "ID Transaksi",
    //   width: 150,
    // },
    // {
    //   field: "aml_transaction_id",
    //   headerName: "ID Transaksi",
    //   width: 150,
    // },
    // {
    //   field: "aml_transaction_id",
    //   headerName: "ID Transaksi",
    //   width: 150,
    // },
  ];
  
  export default transactionFundColumns;