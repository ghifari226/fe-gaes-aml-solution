import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import assets from "../../assets";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  position: "relative",
  zIndex: 1,
});

const BackgroundContainer = styled(Box)(({ backgroundImage }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "750px",
  height: "750px",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.1,
  zIndex: 0,
}));

const AccordionContainer = styled(Accordion)({
  position: "relative",
});

const AccordionSummaryWrapper = styled(AccordionSummary)({
  backgroundColor: "rgba(255, 255, 255, 0.8)",
});

const OverviewIndex = () => {
  const [expanded, setExpanded] = useState("panel0");
  const [backgroundImage, setBackgroundImage] = useState("");

  const handleAccordionChange = (panel, image) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
    console.log("imagenya", image);
    setBackgroundImage(isExpanded ? image : "");
  };

  const cards = [
    {
      title: "Nama Tirtasena",
      content: `
        Dalam bahasa Sanskerta, "Tirta" (तीर्थ, tīrtha) biasanya berarti "air
          suci" atau "tempat ziarah yang suci." Ini sering dikaitkan dengan air
          yang dianggap suci dan digunakan dalam ritual dan upacara keagamaan
          dalam tradisi Hindu dan Buddha. "Sena" (सेना) dalam bahasa Sanskerta
          berarti "tentara" atau "prajurit." Ini sering digunakan untuk merujuk
          pada sekelompok tentara atau kekuatan militer yang terorganisir.
          Menggabungkan kedua kata tersebut, "Tirtasena" (तीर्थसेना, tīrthasena)
          dapat diartikan sebagai "prajurit air suci" atau "tentara air suci."
          Kombinasi ini mungkin digunakan secara metaforis atau simbolis,
          mungkin merujuk pada seseorang atau kelompok yang terkait dengan
          melindungi atau menyebarkan kesucian, spiritualitas, atau kemurnian,
          mirip dengan tentara yang didedikasikan untuk tujuan suci.

          Nama "Tirtasena" mencerminkan filosofi di balik aplikasi kami, yang
          merupakan puncak dari upaya kolektif kami untuk memerangi masalah
          pencucian uang yang merajalela. Dirancang dengan prinsip kemurnian,
          perlindungan, dan kewaspadaan, Kami—yang secara kolektif dikenal
          sebagai FraudRanger—memberdayakan lembaga keuangan dan badan pengatur
          dengan alat dan analitik canggih. Dengan memanfaatkan teknologi
          mutakhir, kami berusaha untuk meningkatkan transparansi, mendeteksi
          aktivitas mencurigakan, dan melindungi sistem keuangan, termasuk
          transaksi pinjaman. Misi kami adalah bertindak sebagai kekuatan yang
          berdedikasi, mirip dengan "tentara air suci," mengungkap dan mencegah
          upaya menyamarkan aktivitas keuangan ilegal. Bersama-sama, kami sedang
          membentuk ulang lanskap kepatuhan regulasi dan integritas dalam
          keuangan.
    `,
    },
    {
      title: "Ringkasan",
      content: `
        Website ini dirancang untuk membantu tim kepatuhan bank dalam mendeteksi dan menganalisis aktivitas mencurigakan terkait pinjaman dan pencucian uang. Berikut adalah panduan umum tentang cara menggunakan fitur-fitur utama pada website ini:

1. Sistem Manajemen Peringatan:
   - Langkah Pertama: Masuk ke menu Sistem Manajemen Peringatan untuk melihat peringatan yang dihasilkan oleh model pembelajaran mendalam.
   - Kategori Peringatan: Peringatan dikategorikan menjadi "Aktif Dikonfirmasi", "Selesai Dikonfirmasi", "Aktif Belum Dikonfirmasi", dan "Selesai Tidak Terbukti".
   - Penugasan Peringatan: Peringatan dapat ditugaskan kepada anggota tim tertentu. Klik pada peringatan untuk melihat informasi detail tentang transaksi dan hasil prediksi model.
   - Tujuan: Memastikan setiap kasus ditangani dengan cara yang efisien dan terstruktur.

2. Fitur Analisis Jaringan Sosial (SNA):
   - Akses Fitur: Dari menu Detail Peringatan, klik tombol untuk melihat analisis jaringan sosial dari transaksi yang mencurigakan.
   - Visualisasi Hubungan: Fitur ini memvisualisasikan hubungan antara pengirim dan penerima transaksi sebagai jaringan node dan edge, memudahkan eksplorasi hubungan kompleks dan identifikasi anomali.
   - Tujuan: Mengungkap hubungan tersembunyi, pola perilaku, dan potensi risiko yang mungkin terlewatkan oleh pemantauan tradisional.

3. Analisis Transaksi Pinjaman:
   - Akses Menu: Pilih menu Analisis Transaksi Pinjaman untuk melihat hasil prediksi model terkait aktivitas mencurigakan dari nasabah.
   - Fokus Analisis: Mencari anomali dalam transaksi pinjaman, penyimpangan dari pola pembayaran normal, dan perubahan mendadak dalam jumlah pinjaman.
   - Tujuan: Menganalisis aliran dana dari pinjaman untuk membantu pihak bank memastikan ada atau tidaknya indikasi aktivitas pencucian uang.

4. Analisis Transaksi Pencucian Uang:
   - Akses Menu: Pilih menu Analisis Transaksi Pencucian Uang untuk melihat hasil analisis data transaksi.
   - Hasil Analisis: Menampilkan hasil prediksi Model Deep Learning dan metode Fuzzy, termasuk jumlah transaksi, pola dan frekuensi, pihak terkait, lokasi geografis, dan hubungan yang diidentifikasi melalui SNA.
   - Tujuan: Menentukan apakah transaksi merupakan pencucian uang dan apakah melanggar aturan sesuai regulasi yang berlaku.

5. Asisten AI (PandasAI):
   - Akses Fitur: Gunakan antarmuka seperti obrolan untuk berinteraksi dengan Asisten AI.
   - Fungsi Asisten: Membantu menganalisis data transaksi yang difilter untuk mendeteksi kejahatan terkait pinjaman atau pencucian uang.
   - Hasil Analisis: Sistem menghasilkan visualisasi yang informatif dan ringkasan statistik, membantu pengambilan keputusan cepat dan meningkatkan deteksi aktivitas keuangan mencurigakan.

### Catatan Penting

Website ini dirancang untuk membantu tim kepatuhan bank dalam mendeteksi aktivitas mencurigakan, tetapi tidak secara langsung memutuskan apakah seseorang terlibat dalam pencucian uang atau tidak. Keputusan akhir tetap memerlukan investigasi lebih lanjut oleh tim kepatuhan berdasarkan informasi dan analisis yang diberikan oleh sistem.
    `,
    },
    {
      backgroundImage: assets.images.warningSign,
      title: "Sistem Manajemen Peringatan",
      content: `
        Sistem Manajemen Peringatan dirancang untuk membantu tim kepatuhan bank dalam menangani dan memantau peringatan yang dihasilkan oleh model pembelajaran mendalam. Peringatan dikategorikan berdasarkan status seperti "Aktif Dikonfirmasi", "Selesai Dikonfirmasi", "Aktif Belum Dikonfirmasi", dan "Selesai Tidak Terbukti", memudahkan tim dalam memprioritaskan dan mengelola tugas mereka. Setiap peringatan dapat ditugaskan kepada anggota tim tertentu, dengan informasi detail tentang transaksi dan regulasi yang dilanggar serta hasil prediksi dari Model Deep Learning, memastikan akuntabilitas dan transparansi.

Penjelasan Status Peringatan:

1. Aktif Dikonfirmasi:
   - Peringatan ini telah diakui dan sedang dalam proses peninjauan atau investigasi oleh tim kepatuhan. Ini berarti transaksi dianggap mencurigakan dan sedang diperiksa lebih lanjut.

2. Selesai Dikonfirmasi:
   - Peringatan ini telah diperiksa dan dikonfirmasi sebagai transaksi mencurigakan. Investigasi telah selesai dan tindakan yang sesuai telah diambil.

3. Aktif Belum Dikonfirmasi:
   - Peringatan ini telah dihasilkan tetapi belum diakui atau ditinjau oleh tim kepatuhan. Ini adalah langkah awal di mana peringatan baru saja muncul dan menunggu tindakan lebih lanjut.

4. Selesai Tidak Terbukti:
   - Peringatan ini telah ditinjau dan ditemukan tidak mencurigakan. Investigasi telah selesai dan transaksi dianggap tidak terkait dengan aktivitas pencucian uang.

Fitur ini membantu pihak bank untuk mengidentifikasi dan mengelola peringatan berdasarkan prioritas dan kebutuhan investigasi, memastikan setiap kasus ditangani dengan cara yang efisien dan terstruktur.
    `,
    },
    {
      backgroundImage: assets.images.checkCustomers,
      title: "Fitur Analisis Jaringan Sosial ",
      content: `
        Fitur Analisis Jaringan Sosial (SNA) berfungsi untuk membantu pihak bank untuk identifikasi Analisis hubungan antara pengirim dan penerima transaksi. SNA mengungkap hubungan tersembunyi, pola perilaku, dan potensi risiko yang mungkin terlewatkan oleh pemantauan tradisional.Dengan integrasi Neo4j, fitur ini memvisualisasikan hubungan pelanggan sebagai jaringan node dan edge yang saling terhubung, memudahkan eksplorasi hubungan kompleks dan identifikasi anomali.Fitur ini dapat diakses melalui menu Detail Peringatan, di mana tim bank dapat mengklik tombol untuk melihat analisis jaringan sosial dari setiap transaksi yang mencurigakan. 
    `,
    },
    {
      backgroundImage: assets.images.moneyLoan,
      title: "Analisis Transaksi Pinjaman",
      content: `
        Menu ini menampilkan hasil prediksi model dalam mendeteksi aktivitas mencurigakan dari nasabah, khususnya kemungkinan pencucian uang melalui pinjaman online. Fokus dari model adalah mencari anomali dalam transaksi pinjaman, penyimpangan dari pola pembayaran normal, dan perubahan mendadak dalam jumlah pinjaman.

Menggunakan teknologi Machine Learning, model menandai transaksi berisiko tinggi. Ketika transaksi mencurigakan terdeteksi, model akan memeriksa apakah nasabah yang sama melakukan pencucian uang setelah aktivitas pinjaman tersebut. Model ini akan meneliti aliran dana dari pinjaman tersebut untuk memastikan apakah ada indikasi aktivitas pencucian uang.

Fitur ini membantu pihak bank untuk menganalisis lebih lanjut dari menu peringatan jika pihak bank ingin menganalisis transaksi nasabah secara lebih mendetail.
    `,
    },
    {
      backgroundImage: assets.images.moneyLaundering,
      title: "Analisis Transaksi Pencucian Uang",
      content: `
        Menu ini menampilkan hasil analisis data transaksi, yaitu hasil prediksi Model Deep Learning dan metode Fuzzy. Analisis mencakup jumlah transaksi, pola dan frekuensi, pihak terkait, lokasi geografis, dan hubungan yang diidentifikasi melalui analisis jaringan sosial (SNA). Hasil Deep Learning menunjukkan apakah transaksi merupakan pencucian uang atau tidak, sedangkan hasil Fuzzy membantu menentukan apakah transaksi tersebut melanggar aturan sesuai regulasi yang berlaku. Fitur ini membantu pihak bank untuk menganalisis lebih lanjut dari menu peringatan jika pihak bank ingin menganalisis transaksi per nasabah.
    `,
    },
    {
      backgroundImage: assets.images.aiHead,
      title: "Asisten AI",
      content: `
        Untuk membuktikan pelaku benar terlibat, kita membutuhkan analisis lebih mendalam. Untuk membantu pihak bank, kita menyediakan Generative AI dari PandasAI.Fitur ini membantu pihak bank dalam menganalisis data transaksi yang difilter untuk mendeteksi kejahatan terkait pinjaman atau pencucian uang. Pihak Bank dapat berinteraksi melalui antarmuka seperti obrolan untuk melakukan analisis tersebut. Sistem menghasilkan visualisasi yang informatif dan ringkasan statistik, membantu pengambilan keputusan cepat dan meningkatkan deteksi aktivitas keuangan mencurigakan.
    `,
    },
  ];

  return (
    <Box position="relative" minHeight="100vh">
      <BackgroundContainer backgroundImage={backgroundImage} />
      <Container>
        <AccordionContainer
          expanded={expanded === "panel0"}
          onChange={handleAccordionChange("panel0", cards[0].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[0].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[0].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        {/* <AccordionContainer
          expanded={expanded === "panel1"}
          onChange={handleAccordionChange("panel1", cards[1].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[1].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[1].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel2"}
          onChange={handleAccordionChange("panel2", cards[2].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[2].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[2].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel3"}
          onChange={handleAccordionChange("panel3", cards[3].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[3].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[3].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel4"}
          onChange={handleAccordionChange("panel4", cards[4].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[4].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[4].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel5"}
          onChange={handleAccordionChange("panel5", cards[5].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[5].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[5].content}</Typography>
          </AccordionDetails>
        </AccordionContainer> */}
      </Container>
    </Box>
  );
};

export default OverviewIndex;
