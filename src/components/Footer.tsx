import React from 'react';
import { ArrowUp, Github } from 'lucide-react';

interface FooterProps {
  name: string;
}

/**
 * Komponen Footer:
 * Bagian penutup halaman web dengan tautan kembali ke atas,
 * informasi hak cipta, dan penanda ramah GitHub Pages.
 */
export const Footer: React.FC<FooterProps> = ({ name }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="py-10 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Hak Cipta & Hosting Info */}
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-neutral-400" />
          <span>
            &copy; {new Date().getFullYear()} {name}. Dirancang untuk <strong className="font-semibold text-neutral-700 dark:text-neutral-300">GitHub Pages</strong>.
          </span>
        </div>

        {/* Status Mode & Tombol Kembali ke Atas */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">&bull;</span>
          <button
            id="btn-scroll-top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 transition-all cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
