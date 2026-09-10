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
        return <Send className="w-4 h-4 text-sky-500" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-cyan-500" />;
    }
  };

  return (
    <section id="kontak" className="py-6 sm:py-8 border-b border-neutral-200/80 dark:border-neutral-800/80">
      {/* Header Minimalis */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-500" />
          <h2
            id="social-section-heading"
            className="text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50"
          >
            Komunitas & Kontak Resmi
          </h2>
        </div>
        <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline-block">
          Telegram & WhatsApp
        </span>
      </div>

      {/* Grid Kontak Minimalis & Ramping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {socials.map(item => {
          const isTelegram = item.id === 'telegram';
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              id={`social-card-${item.id}`}
              className="flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-xs"
            >
              {/* Informasi Kiri */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isTelegram
                      ? 'bg-sky-500/10 dark:bg-sky-500/15'
                      : 'bg-emerald-500/10 dark:bg-emerald-500/15'
                  }`}
                >
                  {renderIcon(item.icon)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.platform}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono font-medium px-1.5 py-0.2 rounded ${
                        isTelegram
                          ? 'bg-sky-500/10 text-sky-700 dark:text-sky-300'
                          : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {isTelegram ? 'Channel' : 'Grup'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono truncate mt-0.5">
                    {item.username}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi Kanan */}
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all shadow-xs active:scale-98 ${
                    isTelegram
                      ? 'bg-sky-600 hover:bg-sky-500'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  <span>Gabung</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={e => handleCopy(item.url, item.id, e)}
                  title="Salin Link"
                  className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {isCopied ? (
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
    </section>
  );
};
