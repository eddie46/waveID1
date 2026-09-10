import React, { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { WaveidAdmin } from '../types';
import { adminWaveidData } from '../data/portfolioData';

interface AdminWaveidListProps {
  admins?: WaveidAdmin[];
  onViewParts: () => void;
  partsCount?: number;
}

/**
 * Komponen AdminWaveidList:
 * Menampilkan daftar para admin WAVEID dengan desain minimalis, rapi, dan elegan.
 */
export const AdminWaveidList: React.FC<AdminWaveidListProps> = ({
  admins = adminWaveidData,
  onViewParts,
  partsCount = 19
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Semua', count: admins.length },
    { id: 'Developer Evangelist', label: 'Evangelist' },
    { id: 'Administrasi', label: 'Administrasi' },
    { id: 'Developer', label: 'Developer' },
    { id: 'Developer Design & Register', label: 'Design & Register' }
  ];

  const filteredAdmins = activeCategory === 'all'
    ? admins
    : admins.filter(a => a.category === activeCategory);

  const handleImageError = (id: string) => {
    setImageErrorMap(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="proyek" className="py-6 sm:py-8 border-b border-neutral-200/70 dark:border-neutral-800/70">
      {/* Header Admin WAVEID & Tombol Aksi Buka Part */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2.5">
          <h2
            id="admin-waveid-heading"
            className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50"
          >
            ADMIN WAVEID
          </h2>
          <span className="text-[11px] sm:text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-700/80">
            {admins.length}
          </span>
        </div>

        {/* Tombol Utama Buka Daftar Part */}
        <button
          onClick={onViewParts}
          id="btn-trigger-view-parts"
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-98 transition-all cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Lihat Daftar Part</span>
          <span className="font-mono text-xs opacity-75">({partsCount})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Kategori Admin Minimalis */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-4 sm:mb-6 pb-1 overflow-x-auto scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            id={`filter-admin-${cat.id}`}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid Kartu Pas Foto Minimalis Para Admin WAVEID (4 Kolom Konsisten di HP & Web) */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
        {filteredAdmins.map(admin => {
          const hasImageError = imageErrorMap[admin.id];
          const initials = admin.name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

          return (
            <article
              key={admin.id}
              id={`admin-card-${admin.id}`}
              className="group rounded-lg sm:rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 p-1 sm:p-3 flex flex-col hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-xs"
            >
              {/* Foto Admin Proporsional (3:4) */}
              <div className="relative w-full aspect-[3/4] rounded-md sm:rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-1 sm:mb-2">
                {!hasImageError ? (
                  <img
                    src={admin.photoUrl}
                    alt={admin.name}
                    onError={() => handleImageError(admin.id)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono font-bold text-neutral-400 text-xs sm:text-lg">
                    {initials}
                  </div>
                )}

                {/* SubRole Badge Minimalis */}
                {admin.subRole && (
                  <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded text-[8px] sm:text-[10px] font-mono font-semibold bg-black/60 text-white backdrop-blur-xs">
                    {admin.subRole}
                  </span>
                )}
              </div>

              {/* Nama dan Jabatan Admin */}
              <div className="flex flex-col flex-grow justify-between min-h-[28px] sm:min-h-[40px]">
                <h3 className="text-[10px] sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate text-center sm:text-left">
                  {admin.name}
                </h3>
                <p className="text-[8px] sm:text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 text-center sm:text-left">
                  {admin.role}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
