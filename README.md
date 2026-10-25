# Proyek Manajemen Produk UMKM & Manipulasi DOM

Proyek web interaktif ini dikembangkan untuk mengelola data produk Usaha Mikro, Kecil, dan Menengah (UMKM). Proyek ini merupakan implementasi dari tugas mata kuliah **Dasar Pemrograman Frontend (Pertemuan 4 & 5)** di STIKOM PGRI Banyuwangi, yang berfokus pada operasi CRUD (Create, Read, Update, Delete) dan manipulasi Document Object Model (DOM) secara dinamis.

## 🚀 Fitur Utama & Capaian Pembelajaran

Proyek ini telah memenuhi rubrik evaluasi Praktikum 5:

1. **Dynamic UI Rendering & DOM Creation**

   * Mengambil data dari `localStorage` (Array of Objects) dan mengubahnya menjadi deretan kartu produk (Card) dan baris tabel secara dinamis.

   * Menggunakan metode seleksi DOM modern seperti `document.querySelector` dan metode pembuatan elemen seperti `document.createElement` serta `append()`.

2. **Aksi Manipulasi DOM & Class (Interactive UI)**

   * Fitur hapus data secara langsung dari DOM menggunakan fungsi `remove()`.

   * Menggunakan `classList.add`, `classList.remove`, dan `classList.toggle` untuk memanipulasi gaya (styling) secara dinamis, seperti memunculkan notifikasi custom dan efek badge kategori.

   * Menyematkan atribut kustom (`data-id`) pada elemen untuk mengidentifikasi produk yang akan diedit atau dihapus.

3. **Transisi Visual & Feedback (UX)**

   * Notifikasi sukses/gagal (Custom Feedback) dibuat tanpa menggunakan `alert()` bawaan, melainkan disisipkan ke dalam DOM dengan efek transisi (hilang otomatis menggunakan `setTimeout`).

   * Fitur pencarian data (Live Search) bereaksi langsung ketika pengguna mengetik berkat event listener `'input'`.

4. **Persistensi Data (Local Storage)**

   * Semua perubahan data (Tambah, Edit, Hapus) disimpan secara permanen di dalam browser pengguna menggunakan Web Storage API (`localStorage`), sehingga data tidak hilang saat halaman di-refresh.

## 🛠️ Struktur Direktori Proyek

```
project-umkm/
│
├── index.html          # Halaman admin (Form CRUD, Tabel Data, Live Search)
├── katalog.html        # Halaman konsumen (Tampilan Card View produk dinamis)
├── README.md           # Dokumentasi proyek
└── assets/
    ├── css/
    │   └── style.css   # Berkas styling (CSS Grid, Flexbox, Transitions)
    └── js/
        ├── logic.js   # Logika CRUD, manipulasi tabel, dan interaksi halaman Admin
        └── katalog.js  # Logika render kartu produk (Dynamic UI) untuk halaman Katalog

```

## 💻 Cara Menjalankan Proyek

1. Unduh atau *clone* repositori proyek ini ke dalam komputer Anda.

2. Pastikan struktur folder sudah sesuai dengan diagram di atas.

3. Buka berkas `index.html` (untuk Admin) atau `katalog.html` (untuk melihat hasil produk) menggunakan browser modern (Chrome, Edge, atau Firefox).

4. Tidak memerlukan instalasi server lokal (XAMPP/Node.js). Anda bisa langsung menjalankannya, dan untuk melihat proses *debugging* atau struktur data, buka fitur **Developer Tools (F12) > tab Console**.

## 👨‍💻 Identitas Pengembang

* **Nama:** M N Jamal Thaariq

* **NIM:** 1125102212

* **Kelas:** SP3

* **Institusi:** STIKOM PGRI Banyuwangi

* **Mata Kuliah:** Dasar Pemrograman Frontend (KK112104)

> *"JavaScript digunakan untuk mengambil data, memeriksa data, menghitung data, dan memanipulasi antarmuka halaman web secara dinamis."*