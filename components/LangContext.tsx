'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'en' | 'id'

const translations = {
  en: {
    // Nav
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    letsTalk: "Let's talk",
    // Hero
    heroKicker: 'SIJA Student · SMKN 2 Yogyakarta',
    heroTitle1: 'Build with',
    heroTitle2: 'purpose.',
    heroIntro: 'Network infrastructure, full-stack development, and IoT engineering — crafting solutions that matter.',
    seeWork: 'See my work',
    aboutMe: 'About me',
    openFor: 'Open for opportunities',
    // Work
    selectedWork: 'Selected work',
    workNote: 'A small selection of recent collaborations',
    // About
    aboutLabel: 'About',
    whoIAm: 'Who I am',
    drivenBy: 'Driven by',
    curiosity: 'curiosity.',
    aboutP1: 'I am Daffa Fadhul Rahman, a vocational high school student majoring in SIJA (Sistem Informasi, Jaringan, dan Aplikasi) at SMKN 2 Yogyakarta.',
    aboutP2: 'My core focus lies in designing, securing, and troubleshooting robust network infrastructures and Linux/Windows server environments, while actively expanding my capabilities into Full-Stack web development and IoT hardware engineering.',
    // Principles
    principle1Title: 'Network & Server',
    principle1Desc: 'Designing, securing, and troubleshooting robust network infrastructures and Linux/Windows server environments.',
    principle2Title: 'Full-Stack Dev',
    principle2Desc: 'Building modern, responsive web applications from front-end interfaces to back-end APIs and databases.',
    principle3Title: 'IoT Engineering',
    principle3Desc: 'Bridging software and hardware through IoT projects — from sensor integration to real-time monitoring systems.',
    // Contact
    contactPrompt: 'Have a project in mind?',
    contactTitle1: "Let's make",
    contactTitle2: 'something clear.',
    // Footer
    copyright: '© 2025 Daffa Fadhul Rahman',
    backToTop: 'Back to top ↑',
  },
  id: {
    // Nav
    work: 'Karya',
    about: 'Tentang',
    contact: 'Kontak',
    letsTalk: 'Hubungi',
    // Hero
    heroKicker: 'Siswa SIJA · SMKN 2 Yogyakarta',
    heroTitle1: 'Membangun dengan',
    heroTitle2: 'tujuan.',
    heroIntro: 'Infrastruktur jaringan, pengembangan full-stack, dan rekayasa IoT — menciptakan solusi yang bermakna.',
    seeWork: 'Lihat karya',
    aboutMe: 'Tentang saya',
    openFor: 'Terbuka untuk peluang',
    // Work
    selectedWork: 'Karya pilihan',
    workNote: 'Beberapa kolaborasi terbaru',
    // About
    aboutLabel: 'Tentang',
    whoIAm: 'Siapa saya',
    drivenBy: 'Didorong oleh',
    curiosity: 'rasa ingin tahu.',
    aboutP1: 'Saya Daffa Fadhul Rahman, siswa SMK jurusan SIJA (Sistem Informasi, Jaringan, dan Aplikasi) di SMKN 2 Yogyakarta.',
    aboutP2: 'Fokus utama saya adalah mendesain, mengamankan, dan memecahkan masalah infrastruktur jaringan serta lingkungan server Linux/Windows, sambil aktif mengembangkan kemampuan dalam pengembangan web Full-Stack dan rekayasa perangkat keras IoT.',
    // Principles
    principle1Title: 'Jaringan & Server',
    principle1Desc: 'Mendesain, mengamankan, dan memecahkan masalah infrastruktur jaringan serta lingkungan server Linux/Windows.',
    principle2Title: 'Full-Stack Dev',
    principle2Desc: 'Membangun aplikasi web modern dan responsif dari antarmuka front-end hingga API dan database back-end.',
    principle3Title: 'Rekayasa IoT',
    principle3Desc: 'Menjembatani perangkat lunak dan perangkat keras melalui proyek IoT — dari integrasi sensor hingga sistem monitoring real-time.',
    // Contact
    contactPrompt: 'Punya proyek?',
    contactTitle1: 'Mari buat',
    contactTitle2: 'sesuatu yang jelas.',
    // Footer
    copyright: '© 2025 Daffa Fadhul Rahman',
    backToTop: 'Kembali ke atas ↑',
  },
} as const

type Translations = typeof translations.en

interface LangContextType {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang((prev) => (prev === 'en' ? 'id' : 'en'))
  const t = translations[lang]

  return <LangContext.Provider value={{ lang, t, toggle }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
