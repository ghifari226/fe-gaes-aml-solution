const transactionLoanColumns = [
    {
      field: "p2p_issuspicious",
      headerName: "Transaksi Mencurigakan?",
      width: 150,
    },
    {
      field: "p2p_transaction_id",
      headerName: "ID Transaksi",
      width: 150,
    },
    {
      field: "p2p_loan_purpose",
      headerName: "Tujuan Pinjaman",
      width: 150,
    },
    {
      field: "p2p_repay_timestamp",
      headerName: "Tanggal Jatuh Tempo",
      width: 150,
    },
    // {
    //   field: "p2p_repayment_time_delta",
    //   headerName: "Tenor Pinjaman",
    //   type: "number",
    //   width:100,
    // },
    {
      field: "p2p_paid_amount_rp",
      headerName: "Nominal terbayar",
      type: "number",
      width:100,
    },
    {
      field: "p2p_borrower_income",
      headerName: "Pemasukan Peminjam",
      width: 150,
    },
  ];
  
  export default transactionLoanColumns;
  
// p2p_issuspicious: 1
// p2p_transaction_id: 100000175760
// p2p_loan_purpose: "business loan"
// p2p_transaction_type: "PINJOL-PAYMENT"
// p2p_repay_timestamp: "2022-07-09T23:30:00+00:00"
// p2p_paid_amount_rp: 1423016821.7664025
// p2p_borrower_income: 95709

// p2p_sender_account: "CHECKING-1080875-00"
// p2p_sender_institution: "BANK-1081044-00"
// p2p_sender_account_number: "JPMC-CLIENT-1080868-pxy48VRkGTOdpxFkdgzkpA=="
// p2p_sender_country: "Indonesia"

// p2p_bene_account: "CHECKING-1080869-00"
// p2p_bene_account_number: "BILLING-COMPANY-1080871-pxy48VRkGTOdpxFkdgzkpA=="
// p2p_bene_institution: "JPMORGANCHASE"

// p2p_customer_bene_id: "NON_100474"
// p2p_customer_sender_id: 100358
// p2p_customer_bene_name: ";Qo�R5\u000e]��$��c\u0013k"
// p2p_customer_sender_name: "m7APhEppEEwSEarK2sVQ8+Vmsubae1JPEBjW5HzQEzI="

// p2p_gender_simulated: "Male"
// p2p_income_range: "Medium"
// p2p_age: 22
// p2p_bene_country: "Indonesia"
// p2p_province: "Banten"

// p2p_repayment_time_delta: "0 days 00:00:00"
// p2p_sequence: null
// p2p_validation: null