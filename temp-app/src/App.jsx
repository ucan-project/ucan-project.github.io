import React, { useState, useEffect } from 'react';
import { Download, Coffee, Github, Send, Zap, Menu, X, Sun, Moon, Link, User, Code, Shield, FileText, Archive, HardDrive, BookOpen, Clock, Globe } from 'lucide-react';

// --- KONSTANTA & PLACEHOLDERS ---
const IMAGE_PLACEHOLDERS = {
    // Menggunakan placeholder yang lebih profesional dan minimalis
    ANIME_GIRL: "https://placehold.co/1000x500/0f172a/4f46e5?text=Ucan+Project+Core+System+Illustration", 
    SAWERIA_QR: "https://placehold.co/200x200/f472b6/ffffff?text=SCAN+QR", 
    // Developer photo dibuat bulat (rounded-full) di DeveloperPage
    DEVELOPER_PHOTO: "https://placehold.co/120x120/0f172a/f472b6?text=DEV",
};

const PROJECT_DOWNLOAD_LINK = "https://github.com/ucan-project/latest-file.zip";
const DONATION_LINKS = {
    PAYPAL: "https://paypal.me/ucanproject",
    BUYMEACOFFEE: "https://buymeacoffee.com/ucanproject",
    SAWERIA: "https://saweria.co/ucanproject",
};

// --- DATA TERJEMAHAN (Simulasi) ---
const LANGUAGES = {
    id: { code: 'id', name: 'Bahasa Indonesia' },
    en: { code: 'en', name: 'English' },
    ru: { code: 'ru', name: 'Русский' },
    'pt-BR': { code: 'pt-BR', name: 'Português (Brasil)' },
};

const TRANSLATIONS = {
    id: {
        home: 'Beranda', update: 'Pembaruan', files: 'Berkas', dev: 'Developer', donate: 'Donasi', repo: 'Repository',
        title: 'Kinerja Generasi Baru',
        slogan: 'Mengintegrasikan optimasi tingkat kernel dengan keamanan siber terdepan untuk pengalaman mobile yang tak tertandingi.',
        welcome_title: 'Selamat Datang di UCANPROJECT',
        welcome_text: 'Proyek kami berfokus pada efisiensi *mobile* maksimal. Dengan UCAN, Anda mendapatkan perangkat lunak yang disetel sempurna, dirancang untuk kecepatan, stabilitas, dan privasi yang solid. Mari kita jelajahi potensi penuh perangkat Anda.',
        download_now: 'Unduh Sekarang', learn_arch: 'Pelajari Arsitektur',
        key_features: 'Solusi Inti Kami', engine_title: 'Engine Kinerja', 
        engine_content: 'Manajemen CPU/GPU yang prediktif untuk latensi rendah dan *framerate* stabil di semua aplikasi.',
        security_title: 'Keamanan Terintegrasi', security_content: 'Lapisan perlindungan berbasis *hardware* untuk menjaga integritas data dan privasi pengguna.',
        architecture_title: 'Arsitektur Modular', architecture_content: 'Desain yang fleksibel memungkinkan adaptasi mudah ke berbagai platform dan versi OS.',
        // Berkas Page
        files_archive: 'Arsip Berkas Proyek & Dokumentasi',
        files_subtitle: 'Akses semua dokumentasi teknis, laporan, dan arsip rilis proyek UCAN.',
        tech_docs: 'Dokumentasi Teknis', hist_archive: 'Arsip Historis',
        download_file: 'Unduh Berkas',
        note_title: 'Catatan Penting:',
        note_content: 'Semua berkas di sini dilisensikan di bawah Lisensi Publik UCAN. Pastikan Anda membaca dokumentasi sebelum menggunakannya untuk tujuan komersial.',
    },
    en: {
        home: 'Home', update: 'Updates', files: 'Files', dev: 'Developer', donate: 'Donate', repo: 'Repository',
        title: 'New Generation Performance',
        slogan: 'Integrating kernel-level optimization with cutting-edge cyber security for an unmatched mobile experience.',
        welcome_title: 'Welcome to UCANPROJECT',
        welcome_text: 'Our project focuses on maximum mobile efficiency. With UCAN, you get perfectly tuned software, designed for solid speed, stability, and privacy. Let\'s unlock the full potential of your device.',
        download_now: 'Download Now', learn_arch: 'Learn Architecture',
        key_features: 'Our Core Solutions', engine_title: 'Performance Engine', 
        engine_content: 'Predictive CPU/GPU management for low latency and stable frame rates across all applications.',
        security_title: 'Integrated Security', security_content: 'Hardware-based protection layers to maintain data integrity and user privacy.',
        architecture_title: 'Modular Architecture', architecture_content: 'Flexible design allows easy adaptation to various platforms and OS versions.',
        // Files Page
        files_archive: 'Project Files & Documentation Archive',
        files_subtitle: 'Access all technical documentation, reports, and release archives for the UCAN project.',
        tech_docs: 'Technical Documentation', hist_archive: 'Historical Archive',
        download_file: 'Download File',
        note_title: 'Important Note:',
        note_content: 'All files here are licensed under the UCAN Public License. Please ensure you read the documentation before using them for commercial purposes.',
    },
    ru: {
        home: 'Главная', update: 'Обновления', files: 'Файлы', dev: 'Разработчик', donate: 'Пожертвовать', repo: 'Репозиторий',
        title: 'Производительность нового поколения',
        slogan: 'Интеграция оптимизации на уровне ядра с передовой кибербезопасностью для непревзойденного мобильного опыта.',
        welcome_title: 'Добро пожаловать в UCANPROJECT',
        welcome_text: 'Наш проект нацелен на максимальную мобильную эффективность. С UCAN вы получаете идеально настроенное программное обеспечение, разработанное для надежной скорости, стабильности и конфиденциальности. Давайте раскроем весь потенциал вашего устройства.',
        download_now: 'Скачать сейчас', learn_arch: 'Изучить архитектуру',
        key_features: 'Наши Основные Решения', engine_title: 'Двигатель Производительности', 
        engine_content: 'Предиктивное управление CPU/GPU для низкой задержки и стабильной частоты кадров во всех приложениях.',
        security_title: 'Интегрированная Безопасность', security_content: 'Аппаратные уровни защиты для сохранения целостности данных и конфиденциальности пользователей.',
        architecture_title: 'Модульная Архитектура', architecture_content: 'Гибкая конструкция позволяет легко адаптироваться к различным платформам и версиям ОС.',
        // Files Page
        files_archive: 'Архив файлов проекта и документации',
        files_subtitle: 'Получите доступ ко всей технической документации, отчетам и архивам релизов проекта UCAN.',
        tech_docs: 'Техническая Документация', hist_archive: 'Исторический Архив',
        download_file: 'Скачать файл',
        note_title: 'Важное примечание:',
        note_content: 'Все файлы здесь лицензированы в соответствии с Публичной лицензией UCAN. Пожалуйста, убедитесь, что вы прочитали документацию, прежде чем использовать их в коммерческих целях.',
    },
    'pt-BR': {
        home: 'Início', update: 'Atualizações', files: 'Arquivos', dev: 'Desenvolvedor', donate: 'Doar', repo: 'Repositório',
        title: 'Desempenho de Nova Geração',
        slogan: 'Integrando otimização em nível de kernel com segurança cibernética de ponta para uma experiência móvel incomparável.',
        welcome_title: 'Bem-vindo ao UCANPROJECT',
        welcome_text: 'Nosso projeto se concentra na máxima eficiência móvel. Com UCAN, você obtém um software perfeitamente ajustado, projetado para velocidade, estabilidade e privacidade sólidas. Vamos liberar todo o potencial do seu dispositivo.',
        download_now: 'Baixar Agora', learn_arch: 'Aprender Arquitetura',
        key_features: 'Nossas Soluções Principais', engine_title: 'Motor de Desempenho', 
        engine_content: 'Gerenciamento preditivo de CPU/GPU para baixa latência e taxas de quadros estáveis em todos os aplicativos.',
        security_title: 'Segurança Integrada', security_content: 'Camadas de proteção baseadas em hardware para manter a integridade dos dados e a privacidade do usuário.',
        architecture_title: 'Arquitetura Modular', architecture_content: 'O design flexível permite fácil adaptação a várias plataformas e versões de SO.',
        // Files Page
        files_archive: 'Arquivos do Projeto e Arquivo de Documentação',
        files_subtitle: 'Acesse toda a documentação técnica, relatórios e arquivos de lançamento do projeto UCAN.',
        tech_docs: 'Documentação Técnica', hist_archive: 'Arquivo Histórico',
        download_file: 'Baixar Arquivo',
        note_title: 'Nota Importante:',
        note_content: 'Todos os arquivos aqui são licenciados sob a Licença Pública UCAN. Certifique-se de ler a documentação antes de usá-los para fins comerciais.',
    },
};

// Data simulasi untuk halaman Berkas - Dikelompokkan
const fileArchives = {
    dokumentasi: [
        { name: "Dokumentasi API Core V3.5", description: "Panduan lengkap untuk integrasi dan penggunaan API inti proyek (rincian fungsi, endpoint).", link: "#mock-api-doc", icon: FileText, tag: "API", color: "indigo" },
        { name: "Whitepaper Arsitektur Kernel", description: "Dokumen teknis mendalam tentang desain dan optimasi tingkat kernel yang dilakukan Ucan.", link: "#mock-whitepaper", icon: Code, tag: "Arsitektur", color: "pink" },
        { name: "Panduan Instalasi Lengkap", description: "Langkah-langkah detail untuk instalasi manual dan penyiapan lingkungan.", link: "#mock-install-guide", icon: BookOpen, tag: "Panduan", color: "green" },
    ],
    arsip: [
        { name: "Arsip Rilis Lama (V1.0 - V2.9)", description: "Kumpulan rilis versi lama untuk keperluan historis atau pengujian kompatibilitas.", link: "#mock-old-archive", icon: Archive, tag: "Historis", color: "gray" },
        { name: "Laporan Bug Fix Quarterly Q2 2025", description: "Rangkuman semua perbaikan keamanan dan stabilitas yang diterapkan pada kuartal Q2.", link: "#mock-bugfix-report", icon: Shield, tag: "Laporan", color: "blue" },
        { name: "Roadmap Pengembangan 2024", description: "Dokumen perencanaan fitur dan target jangka panjang proyek Ucan.", link: "#mock-roadmap", icon: Clock, tag: "Rencana", color: "pink" },
    ]
};

// --- KOMPONEN BERBAGAI (Reusable Components) ---

/**
 * Komponen untuk tombol navigasi yang bersih dan elegan.
 */
const NavLink = ({ to, current, onClick, children }) => {
    const isActive = current === to;
    const baseClasses = "nav-link py-2 px-3 text-sm font-medium rounded-lg transition-colors relative";
    // Warna aktif: Indigo accent (Biru)
    const activeClasses = "text-indigo-600 dark:text-indigo-400 bg-slate-200 dark:bg-slate-700 shadow-inner"; 
    // Warna non-aktif: Elegan abu-abu gelap, hover ke Indigo
    const inactiveClasses = "dark:text-slate-300 text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600";

    return (
        <button
            onClick={() => onClick(to)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {children}
        </button>
    );
};

/**
 * Komponen untuk tombol utama dengan gaya modern (solid & ring hover).
 */
const PrimaryButton = ({ href, target = "_self", children, Icon, className = "", onClick = () => {} }) => (
    <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : ""}
        onClick={onClick}
        className={`
            flex items-center justify-center space-x-2 py-3 px-8 rounded-xl font-bold uppercase tracking-wider
            bg-indigo-600 text-white shadow-xl 
            transition-all duration-300 transform hover:scale-[1.02] 
            hover:bg-indigo-500 hover:shadow-indigo-600/80
            focus:ring-4 focus:ring-indigo-600/50
            ${className}
        `}
    >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
    </a>
);

/**
 * Komponen Kartu Informasi yang minimalis.
 */
const InfoCard = ({ title, content, icon: Icon }) => (
    <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border-t-4 border-pink-500 shadow-xl transition-all hover:shadow-2xl hover:translate-y-[-4px]">
        <Icon className="w-8 h-8 text-pink-500 dark:text-pink-400 mb-4" />
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{content}</p>
    </div>
);


// --- HEADER DAN FOOTER LAYOUT ---

const LanguageSelector = ({ language, setLanguage }) => (
    <div className="relative flex items-center group">
        <Globe className="w-5 h-5 text-slate-500 dark:text-slate-400 mr-2" />
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-transparent dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 text-sm font-medium rounded-lg py-1.5 px-3 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition-colors"
        >
            {Object.entries(LANGUAGES).map(([code, lang]) => (
                <option key={code} value={code}>
                    {lang.name}
                </option>
            ))}
        </select>
    </div>
);

const Header = ({ currentPage, setCurrentPage, language, setLanguage, t }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const initialDark = storedTheme === 'light' ? false : true; 
        
        setIsDark(initialDark);
        document.documentElement.classList.toggle('dark', initialDark);
        if (!storedTheme) {
             localStorage.setItem('theme', initialDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        document.documentElement.classList.toggle('dark', newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
    };

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: t('home'), link: 'Home' },
        { name: t('update'), link: 'Update' },
        { name: t('files'), link: 'Berkas' }, 
        { name: t('dev'), link: 'Developer' },
        { name: t('donate'), link: 'Donasi' },
    ];

    return (
        <header className="sticky top-0 z-50 p-4 shadow-xl backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b dark:border-slate-700 border-slate-200 transition-all">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Profesional */}
                <button onClick={() => handleNavClick('Home')} className="text-2xl font-extrabold tracking-tight transition-colors">
                    <span className="text-slate-900 dark:text-slate-100">UCAN</span><span className="text-pink-500">PROJECT</span>
                </button>

                {/* Navigasi Desktop */}
                <nav className="hidden lg:flex space-x-4 items-center">
                    {navItems.map(item => (
                        <NavLink key={item.link} to={item.link} current={currentPage} onClick={handleNavClick}>
                            {item.name}
                        </NavLink>
                    ))}
                    {/* INI LINK GITHUB (REPOSITORY) */}
                    <a href="https://github.com/ucan-project" target="_blank" rel="noopener noreferrer" className="py-2 px-3 text-sm font-medium rounded-lg transition-colors bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                        {t('repo')}
                    </a>
                </nav>

                {/* Tombol Mobile & Tema Toggle */}
                <div className="flex items-center space-x-3">
                    <LanguageSelector language={language} setLanguage={setLanguage} />
                    <button onClick={toggleTheme} className="p-2 rounded-full dark:hover:bg-slate-800 hover:bg-slate-200 transition-colors text-pink-500 hover:text-indigo-600" aria-label="Toggle Dark Mode">
                        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full lg:hidden dark:hover:bg-slate-800 hover:bg-slate-200 transition-colors text-slate-600 dark:text-slate-300 hover:text-indigo-600" aria-label="Open Menu">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile Overlay */}
            {isMenuOpen && (
                <div className="absolute inset-x-0 top-full p-4 bg-white dark:bg-slate-900 shadow-xl lg:hidden transition-all duration-300 flex flex-col space-y-3 mt-1 border-t dark:border-slate-700">
                    {navItems.map(item => (
                        <NavLink key={item.link} to={item.link} current={currentPage} onClick={handleNavClick}>
                            {item.name}
                        </NavLink>
                    ))}
                    {/* INI LINK GITHUB DI MENU MOBILE */}
                    <a href="https://github.com/ucan-project" target="_blank" rel="noopener noreferrer" className="py-2 px-3 text-sm font-medium rounded-lg transition-colors text-slate-500 hover:text-indigo-600 border-t dark:border-slate-800 pt-3">
                        {t('repo')} (GitHub)
                    </a>
                </div>
            )}
        </header>
    );
};

const Footer = () => (
    <footer className="mt-20 p-8 bg-slate-950 dark:bg-slate-950 border-t border-slate-800 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
                <h4 className="text-xl font-extrabold mb-2 text-pink-500">UCANPROJECT</h4>
                <p className="pr-4">
                    Penyedia solusi optimasi sistem *mobile* terdepan, berfokus pada kinerja, keamanan, dan desain.
                </p>
            </div>
            <div>
                <h4 className="font-bold mb-3 text-slate-200">Navigasi Cepat</h4>
                <ul className="space-y-2">
                    <li><a href="#doc" className="hover:text-pink-500 transition-colors">Dokumentasi API</a></li>
                    <li><a href="#changelog" className="hover:text-pink-500 transition-colors">Status Server</a></li>
                    <li><a href="#careers" className="hover:text-pink-500 transition-colors">Karir</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-3 text-slate-200">Legal</h4>
                <ul className="space-y-2">
                    <li><a href="#privacy" className="hover:text-pink-500 transition-colors">Kebijakan Privasi</a></li>
                    <li><a href="#terms" className="hover:text-pink-500 transition-colors">Syarat & Ketentuan</a></li>
                    <li><a href="#security" className="hover:text-pink-500 transition-colors">Keamanan</a></li>
                </ul>
            </div>
            <div className="flex flex-col items-start md:items-end">
                <h4 className="font-bold mb-3 text-slate-200">Kontak</h4>
                <div className="flex space-x-3">
                    {/* INI JUGA LINK GITHUB DI FOOTER */}
                    <a href="https://github.com/ucan-project" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors" title="GitHub">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="mailto:support@ucanproject.dev" className="text-slate-400 hover:text-pink-500 transition-colors" title="Email Support">
                        <Send className="w-6 h-6" />
                    </a>
                </div>
                <p className="mt-4 text-xs">© 2025 UCANPROJECT. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// --- HALAMAN UTAMA (Pages) ---

const HomePage = ({ setCurrentPage, t }) => (
    <div className="max-w-7xl mx-auto py-16 md:py-24">
        {/* Hero Section - Gambar Prominent & Rounded */}
        <div className="grid md:grid-cols-1 gap-12 items-center bg-white dark:bg-slate-950 rounded-2xl shadow-2xl shadow-indigo-600/10 dark:shadow-indigo-600/20 overflow-hidden p-6 md:p-12 border-4 border-indigo-600/50">
            <div className="relative">
                <img 
                    src={IMAGE_PLACEHOLDERS.ANIME_GIRL} 
                    alt="Ilustrasi Sistem Inti Ucan Project" 
                    className="w-full h-auto object-cover rounded-xl shadow-inner mb-8 opacity-90 transition-opacity hover:opacity-100"
                />

                {/* Overlay Text */}
                <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/40 flex flex-col justify-center items-center text-center p-8 rounded-xl transition-all hover:bg-slate-900/30">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-snug text-white mb-4 drop-shadow-lg">
                        <span className="text-pink-400">{t('title').split(' ')[0]}</span> {t('title').substring(t('title').indexOf(' ') + 1)}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-3xl mb-10 font-light italic">
                        {t('slogan')}
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <PrimaryButton href="#update" Icon={Download} onClick={() => setCurrentPage('Update')}>
                            {t('download_now')}
                        </PrimaryButton>
                        <button onClick={() => setCurrentPage('Developer')} className="flex items-center justify-center space-x-2 py-3 px-8 rounded-xl font-bold transition-colors border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-slate-900">
                            <Code className="w-5 h-5" /> {t('learn_arch')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        {/* BARU: Section Selamat Datang */}
        <div className="mt-16 p-8 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-xl shadow-lg border-l-4 border-pink-500">
            <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-300 mb-4">
                {t('welcome_title')}
            </h2>
            <p className="text-lg dark:text-slate-300 text-slate-700">
                {t('welcome_text')}
            </p>
        </div>

        {/* Section Key Features */}
        <div className="mt-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-slate-900 dark:text-slate-100">{t('key_features')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <InfoCard 
                    title={t('engine_title')} 
                    content={t('engine_content')}
                    icon={Zap}
                />
                <InfoCard 
                    title={t('security_title')} 
                    content={t('security_content')} 
                    icon={Shield}
                />
                <InfoCard 
                    title={t('architecture_title')} 
                    content={t('architecture_content')} 
                    icon={Code}
                />
            </div>
        </div>
    </div>
);

const UpdatePage = ({ t }) => (
    <div className="max-w-5xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold mb-8 text-pink-500 border-b pb-3 dark:border-slate-700">{t('update')} & Rilis Resmi</h1>

        {/* Kotak Rilis Terbaru */}
        <div className="mb-12 text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-l-8 border-indigo-600">
            <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-indigo-400">Rilis Stabil Terbaru: V3.5 (Oktober 2025)</h2>
            <p className="dark:text-slate-300 text-slate-700 text-lg mb-6">
                Rilis paling stabil dan berkinerja tinggi kami. Direkomendasikan untuk semua pengguna.
            </p>
            <PrimaryButton href={PROJECT_DOWNLOAD_LINK} Icon={Download} target="_blank">
                Unduh Sekarang (V3.5)
            </PrimaryButton>
            <p className="mt-4 text-sm dark:text-slate-500 text-slate-400">Ukuran file: 12.8 MB | SHA-256: 4e0f9b6c...</p>
        </div>

        {/* Daftar Changelog Profesional */}
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">Riwayat Perubahan (Changelog)</h2>
        <div className="space-y-6">
            {[
                { version: "V3.4", date: "2025-09-15", changes: "Optimalisasi *threading* kernel untuk beban kerja berat. Peningkatan responsivitas I/O." },
                { version: "V3.0", date: "2025-08-01", changes: "Integrasi modul keamanan *sandboxing* baru. Peningkatan kompatibilitas Android 16." },
                { version: "V2.5", date: "2025-07-20", changes: "Perbaikan *bug* fatal pada *memory allocation*. Peningkatan stabilitas pada perangkat berspesifikasi rendah." },
            ].map((log) => (
                <div key={log.version} className="p-5 rounded-lg bg-white dark:bg-slate-800 shadow-lg flex items-start space-x-4 border-l-4 border-pink-500">
                    <span className="flex-shrink-0 text-pink-500 dark:text-pink-400 font-bold text-lg">{log.version}</span>
                    <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">{log.changes}</p>
                        <p className="text-sm dark:text-slate-500 text-slate-400 mt-1">Dirilis pada: {log.date}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const BerkasPage = ({ t }) => {
    const [activeTab, setActiveTab] = useState('dokumentasi');

    // Helper function untuk menentukan warna tag
    const getTagClasses = (color) => {
        switch (color) {
            case 'indigo': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100';
            case 'pink': return 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100';
            case 'green': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
            default: return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const renderFileList = (files) => (
        <div className="space-y-6">
            {files.map((file, index) => (
                <div key={index} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl transition-all hover:shadow-2xl hover:ring-2 hover:ring-pink-500/50">
                    <div className="flex justify-between items-start flex-wrap mb-4">
                        <div className="flex items-center space-x-3">
                            <file.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{file.name}</h2>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${getTagClasses(file.color)}`}>
                            {file.tag}
                        </span>
                    </div>
                    <p className="dark:text-slate-400 text-slate-600 mb-6">{file.description}</p>
                    
                    <PrimaryButton href={file.link} Icon={Download} target="_blank" className="py-2 px-6 text-sm">
                        {t('download_file')}
                    </PrimaryButton>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto py-16">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-600 dark:text-indigo-400 flex items-center">
                <Archive className="w-8 h-8 mr-3 text-pink-500" /> {t('files_archive')}
            </h1>
            <p className="text-lg dark:text-slate-400 text-slate-600 mb-8 border-b pb-4 dark:border-slate-700">
                {t('files_subtitle')}
            </p>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8 border-b dark:border-slate-700">
                <button
                    onClick={() => setActiveTab('dokumentasi')}
                    className={`
                        flex items-center space-x-2 pb-3 px-2 font-semibold text-lg transition-colors
                        ${activeTab === 'dokumentasi' 
                            ? 'text-pink-500 border-b-4 border-pink-500 dark:text-pink-400' 
                            : 'text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-b-4 border-transparent'
                        }
                    `}
                >
                    <FileText className="w-5 h-5" />
                    <span>{t('tech_docs')}</span>
                </button>
                <button
                    onClick={() => setActiveTab('arsip')}
                    className={`
                        flex items-center space-x-2 pb-3 px-2 font-semibold text-lg transition-colors
                        ${activeTab === 'arsip' 
                            ? 'text-pink-500 border-b-4 border-pink-500 dark:text-pink-400' 
                            : 'text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-b-4 border-transparent'
                        }
                    `}
                >
                    <Clock className="w-5 h-5" />
                    <span>{t('hist_archive')}</span>
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'dokumentasi' && (
                <div className="animate-in fade-in duration-500">
                    {renderFileList(fileArchives.dokumentasi)}
                </div>
            )}
            
            {activeTab === 'arsip' && (
                <div className="animate-in fade-in duration-500">
                    {renderFileList(fileArchives.arsip)}
                </div>
            )}
            
            <div className="mt-12 p-5 border-l-4 border-pink-500 dark:bg-slate-800/50 bg-gray-100 rounded-lg text-sm dark:text-slate-400 text-slate-600">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{t('note_title')}</p>
                <p>{t('note_content')}</p>
            </div>
        </div>
    );
};

const DeveloperPage = ({ t }) => (
    <div className="max-w-6xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold mb-10 text-slate-900 dark:text-slate-100 border-b pb-3 dark:border-slate-700">Tim Arsitek & Insinyur Inti</h1>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { name: "Ucan-Dev", title: "Lead Architect & Founder", contact: "https://github.com/ucan-dev", icon: Github, bio: "Fokus pada efisiensi *low-level* dan skalabilitas proyek." },
                { name: "Admin Kucing", title: "Quality Assurance Lead", contact: "mailto:admin@ucanproject.dev", icon: Send, bio: "Memastikan stabilitas produk di seluruh ekosistem perangkat." },
                { name: "Sistem Analyst X", title: "Security Engineer", contact: "https://t.me/sys_analyst_x", icon: Shield, bio: "Bertanggung jawab atas integrasi protokol keamanan terbaru." },
            ].map((dev, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 transition-all hover:shadow-2xl hover:border-pink-500">
                    <img 
                        src={IMAGE_PLACEHOLDERS.DEVELOPER_PHOTO} 
                        alt={`Foto ${dev.name}`} 
                        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-pink-500 shadow-md"
                    />
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{dev.name}</h2>
                    <p className="text-md font-semibold dark:text-slate-300 text-slate-700 mb-3">{dev.title}</p>
                    <p className="dark:text-slate-400 text-slate-600 italic mb-6 text-sm">{dev.bio}</p>
                    
                    <a 
                        href={dev.contact} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-2 py-2 px-4 rounded-lg font-semibold text-sm transition-colors bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-pink-500 hover:text-white"
                    >
                        <dev.icon className="w-4 h-4" /> <span>Hubungi Developer</span>
                    </a>
                </div>
            ))}
        </div>
    </div>
);

const DonasiPage = ({ t }) => (
    <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold mb-10 text-pink-500 border-b pb-3 dark:border-slate-700">Dukung Misi Kami</h1>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl text-center">
            <p className="text-xl dark:text-slate-300 text-slate-700 mb-10 max-w-2xl mx-auto">
                Setiap kontribusi, sekecil apapun, memastikan keberlanjutan pengembangan, pemeliharaan server, dan riset teknologi baru.
            </p>

            {/* Tombol Donasi - Kontras & Besar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <a 
                    href={DONATION_LINKS.PAYPAL} target="_blank" rel="noopener noreferrer" 
                    className="flex flex-col items-center p-6 rounded-xl bg-blue-600 text-white font-bold text-lg transition-all shadow-md hover:bg-blue-700 hover:scale-[1.02]"
                >
                    <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal Icon" className="w-12 h-12 mb-2" />
                    DONASI VIA PAYPAL
                </a>
                <a 
                    href={DONATION_LINKS.BUYMEACOFFEE} target="_blank" rel="noopener noreferrer" 
                    // Menggunakan Pink/Rose untuk BuyMeACoffee agar sesuai tema
                    className="flex flex-col items-center p-6 rounded-xl bg-pink-500 text-white font-bold text-lg transition-all shadow-md hover:bg-pink-600 hover:scale-[1.02]"
                >
                    <Coffee className="w-12 h-12 mb-2" />
                    BUY ME A COFFEE
                </a>
                <a 
                    href={DONATION_LINKS.SAWERIA} target="_blank" rel="noopener noreferrer" 
                    className="flex flex-col items-center p-6 rounded-xl bg-green-500 text-white font-bold text-lg transition-all shadow-md hover:bg-green-600 hover:scale-[1.02]"
                >
                    <img src="https://saweria.co/favicon.ico" alt="Saweria Icon" className="w-12 h-12 mb-2 rounded-full" />
                    SAWERIA
                </a>
            </div>

            {/* QR Code Section - Clean & Fokus */}
            <div className="mt-10 p-6 dark:bg-slate-900 bg-gray-100 rounded-lg border-4 border-pink-500 inline-block shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 text-pink-500">Opsi Cepat: Saweria QR</h3>
                <div className="w-56 h-56 mx-auto p-4 bg-white rounded-lg shadow-inner">
                    <img 
                        src={IMAGE_PLACEHOLDERS.SAWERIA_QR} 
                        alt="Saweria QR Code" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    </div>
);

const NotFoundPage = ({ setCurrentPage }) => (
    <div className="max-w-4xl mx-auto py-32 text-center">
        <h1 className="text-8xl font-extrabold text-pink-500 mb-4">404</h1>
        <p className="text-3xl font-semibold dark:text-slate-300 text-slate-700 mb-8">Halaman yang Anda Cari Tidak Ditemukan</p>
        <PrimaryButton href="#home" Icon={Link} onClick={() => setCurrentPage('Home')}>
            Kembali ke Beranda Utama
        </PrimaryButton>
    </div>
);


// --- KOMPONEN UTAMA APLIKASI ---

const App = () => {
    const [currentPage, setCurrentPage] = useState('Home');
    const [language, setLanguage] = useState('id'); // Default Bahasa Indonesia

    // Helper function for translation
    const t = (key) => TRANSLATIONS[language][key] || key;

    // Fungsi untuk merender halaman berdasarkan state
    const renderPage = () => {
        // Meneruskan fungsi terjemahan (t) ke semua halaman yang relevan
        switch (currentPage) {
            case 'Home': return <HomePage setCurrentPage={setCurrentPage} t={t} />;
            case 'Update': return <UpdatePage t={t} />;
            case 'Berkas': return <BerkasPage t={t} />; 
            case 'Developer': return <DeveloperPage t={t} />;
            case 'Donasi': return <DonasiPage t={t} />;
            default: return <NotFoundPage setCurrentPage={setCurrentPage} t={t} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-500 font-sans">
            <Header 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                language={language} 
                setLanguage={setLanguage}
                t={t}
            />
            
            <main className="min-h-[70vh] px-4">
                {renderPage()}
            </main>
            
            <Footer />
        </div>
    );
};

export default App;
