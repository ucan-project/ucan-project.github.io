// Data Terjemahan
const translations = {
    'id': {
        home_title: "Selamat Datang di Proyek Kami!",
        home_desc: "Ini adalah proyek keren kami. Kami harap Anda menyukainya. Tampilan yang menarik ini dibuat dengan tema Biru dan Pink.",
        update_title: "Pembaruan Terbaru",
        update_info: "Versi v2.1.0 kini telah tersedia. Perbaikan bug dan peningkatan performa.",
        download_btn: "Unduh Sekarang (v2.1.0)",
        dev_title: "Tentang Developer",
        dev_name: "Nama Developer: Gemini Coder",
        dev_role: "Peran: Pengembang Utama",
        dev_contact_btn: "Hubungi Saya",
        donate_title: "Dukung Kami!",
        donate_info: "Dukungan Anda sangat berarti. Klik salah satu tombol di bawah untuk berdonasi.",
        nav_home: "Beranda",
        nav_update: "Pembaruan",
        nav_dev: "Developer",
        nav_donate: "Donasi"
    },
    'en': {
        home_title: "Welcome to Our Project!",
        home_desc: "This is our cool project. We hope you like it. This attractive look is made with a Blue and Pink theme.",
        update_title: "Latest Updates",
        update_info: "Version v2.1.0 is now available. Bug fixes and performance improvements.",
        download_btn: "Download Now (v2.1.0)",
        dev_title: "About the Developer",
        dev_name: "Developer Name: Gemini Coder",
        dev_role: "Role: Lead Developer",
        dev_contact_btn: "Contact Me",
        donate_title: "Support Us!",
        donate_info: "Your support means a lot. Click one of the buttons below to donate.",
        nav_home: "Home",
        nav_update: "Update",
        nav_dev: "Developer",
        nav_donate: "Donate"
    },
    'ru': {
        home_title: "Добро пожаловать в наш проект!",
        home_desc: "Это наш крутой проект. Мы надеемся, вам понравится. Этот привлекательный дизайн выполнен в сине-розовой тематике.",
        update_title: "Последние обновления",
        update_info: "Версия v2.1.0 теперь доступна. Исправления ошибок и улучшения производительности.",
        download_btn: "Скачать сейчас (v2.1.0)",
        dev_title: "О разработчике",
        dev_name: "Имя разработчика: Gemini Coder",
        dev_role: "Роль: Ведущий разработчик",
        dev_contact_btn: "Связаться со мной",
        donate_title: "Поддержите нас!",
        donate_info: "Ваша поддержка очень важна. Нажмите одну из кнопок ниже, чтобы пожертвовать.",
        nav_home: "Главная",
        nav_update: "Обновить",
        nav_dev: "Разработчик",
        nav_donate: "Пожертвовать"
    },
    'pt': { // Bahasa Portugis (Brasil)
        home_title: "Bem-vindo ao Nosso Projeto!",
        home_desc: "Este é o nosso projeto legal. Esperamos que você goste. Este visual atraente é feito com o tema Azul e Rosa.",
        update_title: "Últimas Atualizações",
        update_info: "A versão v2.1.0 já está disponível. Correções de bugs e melhorias de desempenho.",
        download_btn: "Baixar Agora (v2.1.0)",
        dev_title: "Sobre o Desenvolvedor",
        dev_name: "Nome do Desenvolvedor: Gemini Coder",
        dev_role: "Função: Desenvolvedor Líder",
        dev_contact_btn: "Entre em Contato Comigo",
        donate_title: "Apoie-nos!",
        donate_info: "Seu apoio significa muito. Clique em um dos botões abaixo para doar.",
        nav_home: "Início",
        nav_update: "Atualizar",
        nav_dev: "Desenvolvedor",
        nav_donate: "Doar"
    }
};

let currentLang = 'id'; // Bahasa default

// Fungsi untuk memuat konten halaman dari file .html
const loadPage = async (page) => {
    const contentDiv = document.getElementById('app-content');
    try {
        const response = await fetch(`src/pages/${page}.html`);
        if (!response.ok) throw new Error('Halaman tidak ditemukan');
        const content = await response.text();
        contentDiv.innerHTML = content;
        
        // Panggil fungsi untuk apply terjemahan setelah konten dimuat
        applyTranslations();

        // Panggil fungsi untuk inisialisasi tombol (misalnya tombol download)
        initializeButtons(page);

    } catch (error) {
        contentDiv.innerHTML = `<h2 class="page-section">Error: ${error.message}</h2>`;
    }
};

// Fungsi untuk menerapkan terjemahan ke konten yang sudah dimuat
const applyTranslations = () => {
    const lang = translations[currentLang];
    
    // Terjemahkan elemen navigasi
    document.querySelector('[data-path="home"]').textContent = lang.nav_home;
    document.querySelector('[data-path="update"]').textContent = lang.nav_update;
    document.querySelector('[data-path="developer"]').textContent = lang.nav_dev;
    document.querySelector('[data-path="donate"]').textContent = lang.nav_donate;


    // Terjemahkan konten di dalam halaman
    const transElements = document.querySelectorAll('[data-trans-key]');
    transElements.forEach(el => {
        const key = el.getAttribute('data-trans-key');
        if (lang[key]) {
            el.textContent = lang[key];
        }
    });
};

// Fungsi untuk inisialisasi tombol dan event listener
const initializeButtons = (page) => {
    if (page === 'update') {
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            // Ganti URL ini dengan link download file terbaru Anda
            downloadBtn.onclick = () => {
                alert("Memulai unduhan file terbaru...");
                window.location.href = "path/to/your/latest/file.zip"; 
            };
        }
    }
    
    if (page === 'developer') {
        const contactBtn = document.getElementById('contact-btn');
        if (contactBtn) {
            // Ganti URL ini dengan link kontak/media sosial utama developer
            contactBtn.onclick = () => {
                window.open("https://linkedin.com/in/geminicoder", "_blank"); 
            };
        }
    }
};


// ---------------- Event Listeners ----------------

// 1. Navigasi Antar Halaman
document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', (e) => {
        const path = e.target.getAttribute('data-path');
        // Menggunakan history.pushState untuk mengubah URL tanpa reload (mirip React Router)
        history.pushState({ page: path }, '', `#/${path}`);
        loadPage(path);
    });
});

// 2. Navigasi saat tombol Back/Forward browser ditekan
window.addEventListener('popstate', (e) => {
    const path = window.location.hash.replace('#/', '') || 'home';
    loadPage(path);
});

// 3. Selektor Bahasa
document.getElementById('language-selector').addEventListener('change', (e) => {
    currentLang = e.target.value;
    // Muat ulang halaman saat ini untuk menerapkan terjemahan
    const path = window.location.hash.replace('#/', '') || 'home';
    loadPage(path);
});


// Inisialisasi: Muat halaman pertama saat website dimuat
document.addEventListener('DOMContentLoaded', () => {
    const initialPath = window.location.hash.replace('#/', '') || 'home';
    loadPage(initialPath);
});