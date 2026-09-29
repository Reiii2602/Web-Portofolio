import PhotoCarousel from '@/components/PhotoCarousel'

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

const principles = [
  ['01', 'Network & Server', 'Designing, securing, and troubleshooting robust network infrastructures and Linux/Windows server environments.'],
  ['02', 'Full-Stack Dev', 'Building modern, responsive web applications from front-end interfaces to back-end APIs and databases.'],
  ['03', 'IoT Engineering', 'Bridging software and hardware through IoT projects — from sensor integration to real-time monitoring systems.'],
]

export default function Page() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Back to top">DAFFA.</a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="https://wa.me/6288215748241" target="_blank" rel="noopener noreferrer">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-kicker"><span className="status-dot" aria-hidden="true" /> SIJA Student · SMKN 2 Yogyakarta</div>
        <h1>Build with<br /><em>purpose.</em></h1>
        <div className="hero-bottom">
          <p className="hero-intro">Network infrastructure, full-stack development, and IoT engineering — crafting solutions that matter.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">See my work <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#about">About me <span aria-hidden="true">↗</span></a>
          </div>
          <div className="availability"><span>Open for opportunities</span><strong>2025 — 2026</strong></div>
        </div>
      </section>

      <section id="work" className="work-section section-shell">
        <div className="section-heading"><p className="eyebrow">Selected work</p><p className="section-note">A small selection of recent collaborations</p></div>
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
        <div className="section-heading"><p className="eyebrow">About</p><p className="section-note">Who I am</p></div>
        <div className="about-grid"><h2>Driven by<br /><em>curiosity.</em></h2><PhotoCarousel /><div className="about-copy"><p>I am Daffa Fadhul Rahman, a vocational high school student majoring in SIJA (Sistem Informasi, Jaringan, dan Aplikasi) at SMKN 2 Yogyakarta.</p><p>My core focus lies in designing, securing, and troubleshooting robust network infrastructures and Linux/Windows server environments, while actively expanding my capabilities into Full-Stack web development and IoT hardware engineering.</p></div></div>
        <div className="principles">{principles.map(([number, title, copy]) => <div className="principle" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </section>

      <section id="contact" className="contact-section section-shell"><p className="eyebrow">Have a project in mind?</p><h2>Let&apos;s make<br /><em>something clear.</em></h2><a className="contact-email" href="mailto:daffasierra2620@gmail.com">daffasierra2620@gmail.com <span aria-hidden="true">↗</span></a></section>

      <footer className="site-footer"><span>© 2025 Daffa Fadhul Rahman</span><div><a href="https://wa.me/6288215748241" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://www.instagram.com/dappa.jpg?igsh=amZ5cmR4NHh3N2E0" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.linkedin.com/in/daffa-fadhul-rahman-4715723a7?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
  )
}
export { projects, principles }
