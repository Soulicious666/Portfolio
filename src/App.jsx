import { useState, useEffect, useCallback } from "react";
import data from "./data/portfolio.json";

const ACCENTS = { pink: "accent-pink", gold: "accent-gold", mint: "accent-mint", blue: "accent-blue" };

// Prefix local media paths with Vite's base ("/Portfolio/" in production, "/" in dev)
// so they resolve on GitHub Pages. Full URLs (YouTube, etc.) are returned untouched.
const asset = (p) => {
  if (!p) return p;
  if (/^https?:\/\//.test(p)) return p;
  return import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + p.replace(/^\//, "");
};

function Media({ item }) {
  if (!item) return null;
  if (item.type === "youtube") {
    return (
      <div className="media-frame">
        <iframe
          src={`https://www.youtube.com/embed/${item.src}`}
          title={item.alt || "video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (item.type === "video") {
    return (
      <div className="media-frame">
        <video src={asset(item.src)} controls preload="metadata" />
      </div>
    );
  }
  return (
    <div className="media-frame">
      <img src={asset(item.src)} alt={item.alt || ""} loading="lazy" />
    </div>
  );
}

function Modal({ project, onClose }) {
  const onKey = useCallback((e) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onKey]);

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div
        className={`modal ${ACCENTS[project.accent] || "accent-pink"}`}
        role="dialog" aria-modal="true" aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__bar">
          <h2>{project.title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal__body">
          <div className="modal__meta">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>
          <p className="modal__desc">{project.description}</p>

          {project.highlights?.length > 0 && (
            <ul className="modal__hl">
              {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}

          {project.gallery?.length > 0 && (
            <div className="media-stack">
              {project.gallery.map((m, i) => <Media key={i} item={m} />)}
            </div>
          )}

          {(project.cta?.url || project.links?.length > 0) && (
            <div className="modal__links">
              {project.cta?.url && (
                <a className="btn btn--solid btn--cta" href={project.cta.url} target="_blank" rel="noreferrer">
                  {project.cta.text || "Go to project"} →
                </a>
              )}
              {project.links?.map((l, i) => (
                <a key={i} className="btn" href={l.url} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ project, onOpen }) {
  return (
    <button className={`cart ${ACCENTS[project.accent] || "accent-pink"}`} onClick={onOpen}>
      <div className="cart__media">
        {project.cover && <img src={asset(project.cover.src)} alt={project.cover.alt || project.title} loading="lazy" />}
      </div>
      <div className="cart__body">
        <div className="cart__year">{project.year}</div>
        <h3 className="cart__title">{project.title}</h3>
        <p className="cart__summary">{project.summary}</p>
        <div className="cart__tags">
          {project.tags?.map((t, i) => <span className="tag" key={i}>{t}</span>)}
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const { profile, skills, projects } = data;
  const [open, setOpen] = useState(null);

  return (
    <>
      <nav className="nav">
        <div className="wrap nav__inner">
          <a className="nav__logo" href="#top"><span className="blip" />{profile.name}</a>
          <div className="nav__links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href={`mailto:${profile.email}`}>Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="wrap">
          <span className="hero__role">{profile.role}</span>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__meta">
            <span>📍 {profile.location}</span>
            <span>✉ {profile.email}</span>
          </div>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#work">See my work</a>
            {profile.resumeUrl && <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">Résumé</a>}
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="work">
          <div className="wrap">
            <div className="section__head">
              <span className="section__num">01</span>
              <h2 className="section__title">Selected Work</h2>
            </div>
            <div className="grid">
              {projects.map((p) => (
                <Card key={p.id} project={p} onOpen={() => setOpen(p)} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="wrap">
            <div className="section__head">
              <span className="section__num">02</span>
              <h2 className="section__title">About &amp; Stack</h2>
            </div>
            <p className="hero__tagline" style={{ marginTop: 0, marginBottom: 30 }}>{profile.tagline}</p>
            <ul className="skills">
              {skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="wrap">
          <div className="footer__links">
            {profile.social.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
          <small>© {new Date().getFullYear()} {profile.name} — built with Vite + React</small>
        </div>
      </footer>

      {open && <Modal project={open} onClose={() => setOpen(null)} />}
    </>
  );
}
