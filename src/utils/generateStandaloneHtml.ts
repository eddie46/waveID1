import { ProfileData, ProjectItem, SocialLink, SkillCategory, SupportingComponentItem, WaveidAdmin } from '../types';
import { adminWaveidData as defaultAdmins } from '../data/portfolioData';

/**
 * Utilitas untuk menghasilkan kode index.html mandiri (Single-File HTML + CSS + JS)
 * yang dapat langsung diunggah ke repositori GitHub Pages tanpa proses build.
 */
export function generateStandaloneHtml(
  profile: ProfileData,
  projects: ProjectItem[],
  socials: SocialLink[],
  skills: SkillCategory[],
  supportingParts?: SupportingComponentItem[],
  adminsList?: WaveidAdmin[]
): string {
  const effectiveAdmins = adminsList && adminsList.length > 0 ? adminsList : defaultAdmins;
  const totalPartsCount = projects.length + (supportingParts ? supportingParts.length : 0);
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <!-- 
    ========================================================================
    PORTOFOLIO GITHUB.IO MINIMALIS & RESPONSIF
    ========================================================================
    Dibuat untuk dipublikasikan langsung di GitHub Pages (username.github.io)
    Desain: Modern, Elegan, Sans-Serif, CSS Grid & Flexbox, serta Dukungan Mode Gelap.
  -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} - ${profile.role}</title>
  <meta name="description" content="${profile.bio.replace(/"/g, '&quot;')}">

  <!-- Font Sans-Serif Modern & Profesional: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <style>
    /* =====================================================================
       1. VARIABEL WARNA & TEMA (Light & Dark Mode)
       ===================================================================== */
    :root {
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --bg-primary: #fafafa;
      --bg-surface: #ffffff;
      --border-color: #e5e7eb;
      --border-subtle: #f3f4f6;
      --text-primary: #111827;
      --text-secondary: #4b5563;
      --text-muted: #6b7280;
      --accent-color: #06b6d4;
      --accent-hover: #0891b2;
      --badge-bg: #ecfeff;
      --badge-text: #0e7490;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
      --transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-theme="dark"] {
      --bg-primary: #090b14;
      --bg-surface: #111524;
      --border-color: #1f293d;
      --border-subtle: #182030;
      --text-primary: #f9fafb;
      --text-secondary: #9ca3af;
      --text-muted: #6b7280;
      --accent-color: #38bdf8;
      --accent-hover: #06b6d4;
      --badge-bg: #0c1c2e;
      --badge-text: #38bdf8;
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    /* =====================================================================
       2. RESET & DASAR TIPOGRAFI
       ===================================================================== */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      transition: background-color 0.25s ease, color 0.25s ease;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* =====================================================================
       3. TATA LETAK & CONTAINER (Flexbox & Grid)
       ===================================================================== */
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Header Navigasi */
    header {
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: rgba(250, 250, 250, 0.85);
      border-bottom: 1px solid var(--border-color);
      transition: var(--transition);
    }
    [data-theme="dark"] header {
      background: rgba(10, 10, 10, 0.85);
    }

    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
    }

    .brand-title {
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: -0.02em;
      text-decoration: none;
      color: var(--text-primary);
    }

    .nav-links {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 500;
      transition: var(--transition);
    }
    .nav-link:hover {
      color: var(--accent-color);
    }

    .theme-toggle-btn {
      background: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }
    .theme-toggle-btn:hover {
      background: var(--border-subtle);
    }

    /* Bagian Konten Utama */
    main {
      padding: 48px 0 80px;
    }

    section {
      margin-bottom: 64px;
    }

    .section-title {
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
      position: relative;
      display: inline-block;
    }

    /* 4. BAGIAN PROFIL SINGKAT */
    .profile-card {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-bottom: 32px;
      border-bottom: 1px solid var(--border-color);
    }

    @media (min-width: 640px) {
      .profile-card {
        flex-direction: row;
        align-items: center;
        gap: 32px;
      }
    }

    .avatar-wrapper {
      position: relative;
      width: 104px;
      height: 104px;
      flex-shrink: 0;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid var(--border-color);
    }

    .status-dot {
      position: absolute;
      bottom: 4px;
      right: 4px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #22c55e;
      border: 2px solid var(--bg-surface);
    }

    .profile-info h1 {
      font-size: 1.85rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 4px;
    }

    .profile-role {
      color: var(--text-secondary);
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .profile-bio {
      color: var(--text-secondary);
      font-size: 0.97rem;
      line-height: 1.65;
      max-width: 600px;
      margin-bottom: 16px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 500;
      background: var(--badge-bg);
      color: var(--badge-text);
      border: 1px solid var(--border-color);
    }

    .status-badge::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #22c55e;
    }

    /* 5. BAGIAN PROYEK (CSS Grid Modern) */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    @media (min-width: 640px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .project-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: var(--transition);
      box-shadow: var(--shadow-sm);
    }

    .project-card:hover {
      border-color: var(--accent-color);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(6, 182, 212, 0.08);
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    .project-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .project-year {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .project-desc {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 16px;
      line-height: 1.55;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }

    .tag {
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 6px;
      background: var(--badge-bg);
      color: var(--badge-text);
      border: 1px solid var(--border-subtle);
    }

    .project-links {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }

    .btn-link {
      font-size: 0.85rem;
      font-weight: 500;
      text-decoration: none;
      color: var(--text-primary);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: var(--transition);
    }
    .btn-link:hover {
      text-decoration: underline;
    }

    /* 6. BAGIAN KEAHLIAN (Flexbox) */
    .skills-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .skill-cat h3 {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .skill-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-chip {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    /* 7. BAGIAN TAUTAN MEDIA SOSIAL */
    .socials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
    }

    .social-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      text-decoration: none;
      color: var(--text-primary);
      transition: var(--transition);
    }

    .social-card:hover {
      border-color: var(--text-muted);
      background: var(--badge-bg);
      transform: translateY(-1px);
    }

    .social-name {
      font-weight: 600;
      font-size: 0.9rem;
    }
    .social-handle {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    /* 8. FOOTER */
    footer {
      border-top: 1px solid var(--border-color);
      padding: 32px 0;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <!-- ===================================================================
       HEADER NAVIGASI DENGAN TOGGLE MODE GELAP
       =================================================================== -->
  <header>
    <div class="container nav-wrapper">
      <a href="#" class="brand-title">${profile.name}</a>
      <nav class="nav-links">
        <a href="#profil" class="nav-link">Profil</a>
        <a href="#proyek" class="nav-link">Daftar Part</a>
        <a href="#keahlian" class="nav-link">Keahlian</a>
        <a href="#kontak" class="nav-link">Kontak</a>
        <button id="themeToggle" class="theme-toggle-btn" aria-label="Ganti Tema">
          <span id="themeIcon">🌓</span>
        </button>
      </nav>
    </div>
  </header>

  <main class="container">
    <!-- =================================================================
         BAGIAN 1: PROFIL SINGKAT / SAMBUTAN
         ================================================================= -->
    <section id="profil">
      <div class="profile-card" style="border-bottom: 1px solid var(--border-color); padding-bottom: 28px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 18px;">
        <div style="width: 180px; height: 180px; border-radius: 24px; overflow: hidden; background: var(--card-bg); border: 1px solid var(--border-color); padding: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <img src="logo.png" alt="Logo WAVEID" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        <div style="font-size: 2.2rem; font-weight: 900; letter-spacing: 0.18em; background: linear-gradient(135deg, #06b6d4, #6366f1, #c026d3); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">WAVEID</div>
        <h1 style="font-size: 2.2rem; font-weight: 800; letter-spacing: -0.03em; margin: 0;">Selamat Datang Member WAVEID</h1>
      </div>
    </section>

    <!-- =================================================================
         BAGIAN 2: ADMIN WAVEID & DAFTAR PART HARDWARE
         Sebelum tombol "Lihat Daftar Part" ditekan: daftar part tersembunyi
         dan menampilkan daftar para admin WAVEID lengkap dengan pas foto.
         ================================================================= -->
    <section id="proyek">
      <!-- 2A. BLOK DAFTAR ADMIN WAVEID (Tampil Awal) -->
      <div id="section-admin-waveid">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <h2 class="section-title" style="margin-bottom: 0;">ADMIN WAVEID</h2>
            <span style="font-family: monospace; font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-muted);">${effectiveAdmins.length}</span>
          </div>
          <button id="btnShowParts" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 10px; font-weight: 600; font-size: 0.85rem; cursor: pointer; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary); box-shadow: var(--shadow-sm);">
            <span>Lihat Daftar Part</span> <span style="font-family: monospace; opacity: 0.75;">(${totalPartsCount})</span> &rarr;
          </button>
        </div>

        <!-- Grid Pas Foto Para Admin Minimalis -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px;">
          ${effectiveAdmins.map(admin => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 10px; display: flex; flex-direction: column; box-shadow: var(--shadow-sm);">
            <!-- Pas Foto Frame (3:4 ratio) -->
            <div style="width: 100%; aspect-ratio: 3/4; border-radius: 8px; overflow: hidden; position: relative; background: #121824; margin-bottom: 10px;">
              <img src="${admin.photoUrl}" alt="${admin.name}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: #1f293d; color: #94a3b8; font-family: monospace; font-weight: bold; font-size: 1.2rem;">${admin.name.slice(0, 2).toUpperCase()}</div>
              ${admin.subRole ? `<div style="position: absolute; top: 6px; right: 6px; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.65); color: #ffffff; font-family: monospace; font-size: 0.65rem; font-weight: bold;">${admin.subRole}</div>` : ''}
            </div>
            <strong style="font-size: 0.88rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${admin.name}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${admin.role}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- 2B. BLOK DAFTAR PART (Tersembunyi Sebelum Tombol Ditekan) -->
      <div id="section-daftar-part" style="display: none;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 8px;">
          <div>
            <span style="display: inline-block; font-family: monospace; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted);">KATALOG HARDWARE</span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 class="section-title" style="margin-bottom: 0;">DAFTAR PART UTAMA</h2>
              <span style="font-family: monospace; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: var(--badge-bg); border: 1px solid var(--border-color); color: var(--text-muted);">${projects.length} PART</span>
            </div>
          </div>
          <button id="btnShowAdmin" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 8px; font-weight: 600; font-size: 0.8rem; cursor: pointer; background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border-color);">
            &larr; <span>Lihat Daftar Admin WAVEID</span>
          </button>
        </div>

        <!-- Tab Pengalih Part vs Wiring Diagram & Unduh BOM -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="tabBtnParts" style="padding: 6px 14px; border-radius: 8px; font-size: 0.82rem; font-weight: 700; cursor: pointer; border: 1px solid var(--border-color); background: var(--text-primary); color: var(--bg-body);">
              Daftar Part (${projects.length + (supportingParts ? supportingParts.length : 0)})
            </button>
            <button id="tabBtnWiring" style="padding: 6px 14px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-secondary);">
              Wiring Diagram (Skematik)
            </button>
          </div>
          <div style="display: flex; gap: 6px;">
            <button id="btnDownloadCSV" style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; cursor: pointer; background: #059669; color: #ffffff; border: none;">
              &darr; <span>Unduh Excel (CSV)</span>
            </button>
            <button id="btnDownloadTXT" style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; cursor: pointer; background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border-color);">
              &darr; <span>Unduh Teks</span>
            </button>
          </div>
        </div>

        <!-- 2B-1. WADAH DAFTAR PART -->
        <div id="container-part-list">
          <p style="margin-bottom: 20px; color: var(--text-muted); font-size: 0.9rem;">
            Daftar 9 modul dan komponen inti sistem hardware WAVEID.
          </p>
          <div style="display: flex; flex-direction: column; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; background: var(--bg-surface);">
            ${projects.map((p, index) => `
            <div style="padding: 14px 18px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; border-bottom: 1px solid var(--border-subtle); ${p.id === 'part-esp32' ? 'background: rgba(6, 182, 212, 0.04);' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 12px; min-width: 240px; flex: 1;">
                <span style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); width: 22px;">${String(index + 1).padStart(2, '0')}</span>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <h3 style="font-size: 0.95rem; font-weight: 700; margin: 0; color: var(--text-primary);">${p.title}</h3>
                    ${p.quantity ? `<span style="font-size: 0.72rem; font-family: monospace; font-weight: 600; padding: 1px 6px; border-radius: 4px; background: var(--badge-bg); border: 1px solid var(--border-color); color: var(--text-secondary);">${p.quantity}</span>` : ''}
                    ${p.id === 'part-esp32' ? `<span style="font-size: 0.7rem; font-weight: 700; padding: 1px 6px; border-radius: 4px; background: rgba(6, 182, 212, 0.15); color: #0891b2;">Otak Inti</span>` : ''}
                  </div>
                  <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">${p.description}</p>
                </div>
              </div>
              ${p.buttonLink ? `
              <div style="display: flex; align-items: center; gap: 8px;">
                <a href="${p.buttonLink.url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 6px; font-size: 0.78rem; font-weight: 700; text-decoration: none; ${p.id === 'part-esp32' ? 'background: linear-gradient(135deg, #06b6d4, #6366f1, #c026d3); color: #ffffff;' : 'background: var(--badge-bg); color: var(--accent-color); border: 1px solid var(--border-color);'};">
                  <span>${p.buttonLink.label}</span> &rarr;
                </a>
              </div>` : ''}
            </div>`).join('')}
          </div>

        ${supportingParts && supportingParts.length > 0 ? `
        <!-- DAFTAR KOMPONEN PENDUKUNG -->
        <div style="margin-top: 36px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--text-primary);">KOMPONEN PENDUKUNG</h3>
            <span style="font-family: monospace; font-size: 0.8rem; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: var(--badge-bg); border: 1px solid var(--border-color); color: var(--text-muted);">${supportingParts.length} ITEM</span>
          </div>
          <p style="margin-bottom: 16px; color: var(--text-muted); font-size: 0.85rem;">
            Komponen pasif, konektor, resistor presisi, sensor audio, dan soket USB pendukung sistem.
          </p>
          <div style="display: flex; flex-direction: column; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; background: var(--bg-surface);">
            ${supportingParts.map((item, index) => `
            <div style="padding: 12px 16px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; border-bottom: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: flex-start; gap: 10px; min-width: 200px; flex: 1;">
                <span style="font-family: monospace; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); width: 22px;">${String(index + 1).padStart(2, '0')}</span>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <strong style="font-size: 0.9rem; color: var(--text-primary);">${item.name}</strong>
                    <span style="font-size: 0.72rem; font-family: monospace; font-weight: 600; padding: 1px 6px; border-radius: 4px; background: rgba(99, 102, 241, 0.1); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.2);">Qty: ${item.quantity}</span>
                    ${item.spec ? `<span style="font-size: 0.75rem; font-family: monospace; color: var(--text-muted);">${item.spec}</span>` : ''}
                  </div>
                  <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.35;">${item.functionDesc}</p>
                </div>
              </div>
              <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; background: var(--badge-bg); color: var(--badge-text); border: 1px solid var(--border-subtle);">${item.type}</span>
            </div>`).join('')}
          </div>
        </div>` : ''}
        </div> <!-- End container-part-list -->

        <!-- 2B-2. WADAH WIRING DIAGRAM (Skematik Hardware) -->
        <div id="container-wiring-diagram" style="display: none;">
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <div>
                <span style="font-family: monospace; font-size: 0.72rem; color: #06b6d4; font-weight: 700; text-transform: uppercase;">SKEMATIK RESMI</span>
                <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-primary);">Wiring Diagram Interkoneksi Hardware WAVEID</h3>
              </div>
              <a href="/wiring_diagram.jpg" download="WAVEID_Wiring_Diagram.jpg" style="padding: 6px 14px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; text-decoration: none; background: var(--text-primary); color: var(--bg-body);">
                Unduh Gambar Skematik
              </a>
            </div>
            
            <div style="background: #0b0f17; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; text-align: center; padding: 10px;">
              <img src="/wiring_diagram.jpg" alt="WAVEID Wiring Diagram" style="max-width: 100%; height: auto; border-radius: 6px;">
            </div>

            <!-- Petunjuk Teknis Perakitan -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 16px;">
              <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: var(--text-primary);">
                <strong style="color: #f59e0b; display: block; margin-bottom: 4px;">Instruksi Modifikasi INA3221</strong>
                <ul style="margin: 0; padding-left: 18px; line-height: 1.4; color: var(--text-muted);">
                  <li>R_SHUNT R100 diganti <strong>R010 (1%)</strong> untuk akurasi arus.</li>
                  <li>R100 pada CH2 diganti R010 atau dijumper.</li>
                  <li>Pinout A0 ke GND dijumper (I2C addr 0x40).</li>
                </ul>
              </div>

              <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: var(--text-primary);">
                <strong style="color: #06b6d4; display: block; margin-bottom: 4px;">Jalur VBUS & Fastcharge QC 3.0</strong>
                <ul style="margin: 0; padding-left: 18px; line-height: 1.4; color: var(--text-muted);">
                  <li>Jalur VBUS dipotong antara PCB board modul dan konektor USB fisik.</li>
                  <li>Divider pin DP/DM menggunakan resistor 7.5K dan 30K.</li>
                </ul>
              </div>

              <div style="background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: var(--text-primary);">
                <strong style="color: #6366f1; display: block; margin-bottom: 4px;">ADS1115 & I2C ESP32</strong>
                <ul style="margin: 0; padding-left: 18px; line-height: 1.4; color: var(--text-muted);">
                  <li>SCL &rarr; GPIO22, SDA &rarr; GPIO21, ADDR &rarr; GND.</li>
                  <li>Filter divider: Resistor 7K5, 30K, dan kapasitor 100nF.</li>
                </ul>
              </div>

              <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 8px; padding: 12px; font-size: 0.8rem; color: var(--text-primary);">
                <strong style="color: #a855f7; display: block; margin-bottom: 4px;">Level Shifter & Relay 12V</strong>
                <ul style="margin: 0; padding-left: 18px; line-height: 1.4; color: var(--text-muted);">
                  <li>AMS1117-1.8V memberi referensi level logika board HP.</li>
                  <li>PIN G16 ESP32 &harr; PIN TX Board HP.</li>
                  <li>Relay 12V dilengkapi Dioda 1N4148 flyback protection.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =================================================================
         BAGIAN 3: KEAHLIAN & TEKNOLOGI
         ================================================================= -->
    <section id="keahlian">
      <h2 class="section-title">Keahlian & Teknologi</h2>
      <div class="skills-wrapper">
        ${skills.map(cat => `
        <div class="skill-cat">
          <h3>${cat.title}</h3>
          <div class="skill-list">
            ${cat.skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
    </section>

    <!-- =================================================================
         BAGIAN 4: KONTAK & KOMUNITAS RESMI WAVEID
         ================================================================= -->
    <section id="kontak">
      <h2 class="section-title">Kontak & Saluran Resmi WAVEID</h2>
      <p style="margin-bottom: 20px; color: var(--text-muted); font-size: 0.9rem;">
        Bergabung dan terhubung langsung bersama tim serta seluruh member komunitas WAVEID.
      </p>
      <div class="socials-grid">
        ${socials.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-card" style="${s.id === 'telegram' ? 'border-color: rgba(14, 165, 233, 0.4);' : 'border-color: rgba(34, 197, 94, 0.4);'}">
          <div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span class="social-name" style="${s.id === 'telegram' ? 'color: #0284c7;' : 'color: #16a34a;'}">${s.platform}</span>
              <span style="font-size: 0.68rem; font-family: monospace; font-weight: 700; padding: 1px 6px; border-radius: 9999px; ${s.id === 'telegram' ? 'background: rgba(14, 165, 233, 0.12); color: #0284c7;' : 'background: rgba(34, 197, 94, 0.12); color: #16a34a;'}">${s.id === 'telegram' ? 'Channel' : 'Grup Komunitas'}</span>
            </div>
            <div class="social-handle" style="font-family: monospace;">${s.username}</div>
          </div>
          <span style="font-size: 1.1rem; font-weight: bold; ${s.id === 'telegram' ? 'color: #0284c7;' : 'color: #16a34a;'}">&rarr;</span>
        </a>`).join('')}
      </div>
    </section>
  </main>

  <!-- ===================================================================
       FOOTER
       =================================================================== -->
  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${profile.name}. Dihosting di GitHub Pages.</p>
    </div>
  </footer>

  <!-- ===================================================================
       SKRIP JAVASCRIPT RINGAN (Mode Gelap & Penyimpanan Tema)
       =================================================================== -->
  <script>
    (function() {
      const themeToggleBtn = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');
      
      // Deteksi preferensi tema tersimpan atau tema sistem
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
      }

      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        themeIcon.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
      });

      // Logika Toggle Tampilan Admin WAVEID vs Daftar Part
      // Sebelum tombol ditekan, daftar part tersembunyi dan menampilkan daftar para admin
      const heroBtn = document.getElementById('heroBtnViewParts');
      const btnShowParts = document.getElementById('btnShowParts');
      const btnShowAdmin = document.getElementById('btnShowAdmin');
      const adminSection = document.getElementById('section-admin-waveid');
      const partSection = document.getElementById('section-daftar-part');

      function showParts() {
        if (adminSection) adminSection.style.display = 'none';
        if (partSection) {
          partSection.style.display = 'block';
          partSection.scrollIntoView({ behavior: 'smooth' });
        }
      }

      function showAdmin() {
        if (partSection) partSection.style.display = 'none';
        if (adminSection) {
          adminSection.style.display = 'block';
          adminSection.scrollIntoView({ behavior: 'smooth' });
        }
      }

      if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
          e.preventDefault();
          showParts();
        });
      }
      if (btnShowParts) {
        btnShowParts.addEventListener('click', showParts);
      }
      if (btnShowAdmin) {
        btnShowAdmin.addEventListener('click', showAdmin);
      }

      // Logika Toggle Tab Daftar Part vs Wiring Diagram
      const tabBtnParts = document.getElementById('tabBtnParts');
      const tabBtnWiring = document.getElementById('tabBtnWiring');
      const containerPartList = document.getElementById('container-part-list');
      const containerWiringDiagram = document.getElementById('container-wiring-diagram');

      if (tabBtnParts && tabBtnWiring && containerPartList && containerWiringDiagram) {
        tabBtnParts.addEventListener('click', function() {
          containerPartList.style.display = 'block';
          containerWiringDiagram.style.display = 'none';
          tabBtnParts.style.background = 'var(--text-primary)';
          tabBtnParts.style.color = 'var(--bg-body)';
          tabBtnWiring.style.background = 'var(--bg-surface)';
          tabBtnWiring.style.color = 'var(--text-secondary)';
        });

        tabBtnWiring.addEventListener('click', function() {
          containerPartList.style.display = 'none';
          containerWiringDiagram.style.display = 'block';
          tabBtnWiring.style.background = 'var(--text-primary)';
          tabBtnWiring.style.color = 'var(--bg-body)';
          tabBtnParts.style.background = 'var(--bg-surface)';
          tabBtnParts.style.color = 'var(--text-secondary)';
        });
      }

      // Handler Unduh CSV & TXT Standalone
      const btnDownloadCSV = document.getElementById('btnDownloadCSV');
      const btnDownloadTXT = document.getElementById('btnDownloadTXT');

      function triggerDownload(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      if (btnDownloadCSV) {
        btnDownloadCSV.addEventListener('click', function() {
          let csv = "\\uFEFFNo,Kategori,Nama Part / Komponen,Spesifikasi,Jumlah,Deskripsi\\r\\n";
          let count = 1;
          ${JSON.stringify(projects)}.forEach(function(p) {
            csv += '"' + count++ + '","Part Utama","' + (p.title || '').replace(/"/g, '""') + '","' + (p.code || '').replace(/"/g, '""') + '","' + (p.quantity || '1 Unit') + '","' + (p.description || '').replace(/"/g, '""') + '"\\r\\n';
          });
          ${JSON.stringify(supportingParts || [])}.forEach(function(sp) {
            csv += '"' + count++ + '","Komponen Pendukung","' + (sp.name || '').replace(/"/g, '""') + '","' + (sp.spec || '').replace(/"/g, '""') + '","' + (sp.quantity || '1 Unit') + '","' + (sp.functionDesc || '').replace(/"/g, '""') + '"\\r\\n';
          });
          triggerDownload(csv, 'Daftar_Part_WAVEID.csv', 'text/csv;charset=utf-8;');
        });
      }

      if (btnDownloadTXT) {
        btnDownloadTXT.addEventListener('click', function() {
          let txt = "================================================================\\n";
          txt += "           DAFTAR PART & BILL OF MATERIALS (BOM) WAVEID\\n";
          txt += "================================================================\\n\\n";
          txt += "[ PART UTAMA ]\\n";
          ${JSON.stringify(projects)}.forEach(function(p, i) {
            txt += (i + 1) + ". " + p.title + " (" + (p.code || '-') + ") - Qty: " + (p.quantity || '1 Unit') + "\\n";
            txt += "   Fungsi: " + p.description + "\\n\\n";
          });
          txt += "\\n[ KOMPONEN PENDUKUNG ]\\n";
          ${JSON.stringify(supportingParts || [])}.forEach(function(sp, i) {
            txt += (i + 1) + ". " + sp.name + " (" + (sp.spec || '-') + ") - Qty: " + sp.quantity + "\\n";
            txt += "   Fungsi: " + sp.functionDesc + "\\n\\n";
          });
          triggerDownload(txt, 'Daftar_Part_WAVEID.txt', 'text/plain;charset=utf-8;');
        });
      }
    })();
  </script>
</body>
</html>`;
}
