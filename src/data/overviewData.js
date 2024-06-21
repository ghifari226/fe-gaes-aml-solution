const data = [
    {
      titleId: "Ringkasan",
      titleEn: "Summary",
      contentId: `
        ...
    `,
      contentEn: `
        ...
    `,
    },
    {
      backgroundImage: assets.images.warningSign,
      titleId: "Sistem Peringatan dengan Pembelajaran Mendalam dan Algoritma Fuzzy",
      contentId: `
        Sistem ini menggunakan model pembelajaran mendalam yang canggih untuk menganalisis data transaksi dan menghasilkan skor kecurigaan untuk setiap transaksi. Model ini dilatih pada data historis untuk mengidentifikasi pola yang mengindikasikan aktivitas pencucian uang potensial dengan akurat.
        Selain skor yang dihasilkan oleh pembelajaran mendalam, sistem ini juga menggabungkan aturan logika fuzzy yang ditentukan oleh pengguna. Ketika skor kecurigaan transaksi melebihi ambang batas yang telah ditentukan, peringatan dipicu. Sistem kemudian memeriksa transaksi tersebut terhadap aturan fuzzy dan memberikan penjelasan rinci tentang aturan spesifik yang dilanggar.
        Pengguna memiliki fleksibilitas untuk membuat dan menyesuaikan aturan fuzzy berdasarkan keahlian mereka dan persyaratan kepatuhan yang terus berkembang. Ini memungkinkan pendekatan yang dipersonalisasi dan adaptif untuk pemantauan AML.
        Integrasi ini memastikan bahwa semua peringatan tidak hanya didasarkan pada analisis AI yang canggih tetapi juga disertai dengan penjelasan yang jelas dan mudah dipahami, meningkatkan transparansi dan memungkinkan pengambilan keputusan yang lebih cepat.
    `,
      titleEn: "Alert system with deep learning and fuzzy algorithm",
      contentEn: `
        The system employs advanced deep learning models to analyze transaction data and generate a suspicious score for each transaction. These models are trained on historical data to accurately identify patterns indicative of potential money laundering activities.
        In addition to the deep learning-generated scores, the system incorporates fuzzy logic rules defined by the users. When a transaction's suspicious score exceeds a predefined threshold, an alert is triggered. The system then cross-references the transaction against the fuzzy rules and provides a detailed explanation of which specific rules were violated.
        Users have the flexibility to create and adjust fuzzy rules based on their expertise and evolving compliance requirements. This allows for a personalized and adaptable approach to AML monitoring.
        This integration ensures that all alerts are not only based on advanced AI analysis but also come with clear, understandable explanations, enhancing transparency and enabling quicker decision-making.
    `,
    },
    {
      backgroundImage: assets.images.checkCustomers,
      titleId: "Analisis Jaringan Sosial untuk Meningkatkan Pemeriksaan Transaksi",
      titleEn: "Social network analysis to enhance transaction checking",
      contentId: `
        Aplikasi AML (Anti-Money Laundering) kami memanfaatkan Analisis Jaringan Sosial (SNA) untuk meningkatkan kemampuan pemantauan transaksi, meningkatkan deteksi aktivitas mencurigakan.
        Setiap transaksi melibatkan dua pihak, yaitu pengirim dan penerima. Dengan menerapkan teknik SNA, kami menganalisis hubungan antara entitas ini. Hal ini memungkinkan kami untuk mengungkap hubungan tersembunyi, pola perilaku, dan potensi risiko yang mungkin terlewatkan oleh pemantauan tradisional.
        Aplikasi ini terintegrasi dengan Neo4j, basis data grafik terkemuka, untuk memvisualisasikan hubungan pelanggan sebagai jaringan node dan edge yang saling terhubung. Representasi grafis ini memberikan cara yang jelas dan intuitif untuk mengeksplorasi hubungan kompleks dan mengidentifikasi anomali dalam jaringan.
        SNA membantu dalam menilai risiko yang terkait dengan setiap transaksi dengan mempertimbangkan faktor-faktor seperti derajat pemisahan antara pelanggan, frekuensi transaksi, dan struktur keseluruhan jaringan. Analisis multi-dimensional ini memperkaya akurasi dan keandalan sistem peringatan.
        Dengan menggabungkan SNA dengan pemantauan transaksi, aplikasi kami menawarkan pendekatan yang komprehensif untuk kepatuhan AML, memberdayakan institusi keuangan untuk mendeteksi dan mencegah aktivitas ilegal dengan lebih efektif.
    `,
      contentEn: `
        Our AML (Anti-Money Laundering) application leverages Social Network Analysis (SNA) to augment transaction monitoring capabilities, enhancing the detection of suspicious activities.
        Each transaction involves two parties, ergo the sender and the recipient. By applying SNA techniques, we analyze the relationships between these entities. This allows us to uncover hidden connections, patterns of behavior, and potential risks that traditional monitoring may overlook.
        The application integrates with Neo4j, a leading graph database, to visualize customer relationships as a network of interconnected nodes and edges. This graphical representation provides a clear and intuitive way to explore complex relationships and identify anomalies within the network.
        SNA helps in assessing the risk associated with each transaction by considering factors such as the degree of separation between customers, transaction frequency, and the overall structure of the network. This multi-dimensional analysis enriches the alert system’s accuracy and reliability.
        By combining SNA with transaction monitoring, our application offers a comprehensive approach to AML compliance, empowering financial institutions to detect and prevent illicit activities more effectively.
      `,
    },
    {
      backgroundImage: assets.images.moneyLoan,
      titleId: "Analisis Transaksi untuk Mencegah Kejahatan Terkait Pinjaman",
      contentId: `
        Analisis transaksi untuk mencegah kejahatan terkait pinjaman bertujuan untuk mengidentifikasi pola dan perilaku yang mengindikasikan aktivitas penipuan yang melibatkan pinjaman.
        Sistem ini menganalisis data transaksi, khususnya berfokus pada transaksi terkait pinjaman. Sistem ini memeriksa atribut seperti jumlah pinjaman, pola pembayaran kembali, informasi peminjam, dan perilaku transaksi historis.
        Indikator kunci mencakup adanya anomali dalam transaksi pinjaman, penyimpangan dari perilaku pembayaran kembali pinjaman yang khas, perubahan mendadak dalam jumlah pinjaman, dan ketidaksesuaian dalam informasi peminjam.
        Memanfaatkan model pembelajaran mesin dan analisis statistik untuk menandai transaksi yang menunjukkan karakteristik berisiko tinggi yang terkait dengan kejahatan terkait pinjaman.
        Memberikan peringatan ketika transaksi pinjaman mencurigakan terdeteksi, dengan wawasan rinci tentang indikator spesifik yang memicu peringatan. Hal ini memungkinkan investigasi yang cepat dan mitigasi potensi penipuan terkait pinjaman.
    `,
      titleEn: "Transaction analysis to prevent loan-related crime",
      contentEn: `
        The transaction analysis for preventing loan-related crime aims to identify patterns and behaviors indicative of fraudulent activities involving loans.
        The system analyzes transaction data, specifically focusing on loan-related transactions. It examines attributes such as the loan amount, repayment patterns, borrower information, and historical transaction behavior.
        Key indicators include the presence of anomalies in loan transactions, deviations from typical loan repayment behavior, sudden changes in loan amounts, and discrepancies in borrower information.
        Utilizes machine learning models and statistical analysis to flag transactions that exhibit high-risk characteristics associated with loan-related crime.
        Provides alerts when suspicious loan transactions are detected, with detailed insights into the specific indicators that triggered the alert. This enables prompt investigation and mitigation of potential loan-related fraud.
      `,
    },
    {
      backgroundImage: assets.images.moneyLaundering,
      titleId: "Analisis Transaksi untuk Mencegah Pencucian Uang",
      contentId: `
        Analisis transaksi untuk mencegah pencucian uang mengidentifikasi transaksi yang menunjukkan karakteristik yang biasa dikaitkan dengan upaya mencuci dana ilegal.
        Menganalisis data transaksi melintasi berbagai parameter, termasuk jumlah transaksi, frekuensi, pihak terkait, lokasi geografis, dan hubungan yang diidentifikasi melalui analisis jaringan sosial (SNA).
        Mencari pola mencurigakan seperti transaksi besar yang sering, pola transaksi yang tidak biasa, transaksi yang melibatkan yurisdiksi berisiko tinggi, dan rute transaksi yang kompleks.
        Mengintegrasikan model pembelajaran mendalam dan aturan fuzzy yang ditentukan pengguna untuk menetapkan skor kecurigaan pada transaksi. Selain itu, menggabungkan analisis jaringan sosial untuk mengungkap hubungan tersembunyi antara entitas yang terlibat dalam transaksi.
        Menghasilkan peringatan ketika transaksi melebihi ambang batas yang telah ditentukan dari aktivitas mencurigakan. Menyediakan penjelasan rinci tentang faktor-faktor yang berkontribusi terhadap skor kecurigaan, termasuk wawasan dari analisis jaringan sosial, memfasilitasi pengambilan keputusan yang terinformasi dan tindakan kepatuhan.
    `,
      titleEn: "Transaction analysis to prevent money laundering",
      contentEn: `
        The transaction analysis for preventing money laundering identifies transactions exhibiting characteristics commonly associated with attempts to launder illicit funds.
        Analyzes transaction data across various parameters, including transaction amounts, frequency, counterparties involved, geographic locations, and any connections identified through social network analysis (SNA).
        Looks for suspicious patterns such as frequent large transactions, unusual transaction patterns, transactions involving high-risk jurisdictions, and complex transaction routes.
        Integrates deep learning models and user-defined fuzzy rules to assign suspicious scores to transactions. Additionally, incorporates social network analysis to uncover hidden connections between entities involved in transactions.
        Generates alerts when transactions exceed predefined thresholds of suspicious activity. Provides detailed explanations of the factors contributing to the suspicious score, including insights from social network analysis, facilitating informed decision-making and compliance actions.
      `,
    },
    {
      backgroundImage: assets.images.aiHead,
      titleId: "AI Generatif untuk Bantuan Analisis",
      contentId: `
        Memanfaatkan kekuatan AI, aplikasi kami mengintegrasikan perpustakaan Pandas AI Python untuk menyediakan kemampuan analisis dan visualisasi yang canggih. Pengguna dapat berinteraksi melalui antarmuka seperti obrolan untuk menganalisis data transaksi yang difilter untuk bendera kejahatan terkait pinjaman atau pencucian uang. Sistem menghasilkan visualisasi yang informatif dan ringkasan statistik, membantu pengambilan keputusan cepat dan meningkatkan deteksi aktivitas keuangan mencurigakan.
        Fitur ini merampingkan tugas analisis yang kompleks, menawarkan wawasan interaktif dan memfasilitasi respons yang terinformasi terhadap potensi kejahatan keuangan.
    `,
      titleEn: "Generative AI for analysis assistance",
      contentEn: `
        Harnessing the power of AI, our application integrates the Pandas AI Python library to provide advanced analysis and visualization capabilities. Users can interact via a chat-like interface to analyze filtered transaction data for loan-related crime or money laundering flags. The system generates insightful visualizations and statistical summaries, aiding quick decision-making and enhancing detection of suspicious financial activities.
        This feature streamlines complex analysis tasks, offering interactive insights and facilitating informed responses to potential financial crimes.
      `,
    },
  ];