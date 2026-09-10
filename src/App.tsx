import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroProfile } from './components/HeroProfile';
import { ProjectList } from './components/ProjectList';
import { AdminWaveidList } from './components/AdminWaveidList';
import { SkillsSection } from './components/SkillsSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import {
  profileData,
  projectsData,
  supportingComponentsData,
  adminWaveidData,
  socialLinks,
  skillCategories
} from './data/portfolioData';

/**
 * ============================================================================
 * APLIKASI PORTOFOLIO GITHUB.IO MINIMALIS & RESPONSIF
 * ============================================================================
 * Aplikasi ini dirancang khusus untuk mempublikasikan halaman portofolio
 * pribadi berkualitas tinggi di GitHub Pages (<username>.github.io).
 * 
 * Fitur Utama:
 * 1. Desain Elegan & Tipografi Sans-Serif Profesional (Plus Jakarta Sans)
 * 2. Mode Gelap & Terang (Dark/Light mode) otomatis tersimpan di LocalStorage
 * 3. Tata Letak Fleksibel Berbasis CSS Grid & Flexbox Responsif
 * 4. Daftar Admin WAVEID Lengkap dengan Pas Foto Resmi
 * 5. Daftar Part Utama (9 Modul) & Komponen Pendukung (10 Item)
 * ============================================================================
 */
export default function App() {
  // Status Mode Gelap (Dark Mode)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Status tampilan daftar part vs daftar admin WAVEID
  // Sebelum tombol "Lihat Daftar Part" ditekan, daftar part tersembunyi dan menampilkan daftar para admin
  const [showPartsList, setShowPartsList] = useState<boolean>(false);

  // Sinkronisasi kelas 'dark' pada elemen root <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleOpenParts = () => {
    setShowPartsList(true);
  };

  const handleBackToAdmin = () => {
    setShowPartsList(false);
  };

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-[#090b14] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 overflow-x-hidden">
      {/* Efek Ambient Glow Halus Selaras dengan Warna Logo WAVEID (Cyan-Indigo-Fuchsia) */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-cyan-500/10 via-fuchsia-500/5 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* 1. Header Navigasi Tetap (Sticky Header) */}
      <Navbar
        name={profileData.name}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Kontainer Utama Terpusat (Maks 896px) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 2. Bagian Profil Singkat & Sambutan */}
        <HeroProfile
          profile={profileData}
          socials={socialLinks}
          onViewParts={handleOpenParts}
        />

        {/* 3. Bagian Admin WAVEID atau Daftar Part Hardware
            - Sebelum tombol "Lihat Daftar Part" ditekan: daftar part tersembunyi dan menampilkan daftar para admin
            - Setelah tombol ditekan: menampilkan katalog 9 Part Utama & 10 Komponen Pendukung
        */}
        {!showPartsList ? (
          <AdminWaveidList
            admins={adminWaveidData}
            onViewParts={handleOpenParts}
            partsCount={projectsData.length + supportingComponentsData.length}
          />
        ) : (
          <ProjectList
            projects={projectsData}
            supportingComponents={supportingComponentsData}
            onBackToAdmin={handleBackToAdmin}
          />
        )}

        {/* 4. Bagian Keahlian & Teknologi (Flexbox Chips) */}
        <SkillsSection
          categories={skillCategories}
        />

        {/* 5. Bagian Tautan Media Sosial & Kontak */}
        <SocialSection
          socials={socialLinks}
        />

        {/* 6. Bagian Footer */}
        <Footer
          name={profileData.name}
        />
      </main>
    </div>
  );
}
