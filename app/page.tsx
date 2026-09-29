'use client'

import PhotoCarousel from '@/components/PhotoCarousel'
import { LangProvider, useLang } from '@/components/LangContext'

const projects = [
  {
    number: '01',
    title: 'Nusantara House',
    category: 'Brand identity · Digital',
    year: '2024',
    className: 'project-visual project-visual--house',
  },
  {
    number: '02',
    title: 'Form / Function',
    category: 'Art direction · Editorial',
    year: '2023',
    className: 'project-visual project-visual--form',
  },
  {
    number: '03',
    title: 'Quiet Objects',
    category: 'Strategy · E-commerce',
    year: '2023',
    className: 'project-visual project-visual--objects',
  },
]

function PageContent() {
  const { lang, t, toggle } = useLang()

  const principles = [
    ['01', t.principle1Title, t.principle1Desc],
    ['02', t.principle2Title, t.principle2Desc],
    ['03', t.principle3Title, t.principle3Desc],
  ]

  return (
    <main>
      <header className="site-header">
        <div className="header-left">
          <a className="wordmark" href="#top" aria-label="Back to top">DAFFA.</a>
          <button className="lang-switch" onClick={toggle} aria-label="Switch language">
            <span className={lang === 'en' ? 'lang-active lang-en' : ''}>EN</span>
            <span className={lang === 'id' ? 'lang-active lang-id' : ''}>ID</span>
          </button>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">{t.work}</a>
          <a href="#about">{t.about}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <a className="header-link" href="https://wa.me/6288215748241" target="_blank" rel="noopener noreferrer">{t.letsTalk} <span aria-hidden="true">↗</span></a>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-kicker"><span className="status-dot" aria-hidden="true" /> {t.heroKicker}</div>
        <h1>{t.heroTitle1}<br /><em>{t.heroTitle2}</em></h1>
        <div className="hero-bottom">
          <p className="hero-intro">{t.heroIntro}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">{t.seeWork} <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#about">{t.aboutMe} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="availability"><span>{t.openFor}</span><strong>2025 — 2026</strong></div>
        </div>
      </section>

      <section id="work" className="work-section section-shell">
        <div className="section-heading"><p className="eyebrow">{t.selectedWork}</p><p className="section-note">{t.workNote}</p></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <div className={project.className} aria-hidden="true"><span>{project.number}</span><i /></div>
              <div className="project-meta"><span className="project-number">{project.number}</span><div><h2>{project.title}</h2><p>{project.category}</p></div><span className="project-year">{project.year}</span><span className="project-arrow" aria-hidden="true">↗</span></div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section section-shell">
        <div className="section-heading"><p className="eyebrow">{t.aboutLabel}</p><p className="section-note">{t.whoIAm}</p></div>
        <div className="about-grid"><h2>{t.drivenBy}<br /><em>{t.curiosity}</em></h2><PhotoCarousel /><div className="about-copy"><p>{t.aboutP1}</p><p>{t.aboutP2}</p></div></div>
        <div className="principles">{principles.map(([number, title, copy]) => <div className="principle" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </section>

      <section id="contact" className="contact-section section-shell"><p className="eyebrow">{t.contactPrompt}</p><h2>{t.contactTitle1}<br /><em>{t.contactTitle2}</em></h2><a className="contact-email" href="mailto:daffasierra2620@gmail.com">daffasierra2620@gmail.com <span aria-hidden="true">↗</span></a></section>

      <footer className="site-footer"><span>{t.copyright}</span><div><a href="https://wa.me/6288215748241" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://www.instagram.com/dappa.jpg?igsh=amZ5cmR4NHh3N2E0" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.linkedin.com/in/daffa-fadhul-rahman-4715723a7?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="#top">{t.backToTop}</a></div></footer>
    </main>
  )
}

export default function Page() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  )
}

export { projects }
