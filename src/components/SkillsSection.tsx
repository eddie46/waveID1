import React from 'react';
import { Layers } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

/**
 * Komponen SkillsSection:
 * Menampilkan daftar keahlian, teknologi, dan perkakas kerja
 * dengan tata letak grid dan flexbox chips yang rapi dan mudah disesuaikan.
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  return (
    <section id="keahlian" className="py-8 sm:py-12 border-b border-neutral-200 dark:border-neutral-800">
      {/* Header Bagian */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Kompetensi</span>
        </div>
        <h2
          id="skills-section-heading"
          className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          Keahlian & Teknologi
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
          Tumpukan teknologi (tech stack) dan perkakas yang biasa saya gunakan dalam membangun produk web.
        </p>
      </div>

      {/* Grid Kategori Keahlian */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 shadow-xs hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2.5 sm:mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
              <span>{cat.title}</span>
            </h3>
            {/* Flexbox Chip Layout */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-lg font-medium bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 transition-all hover:border-cyan-500/40 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
