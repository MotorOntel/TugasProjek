# 🚀 Panduan Upload ke GitHub

Panduan langkah-demi-langkah untuk upload project Website Program Studi Teknik Komputer ke GitHub.

## 📋 Syarat Awal

Sebelum memulai, pastikan Anda memiliki:

- [x] Akun GitHub (buat di https://github.com/signup jika belum)
- [x] Git terinstall di komputer (download dari https://git-scm.com)
- [x] Akses ke folder project TugasProjek
- [x] Terminal/Command Prompt
- [x] SSH key atau Personal Access Token (untuk autentikasi)

## 🔑 Setup GitHub Authentication

### Opsi 1: Menggunakan SSH Key (Recommended)

#### Step 1: Generate SSH Key
```bash
# Di terminal, ketik:
ssh-keygen -t ed25519 -C "email@anda.com"

# Atau jika ED25519 tidak didukung:
ssh-keygen -t rsa -b 4096 -C "email@anda.com"
```

**Proses:**
1. Press Enter untuk folder default
2. Press Enter untuk no passphrase (atau set passphrase)
3. SSH key akan tersimpan di `~/.ssh/id_ed25519.pub`

#### Step 2: Copy SSH Key
```bash
# Windows (PowerShell)
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# macOS
cat ~/.ssh/id_ed25519.pub | pbcopy

# Linux
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard
```

#### Step 3: Add SSH Key ke GitHub
1. Buka https://github.com/settings/keys
2. Klik "New SSH key"
3. Paste SSH key yang sudah di-copy
4. Beri title: "My Computer"
5. Klik "Add SSH key"

#### Step 4: Test Connection
```bash
ssh -T git@github.com
# Output: Hi USERNAME! You've successfully authenticated...
```

### Opsi 2: Menggunakan Personal Access Token

#### Step 1: Create Token
1. Buka https://github.com/settings/tokens
2. Klik "Generate new token"
3. Select scopes: repo, workflow, gist
4. Generate token

#### Step 2: Save Token
```bash
# Simpan token di tempat aman (tidak perlu di-share)
# Nanti digunakan sebagai password untuk git
```

### Opsi 3: Menggunakan GitHub Credentials

```bash
# Setup git credential helper
git config --global credential.helper store

# Nanti saat git push, masukkan username dan password
```

## 📝 Setup Project di Local

### Step 1: Initialize Git Repository
```bash
# Navigate ke folder project
cd E:\XAMPP\htdocs\TugasProjek

# Initialize git
git init

# Check status
git status
```

### Step 2: Configure Git User
```bash
# Set user email (global)
git config --global user.email "email@anda.com"

# Set user name (global)
git config --global user.name "Nama Anda"

# Atau setup hanya untuk project ini (local)
git config user.email "email@anda.com"
git config user.name "Nama Anda"
```

### Step 3: Add Files ke Git
```bash
# Add semua files
git add .

# Atau add specific files
git add README.md
git add css/
git add js/

# Check status
git status
```

### Step 4: Create Initial Commit
```bash
# Commit dengan message
git commit -m "Initial commit: Add Website Program Studi Teknik Komputer"

# Atau lebih detail
git commit -m "feat: Initial project setup with all features"
```

## 📦 Create Repository di GitHub

### Step 1: Login ke GitHub
1. Buka https://github.com/login
2. Masukkan username dan password
3. Login

### Step 2: Create New Repository
1. Klik "+" di top-right → "New repository"
2. Atau buka https://github.com/new

### Step 3: Configure Repository

**Repository name:**
```
TugasProjek
```
atau
```
Website-Teknik-Komputer
```

**Description (opsional):**
```
Website Program Studi Teknik Komputer dengan HTML, CSS, JavaScript, dan PHP
```

**Privacy:**
- Pilih "Public" jika ingin semua orang bisa akses
- Pilih "Private" jika ingin private

**Initialize repository:**
- ❌ Jangan centang "Add a README file"
- ❌ Jangan centang ".gitignore"
- ❌ Jangan centang "license"
(Sudah punya file-file ini di local)

### Step 4: Create Repository
Klik "Create repository" button

## 🔗 Connect Local Repository ke GitHub

### Step 1: Add Remote Origin

**Jika menggunakan SSH (recommended):**
```bash
git remote add origin git@github.com:USERNAME/TugasProjek.git
```

**Jika menggunakan HTTPS:**
```bash
git remote add origin https://github.com/USERNAME/TugasProjek.git
```

**Ganti USERNAME dengan username GitHub Anda!**

### Step 2: Rename Branch (optional)
```bash
# Rename master ke main (GitHub default)
git branch -M main
```

### Step 3: Verify Remote
```bash
git remote -v
# Output:
# origin  git@github.com:USERNAME/TugasProjek.git (fetch)
# origin  git@github.com:USERNAME/TugasProjek.git (push)
```

## 🚀 Push ke GitHub

### First Push (Create & Push)
```bash
# Push branch main ke origin
git push -u origin main

# -u flag untuk set upstream tracking
# Nanti bisa hanya git push tanpa parameter
```

**Untuk SSH:** 
- Jika setup SSH key dengan passphrase, mungkin diminta enter passphrase

**Untuk HTTPS:**
- Diminta username dan password
- Gunakan token yang sudah generate sebelumnya sebagai password

### Subsequent Pushes
```bash
# Cukup ketik
git push

# Atau explicit
git push origin main
```

## ✅ Verifikasi Upload

### Check di GitHub UI
1. Buka https://github.com/USERNAME/TugasProjek
2. Pastikan semua files sudah ter-upload
3. Check commit history (semua commits muncul)
4. Check branches (main/master tersedia)

### Check Specific Files
```bash
# Lihat daftar files di repository
git ls-files

# Lihat commit history
git log --oneline

# Lihat status
git status
```

## 📋 Update README di GitHub

Jika belum ada README.md di repository:

### Option 1: Edit di GitHub UI
1. Klik "Add file" → "Create new file"
2. Name: `README.md`
3. Paste isi README dari file lokal
4. Commit changes

### Option 2: Push dari Local
(Sudah ada README.md, jadi sudah included di push pertama)

## 🔄 Workflow Setelah Initial Push

### Untuk Setiap Update

```bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Commit changes
git commit -m "feat: Add new feature" 
# atau
git commit -m "fix: Fix bug in contact form"

# 4. Push ke GitHub
git push
```

### Untuk Membuat Branch Baru

```bash
# 1. Create dan switch ke branch baru
git checkout -b feature/nama-fitur

# 2. Make changes dan commit
git add .
git commit -m "feat: New feature"

# 3. Push branch baru
git push -u origin feature/nama-fitur

# 4. Di GitHub, create Pull Request untuk merge ke main
```

## 🆘 Troubleshooting

### Error: "fatal: remote origin already exists"
```bash
# Jika sudah ada remote, remove dulu
git remote remove origin

# Atau rename
git remote rename origin old-origin

# Lalu add yang baru
git remote add origin https://...
```

### Error: "fatal: not a git repository"
```bash
# Pastikan sudah di folder project
cd E:\XAMPP\htdocs\TugasProjek

# Initialize git jika belum
git init
```

### Error: "Permission denied (publickey)"
- Pastikan SSH key sudah di-add di GitHub settings
- Test connection: `ssh -T git@github.com`
- Atau gunakan HTTPS dengan token

### Error: "Authentication failed"
- Verify username dan token/password correct
- Untuk HTTPS, gunakan Personal Access Token, bukan password GitHub
- Untuk SSH, ensure SSH key ter-setup dengan benar

### Commit tidak muncul di GitHub
```bash
# Check remote
git remote -v

# Push explicitly
git push origin main

# Atau cek log
git log origin/main
```

### Ingin hapus file dari repository (sudah di-commit)
```bash
# Remove file dari tracking (tapi keep di local)
git rm --cached filename

# Atau remove dari everywhere
git rm filename

# Commit changes
git commit -m "Remove sensitive file"

# Push
git push
```

## 🔒 Security Best Practices

### Jangan Commit Sensitive Data:
- ❌ Password, API keys, tokens
- ❌ Private configuration files
- ❌ Database credentials
- ✅ Gunakan .env.example tanpa values

### Files yang Perlu .gitignore:
```
.env
.env.local
*.key
*.pem
secrets.json
config/secrets.php
```

### Jika Accidentally Committed Sensitive Data:
```bash
# Remove dari history (requires force push)
git filter-branch --tree-filter 'rm -f passwords.txt' -- --all

# Force push (hati-hati!)
git push origin --force

# Atau di latest commit
git reset HEAD~1
git reset path/to/file
# Edit file, remove sensitive data
git commit -m "Remove sensitive data"
git push
```

## 📊 Repository Statistics

Setelah push, GitHub akan automatically calculate:
- Total commits
- Lines of code
- Languages breakdown
- Contributor activity

## 🎯 Next Steps

1. **Share repository link:**
   ```
   https://github.com/USERNAME/TugasProjek
   ```

2. **Add collaborators (optional):**
   - Settings → Collaborators
   - Invite team members

3. **Setup GitHub Pages (optional):**
   - Settings → Pages
   - Deploy static HTML files

4. **Create releases (optional):**
   - Releases tab
   - Tag versions
   - Add changelogs

5. **Enable GitHub Actions (optional):**
   - Workflow untuk testing
   - Auto-deploy
   - Code quality checks

## 📚 Resources

- [GitHub Help](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub SSH Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [GitHub HTTPS](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories)

## 💡 Tips & Tricks

### View Remote Repository
```bash
git remote -v
```

### Change Remote URL
```bash
git remote set-url origin https://github.com/USERNAME/NewName.git
```

### Clone Repository (untuk testing)
```bash
git clone https://github.com/USERNAME/TugasProjek.git
```

### View Branch
```bash
git branch -a
```

### Merge Branches
```bash
git checkout main
git merge feature/nama-fitur
```

---

## Checklist Upload ke GitHub

- [ ] Akun GitHub sudah dibuat
- [ ] Git sudah terinstall
- [ ] SSH key atau token sudah setup
- [ ] Git config (user.name, user.email) sudah diatur
- [ ] Repository sudah dibuat di GitHub
- [ ] Local repository sudah di-initialize
- [ ] Semua files sudah di-add dan di-commit
- [ ] Remote origin sudah di-set
- [ ] Sudah push ke GitHub
- [ ] Verify files muncul di GitHub website
- [ ] Share repository link dengan team

---

**Selamat! 🎉 Repository Anda sudah di-upload ke GitHub!**

Gunakan GitHub untuk:
- Version control
- Collaboration dengan team
- Backup kode
- Project management
- Showcase portfolio

---

*Last updated: 2024-01-15*
*Panduan lengkap untuk upload Website Program Studi Teknik Komputer ke GitHub*
