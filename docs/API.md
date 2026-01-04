# 🔌 API Documentation

Dokumentasi lengkap untuk semua endpoint PHP yang tersedia di aplikasi ini.

## Daftar Endpoint

### Autentikasi (Authentication)

#### 1. Login User
**Endpoint:** `POST /php/auth_login.php`

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Username atau password salah"
}
```

**Catatan:**
- Password disimpan dalam format plain text (untuk production gunakan bcrypt/hashing)
- Session dibuat setelah login berhasil
- User akan dialihkan ke halaman admin

---

#### 2. Check Current User
**Endpoint:** `GET /php/auth_me.php`

**Response (Logged In):**
```json
{
  "loggedIn": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

**Response (Not Logged In):**
```json
{
  "loggedIn": false,
  "message": "User tidak login"
}
```

**Catatan:**
- Menggunakan session PHP
- Dipanggil saat page load untuk cek status login
- Mengembalikan data user jika sudah login

---

#### 3. Logout User
**Endpoint:** `POST /php/auth_logout.php`

**Response:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

**Catatan:**
- Menghapus session pengguna
- Mengarahkan user ke halaman login

---

### Manajemen Artikel (Articles)

#### 4. Get All Articles
**Endpoint:** `GET /php/articles_get.php` (tanpa parameter)

**Response:**
```json
{
  "articles": [
    {
      "title": "Pengenalan Web Development",
      "slug": "pengenalan-web-development",
      "content": "Artikel tentang...",
      "category": "web",
      "author": "admin",
      "createdAt": "2024-01-15"
    }
  ]
}
```

---

#### 5. Get Single Article
**Endpoint:** `GET /php/articles_get.php?slug=pengenalan-web-development`

**Query Parameters:**
- `slug` (string, required) - Slug unik artikel

**Response:**
```json
{
  "success": true,
  "article": {
    "title": "Pengenalan Web Development",
    "slug": "pengenalan-web-development",
    "content": "Konten artikel...",
    "category": "web",
    "author": "admin",
    "createdAt": "2024-01-15"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Artikel tidak ditemukan"
}
```

---

#### 6. Save Article (Create/Update)
**Endpoint:** `POST /php/admin_save_article.php`

**Requirements:**
- User harus login sebagai admin

**Request:**
```json
{
  "title": "Judul Artikel Baru",
  "content": "Konten lengkap artikel...",
  "category": "web",
  "slug": "" // kosong untuk artikel baru, isi untuk update
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Artikel berhasil disimpan",
  "slug": "judul-artikel-baru"
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Anda harus login sebagai admin"
}
```

**Validasi:**
- Title: wajib diisi, min 3 karakter
- Content: wajib diisi, min 10 karakter
- Category: wajib dipilih

---

#### 7. Delete Article
**Endpoint:** `POST /php/articles_delete.php`

**Requirements:**
- User harus login sebagai admin

**Request:**
```json
{
  "slug": "judul-artikel-baru"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Artikel berhasil dihapus"
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Anda tidak memiliki akses"
}
```

---

### Manajemen User (Users)

#### 8. Get All Users
**Endpoint:** `GET /php/users_list.php`

**Requirements:**
- User harus login sebagai admin

**Response:**
```json
{
  "users": [
    {
      "username": "admin",
      "role": "admin",
      "createdAt": "2024-01-01"
    },
    {
      "username": "user1",
      "role": "user",
      "createdAt": "2024-01-10"
    }
  ]
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Akses ditolak"
}
```

---

#### 9. Save User (Create/Update)
**Endpoint:** `POST /php/users_save.php`

**Requirements:**
- User harus login sebagai admin

**Request:**
```json
{
  "username": "newuser",
  "password": "password123",
  "role": "user"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "User berhasil disimpan"
}
```

**Response Validation Error:**
```json
{
  "success": false,
  "message": "Username sudah terdaftar"
}
```

**Validasi:**
- Username: wajib, unik, min 3 karakter
- Password: wajib, min 6 karakter
- Role: "admin" atau "user"

---

#### 10. Delete User
**Endpoint:** `POST /php/users_delete.php`

**Requirements:**
- User harus login sebagai admin

**Request:**
```json
{
  "username": "user_to_delete"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "User berhasil dihapus"
}
```

**Catatan:**
- Tidak bisa menghapus user admin pertama
- Biasanya hanya admin root yang bisa menghapus admin lain

---

### Form Contact (Kontak)

#### 11. Submit Contact Form
**Endpoint:** `POST /php/process_form.php`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "081234567890",
  "subject": "informasi",
  "message": "Saya ingin mengetahui lebih lanjut tentang program studi ini"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Pesan berhasil dikirim"
}
```

**Response Validation Error:**
```json
{
  "success": false,
  "message": "Email harus diisi"
}
```

**Validasi:**
- Name: wajib, min 2 karakter
- Email: wajib, format valid
- Subject: wajib (informasi, pendaftaran, kerjasama, lainnya)
- Message: wajib, min 10 karakter
- Phone: opsional

**Fungsi:**
- Mengirim email ke admin
- Menyimpan log kontak
- Tidak memerlukan autentikasi

---

## JavaScript API Client

File `js/script.js` menyediakan object `api` untuk akses endpoint:

```javascript
// Login
api.login('admin', 'admin123').then(response => {
  console.log(response);
});

// Cek user sekarang
api.me().then(user => {
  console.log(user);
});

// Logout
api.logout().then(response => {
  console.log(response);
});

// Get artikel
api.getArticle('judul-artikel').then(data => {
  console.log(data.article);
});

// Delete artikel
api.deleteArticle('judul-artikel').then(response => {
  console.log(response);
});

// List users
api.listUsers().then(data => {
  console.log(data.users);
});

// Save user
api.saveUser('username', 'password', 'admin').then(response => {
  console.log(response);
});

// Delete user
api.deleteUser('username').then(response => {
  console.log(response);
});
```

---

## Error Handling

### HTTP Status Codes
- `200` - OK / Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (perlu login)
- `403` - Forbidden (tidak punya akses)
- `404` - Not Found
- `500` - Server Error

### Response Format
Semua endpoint mengembalikan JSON dengan struktur:
```json
{
  "success": true/false,
  "message": "pesan",
  "data": {} // optional
}
```

---

## Authentication & Authorization

### Session Management
- Menggunakan PHP sessions (`$_SESSION`)
- Session ID disimpan di cookies
- Session timeout: default 24 menit (bisa dikonfigurasi)

### Role-Based Access Control (RBAC)
```php
// Admin only
if (!isAdmin()) {
  return error("Akses ditolak");
}

// Check login
if (!checkLogin()) {
  return error("Harus login terlebih dahulu");
}
```

### Roles
- **admin** - Akses penuh ke semua fitur
- **user** - Hanya bisa view artikel dan submit form
- **root** - Super admin (jika ada)

---

## Rate Limiting & Security

Saat ini belum ada rate limiting. Untuk production:

```php
// Implementasi rate limiting
function checkRateLimit($ip, $limit = 10) {
  // Check apakah user sudah melampaui limit request
  // Contoh: max 10 requests per minute
}
```

---

## Contoh Implementasi

### Login dan Akses Protected Resource

```javascript
async function loginAndFetch() {
  // Login
  const login = await api.login('admin', 'admin123');
  
  if (login.success) {
    // Get user info
    const me = await api.me();
    console.log('User:', me.user);
    
    // Get articles
    const articles = await api.getArticle('some-article');
    console.log('Article:', articles.article);
  }
}
```

### Form Contact Submission

```javascript
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const response = await fetch('php/process_form.php', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  
  if (data.success) {
    alert('Pesan berhasil dikirim!');
    contactForm.reset();
  } else {
    alert('Error: ' + data.message);
  }
});
```

---

**Terakhir diperbarui:** 2024-01-15
