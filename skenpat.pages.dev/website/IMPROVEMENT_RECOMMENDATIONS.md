# Improvement Recommendations for `skenpat`

Dokumen ini merangkum area prioritas yang sebaiknya ditingkatkan berdasarkan review cepat pada struktur repository, halaman utama, dan validasi ringan via script.

## 1) Perbaiki validitas HTML (prioritas tinggi)

- `index.html` belum memiliki penutup `</head>` sebelum `<body>`, yang bisa menyebabkan parser browser masuk ke mode pemulihan dan perilaku tidak konsisten antar-browser.
- Rekomendasi:
  - Tambahkan `</head>` tepat sebelum tag `<body>`.
  - Jalankan validasi HTML (W3C validator atau html-validate) sebagai quality gate sederhana.

## 2) Rapikan tautan/route lokal yang tidak konsisten

Ditemukan beberapa referensi yang berpotensi broken:

- `index.html` menggunakan tautan `./Siswa` dan `./green` (tanpa ekstensi) sementara file yang tersedia adalah `Siswa.html` dan `green.html`.
- Di arsip Siswa (`2024-2025` dan `2025-2026`), stylesheet mengarah ke `/aset/Siswa.css`, padahal struktur saat ini menggunakan `/aset/css/Siswa.css`.

Rekomendasi:
- Standarkan semua tautan internal ke path yang benar-benar ada.
- Tambahkan script link-check internal di CI untuk mendeteksi regresi.

## 3) Tingkatkan aksesibilitas (a11y)

- Ditemukan minimal satu elemen `<img>` tanpa atribut `alt` (`spin/index.html`).
- Rekomendasi:
  - Pastikan semua gambar dekoratif menggunakan `alt=""` dan gambar informatif memakai alt deskriptif.
  - Tambahkan pemeriksaan a11y otomatis (mis. pa11y/axe pada halaman utama).

## 4) Kurangi ketergantungan CDN tanpa fallback

Beberapa aset kritikal (font, icon, image) mengambil dari domain eksternal. Ini berisiko terhadap:
- Waktu muat awal jika koneksi lambat.
- Ketergantungan availability pihak ketiga.

Rekomendasi:
- Host aset inti (logo, ikon penting, font utama) secara lokal atau gunakan strategi fallback.
- Aktifkan cache policy eksplisit di `_headers` untuk aset statis.

## 5) Tambahkan baseline quality tooling (untuk maintainability)

Saat ini repo dominan statis dan belum terlihat pipeline quality yang konsisten.

Rekomendasi minimum:
- Tambahkan script `npm` sederhana untuk:
  - lint HTML/CSS/JS,
  - cek broken internal links,
  - format otomatis (opsional).
- Tambahkan workflow GitHub Actions agar setiap PR otomatis menjalankan checks.

## 6) Dokumentasi kontribusi teknis

README sudah informatif dari sisi profil proyek, namun belum ada panduan teknis operasional.

Rekomendasi:
- Tambahkan bagian:
  - cara menjalankan lokal (mis. `python -m http.server` atau dev server pilihan),
  - struktur folder penting,
  - checklist sebelum merge (lint, link check, manual smoke test mobile).

---

## Suggested Roadmap (2 minggu)

- **Minggu 1:** perbaikan HTML validity + broken links + alt text.
- **Minggu 2:** pasang quality checks otomatis + update dokumentasi kontribusi teknis.

Dengan dua tahap ini, kualitas teknis meningkat cepat tanpa mengubah karakter visual situs yang sudah ada.
