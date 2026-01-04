# 🤝 Contributing Guide

Terima kasih telah tertarik untuk berkontribusi pada proyek Website Program Studi Teknik Komputer! Panduan ini menjelaskan bagaimana cara berkontribusi dengan baik.

## 📋 Daftar Isi
- [Code of Conduct](#code-of-conduct)
- [Cara Berkontribusi](#cara-berkontribusi)
- [Proses Development](#proses-development)
- [Git Workflow](#git-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

### Komitmen Kami
Kami berkomitmen untuk menyediakan lingkungan yang ramah dan inklusif bagi semua orang. Kami menghormati:
- Pendapat dan ide yang berbeda
- Komentar konstruktif dan feedback
- Kolaborasi yang sehat antar contributor

### Perilaku yang Tidak Diterima
- Harassment, bullying, atau diskriminasi
- Spam atau konten yang tidak relevan
- Pencurian ide atau plagiarism
- Aktivitas ilegal atau tidak etis

## Cara Berkontribusi

### 1. Melaporkan Bug
Jika menemukan bug, silahkan buat issue dengan format:

**Title:** `[BUG] Deskripsi singkat bug`

**Description:**
```markdown
## Deskripsi Bug
Penjelasan singkat tentang bug yang ditemukan.

## Langkah Reproduksi
1. Buka halaman ...
2. Isi form dengan ...
3. Klik tombol ...

## Hasil Sekarang
Deskripsi apa yang terjadi sekarang (error message, behavior tidak sesuai, dll)

## Hasil yang Diharapkan
Deskripsi apa yang seharusnya terjadi

## Environment
- OS: [Windows 10 / macOS / Linux]
- Browser: [Chrome 120 / Firefox 121 / Safari 17]
- PHP Version: [7.4 / 8.0 / 8.1]

## Screenshots (jika relevan)
[Attach screenshot atau screen recording]

## Additional Context
Informasi tambahan yang relevan
```

### 2. Mengajukan Feature Request
Jika ada ide fitur baru, buat issue dengan format:

**Title:** `[FEATURE] Deskripsi singkat fitur`

**Description:**
```markdown
## Deskripsi Fitur
Penjelasan detail tentang fitur yang diinginkan.

## Solusi yang Diusulkan
Bagaimana fitur ini seharusnya bekerja?

## Konteks
Kenapa fitur ini diperlukan? Apa yang akan ditingkatkan?

## Alternatif yang Dipertimbangkan
Apakah ada cara lain untuk menyelesaikan masalah ini?

## Estimasi Effort
- [ ] Easy (1-2 hari)
- [ ] Medium (3-5 hari)
- [ ] Hard (1+ minggu)
```

### 3. Mengirimkan Code
Ikuti proses berikut untuk mengirimkan code:

## Proses Development

### 1. Fork Repository
```bash
# Di GitHub, klik tombol "Fork"
# Ini akan membuat copy repository di akun Anda
```

### 2. Clone Repository Lokal
```bash
git clone https://github.com/USERNAME/TugasProjek.git
cd TugasProjek
git remote add upstream https://github.com/ORIGINAL_OWNER/TugasProjek.git
```

### 3. Buat Branch Baru
```bash
# Update main branch dulu
git fetch upstream
git checkout main
git merge upstream/main

# Buat branch fitur baru
git checkout -b feature/nama-fitur
# atau untuk bug fix
git checkout -b fix/nama-bug
```

## Git Workflow

### Branch Naming Convention

```
feature/deskripsi-fitur       # Fitur baru
fix/deskripsi-bug              # Bug fix
docs/deskripsi-dokumentasi    # Dokumentasi
refactor/deskripsi-refactor    # Refactoring code
perf/deskripsi-optimization    # Performance improvement
chore/deskripsi-chore          # Build, deps, config changes
```

**Contoh:**
```
feature/add-search-articles
fix/contact-form-validation
docs/update-api-documentation
refactor/optimize-css-structure
perf/lazy-load-images
```

## Coding Standards

### HTML
```html
<!-- ✅ Good -->
<div class="container">
  <h1 class="page-title">Judul Halaman</h1>
  <p class="description">Deskripsi yang jelas...</p>
</div>

<!-- ❌ Bad -->
<div>
  <h1>Judul</h1>
  <p>Deskripsi</p>
</div>
```

**Rules:**
- Gunakan semantic HTML5 tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`
- Indentasi 2 spaces
- Gunakan meaningful class names
- Self-closing tags: `<img />`, `<br />`, `<input />`
- Attributes sesuai urutan: id, class, style, data attributes

### CSS

```css
/* ✅ Good */
.button-primary {
  background-color: var(--primary-color);
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-primary:hover {
  background-color: var(--primary-dark);
}

/* ❌ Bad */
.btn { background: blue; padding: 10px; }
.btn:hover { background: darkblue; }
```

**Rules:**
- Gunakan CSS Custom Properties (variables)
- Indentasi 2 spaces
- Selectors lowercase dengan dash: `.button-primary`
- Group related properties
- Mobile-first approach (base styles dulu, media queries untuk desktop)

### JavaScript

```javascript
// ✅ Good
const getUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error('User not found');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ❌ Bad
function getuserdata(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/users/' + id);
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
  };
  xhr.send();
}
```

**Rules:**
- Gunakan `const` default, `let` untuk reassignment, hindari `var`
- Arrow functions untuk callbacks: `() => {}`
- Async/await preferred daripada .then() chains
- Meaningful variable names: `const userEmail` bukan `const ue`
- Comments untuk logic yang kompleks
- Indentasi 2 spaces
- Single quotes untuk strings: `'string'`

### PHP

```php
<?php
// ✅ Good
class ArticleManager {
    private $filePath;
    
    public function __construct($path) {
        $this->filePath = $path;
    }
    
    public function getArticle($slug) {
        $articles = json_decode(file_get_contents($this->filePath), true);
        return array_filter($articles['articles'], function($article) use ($slug) {
            return $article['slug'] === $slug;
        });
    }
}

// ❌ Bad
$articles = json_decode(file_get_contents('articles.json'), true);
$slug = $_GET['slug'];
foreach ($articles as $article) {
    if ($article['slug'] == $slug) {
        echo $article;
    }
}
```

**Rules:**
- Use PSR-12 coding standard
- Indentasi 4 spaces
- camelCase untuk function/method names: `getUserArticles()`
- UPPERCASE untuk constants: `ARTICLES_PATH`
- Validasi dan sanitasi semua input
- Use prepared statements untuk database queries
- Comments dalam bahasa yang konsisten

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:** feat, fix, docs, style, refactor, perf, test, chore

**Examples:**
```bash
# Feature
git commit -m "feat(articles): add search functionality for articles"

# Bug fix
git commit -m "fix(contact-form): validate email format correctly"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style changes
git commit -m "style(css): fix indentation in style.css"

# Refactoring
git commit -m "refactor(script): extract form validation to separate function"

# Performance
git commit -m "perf(images): optimize hero image size"
```

### Commit Message Best Practices

- Gunakan imperative mood ("add feature" bukan "added feature")
- Jangan capitalize pada awal subject
- Jangan tambahkan periode di akhir subject
- Limit subject line sampai 50 character
- Wrap body di 72 characters
- Jelaskan **apa** dan **mengapa**, bukan **bagaimana**
- Satu logical change per commit

## Pull Request Process

### 1. Push ke Fork
```bash
git push origin feature/nama-fitur
```

### 2. Buat Pull Request
Di GitHub, klik "Compare & pull request"

### PR Title Format
```
[Type] Deskripsi singkat

Contoh:
[FEATURE] Add search functionality for articles
[FIX] Fix email validation in contact form
[DOCS] Update API documentation
```

### PR Description Template
```markdown
## Deskripsi
Penjelasan singkat tentang changes yang dibuat.

## Tipe Perubahan
- [ ] Feature baru
- [ ] Bug fix
- [ ] Breaking change
- [ ] Dokumentasi

## Related Issue
Closes #123

## Testing
Bagaimana Anda sudah test perubahan ini?
- [ ] Test di local development
- [ ] Test di different browsers
- [ ] Manual testing checklist:
  - [ ] Feature A berfungsi
  - [ ] Feature B tidak broken

## Screenshots/Demo
[Jika relevan, attach screenshot atau demo]

## Checklist
- [ ] Code follows project standards
- [ ] Semua files yang relevan sudah diupdate
- [ ] No console errors atau warnings
- [ ] Responsive design tested
- [ ] README updated (jika perlu)
- [ ] Comments added untuk complex logic
```

### 3. Review & Feedback
- Maintainers akan review code Anda
- Respond to feedback professionally
- Make requested changes
- Push updates ke branch Anda (PR akan auto-update)

### 4. Merge
Setelah approval dari maintainers, PR akan di-merge ke main branch.

## Development Workflow Lengkap

```bash
# 1. Fork & clone
git clone https://github.com/YOUR_USERNAME/TugasProjek.git
cd TugasProjek

# 2. Setup
npm install  # atau package manager lainnya
cp .env.example .env

# 3. Create feature branch
git checkout -b feature/amazing-feature

# 4. Make changes & commit
git add .
git commit -m "feat(feature): description"

# 5. Keep up with upstream
git fetch upstream
git rebase upstream/main

# 6. Push to fork
git push origin feature/amazing-feature

# 7. Create Pull Request via GitHub UI

# 8. After merge, cleanup
git checkout main
git pull upstream main
git branch -d feature/amazing-feature
git push origin --delete feature/amazing-feature
```

## Rekomendasi Tools

### Code Quality
- **ESLint** - JavaScript linter
- **Prettier** - Code formatter
- **PHPStan** - PHP static analyzer

### Testing
- **Jest** - JavaScript testing
- **PHPUnit** - PHP testing
- **Cypress** - E2E testing

### Version Control
- **Git** - Version control
- **GitHub Desktop** - Git GUI (optional)
- **Sourcetree** - Git client (optional)

## FAQ

**Q: Berapa lama sebelum PR di-review?**
A: Biasanya 3-7 hari kerja, tergantung kompleksitas.

**Q: Apakah saya perlu ngikuti style guide yang ketat?**
A: Ya, consistency penting untuk maintainability.

**Q: Bagaimana jika PR saya ditolak?**
A: Itu normal! Feedback akan diberikan. Revisi dan coba lagi.

**Q: Apakah saya perlu test code saya?**
A: Ya, pastikan tidak ada regresi dan features berfungsi.

**Q: Bagaimana caranya discuss idea sebelum mulai coding?**
A: Buka discussion atau issue dulu untuk mendapat feedback.

## Resources

- [Git Basics](https://git-scm.com/book/en/v2)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

**Terima kasih atas kontribusinya!** 🎉

Jika ada pertanyaan, jangan ragu untuk membuka issue atau menghubungi tim maintainers.

*Last updated: 2024-01-15*
