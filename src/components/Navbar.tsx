import React from 'react';
import { Sun, Moon, Code, BookOpen } from 'lucide-react';

interface NavbarProps {
  name: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenExportModal: () => void;
}

/**
 * Komponen Navbar:
 * Header tetap (sticky) dengan efek blur kaca modern, navigasi bagian,
 * tombol ganti tema (mode terang/gelap), dan tombol panduan GitHub Pages.
 */
export const Navbar: React.FC<NavbarProps> = ({
  name,
  isDark,
  onToggleTheme,
  onOpenExportModal
}) => {
  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 bg-white/80 dark:bg-[#090b14]/80 border-neutral-200/80 dark:border-neutral-800/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo Minimalis dengan Sentuhan Gradien WAVEID */}
        <a
          href="#profil"
          id="nav-brand-link"
          className="group flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-bold text-base tracking-tight hover:opacity-90 transition-opacity"
        >
          <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-600 text-white flex items-center justify-center text-xs font-mono font-black shadow-xs group-hover:scale-105 transition-transform">
            {name.charAt(0)}
          </span>
          <span className="font-bold text-sm sm:text-base group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {name}
          </span>
        </a>

        {/* Navigasi Tautan */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center gap-1 mr-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <a
              href="#profil"
              id="nav-link-profil"
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 transition-colors"
            >
              Profil
            </a>
            <a
              href="#proyek"
              id="nav-link-proyek"
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 transition-colors"
            >
              Daftar Part
            </a>
            <a
              href="#keahlian"
              id="nav-link-keahlian"
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 transition-colors"
            >
              Keahlian
            </a>
            <a
              href="#kontak"
              id="nav-link-kontak"
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 transition-colors"
            >
              Kontak
            </a>
          </div>

          {/* Tombol Buka Kode & Panduan GitHub.io */}
          <button
            id="btn-open-github-guide"
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-cyan-500/30 dark:border-cyan-500/30 text-neutral-700 dark:text-neutral-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer"
            title="Dapatkan file index.html mandiri & panduan GitHub Pages"
          >
            <Code className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden xs:inline">index.html</span>
            <span className="text-[10px] bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 px-1.5 py-0.5 rounded font-mono font-semibold">
              Export
            </span>
          </button>

          {/* Tombol Toggle Mode Gelap / Terang */}
          <button
            id="btn-theme-toggle"
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/30 transition-colors cursor-pointer"
            aria-label={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-cyan-400 transition-transform rotate-0 scale-100" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600 transition-transform rotate-0 scale-100" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
