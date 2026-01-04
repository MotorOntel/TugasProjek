# 🎓 Website Program Studi Teknik Komputer

Website profesional untuk Program Studi Teknik Komputer yang dibangun menggunakan **HTML5**, **CSS3**, **JavaScript**, dan **PHP**. Proyek ini menampilkan informasi program studi dengan fitur-fitur interaktif dan sistem manajemen konten.

## 📋 Daftar Isi
- [Gambaran Umum](#gambaran-umum)
- [Fitur Utama](#-fitur-utama)
- [Struktur Proyek](#-struktur-proyek)
- [Penjelasan File](#-penjelasan-file)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Instalasi & Konfigurasi](#-instalasi--konfigurasi)
- [Cara Menggunakan](#-cara-menggunakan)

## Gambaran Umum

Website ini adalah portal informasi lengkap untuk Program Studi Teknik Komputer yang mencakup:
- Informasi umum dan visi-misi program studi
- Daftar bidang keahlian dan kompetensi lulusan
- Halaman artikel dan blog untuk berbagi pengetahuan
- Form kontak untuk komunikasi dengan pengunjung
- Panel admin untuk mengelola artikel dan pengguna
- Sistem autentikasi pengguna (login/logout)

## 🚀 Fitur Utama

### 1. **Halaman Beranda (index.html)**
   - Hero section dengan tagline yang menarik
   - Menampilkan 6 bidang keahlian utama Teknik Komputer
   - Statistik program studi dengan animasi counter
   - Layout responsif yang menyesuaikan dengan ukuran layar
   - Call-to-action buttons untuk navigasi

### 2. **Halaman Tentang (about.html)**
   - Visi dan Misi program studi
   - Kompetensi lulusan yang detail
   - Fasilitas dan infrastruktur yang tersedia
   - Informasi kontak lengkap
   - Daftar penghargaan (jika ada)

### 3. **Halaman Artikel (articles.html)**
   - Menampilkan daftar artikel yang dipublikasikan
   - Fitur pencarian dan filter artikel
   - Card layout yang menarik untuk setiap artikel
   - Link ke halaman detail artikel
   - Admin dapat menambah/edit/hapus artikel

### 4. **Halaman Detail Artikel (article.html)**
   - Menampilkan konten lengkap artikel
   - Meta informasi (penulis, tanggal publikasi, kategori)
   - Tombol edit dan delete untuk admin
   - Form edit artikel inline

### 5. **Halaman Kontak (contact.html)**
   - Form kontak lengkap dengan validasi client-side
   - Informasi kontak: alamat, email, telepon
   - Proses data ke backend PHP
   - Notifikasi sukses/error
   - Log sistem untuk tracking data kontak

### 6. **Panel Admin (admin.html & admin-login.html)**
   - Autentikasi pengguna dengan login
   - Dashboard untuk mengelola artikel
   - Manajemen user (create, read, update, delete)
   - Form upload/edit artikel
   - Session management yang aman
   - Hak akses berbasis role (admin/root)

## 📁 Struktur Proyek

```
TugasProjek/
├── index.html                    # Halaman utama
├── about.html                    # Halaman informasi program studi
├── articles.html                 # Halaman daftar artikel
├── article.html                  # Halaman detail artikel
├── contact.html                  # Halaman kontak
├── admin.html                    # Dashboard admin
├── admin-login.html              # Halaman login admin
├── README.md                     # Dokumentasi proyek
│
├── css/
│   └── style.css                 # Stylesheet untuk seluruh website
│
├── js/
│   └── script.js                 # Script JavaScript untuk interaktivitas
│
├── php/
│   ├── auth_lib.php              # Library fungsi autentikasi
│   ├── auth_login.php            # Handler login pengguna
│   ├── auth_logout.php           # Handler logout pengguna
│   ├── auth_me.php               # Endpoint untuk cek session pengguna
│   ├── process_form.php          # Memproses form kontak
│   ├── articles_get.php          # Mengambil data artikel
│   ├── articles_delete.php       # Menghapus artikel
│   ├── admin_save_article.php    # Menyimpan/update artikel
│   ├── users_list.php            # Menampilkan daftar pengguna
│   ├── users_save.php            # Menyimpan/update pengguna
│   ├── users_delete.php          # Menghapus pengguna
│   ├── contact_data.json         # Database artikel dan kontak
│   └── contact_logs.txt          # Log kontak yang masuk
│
├── data/
│   ├── articles.json             # Data artikel (backup)
│   └── users.json                # Data pengguna terdaftar
│
└── images/                       # Folder untuk menyimpan gambar
```

## 🔍 Penjelasan File

### **File HTML**

#### [index.html](index.html)
Halaman utama website yang menampilkan:
- Header dengan navigasi menu
- Hero section dengan welcome message
- Bagian bidang keahlian (6 kotak feature)
- Statistik program studi dengan animasi counter
- Footer dengan informasi kontak

**Struktur:**
- `<header>` - Navbar dengan logo dan menu navigasi
- `<section class="hero">` - Banner utama dengan tagline
- `<section class="features">` - Grid 6 bidang keahlian
- `<section class="stats">` - Statistik dengan angka animasi
- `<footer>` - Informasi footer

#### [about.html](about.html)
Halaman informasi detail tentang program studi:
- Visi dan Misi
- Kompetensi lulusan
- Fasilitas pendidikan
- Kontak dan lokasi

#### [articles.html](articles.html)
Halaman yang menampilkan daftar semua artikel:
- Grid layout untuk artikel cards
- Fitur pencarian artikel
- Filter berdasarkan kategori
- Admin dapat menambah artikel baru

#### [article.html](article.html)
Halaman detail untuk membaca artikel lengkap:
- Judul dan metadata artikel
- Konten artikel
- Tombol edit dan delete (untuk admin)
- Form edit inline (untuk admin)
- Form komentar (jika ada)

#### [contact.html](contact.html)
Halaman kontak dengan form pengunjung:
- Form dengan input: nama, email, telepon, subjek, pesan
- Validasi client-side
- Kirim data ke PHP backend
- Tampil success/error message
- Info kontak statis

#### [admin-login.html](admin-login.html)
Halaman login untuk masuk ke panel admin:
- Form input username dan password
- Validasi form dasar
- Redirect ke admin.html setelah login

#### [admin.html](admin.html)
Dashboard admin untuk mengelola website:
- Area untuk menampilkan artikel
- Form input artikel baru
- Tabel daftar artikel dengan tombol edit/delete
- Manajemen pengguna
- Info user yang sedang login
- Tombol logout

### **File CSS**

#### [css/style.css](css/style.css)
File styling utama berisi:
- **Root variables** - Warna dan ukuran dasar (1-20px)
- **Reset & Base** - Margin, padding, box-sizing
- **Header & Navigation** - Styling navbar dan menu
- **Responsive Design** - Media queries untuk mobile, tablet, desktop
- **Typography** - Font size, weight, dan spacing
- **Colors** - Sistem warna: primary, secondary, success, error
- **Components** - Button, card, form, input, dll
- **Animations** - Hover effects, transitions, keyframes

**Fitur CSS:**
- Flexbox dan CSS Grid untuk layout
- CSS Custom Properties (variables)
- Responsive breakpoints di 768px, 1024px, 1200px
- Smooth transitions dan animations
- Dark mode ready (CSS variable based)

### **File JavaScript**

#### [js/script.js](js/script.js)
File JavaScript untuk interaktivitas berisi ~742 baris kode:

**API Functions (Admin):**
- `api.login()` - Login pengguna
- `api.logout()` - Logout pengguna
- `api.me()` - Cek session pengguna
- `api.saveUser()` - Simpan/update user
- `api.deleteUser()` - Hapus user
- `api.listUsers()` - Ambil daftar user
- `api.getArticle()` - Ambil data artikel
- `api.deleteArticle()` - Hapus artikel

**Fitur Interaktivitas:**
- **Mobile Menu** - Toggle hamburger menu pada mobile
- **Counter Animation** - Animasi angka di statistik
- **Form Validation** - Validasi form kontak client-side
- **Session Management** - Cek dan kelola session admin
- **Toast Notifications** - Notifikasi untuk user feedback
- **Intersection Observer** - Lazy loading dan trigger animasi

**Struktur Kode:**
```javascript
// API object untuk komunikasi dengan backend
const api = { me, login, logout, saveUser, deleteUser, ... };

// Mobile menu toggle
hamburger.addEventListener('click', toggleMenu);

// Animated counter untuk statistik
animateCounter(element);

// Form validation
validateForm(formData);

// Admin functions
handleLogin(), handleLogout(), loadArticles(), etc.
```

### **File PHP**

#### [php/auth_lib.php](php/auth_lib.php)
Library fungsi autentikasi:
- Inisialisasi session PHP
- Fungsi check login
- Fungsi login user
- Fungsi logout user
- Fungsi cek role admin

```php
function checkLogin() - Verifikasi user sudah login
function loginUser($username, $password) - Login dengan username/password
function logoutUser() - Logout dan destroy session
function isAdmin() - Cek apakah user adalah admin
function getCurrentUser() - Ambil data user sekarang
```

#### [php/auth_login.php](php/auth_login.php)
Endpoint login pengguna:
- Terima POST request dengan username dan password
- Validasi kredensial terhadap users.json
- Buat session jika valid
- Return JSON response success/error

**Alur:**
1. Terima username & password dari form
2. Load data users dari users.json
3. Cari user yang cocok
4. Verifikasi password (plain atau hashed)
5. Set $_SESSION['user']
6. Return success atau error message

#### [php/auth_logout.php](php/auth_logout.php)
Endpoint logout pengguna:
- Destroy session
- Clear cookies
- Return success message

#### [php/auth_me.php](php/auth_me.php)
Endpoint untuk cek status login:
- Return data user jika sudah login
- Return error jika belum login
- Digunakan AJAX untuk cek session

**Response JSON:**
```json
{ "loggedIn": true, "user": { "username": "...", "role": "..." } }
```

#### [php/process_form.php](php/process_form.php) (167 baris)
Memproses data form kontak:
- Validasi input (nama, email, subjek, pesan)
- Sanitasi data untuk keamanan
- Kirim email notifikasi
- Simpan log kontak
- Return JSON response

**Fungsi:**
```php
sanitizeInput($data) - Hapus script dan HTML
validateEmail($email) - Verifikasi format email
sendEmail($to, $subject, $message) - Kirim email
saveContactLog($data) - Simpan ke log file
```

**Validasi:**
- Nama: wajib diisi
- Email: wajib diisi dan format valid
- Subjek: wajib dipilih (informasi, pendaftaran, kerjasama, lainnya)
- Pesan: minimal 10 karakter

#### [php/articles_get.php](php/articles_get.php)
Mengambil data artikel:
- Load articles.json
- Ambil satu artikel berdasarkan slug
- Return data artikel sebagai JSON
- Return error jika artikel tidak ada

#### [php/articles_delete.php](php/articles_delete.php)
Menghapus artikel (admin only):
- Cek login dan role admin
- Hapus artikel dari articles.json
- Update file JSON
- Return success/error message

#### [php/admin_save_article.php](php/admin_save_article.php)
Menyimpan/update artikel (admin only):
- Cek login dan role admin
- Validasi input (judul, konten, kategori)
- Generate slug dari judul
- Simpan atau update artikel
- Return success message

**Input:**
- title (string) - Judul artikel
- content (text) - Isi konten
- category (string) - Kategori artikel
- slug (string, optional) - Slug unik

#### [php/users_list.php](php/users_list.php)
Menampilkan daftar pengguna:
- Cek login dan role admin
- Load users.json
- Return array semua user
- Tampilkan username, role, dan tanggal dibuat

#### [php/users_save.php](php/users_save.php)
Menyimpan/update pengguna:
- Cek login dan role admin
- Validasi input username dan password
- Simpan user baru atau update user existing
- Update file users.json

**Input:**
- username (string) - Username unik
- password (string) - Password user
- role (string) - Role (admin atau user)

#### [php/users_delete.php](php/users_delete.php)
Menghapus pengguna:
- Cek login dan role admin
- Hapus user dari users.json
- Update file JSON
- Return success/error message

### **File Data**

#### [data/articles.json](data/articles.json)
File database artikel dalam format JSON:
```json
{
  "articles": [
    {
      "title": "...",
      "slug": "...",
      "content": "...",
      "category": "...",
      "author": "...",
      "createdAt": "..."
    }
  ]
}
```

#### [data/users.json](data/users.json)
File database pengguna:
```json
{
  "users": [
    {
      "username": "...",
      "password": "...",
      "role": "admin|user",
      "createdAt": "..."
    }
  ]
}
```

#### [php/contact_logs.txt](php/contact_logs.txt)
Log file untuk tracking kontak yang masuk:
- Setiap kontak dicatat dengan timestamp
- Format: Nama | Email | Tanggal | Status

#### [php/contact_data.json](php/contact_data.json)
Database kontak dalam format JSON:
```json
{
  "contacts": [
    {
      "name": "...",
      "email": "...",
      "phone": "...",
      "subject": "...",
      "message": "...",
      "createdAt": "..."
    }
  ]
}
```

## 🛠 Teknologi yang Digunakan

### Frontend
- **HTML5** - Semantic markup dan struktur
- **CSS3** - Styling responsif dengan Flexbox, Grid, dan Custom Properties
- **JavaScript (ES6+)** - DOM manipulation, Fetch API, Async/Await

### Backend
- **PHP 7+** - Server-side processing
- **JSON** - Format data untuk database sederhana
- **File System** - Penyimpanan data menggunakan file JSON

### Tools & Platforms
- **Apache/XAMPP** - Web server
- **Git** - Version control
- **VS Code** - Code editor
- **GitHub** - Repository hosting

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Fitur Keamanan

1. **Input Sanitization** - `htmlspecialchars()`, `trim()`, `stripslashes()`
2. **Email Validation** - `filter_var()` dengan FILTER_VALIDATE_EMAIL
3. **Session Management** - `session_start()`, `session_destroy()`
4. **CORS Protection** - Same-origin requests hanya
5. **CSRF Prevention** - Token verification (optional)
6. **Access Control** - Role-based access untuk admin functions

## 📱 Responsive Design

Website ini fully responsive dengan breakpoints:
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3+ columns)

## ⚙️ Instalasi & Konfigurasi

### Prerequisites
- PHP 7.0 atau lebih tinggi
- Apache/XAMPP server
- Browser modern

### Instalasi

1. **Clone/Download Repository**
```bash
git clone https://github.com/username/TugasProjek.git
cd TugasProjek
```

2. **Letakkan di folder XAMPP**
```
E:\XAMPP\htdocs\TugasProjek\
```

3. **Buat folder data (jika belum ada)**
```bash
mkdir -p data php
```

4. **Set permission untuk file JSON (jika perlu)**
```bash
chmod 666 data/articles.json
chmod 666 data/users.json
chmod 666 php/contact_data.json
```

5. **Konfigurasi Email (di process_form.php)**
```php
$to = 'email@anda.com';  // Ganti dengan email Anda
```

6. **Start XAMPP**
- Buka XAMPP Control Panel
- Start Apache dan MySQL (jika diperlukan)

7. **Akses Website**
```
http://localhost/TugasProjek/
```

### Default User Admin
Username: `admin`
Password: `admin123` (ganti setelah login pertama)

## 📖 Cara Menggunakan

### Sebagai Pengunjung Umum
1. Kunjungi homepage untuk melihat informasi program studi
2. Baca halaman "Tentang" untuk detail lengkap
3. Lihat artikel di halaman "Artikel"
4. Hubungi kami melalui form di halaman "Kontak"

### Sebagai Admin
1. Buka admin-login.html
2. Login dengan username dan password admin
3. Manage artikel: tambah, edit, atau hapus
4. Manage user: buat, ubah, atau hapus user
5. Logout setelah selesai

### Manajemen Artikel
- **Tambah**: Isi form di admin panel, klik "Simpan"
- **Edit**: Klik tombol edit di artikel yang ingin diubah
- **Hapus**: Klik tombol delete dan konfirmasi

## 🤝 Kontribusi

Untuk kontribusi:
1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -am 'Tambah fitur baru'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file LICENSE untuk detail lebih lanjut.

## 📧 Kontak & Support

- Email: info@teknikomputer.ac.id
- Website: https://www.teknikomputer.ac.id
- Issues: Buka issue di GitHub untuk melaporkan bug atau request fitur

## 📚 Dokumentasi Tambahan

- [Setup Guide](docs/SETUP.md)
- [API Documentation](docs/API.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

---

**Dibuat dengan ❤️ untuk Program Studi Teknik Komputer**   - **PHP**: Backend untuk memproses form kontak

## 📋 Cara Menggunakan

### Opsi 1: Menjalankan dengan PHP Built-in Server

1. Buka terminal/command prompt
2. Navigate ke folder proyek:
   ```bash
   cd "e:\KULIAH UTDI\Semester 3\Pemrograman FrontEnd\Tugas Projek"
   ```
3. Jalankan PHP server:
   ```bash
   php -S localhost:8000
   ```
4. Buka browser dan akses: `http://localhost:8000`

### Opsi 2: Menggunakan XAMPP/WAMP

1. Copy folder proyek ke direktori `htdocs` (XAMPP) atau `www` (WAMP)
2. Start Apache server dari XAMPP/WAMP Control Panel
3. Buka browser dan akses: `http://localhost/Tugas%20Projek/`

### Opsi 3: Hanya HTML (Tanpa PHP)

1. Buka file `index.html` langsung di browser
2. **Catatan**: Form kontak tidak akan berfungsi tanpa PHP server

## 🔧 Fitur JavaScript

- **Mobile Menu**: Hamburger menu untuk navigasi di perangkat mobile
- **Animated Counter**: Angka statistik yang beranimasi saat scroll
- **Form Validation**: Validasi real-time untuk form kontak
- **Smooth Scroll**: Animasi scroll yang halus
- **Scroll Animations**: Elemen muncul dengan animasi saat di-scroll

## 📧 Form Kontak

Form kontak memiliki fitur:
- Validasi client-side (JavaScript)
- Validasi server-side (PHP)
- Sanitasi input untuk keamanan
- Menyimpan data ke file JSON
- Logging ke file text
- Response JSON untuk feedback ke user

### Field Form:
- Nama Lengkap (wajib)
- Email (wajib, dengan validasi format)
- Nomor Telepon (opsional)
- Subjek (wajib, dropdown)
- Pesan (wajib, minimal 10 karakter)

## 🎨 Desain

- **Color Scheme**: Biru (primary), dengan accent colors
- **Font**: Segoe UI (sistem font)
- **Layout**: Responsive grid dan flexbox
- **Animations**: CSS transitions dan keyframe animations

## 📱 Responsive Design

Website fully responsive untuk:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔒 Keamanan

- Input sanitization di PHP
- HTML special characters encoding
- SQL injection prevention (tidak ada database SQL)
- XSS protection

## 📝 Catatan

- File `contact_logs.txt` dan `contact_data.json` akan dibuat otomatis di folder `php/` saat form pertama kali disubmit
- Untuk mengirim email sungguhan, uncomment bagian `mail()` di `process_form.php` dan konfigurasikan mail server
- Pastikan PHP memiliki write permission untuk folder `php/`

## 🎓 Tujuan Pembelajaran

Proyek ini dibuat untuk memenuhi tugas dengan kriteria:
1. ✅ Website sederhana sesuai bidang Program Studi Teknik Komputer
2. ✅ Integrasi HTML, CSS, dan JavaScript
3. ✅ Form HTML terhubung ke PHP
4. ✅ Struktur folder proyek yang rapi

## 👨‍💻 Pengembangan Lebih Lanjut

Ide untuk pengembangan:
- Tambahkan database MySQL untuk menyimpan data
- Implementasi sistem admin untuk melihat pesan
- Tambahkan galeri foto
- Integrasi dengan Google Maps untuk lokasi
- Newsletter subscription
- Blog/artikel

## 📄 License

Proyek ini dibuat untuk tujuan pembelajaran.

---

**Dibuat dengan ❤️ untuk Program Studi Teknik Komputer**
