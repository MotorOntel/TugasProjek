// ===== Admin session helpers (server-verified) =====
const api = {
    me: () => fetch('php/auth_me.php', { credentials: 'same-origin' }).then(r => r.json()),
    login: (username, password) => fetch('php/auth_login.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password })
    }).then(r => r.json()),
    logout: () => fetch('php/auth_logout.php', { method: 'POST', credentials: 'same-origin' }).then(r => r.json()),
    listUsers: () => fetch('php/users_list.php', { credentials: 'same-origin' }).then(r => r.json()),
    saveUser: (username, password, role) => fetch('php/users_save.php', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password, role })
    }).then(r => r.json()),
    deleteUser: (username) => fetch('php/users_delete.php', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username })
    }).then(r => r.json()),
    getArticle: (slug) => fetch(`php/articles_get.php?slug=${encodeURIComponent(slug)}`, {
        credentials: 'same-origin'
    }).then(r => r.json()),
    deleteArticle: (slug) => fetch('php/articles_delete.php', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ slug })
    }).then(r => r.json()),
};

let currentUser = null;

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Animated Counter for Stats =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

// Observe stats section if it exists
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// ===== Form Validation & Submission =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        
        // Get button and loading states
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Disable button and show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        try {
            // Validate form fields
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject');
            const message = formData.get('message').trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                throw new Error('Semua field wajib harus diisi!');
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Format email tidak valid!');
            }

            // Send form data to PHP
            const response = await fetch('php/process_form.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Show success message
                showMessage('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error(result.message || 'Terjadi kesalahan saat mengirim pesan.');
            }
        } catch (error) {
            // Show error message
            showMessage(error.message, 'error');
        } finally {
            // Re-enable button and restore original state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// Function to show form messages
function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ===== Real-time Form Validation =====
if (contactForm) {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Email validation on blur
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            emailInput.style.borderColor = 'var(--error-color)';
        } else {
            emailInput.style.borderColor = 'var(--border-color)';
        }
    });

    // Phone number formatting
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 13) {
            value = value.slice(0, 13);
        }
        e.target.value = value;
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll-based Animations =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .competency-item, .facility-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-card, .competency-item, .facility-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// ===== Active Navigation Highlight =====
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentLocation) {
        link.classList.add('active');
    }
});

// ===== Articles Data Helpers =====
const ARTICLES_PATH = 'data/articles.json';

const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Render list of articles on articles.html
const renderArticlesList = async () => {
    const listEl = document.getElementById('articlesList');
    const emptyEl = document.getElementById('articlesEmpty');
    if (!listEl) return;

    try {
        const res = await fetch(ARTICLES_PATH, { cache: 'no-store' });
        const articles = await res.json();

        if (!Array.isArray(articles) || articles.length === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
            return;
        }

        listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'none';

        articles.forEach(article => {
            const card = document.createElement('a');
            card.className = 'article-card';
            card.href = `article.html?slug=${encodeURIComponent(article.slug)}`;

            const hero = document.createElement('div');
            hero.className = 'hero-thumb';
            if (article.hero) {
                hero.style.backgroundImage = `url('${article.hero}')`;
            }

            const body = document.createElement('div');
            body.className = 'card-body';

            const title = document.createElement('h3');
            title.textContent = article.title;

            const summary = document.createElement('p');
            summary.textContent = article.summary;

            const meta = document.createElement('div');
            meta.className = 'article-meta';
            meta.textContent = formatDate(article.created_at);

            const tagsWrap = document.createElement('div');
            tagsWrap.className = 'article-tags';
            if (Array.isArray(article.tags)) {
                article.tags.forEach(tag => {
                    const t = document.createElement('span');
                    t.className = 'tag';
                    t.textContent = tag;
                    tagsWrap.appendChild(t);
                });
            }

            body.appendChild(title);
            body.appendChild(summary);
            body.appendChild(meta);
            if (tagsWrap.childElementCount > 0) {
                body.appendChild(tagsWrap);
            }

            card.appendChild(hero);
            card.appendChild(body);
            listEl.appendChild(card);
        });
    } catch (err) {
        console.error('Gagal memuat artikel', err);
        if (emptyEl) {
            emptyEl.style.display = 'block';
            emptyEl.textContent = 'Gagal memuat artikel.';
        }
    }
};

// Render single article on article.html
const renderArticleDetail = async () => {
    const detailEl = document.getElementById('articleDetail');
    if (!detailEl) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const titleEl = document.getElementById('articleTitle');
    const metaEl = document.getElementById('articleMeta');
    const heroEl = document.getElementById('articleHero');
    const contentEl = document.getElementById('articleContent');
    const tagsEl = document.getElementById('articleTags');
    const notFoundEl = document.getElementById('articleNotFound');

    if (!slug) {
        detailEl.style.display = 'none';
        if (notFoundEl) notFoundEl.style.display = 'block';
        return;
    }

    try {
        const res = await fetch(ARTICLES_PATH, { cache: 'no-store' });
        const articles = await res.json();
        const article = Array.isArray(articles) ? articles.find(a => a.slug === slug) : null;

        if (!article) {
            detailEl.style.display = 'none';
            if (notFoundEl) notFoundEl.style.display = 'block';
            return;
        }

        titleEl.textContent = article.title;
        metaEl.textContent = formatDate(article.created_at);

        if (article.hero) {
            heroEl.style.backgroundImage = `url('${article.hero}')`;
            heroEl.style.display = 'block';
        }

        contentEl.innerHTML = article.content;

        if (Array.isArray(article.tags) && article.tags.length > 0) {
            tagsEl.innerHTML = '';
            article.tags.forEach(tag => {
                const t = document.createElement('span');
                t.className = 'tag';
                t.textContent = tag;
                tagsEl.appendChild(t);
            });
            tagsEl.style.display = 'flex';
        }
    } catch (err) {
        console.error('Gagal memuat artikel', err);
        detailEl.style.display = 'none';
        if (notFoundEl) notFoundEl.style.display = 'block';
    }
};

// Handle admin submit
const initAdminForm = () => {
    const adminForm = document.getElementById('articleAdminForm');
    const adminMsg = document.getElementById('adminMessage');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const formTitle = document.getElementById('formTitle');
    if (!adminForm) return;

    const resetForm = () => {
        adminForm.reset();
        document.getElementById('oldSlug').value = '';
        formTitle.textContent = 'Tambah Artikel';
        cancelBtn.style.display = 'none';
    };

    cancelBtn.addEventListener('click', resetForm);

    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(adminForm);
        const submitBtn = adminForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        try {
            const res = await fetch('php/admin_save_article.php', {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });
            const result = await res.json();

            if (result.success) {
                adminMsg.textContent = 'Artikel tersimpan.';
                adminMsg.className = 'form-message success';
                adminMsg.style.display = 'block';
                resetForm();
                loadAdminArticles();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                throw new Error(result.message || 'Gagal menyimpan artikel');
            }
        } catch (err) {
            adminMsg.textContent = err.message;
            adminMsg.className = 'form-message error';
            adminMsg.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
};

const loadAdminArticles = async () => {
    const listEl = document.getElementById('adminArticlesList');
    const emptyEl = document.getElementById('adminArticlesEmpty');
    if (!listEl) return;

    try {
        const res = await fetch(ARTICLES_PATH, { cache: 'no-store' });
        const articles = await res.json();

        if (!Array.isArray(articles) || articles.length === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
            listEl.innerHTML = '';
            return;
        }

        listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'none';

        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card admin-article-card';

            const hero = document.createElement('div');
            hero.className = 'hero-thumb';
            if (article.hero) {
                hero.style.backgroundImage = `url('${article.hero}')`;
            }

            const body = document.createElement('div');
            body.className = 'card-body';

            const title = document.createElement('h3');
            title.textContent = article.title;

            const summary = document.createElement('p');
            summary.textContent = article.summary;

            const meta = document.createElement('div');
            meta.className = 'article-meta';
            meta.textContent = formatDate(article.created_at);

            const actions = document.createElement('div');
            actions.className = 'article-actions';
            actions.innerHTML = `
                <button class="btn-link" data-edit="${article.slug}">Edit</button>
                <button class="btn-link btn-danger" data-delete="${article.slug}">Hapus</button>
            `;

            body.appendChild(title);
            body.appendChild(summary);
            body.appendChild(meta);
            body.appendChild(actions);

            card.appendChild(hero);
            card.appendChild(body);
            listEl.appendChild(card);
        });

        listEl.querySelectorAll('button[data-edit]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const slug = btn.getAttribute('data-edit');
                await editArticle(slug);
            });
        });

        listEl.querySelectorAll('button[data-delete]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const slug = btn.getAttribute('data-delete');
                if (!confirm('Hapus artikel ini?')) return;
                await deleteArticle(slug);
            });
        });
    } catch (err) {
        console.error('Gagal memuat artikel', err);
        if (emptyEl) emptyEl.style.display = 'block';
        listEl.innerHTML = '';
    }
};

const editArticle = async (slug) => {
    try {
        const res = await api.getArticle(slug);
        if (!res.success) throw new Error(res.message || 'Gagal memuat artikel');
        const a = res.article;
        document.getElementById('title').value = a.title;
        document.getElementById('slug').value = a.slug;
        document.getElementById('summary').value = a.summary;
        document.getElementById('hero').value = a.hero || '';
        document.getElementById('tags').value = (a.tags || []).join(', ');
        document.getElementById('content').value = a.content;
        document.getElementById('oldSlug').value = a.slug;
        document.getElementById('formTitle').textContent = 'Edit Artikel';
        document.getElementById('cancelEditBtn').style.display = 'inline-block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
        alert(err.message);
    }
};

const deleteArticle = async (slug) => {
    try {
        const res = await api.deleteArticle(slug);
        if (!res.success) throw new Error(res.message || 'Gagal menghapus artikel');
        loadAdminArticles();
    } catch (err) {
        alert(err.message);
    }
};

// Admin login form handling
const initAdminLogin = () => {
    const loginForm = document.getElementById('adminLoginForm');
    const loginMsg = document.getElementById('adminLoginMessage');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = (loginForm.querySelector('#loginUser')?.value || '').trim();
        const pass = (loginForm.querySelector('#loginPass')?.value || '').trim();

        try {
            const result = await api.login(user, pass);
            if (result.success) {
                window.location.href = 'admin.html';
            } else {
                throw new Error(result.message || 'Login gagal');
            }
        } catch (err) {
            if (loginMsg) {
                loginMsg.textContent = err.message;
                loginMsg.className = 'form-message error';
                loginMsg.style.display = 'block';
            }
        }
    });
};

// Admin guard and user management
const guardAdminPage = async () => {
    const path = window.location.pathname.split('/').pop();
    if (path !== 'admin.html' && path !== 'admin-login.html') return;

    try {
        const me = await api.me();
        if (!me.success) {
            if (path === 'admin.html') {
                window.location.href = 'admin-login.html';
            }
            return;
        }
        currentUser = me.user;
        updateAdminUserLabel();
        if (path === 'admin-login.html') {
            window.location.href = 'admin.html';
        }
        if (path === 'admin.html') {
            initUserMgmt();
        }
    } catch (err) {
        if (path === 'admin.html') {
            window.location.href = 'admin-login.html';
        }
    }
};

const initUserMgmt = async () => {
    const section = document.getElementById('userMgmtSection');
    const tbody = document.getElementById('userTableBody');
    const msg = document.getElementById('userMessage');
    const form = document.getElementById('userForm');

    if (!section) return;

    if (!currentUser || currentUser.role !== 'root') {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';

    const loadUsers = async () => {
        if (!tbody) return;
        tbody.innerHTML = '<tr><td colspan="3">Memuat...</td></tr>';
        try {
            const res = await api.listUsers();
            if (!res.success) throw new Error(res.message || 'Gagal memuat user');
            tbody.innerHTML = '';
            res.users.forEach(u => {
                const tr = document.createElement('tr');
                const canDelete = u.role !== 'root';
                tr.innerHTML = `
                    <td>${u.username}</td>
                    <td>${u.role}</td>
                    <td>
                        ${canDelete ? `<button class="btn-link" data-del="${u.username}">Hapus</button>` : '-'}
                    </td>`;
                tbody.appendChild(tr);
            });
            tbody.querySelectorAll('button[data-del]').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const uname = btn.getAttribute('data-del');
                    if (!confirm(`Hapus user ${uname}?`)) return;
                    const del = await api.deleteUser(uname);
                    if (!del.success) {
                        alert(del.message || 'Gagal menghapus user');
                    }
                    loadUsers();
                });
            });
        } catch (err) {
            tbody.innerHTML = `<tr><td colspan="3">${err.message}</td></tr>`;
        }
    };

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const uname = document.getElementById('userUsername').value.trim();
            const pwd = document.getElementById('userPassword').value.trim();
            const role = document.getElementById('userRole').value;
            try {
                const res = await api.saveUser(uname, pwd, role);
                if (!res.success) throw new Error(res.message || 'Gagal simpan user');
                if (msg) {
                    msg.textContent = 'User tersimpan.';
                    msg.className = 'form-message success';
                    msg.style.display = 'block';
                }
                form.reset();
                loadUsers();
            } catch (err) {
                if (msg) {
                    msg.textContent = err.message;
                    msg.className = 'form-message error';
                    msg.style.display = 'block';
                }
            }
        });
    }

    loadUsers();
};

const updateAdminUserLabel = () => {
    const label = document.getElementById('adminUserLabel');
    if (label && currentUser) {
        label.textContent = `Login sebagai: ${currentUser.username} (${currentUser.role})`;
    }
};

const initLogoutButton = () => {
    const btn = document.getElementById('logoutBtn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        try {
            await api.logout();
        } catch (e) {
            // ignore
        }
        window.location.href = 'admin-login.html';
    });
};

// Init article-related features
document.addEventListener('DOMContentLoaded', () => {
    guardAdminPage();
    renderArticlesList();
    renderArticleDetail();
    initAdminForm();
    initAdminLogin();
    loadAdminArticles();
    initLogoutButton();
    updateAdminUserLabel();
});

// ===== Console Welcome Message =====
console.log('%c🎓 Program Studi Teknik Komputer', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cSelamat datang di website kami!', 'color: #6b7280; font-size: 14px;');
console.log('%cDibuat dengan ❤️ menggunakan HTML, CSS, dan JavaScript', 'color: #10b981; font-size: 12px;');
