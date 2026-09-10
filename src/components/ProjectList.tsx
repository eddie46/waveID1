import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Search,
  Copy,
  Check,
  ExternalLink,
  List,
  LayoutGrid,
  RotateCcw,
  Layers,
  SlidersHorizontal,
  Users,
  ArrowLeft,
  GitFork,
  Download,
  FileSpreadsheet,
  FileText,
  FileCode,
  Printer,
  ChevronDown
} from 'lucide-react';
import { ProjectItem, SupportingComponentItem } from '../types';
import { supportingComponentsData as defaultSupportingComponents } from '../data/portfolioData';
import { WiringDiagramViewer } from './WiringDiagramViewer';
import {
  downloadPartListCSV,
  downloadPartListTXT,
  downloadPartListJSON,
  printPartList
} from '../utils/exportPartList';

interface ProjectListProps {
  projects: ProjectItem[];
  supportingComponents?: SupportingComponentItem[];
  onBackToAdmin?: () => void;
}

/**
 * Komponen ProjectList (Halaman DAFTAR PART WAVEID Minimalis):
 * Menampilkan:
 * 1. Part Utama (9 Modul & Komponen Inti)
 * 2. Komponen Pendukung (10 Komponen Pasif & Aksesoris)
 * 3. Wiring Diagram (Skematik Jalur Perkabelan Hardware)
 */
export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  supportingComponents = defaultSupportingComponents,
  onBackToAdmin
}) => {
  const [sectionTab, setSectionTab] = useState<'all' | 'main' | 'supporting' | 'wiring'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState<boolean>(false);

  // Filter Part Utama
  const filteredMainParts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return projects;

    return projects.filter(part => {
      return (
        part.title.toLowerCase().includes(query) ||
        (part.code && part.code.toLowerCase().includes(query)) ||
        (part.brand && part.brand.toLowerCase().includes(query)) ||
        (part.compatibility && part.compatibility.toLowerCase().includes(query)) ||
        (part.quantity && part.quantity.toLowerCase().includes(query)) ||
        part.description.toLowerCase().includes(query) ||
        part.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });
  }, [projects, searchQuery]);

  // Filter Komponen Pendukung
  const filteredSupportingParts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return supportingComponents;

    return supportingComponents.filter(item => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.spec && item.spec.toLowerCase().includes(query)) ||
        item.quantity.toLowerCase().includes(query) ||
        item.functionDesc.toLowerCase().includes(query)
      );
    });
  }, [supportingComponents, searchQuery]);

  const totalFilteredCount =
    (sectionTab === 'supporting' ? 0 : filteredMainParts.length) +
    (sectionTab === 'main' ? 0 : filteredSupportingParts.length);

  const handleCopyPartInfo = (part: ProjectItem) => {
    const text = `[PART UTAMA WAVEID] ${part.title}
Kode: ${part.code || '-'}
Jumlah: ${part.quantity || '1 Unit'}
Peruntukan: ${part.compatibility || 'Sistem WAVEID'}
${part.buttonLink ? `Link: ${part.buttonLink.url}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedItemId(part.id);
    setTimeout(() => {
      setCopiedItemId(null);
    }, 2000);
  };

  const handleCopySupportingInfo = (item: SupportingComponentItem) => {
    const text = `[KOMPONEN PENDUKUNG WAVEID] ${item.name}
Jumlah: ${item.quantity}
Tipe: ${item.type}
Spesifikasi: ${item.spec || '-'}
Fungsi: ${item.functionDesc}`;

    navigator.clipboard.writeText(text);
    setCopiedItemId(item.id);
    setTimeout(() => {
      setCopiedItemId(null);
    }, 2000);
  };

  return (
    <section id="proyek" className="py-10 border-b border-neutral-200/70 dark:border-neutral-800/70">
      {/* Header Minimalis */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Katalog Hardware & Bill of Materials
            </span>
          </div>
          <h2
            id="projects-section-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2"
          >
            <span>DAFTAR PART WAVEID</span>
            {sectionTab === 'wiring' ? (
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Skematik Wiring
              </span>
            ) : (
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                {totalFilteredCount} Item
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {sectionTab === 'wiring'
              ? 'Skematik resmi perakitan kabel & interkoneksi modul hardware sistem WAVEID.'
              : 'Daftar lengkap 9 modul Part Utama & 10 Komponen Pendukung perakitan sistem.'}
          </p>
        </div>

        {/* Kontrol: Tombol Kembali ke Admin, Pencarian & Mode Tampilan */}
        <div className="flex flex-wrap items-center gap-2">
          {onBackToAdmin && (
            <button
              onClick={onBackToAdmin}
              id="btn-back-to-admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 text-xs font-semibold transition-all cursor-pointer shadow-xs"
              title="Kembali ke Daftar Admin WAVEID"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span>Lihat Admin</span>
            </button>
          )}

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-part-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari part utama / pendukung..."
              className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                title="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tombol Unduh Daftar Part (BOM) */}
          <div className="relative">
            <button
              onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
              id="btn-download-part-list-menu"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-98"
              title="Unduh Daftar Part & Bill of Materials"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Part</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isDownloadMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Format Unduhan */}
            {isDownloadMenuOpen && (
              <div
                className="absolute right-0 mt-1.5 w-60 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl z-30 p-1.5 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setIsDownloadMenuOpen(false)}
              >
                <div className="px-2.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800/80 mb-1">
                  Pilih Format Unduhan BOM
                </div>

                <button
                  onClick={() => downloadPartListCSV(projects, supportingComponents)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-semibold">Spreadsheet Excel (.csv)</div>
                    <div className="text-[10px] text-neutral-400">Tabel lengkap kompatibel Excel & GSheets</div>
                  </div>
                </button>

                <button
                  onClick={() => downloadPartListTXT(projects, supportingComponents)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-sky-500 shrink-0" />
                  <div>
                    <div className="font-semibold">Laporan Teks (.txt)</div>
                    <div className="text-[10px] text-neutral-400">Format ringkas siap baca di HP / PC</div>
                  </div>
                </button>

                <button
                  onClick={() => downloadPartListJSON(projects, supportingComponents)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <div className="font-semibold">Format Data (.json)</div>
                    <div className="text-[10px] text-neutral-400">Struktur data teknis mentah</div>
                  </div>
                </button>

                <div className="my-1 border-t border-neutral-100 dark:border-neutral-800/80" />

                <button
                  onClick={() => printPartList(projects, supportingComponents)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-indigo-500 shrink-0" />
                  <div>
                    <div className="font-semibold">Cetak / Simpan PDF</div>
                    <div className="text-[10px] text-neutral-400">Buka dialog cetak bersih</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Pengalih Tampilan (List / Grid) */}
          <div className="flex items-center p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              id="btn-view-list"
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-900 text-cyan-600 dark:text-cyan-400 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Tampilan List Minimalis"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              id="btn-view-grid"
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-neutral-900 text-cyan-600 dark:text-cyan-400 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Tampilan Grid Minimalis"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigasi Kategori Bagian (Semua, Part Utama, Komponen Pendukung) */}
      <div className="flex items-center gap-1.5 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto scrollbar-none">
        {onBackToAdmin && (
          <button
            onClick={onBackToAdmin}
            id="tab-view-admin-team"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all cursor-pointer whitespace-nowrap border border-transparent hover:border-indigo-500/30 mr-1"
          >
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>Admin WAVEID (8)</span>
          </button>
        )}

        <button
          onClick={() => setSectionTab('all')}
          id="tab-all-parts"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            sectionTab === 'all'
              ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Semua Part</span>
          <span className="font-mono text-[10px] opacity-75">({projects.length + supportingComponents.length})</span>
        </button>

        <button
          onClick={() => setSectionTab('main')}
          id="tab-main-parts"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            sectionTab === 'main'
              ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-500" />
          <span>Part Utama</span>
          <span className="font-mono text-[10px] opacity-75">({projects.length})</span>
        </button>

        <button
          onClick={() => setSectionTab('supporting')}
          id="tab-supporting-parts"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            sectionTab === 'supporting'
              ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
          <span>Komponen Pendukung</span>
          <span className="font-mono text-[10px] opacity-75">({supportingComponents.length})</span>
        </button>

        <button
          onClick={() => setSectionTab('wiring')}
          id="tab-wiring-diagram"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            sectionTab === 'wiring'
              ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
        >
          <GitFork className="w-3.5 h-3.5 text-amber-500" />
          <span>Wiring Diagram</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">Skematik</span>
        </button>
      </div>

      {/* =========================================================================
          BAGIAN KHUSUS: WIRING DIAGRAM (Ketika Tab Wiring Dipilih)
          ========================================================================= */}
      {sectionTab === 'wiring' && (
        <WiringDiagramViewer />
      )}

      {/* =========================================================================
          BAGIAN 1: PART UTAMA (9 Modul & IC Utama)
          ========================================================================= */}
      {(sectionTab === 'all' || sectionTab === 'main') && (
        <div className="mb-10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-500" />
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                Part Utama
              </h3>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                {filteredMainParts.length} Modul
              </span>
            </div>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
              Mikrokontroler, Power & Telemetri
            </span>
          </div>

          {/* Mode List Minimalis */}
          {viewMode === 'list' && (
            <div className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 border-y border-neutral-200/60 dark:border-neutral-800/60">
              {filteredMainParts.map((part, index) => {
                const isEsp32 = part.id === 'part-esp32' || part.title.toLowerCase().includes('esp32');

                return (
                  <div
                    key={part.id}
                    id={`project-row-${part.id}`}
                    className={`py-3.5 sm:py-4 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40 rounded-lg ${
                      isEsp32 ? 'bg-cyan-50/20 dark:bg-cyan-950/10' : ''
                    }`}
                  >
                    {/* Informasi Kiri: Nomor + Nama + Deskripsi Singkat */}
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 w-5 shrink-0 pt-0.5 sm:pt-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
                            {part.title}
                          </h4>

                          {/* Badge Jumlah / Kuantitas */}
                          {part.quantity && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                              {part.quantity}
                            </span>
                          )}

                          {/* Badge Khusus ESP32 Inti */}
                          {isEsp32 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                              Otak Inti
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1 sm:line-clamp-2">
                          {part.description}
                        </p>
                      </div>
                    </div>

                    {/* Bagian Kanan: Button Link & Salin Info */}
                    <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-1 sm:pt-0 pl-8 sm:pl-0">
                      {/* Button Link */}
                      {part.buttonLink && (
                        <a
                          href={part.buttonLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`btn-link-${part.id}`}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                            isEsp32
                              ? 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 hover:opacity-90 text-white shadow-xs'
                              : 'border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                          }`}
                          title={`Buka link dokumentasi ${part.title}`}
                        >
                          <span>{part.buttonLink.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {/* Tombol Salin Ringkas */}
                      <button
                        type="button"
                        id={`btn-copy-part-${part.id}`}
                        onClick={() => handleCopyPartInfo(part)}
                        className="p-1.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-colors cursor-pointer"
                        title="Salin info part"
                      >
                        {copiedItemId === part.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mode Grid Minimalis */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredMainParts.map((part, index) => {
                const isEsp32 = part.id === 'part-esp32' || part.title.toLowerCase().includes('esp32');

                return (
                  <article
                    key={part.id}
                    id={`project-card-${part.id}`}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all bg-white dark:bg-neutral-900/80 ${
                      isEsp32
                        ? 'border-cyan-500/50 dark:border-cyan-400/50 shadow-xs ring-1 ring-cyan-500/20'
                        : 'border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {part.quantity && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                            {part.quantity}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {part.title}
                      </h4>

                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed line-clamp-3">
                        {part.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/70 flex items-center justify-between gap-2">
                      {part.buttonLink ? (
                        <a
                          href={part.buttonLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                            isEsp32
                              ? 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 hover:opacity-90 text-white shadow-xs'
                              : 'border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-cyan-400'
                          }`}
                        >
                          <span>{part.buttonLink.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopyPartInfo(part)}
                        className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                        title="Salin info part"
                      >
                        {copiedItemId === part.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          BAGIAN 2: KOMPONEN PENDUKUNG (10 Komponen Pasif & Konektor)
          ========================================================================= */}
      {(sectionTab === 'all' || sectionTab === 'supporting') && (
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                Komponen Pendukung
              </h3>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {filteredSupportingParts.length} Komponen
              </span>
            </div>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
              Pasif, Konektor, Resistor & Audio
            </span>
          </div>

          {/* Mode List Minimalis */}
          {viewMode === 'list' && (
            <div className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 border-y border-neutral-200/60 dark:border-neutral-800/60">
              {filteredSupportingParts.map((item, index) => (
                <div
                  key={item.id}
                  id={`supporting-row-${item.id}`}
                  className="py-3 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40 rounded-lg"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 w-5 shrink-0 pt-0.5 sm:pt-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {item.name}
                        </h4>
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          Qty: {item.quantity}
                        </span>
                        {item.spec && (
                          <span className="hidden md:inline-block text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                            • {item.spec}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1 sm:line-clamp-2">
                        {item.functionDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1 sm:pt-0 pl-8 sm:pl-0">
                    <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <button
                      type="button"
                      id={`btn-copy-supp-${item.id}`}
                      onClick={() => handleCopySupportingInfo(item)}
                      className="p-1.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 transition-colors cursor-pointer"
                      title="Salin info komponen"
                    >
                      {copiedItemId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mode Grid Minimalis */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSupportingParts.map((item, index) => (
                <article
                  key={item.id}
                  id={`supporting-card-${item.id}`}
                  className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/80 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-semibold text-neutral-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {item.name}
                    </h4>
                    {item.spec && (
                      <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {item.spec}
                      </div>
                    )}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed line-clamp-2">
                      {item.functionDesc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/70 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopySupportingInfo(item)}
                      className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                      title="Salin info komponen"
                    >
                      {copiedItemId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Banner Pintasan Wiring Diagram di Tab Semua Part */}
      {sectionTab === 'all' && (
        <div className="mt-8 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Wiring Diagram & Skematik Perakitan Tersedia
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Panduan jalur perkabelan ESP32, INA3221 modifikasi shunt R010, ADS1115, Level Shifter, dan pemotongan VBUS QC 3.0.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSectionTab('wiring');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            id="btn-open-wiring-diagram"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0 shadow-xs"
          >
            <span>Buka Wiring Diagram</span>
            <GitFork className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
          </button>
        </div>
      )}

      {/* Tampilan Jika Hasil Pencarian Kosong */}
      {sectionTab !== 'wiring' && totalFilteredCount === 0 && (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/20">
          <Cpu className="w-7 h-7 text-neutral-400 mx-auto mb-2" />
          <p className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Tidak ada komponen yang cocok dengan "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSectionTab('all');
            }}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Pencarian</span>
          </button>
        </div>
      )}
    </section>
  );
};
