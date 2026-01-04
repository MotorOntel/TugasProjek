# ⚡ QUICK START - Upload ke GitHub dalam 5 Menit

Panduan cepat untuk langsung upload proyek ke GitHub tanpa ribet.

## ✅ Prerequisites (Sudah Ada?)

- [x] Akun GitHub (create di https://github.com jika belum)
- [x] Git installed (https://git-scm.com/download)

## 🚀 LANGKAH CEPAT (Copy-Paste)

### 1️⃣ Buka Terminal/PowerShell
```
Windows: Tekan Win+R, ketik "cmd" atau "powershell"
macOS: Command + Space, ketik "terminal"
Linux: Ctrl + Alt + T
```

### 2️⃣ Navigate ke Folder Project
```bash
cd E:\XAMPP\htdocs\TugasProjek
```

Atau jika berbeda lokasi:
```bash
cd /path/to/TugasProjek
```

### 3️⃣ Setup Git (First Time Only)
```bash
# Configure user
git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"

# Initialize repository
git init
```

### 4️⃣ Add & Commit Files
```bash
# Add semua files
git add .

# Create first commit
git commit -m "Initial commit: Website Program Studi Teknik Komputer"
```

### 5️⃣ Create Repository di GitHub
1. Buka https://github.com/new
2. **Repository name:** `TugasProjek` (atau nama lain)
3. **Description:** Website Program Studi Teknik Komputer (optional)
4. **Public atau Private:** Pilih sesuai preference
5. **Jangan** centang "Initialize repository"
6. Klik **"Create repository"**

### 6️⃣ Connect & Push (Copy dari GitHub)
GitHub akan menampilkan command. Copy salah satu:

**Jika menggunakan HTTPS (paling mudah):**
```bash
git remote add origin https://github.com/USERNAME/TugasProjek.git
git branch -M main
git push -u origin main
```

**Atau jika menggunakan SSH:**
```bash
git remote add origin git@github.com:USERNAME/TugasProjek.git
git branch -M main
git push -u origin main
```

**Ganti `USERNAME` dengan username GitHub Anda!**

### 7️⃣ Selesai! ✅
Buka https://github.com/USERNAME/TugasProjek untuk verify upload berhasil.

---

## 📋 Lengkap Command Sequence

Salin dan jalankan semua baris di bawah sekaligus:

```bash
cd E:\XAMPP\htdocs\TugasProjek

git config --global user.name "Nama Anda"
git config --global user.email "email@anda.com"

git init
git add .
git commit -m "Initial commit: Website Program Studi Teknik Komputer"

# Untuk HTTPS (replace USERNAME):
git remote add origin https://github.com/USERNAME/TugasProjek.git

# Atau untuk SSH (replace USERNAME):
# git remote add origin git@github.com:USERNAME/TugasProjek.git

git branch -M main
git push -u origin main
```

---

## ⚠️ Masalah Common & Solusi

### ❌ "fatal: not a git repository"
**Solusi:** Pastikan di folder TugasProjek
```bash
cd E:\XAMPP\htdocs\TugasProjek
git init
```

### ❌ "fatal: remote origin already exists"
**Solusi:** Remote sudah ada, remove dulu
```bash
git remote remove origin
# Lalu repeat step 6
```

### ❌ "Authentication failed"
**Solusi:** 
- Untuk HTTPS: Gunakan Personal Access Token (bukan password)
- Untuk SSH: Setup SSH key dulu (see GITHUB_UPLOAD_GUIDE.md)

### ❌ "fatal: A branch named 'main' already exists"
**Solusi:** Skip the branch rename
```bash
# Langsung
git push -u origin master
```

### ❌ Files tidak muncul di GitHub
**Solusi:** 
```bash
# Check status
git status

# Pastikan all files sudah staged
git add .
git status

# Commit
git commit -m "Add all files"

# Push
git push
```

---

## 📖 Dokumentasi Lengkap

Untuk detail lebih lanjut, baca:
- **[README.md](README.md)** - Dokumentasi lengkap proyek
- **[GITHUB_UPLOAD_GUIDE.md](GITHUB_UPLOAD_GUIDE.md)** - Panduan detail upload
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Ringkasan lengkap
- **[docs/API.md](docs/API.md)** - API documentation
- **[docs/SETUP.md](docs/SETUP.md)** - Setup & configuration

---

## 🎯 Setelah Upload, Apa Selanjutnya?

### 1. Share Repository Link
```
https://github.com/USERNAME/TugasProjek
```

### 2. Buat Release (Optional)
- Klik "Releases"
- "Create a new release"
- Tag: v1.0.0
- Title: Version 1.0.0
- Publish release

### 3. Enable GitHub Pages (Optional, untuk demo)
- Settings → Pages
- Source: main branch
- Publish
- Access di: https://USERNAME.github.io/TugasProjek

### 4. Add Collaborators (Team)
- Settings → Collaborators
- Add people
- Set permissions

### 5. Enable Issues & Discussions
- Settings → Features
- Centang "Issues"
- Centang "Discussions"

---

## 🔄 Untuk Update Selanjutnya

Setelah first push, untuk update berikutnya:

```bash
# 1. Make changes to files
# 2. Add changes
git add .

# 3. Commit
git commit -m "Description of changes"

# 4. Push
git push
```

---

## ✨ Tips & Tricks

### View repository locally
```bash
git log --oneline
```

### Create new branch untuk feature
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: Add new feature"
git push -u origin feature/new-feature
```

### View all branches
```bash
git branch -a
```

### Switch branch
```bash
git checkout main
```

---

## 🎓 Learning Resources

- **Git Basics:** https://git-scm.com/book/en/v2
- **GitHub Guides:** https://guides.github.com
- **GitHub Docs:** https://docs.github.com
- **Markdown Guide:** https://www.markdownguide.org/

---

## ❓ Frequently Asked

**Q: Harus membuat akun GitHub baru?**
A: Ya, jika belum punya. Gratis dan mudah!

**Q: Bagaimana jika sudah punya GitHub dan repository?**
A: Tinggal push ke existing repo dengan git push.

**Q: Apakah semua files ter-upload?**
A: Cek di GitHub, seharusnya semua files muncul plus .gitignore filtering.

**Q: Bisa akses files dari GitHub?**
A: Ya! Baik via website maupun clone ke komputer lain.

**Q: Berapa biaya?**
A: Gratis untuk public & private repos unlimited!

**Q: Aman?**
A: Ya! GitHub adalah platform terpercaya untuk code hosting.

---

## 🎉 Selamat!

Jika sukses upload, Anda sudah:
- ✅ Learning Git & GitHub
- ✅ Practicing version control
- ✅ Building portfolio
- ✅ Enabling collaboration
- ✅ Backing up code

---

**Happy Coding! 🚀**

*Questions? Read GITHUB_UPLOAD_GUIDE.md for detailed instructions*

---

Last Updated: 2024-01-15
