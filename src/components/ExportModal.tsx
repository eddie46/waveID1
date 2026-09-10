import React, { useState } from 'react';
import { X, Copy, Check, Download, BookOpen, Code2, Globe, Terminal } from 'lucide-react';
import { ProfileData, ProjectItem, SocialLink, SkillCategory, SupportingComponentItem, WaveidAdmin } from '../types';
import { generateStandaloneHtml } from '../utils/generateStandaloneHtml';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  projects: ProjectItem[];
  supportingComponents?: SupportingComponentItem[];
  admins?: WaveidAdmin[];
  socials: SocialLink[];
  skills: SkillCategory[];
}

/**
 * Komponen ExportModal:
 * Menyediakan panduan langkah demi langkah cara mempublikasikan web ke GitHub Pages,
 * serta fitur salin/unduh berkas index.html mandiri untuk kemudahan pengelolaan.
 */
export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  supportingComponents,
  admins,
  socials,
  skills
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'code'>('code');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlCode = generateStandaloneHtml(profile, projects, socials, skills, supportingComponents, admins);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="export-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="export-modal-dialog"
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Ekspor & Panduan GitHub Pages
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Gunakan berkas <span className="font-mono text-neutral-800 dark:text-neutral-200">index.html</span> untuk web pribadi Anda di GitHub.io
              </p>
            </div>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Tutup Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigasi Modal */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/30">
          <button
            id="tab-btn-code"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 pb-2.5 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Kode Mandiri (index.html)</span>
          </button>

          <button
            id="tab-btn-guide"
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 pb-2.5 px-2 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'border-fuchsia-500 text-fuchsia-600 dark:text-fuchsia-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Panduan Hosting GitHub.io</span>
          </button>
        </div>

        {/* Konten Tab */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'code' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-950 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Ini adalah kode <strong className="font-semibold text-neutral-900 dark:text-neutral-100">Single-File HTML murni</strong> yang sudah memuat styling CSS selaras dengan warna logo WAVEID (Cyan & Fuchsia), layout Flexbox & Grid, font sans-serif, serta fitur mode gelap otomatis.
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="btn-copy-code"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Kode</span>
                      </>
                    )}
                  </button>

                  <button
                    id="btn-download-html"
                    onClick={handleDownloadFile}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all cursor-pointer shadow-xs"
                    title="Unduh langsung sebagai file index.html"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh File</span>
                  </button>
                </div>
              </div>

              {/* Tampilan Kode */}
              <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-100">
                <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 text-neutral-400 text-xs font-mono border-b border-neutral-800">
                  <span>index.html (Self-contained)</span>
                  <span>{htmlCode.split('\n').length} baris</span>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[380px] leading-relaxed text-neutral-300">
                  <code>{htmlCode}</code>
                </pre>
              </div>
            </div>
          ) : (
            /* Panduan Deploy GitHub Pages */
            <div className="space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10 border border-cyan-500/20 dark:border-cyan-500/30 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Hosting Gratis & Cepat di GitHub Pages</p>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Setiap akun GitHub memiliki hak istimewa untuk membuat situs gratis dengan nama domain <code className="bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 px-1 py-0.5 rounded font-mono">username.github.io</code>.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center text-xs">1</span>
                    <h4>Buat Repositori Baru di GitHub</h4>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 ml-7 leading-relaxed">
                    Buka github.com &rarr; Klik tombol <strong className="font-semibold text-neutral-800 dark:text-neutral-200">New Repository</strong>. Beri nama repositori persis seperti ini: <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-900 dark:text-neutral-100">username.github.io</code> (ganti <code className="font-mono">username</code> dengan username akun GitHub Anda).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-600 text-white flex items-center justify-center text-xs">2</span>
                    <h4>Unggah Berkas index.html</h4>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 ml-7 leading-relaxed">
                    Unduh file <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-mono">index.html</code> dari tab &quot;Kode Mandiri&quot; di atas, lalu unggah langsung ke akar (root) repositori GitHub Anda, kemudian lakukan commit.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center text-xs">3</span>
                    <h4>Aktifkan GitHub Pages</h4>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 ml-7 leading-relaxed">
                    Masuk ke menu <strong className="font-semibold text-neutral-800 dark:text-neutral-200">Settings</strong> repositori &rarr; pilih menu <strong className="font-semibold text-neutral-800 dark:text-neutral-200">Pages</strong> di bilah kiri. Pastikan <strong className="font-semibold">Source</strong> adalah <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-mono">Deploy from a branch</code> dengan Branch <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-mono">main / root</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center text-xs">4</span>
                    <h4>Selesai &amp; Live!</h4>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 ml-7 leading-relaxed">
                    Dalam 1-2 menit, situs portofolio Anda dapat langsung diakses publik di alamat <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">https://username.github.io</span>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="flex items-center justify-end px-5 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
          <button
            id="btn-footer-close-modal"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
