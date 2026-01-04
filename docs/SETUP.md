# 🔧 Setup Guide - Panduan Instalasi & Konfigurasi

Panduan lengkap untuk menginstall dan mengkonfigurasi Website Program Studi Teknik Komputer.

## ✅ Prerequisites (Persyaratan)

Sebelum memulai, pastikan Anda memiliki:

- **PHP** versi 7.0 atau lebih tinggi
- **Apache** web server (disertakan di XAMPP)
- **XAMPP** atau web server alternatif lainnya
- **Browser** modern (Chrome, Firefox, Safari, Edge)
- **Git** (opsional, untuk cloning repository)
- **Text Editor** atau IDE (VS Code, Sublime Text, dll)

## 📦 Instalasi

### Langkah 1: Download/Clone Project

**Opsi A: Menggunakan Git**
```bash
cd E:\XAMPP\htdocs
git clone https://github.com/username/TugasProjek.git
cd TugasProjek
```

**Opsi B: Download ZIP**
1. Kunjungi GitHub repository
2. Klik tombol "Code" → "Download ZIP"
3. Extract ke `E:\XAMPP\htdocs\TugasProjek`

**Opsi C: Copy Manual**
1. Copy seluruh folder proyek
2. Paste ke `E:\XAMPP\htdocs\TugasProjek`

### Langkah 2: Verifikasi Struktur Folder

Pastikan struktur folder sudah benar:
```
E:\XAMPP\htdocs\TugasProjek\
├── index.html
├── about.html
├── articles.html
├── article.html
├── contact.html
├── admin.html
├── admin-login.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
├── php/
│   ├── auth_lib.php
│   ├── auth_login.php
│   ├── auth_logout.php
│   ├── auth_me.php
│   ├── process_form.php
│   ├── articles_get.php
│   ├── articles_delete.php
│   ├── admin_save_article.php
│   ├── users_list.php
│   ├── users_save.php
│   ├── users_delete.php
│   ├── contact_data.json
│   └── contact_logs.txt
├── data/
│   ├── articles.json
│   └── users.json
├── images/
└── docs/
    ├── API.md
    └── SETUP.md
```

### Langkah 3: Konfigurasi Permission File

File JSON dan TXT harus bisa ditulis oleh web server:

**Windows (XAMPP):**
Biasanya permission sudah otomatis. Jika ada error, buka file properties:
1. Klik kanan file → Properties
2. Tab Security → Edit
3. Berikan Full Control ke user Apache

**Linux/Mac:**
```bash
chmod 666 php/contact_data.json
chmod 666 php/contact_logs.txt
chmod 666 data/articles.json
chmod 666 data/users.json
```

### Langkah 4: Konfigurasi Email (Optional)

Edit file `php/process_form.php`, ubah email penerima:

```php
// Baris ~76
$to = 'email@anda.com';  // ← Ganti dengan email Anda
```

Untuk mengirim email via SMTP, konfigurasi PHP:

**php.ini (XAMPP):**
```ini
SMTP = smtp.gmail.com
smtp_port = 587
sendmail_from = your-email@gmail.com
```

### Langkah 5: Start XAMPP

1. Buka **XAMPP Control Panel**
2. Klik tombol **Start** untuk Apache
3. Status akan berubah menjadi "Running" (warna hijau)
4. MySQL opsional (kecuali jika akan menggunakan database)

## 🌐 Akses Website

### Buka di Browser
```
http://localhost/TugasProjek/
```

Atau gunakan IP address jika akses dari device lain:
```
http://192.168.1.100/TugasProjek/  (ganti IP sesuai network Anda)
```

### Verifikasi Website Berjalan
- [ ] Halaman Beranda (index.html) tampil dengan benar
- [ ] Menu navigasi berfungsi
- [ ] Responsive design bekerja di mobile
- [ ] Form kontak dapat diisi
- [ ] Animasi counter pada statistik berjalan

## 👨‍💻 Konfigurasi Admin User

### Default Credentials
```
Username: admin
Password: admin123
```

### Login ke Admin Panel
1. Akses `http://localhost/TugasProjek/admin-login.html`
2. Masukkan username dan password
3. Klik tombol Login
4. Jika berhasil, akan diarahkan ke `admin.html`

### Ganti Password Admin (Rekomendasi)

1. Login ke admin panel
2. Buka section "Manajemen User"
3. Edit user "admin" dan ubah password
4. Simpan perubahan

Atau edit manual di `data/users.json`:
```json
{
  "users": [
    {
      "username": "admin",
      "password": "password_baru",
      "role": "admin",
      "createdAt": "2024-01-01"
    }
  ]
}
```

## 🗂️ Inisialisasi Database

### Buat File Data (jika belum ada)

Aplikasi akan otomatis membuat file berikut saat pertama kali digunakan:
- `php/contact_data.json` - Database kontak form
- `php/contact_logs.txt` - Log kontak

Jika ingin membuat manual:

**data/users.json:**
```json
{
  "users": [
    {
      "username": "admin",
      "password": "admin123",
      "role": "admin",
      "createdAt": "2024-01-01"
    }
  ]
}
```

**data/articles.json:**
```json
{
  "articles": [
    {
      "title": "Selamat Datang",
      "slug": "selamat-datang",
      "content": "Ini adalah artikel pertama...",
      "category": "info",
      "author": "admin",
      "createdAt": "2024-01-01"
    }
  ]
}
```

## 🔍 Testing & Troubleshooting

### Test Koneksi PHP
Buat file `test.php` di folder proyek:
```php
<?php
echo "PHP berjalan dengan baik!";
echo "<br>Versi PHP: " . phpversion();
?>
```

Akses: `http://localhost/TugasProjek/test.php`

### Test JSON Files
Buat file `test-json.php`:
```php
<?php
header('Content-Type: application/json');

// Test membaca articles
$articles = json_decode(file_get_contents('data/articles.json'), true);
echo json_encode(['test' => 'berhasil', 'articles' => count($articles['articles'] ?? [])]);
?>
```

### Common Issues & Solutions

#### 1. **"404 Not Found"**
- [ ] Verifikasi folder path di `E:\XAMPP\htdocs\TugasProjek`
- [ ] Apache sudah di-start?
- [ ] Typo di URL?

#### 2. **"Permission Denied" saat submit form kontak**
```bash
# Windows
# Klik kanan file → Properties → Security → Edit → Full Control

# Linux/Mac
chmod 666 php/contact_data.json
chmod 666 php/contact_logs.txt
```

#### 3. **Login tidak bekerja / "Session not found"**
- [ ] Pastikan PHP session folder writable
- [ ] Check `php.ini`: `session.save_path` sudah benar
- [ ] Restart Apache
- [ ] Clear browser cookies

#### 4. **Email tidak terkirim dari form kontak**
- [ ] Konfigurasi SMTP di `php.ini`
- [ ] Ganti email penerima di `process_form.php`
- [ ] Gunakan email provider yang reliable (Gmail, SendGrid)
- [ ] Check file logs untuk error messages

#### 5. **JavaScript error di console**
```javascript
// Buka DevTools (F12) → Console
// Cari error messages
// Pastikan file js/script.js ada dan ter-load
```

#### 6. **CSS tidak tampil**
- [ ] Check file path di HTML: `<link rel="stylesheet" href="css/style.css">`
- [ ] Pastikan file `css/style.css` ada
- [ ] Clear browser cache (Ctrl+Shift+R)

#### 7. **Form tidak bisa submit**
- [ ] Check browser console untuk fetch errors
- [ ] Pastikan `php/process_form.php` accessible
- [ ] Validasi form input (semua field wajib)
- [ ] Check file permissions

### Debug Mode

Untuk menampilkan error PHP lebih detail, edit `php/auth_lib.php`:

```php
// Tambahkan di atas
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt');
```

### Check Server Logs

**XAMPP Error Log:**
```
E:\XAMPP\apache\logs\error.log
E:\XAMPP\apache\logs\access.log
```

## 🚀 Deployment ke Production

### Pre-Deployment Checklist

- [ ] Ganti default password admin
- [ ] Update email penerima form kontak
- [ ] Set `error_reporting(0)` untuk hide errors
- [ ] Backup data di `data/` dan `php/`
- [ ] Test semua fitur di local
- [ ] Optimize images di folder `images/`

### Rekomendasi Production Setup

1. **Gunakan Database Real (MySQL)**
   - Ganti JSON dengan MySQL untuk better performance
   - Implementasikan prepared statements untuk security

2. **Implement SSL/HTTPS**
   - Self-signed certificate atau Let's Encrypt
   - Update form action untuk HTTPS

3. **Security Hardening**
   - Password hashing dengan `bcrypt`
   - CSRF tokens untuk forms
   - Rate limiting untuk API
   - Input validation yang lebih ketat

4. **Performance Optimization**
   - Compression untuk CSS/JS (minify)
   - Cache strategy
   - CDN untuk images
   - Database indexing

5. **Monitoring & Logging**
   - Error logging ke file atau service
   - User activity logging
   - Performance monitoring

## 📚 Resources & Reference

### Dokumentasi Official
- [PHP Documentation](https://www.php.net/docs.php)
- [HTML5 Spec](https://html.spec.whatwg.org/)
- [CSS3 Reference](https://www.w3.org/Style/CSS/)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)

### Tools yang Berguna
- [XAMPP](https://www.apachefriends.org/)
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) - Testing API
- [DevTools](https://developer.chrome.com/docs/devtools/) - Browser debugging

### Community & Support
- GitHub Issues - Bug report & feature requests
- Stack Overflow - Q&A programming
- PHP Forum - PHP-specific questions

## 📝 File yang Perlu Diperhatikan

### Critical Files (Jangan dihapus)
- `index.html` - Halaman utama
- `css/style.css` - Stylesheet
- `js/script.js` - JavaScript
- `php/auth_lib.php` - Auth functions
- `php/process_form.php` - Form handler

### Generated Files (Auto-created)
- `php/contact_data.json` - Generated saat form dikirim
- `php/contact_logs.txt` - Generated saat form dikirim
- `data/articles.json` - Generated saat save artikel
- `data/users.json` - Generated saat save user

### Safe to Delete
- `test.php` - Test files (jika dibuat)
- `.git/` - Git history (jika di-clone)
- `node_modules/` - Dependencies (jika ada)

## 🎯 Next Steps

1. Setelah instalasi berhasil, read [README.md](../README.md)
2. Explore API documentation di [API.md](./API.md)
3. Customize website sesuai kebutuhan:
   - Update logo dan branding
   - Tambah artikel dan konten
   - Konfigurasi email
4. Deploy ke production
5. Maintain & update secara berkala

---

**Pertanyaan? Buka issue di GitHub atau hubungi tim support.**

*Last updated: 2024-01-15*
