import React, { useState } from 'react';
import { ArrowUpRight, Send, MessageCircle, Check, Copy, MessageSquare, Users, ExternalLink } from 'lucide-react';
import { SocialLink } from '../types';

interface SocialSectionProps {
  socials: SocialLink[];
  email?: string;
}

/**
 * Komponen SocialSection:
 * Menampilkan kontak resmi & saluran komunitas WAVEID:
 * 1. Telegram (https://t.me/waveid_project)
 * 2. WhatsApp (https://chat.whatsapp.com/Bj7mgrPWCwA4pGQiploqVK)
 */
export const SocialSection: React.FC<SocialSectionProps> = ({ socials }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (url: string, id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'telegram':
        return <Send className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <MessageSquare className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />;
    }
  };

  return (
    <section id="kontak" className="py-8 sm:py-12 border-b border-neutral-200/80 dark:border-neutral-800/80">
      {/* Header Bagian */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
          <Users className="w-3.5 h-3.5" />
          <span>Komunitas & Kontak</span>
        </div>
        <h2
          id="social-section-heading"
          className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          Kontak & Saluran Resmi WAVEID
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
          Bergabung dan terhubung langsung bersama tim serta seluruh member komunitas WAVEID.
        </p>
      </div>

      {/* Grid Kontak Telegram & WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {socials.map(item => {
          const isTelegram = item.id === 'telegram';
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              id={`social-card-${item.id}`}
              className={`group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-neutral-900/80 border transition-all duration-300 backdrop-blur-xs ${
                isTelegram
                  ? 'border-neutral-200/80 dark:border-neutral-800/80 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/5'
                  : 'border-neutral-200/80 dark:border-neutral-800/80 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl transition-all group-hover:scale-105 ${
                        isTelegram
                          ? 'bg-sky-500/10 dark:bg-sky-500/15'
                          : 'bg-emerald-500/10 dark:bg-emerald-500/15'
                      }`}
                    >
                      {renderIcon(item.icon)}
                    </div>
                    <div>
                      <div className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <span>{item.platform}</span>
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                            isTelegram
                              ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20'
                              : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                          }`}
                        >
                          {isTelegram ? 'Channel / Kontak' : 'Grup Komunitas'}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                        {item.username}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {isTelegram
                    ? 'Akses pembaruan firmware, pengumuman proyek, dan diskusi langsung seputar pengembangan WAVEID.'
                    : 'Ruang interaksi, tanya-jawab teknis hardware, dan panduan perakitan bersama para pengurus & member.'}
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/70">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-sm active:scale-98 ${
                    isTelegram
                      ? 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                  }`}
                >
                  <span>Buka {item.platform}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={e => handleCopy(item.url, item.id, e)}
                  title="Salin Link Tautan"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-[11px] hidden xs:inline">Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
