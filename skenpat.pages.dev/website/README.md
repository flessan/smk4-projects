

# Layanan Untuk Siswa/i SMK Negeri 4 Banjarmasin (Skenpat)

[![Website](https://img.shields.io/badge/Website-smkn4bjm.sch.id-blue?style=for-the-badge&logo=globe)](https://smkn4bjm.sch.id)
[![Subdomain](https://img.shields.io/badge/Subdomain-skenpat.pages.dev-green?style=for-the-badge&logo=github)](https://skenpat.pages.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

Landing page tidak/belum resmi **SMK Negeri 4 Banjarmasin** (Skenpat) yang menyediakan informasi lengkap tentang sekolah, jadwal pelajaran, profil tenaga pendidik, dan berbagai layanan pendidikan lainnya. 
##
<img width="1366" height="420" alt="Pi7-Image-Cropper" src="https://github.com/user-attachments/assets/8cbdc7a9-4023-4365-933a-330b183e6800" />
- Data Tahun Ajaran 2025 - 2026

## 🏫 Tentang SMK Negeri 4 Banjarmasin

SMK Negeri 4 Banjarmasin adalah sekolah menengah kejuruan terkemuka di Banjarmasin, Kalimantan Selatan yang berkomitmen untuk mencetak lulusan yang berkualitas dan siap bersaing di dunia industri.

### Visi
Mewujudkan Lulusan Yang Kompeten, Berkarakter, Berdaya Saing, Siap Menghadapi Dunia Kerja Dan Perkembangan Teknologi Berlandaskan Nilai-nilai Luhur Pancasila

### Misi
- Mewujudkan Peserta Didik Yang Memiliki Profil Pelajar Pancasila Dan Budaya Kerja.
- Melaksanakan Program Pendidikan Inklusif.
- Melaksanakan Pembelajaran Berbasis Teaching Factory (ТЕFА).
- Mengembangkan Manajemen Berbasis Data Dan Digital Yang Mendukung Efektivitas Layanan.
- Menyediakan Sarana Dan Prasarana Yang Sesuai Dengan Standar Dunia Kerja Dan Perkembangan Teknologi.
- Memperkuat Kemitraan Dengan Dunia Kerja Dan Stakeholder.
- Memfasilitasi Lulusan Memiliki Sertifikat Uji Kompetensi Vang Diterbitkan Oleh BNSP.
- Menumbuhkan Wawasan Dan Kepedulian Warga Sekolah Terhadap Lingkungan Hidup Dan Budaya Lokal.

## 🌐 Website Resmi

### URL Utama
- **Website Resmi**: [smkn4bjm.sch.id](https://smkn4bjm.sch.id)
- **Website buatan Siswa SMK**: [skenpat](https://skenpat.pages.dev)

### Fitur Website
1. **Profil Sekolah**
   - Sejarah dan visi misi
   - Struktur organisasi
   - Fasilitas sekolah
   - Prestasi sekolah

2. **Akademik**
   - Informasi jurusan
   - Kurikulum pembelajaran
   - Jadwal pelajaran
   - Kalender akademik

3. **Tenaga Pendidik**
   - Profil guru dan staff
   - Bidang keahlian
   - Kontak pendidik

4. **Layanan**
   - Perpustakaan online
   - E-Library Skenpat
   - Pendaftaran siswa baru
   - Informasi alumni

5. **Berita & Pengumuman**
   - Kegiatan sekolah
   - Pengumuman penting
   - Artikel pendidikan

## 🚀 Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Tanpa Framework
- **Backend**: Tanpa Backend
- **Database**: Tanpa Database
- **Hosting**: CloudFlare Pages
- **CMS**: Nah, I'm Not Using It.

## 📱 Fitur Mobile

Website ini dioptimalkan untuk penggunaan mobile dengan fitur:
- Responsive design
- Navigasi yang mudah
- Akses cepat ke jadwal pelajaran
- Dll

## 🛠️ Cara Kontribusi

Kami terbuka untuk kontribusi dari seluruh warga sekolah dan masyarakat:

1. **Fork** repository ini
2. **Buat** branch baru (`git checkout -b fitur-baru`)
3. **Commit** perubahan Anda (`git commit -am 'Tambah fitur baru'`)
4. **Push** ke branch (`git push origin fitur-baru`)
5. **Buat** Pull Request

### Aturan Kontribusi
- Hormati kode etik sekolah
- Pastikan konten sesuai dengan visi misi sekolah
- Berikan informasi yang akurat dan terbaru
- Ikuti panduan gaya penulisan yang telah ditetapkan

## ⚙️ Panduan Teknis (Developer)

### Menjalankan website secara lokal
Karena proyek ini berbasis static site, Anda bisa menjalankan server lokal sederhana:

```bash
python -m http.server 8080
```

Lalu buka `http://localhost:8080` di browser.

### Struktur folder penting
- `index.html` → halaman utama portal.
- `app/` → entry halaman versi web-app.
- `aset/css/` → stylesheet utama.
- `aset/js/` → JavaScript client termasuk service worker.
- `aset/api/` → data JSON statis (artikel/pencarian/dll).
- `public/_headers` → konfigurasi header & cache policy untuk deployment.

### Quality checks sebelum merge
Jalankan pemeriksaan link internal agar tidak ada asset/path lokal yang rusak:

```bash
python tools/check_internal_links.py
```

Checklist ringan sebelum merge:
- Tidak ada broken internal link.
- Cek tampilan mobile + desktop pada halaman yang diubah.
- Pastikan perubahan tidak merusak navigasi utama.

## 📄 Lisensi

Proyek ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detail informasi.

## 📞 Kontak

**SMK Negeri 4 Banjarmasin**
- 📍 Alamat: Jl. Pramuka No. 36, Banjarmasin, Kalimantan Selatan 70123
- 📞 Telepon: (0511) 3306701
- 📧 Email: info@smkn4bjm.sch.id
- 🌐 Website: [smkn4bjm.sch.id](https://smkn4bjm.sch.id)

### Media Sosial
- [Instagram](https://www.instagram.com/smkn4banjarmasin)
- [Facebook](https://web.facebook.com/smkn4banjarmasin)
- [YouTube](https://www.youtube.com/channel/UCxbHXnN7paUGIs_NRdTpc0Q)
- [Twitter](https://twitter.com/smkn4bjm__)

## 🙏 Terima Kasih

Terima kasih kepada semua pihak yang telah berkontribusi dalam pengembangan website ini:
- yaitu saya sendiri (Thio Saputra)

---

© 2025 SMK Negeri 4 Banjarmasin. All rights reserved.
