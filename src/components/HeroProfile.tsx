import React from 'react';
import { ProfileData, SocialLink } from '../types';

interface HeroProfileProps {
  profile?: ProfileData;
  socials?: SocialLink[];
  onViewParts?: () => void;
}

/**
 * Komponen HeroProfile:
 * Menampilkan ringkasan profil pribadi dan sambutan member WAVEID di area hero.
 */
export const HeroProfile: React.FC<HeroProfileProps> = () => {
  return (
    <section id="profil" className="pt-4 sm:pt-10 pb-6 sm:pb-8 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="space-y-4 sm:space-y-6 flex flex-col items-center text-center">
        {/* Logo WAVEID di Center dengan Teks WAVEID di Bawahnya (Harmonisasi Warna Logo) */}
        <div id="waveid-logo-container" className="flex flex-col items-center justify-center gap-2 sm:gap-4">
          <div className="relative group">
            {/* Halo / Glow halus di belakang logo */}
            <div
              className="absolute -inset-1.5 sm:-inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-lg sm:blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10"
              aria-hidden="true"
            />
            <div className="w-24 h-24 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl sm:rounded-3xl overflow-hidden p-2.5 sm:p-3.5 bg-white/95 dark:bg-neutral-900/90 border border-cyan-500/20 dark:border-cyan-400/30 shadow-md sm:shadow-lg shadow-cyan-500/5 group-hover:border-fuchsia-500/40 transition-all duration-300 group-hover:scale-105 flex items-center justify-center backdrop-blur-xs">
              <img
                id="waveid-logo-img"
                src="logo.png"
                alt="Logo WAVEID"
                className="w-full h-full object-contain filter drop-shadow-xs"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <span
            id="waveid-brand-text"
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wider sm:tracking-widest bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent uppercase drop-shadow-sm"
          >
            WAVEID
          </span>
        </div>

        {/* Ucapan Selamat Datang Member WAVEID */}
        <div>
          <h1
            id="profile-name-heading"
            className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 px-2 leading-tight"
          >
            Selamat Datang Member WAVEID
          </h1>
        </div>
      </div>
    </section>
  );
};
