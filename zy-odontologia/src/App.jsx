/**
 * ZY Odontologia — App.jsx
 * React + CSS inline puro. Sem Tailwind, sem dependência externa.
 *
 * Setup:
 *   npm create vite@latest zy-odontologia -- --template react
 *   cd zy-odontologia && npm install lucide-react
 *   Coloque logo em public/logo.png
 *   Coloque foto do consultório em public/consultorio.jpg
 *   Cole este arquivo em src/App.jsx
 *   npm run dev
 *
 * Personalize: WA_NUMBER, PHONE, endereço, CRO, horários.
 */

import { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Shield,
  Heart,
  Zap,
  Award,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Activity,
  Users,
  Cpu,
  ScanLine,
  Layers,
  Star,
  Stethoscope,
  AlignCenter,
  CircleDot,
  Sparkles,
  BadgeCheck,
  Globe,
  Microscope,
  Camera,
  Share2,
} from "lucide-react";

/* ─── Configuração ───────────────────────────────────────────────────────── */
const WA_NUMBER = "5511999999999";
const PHONE     = "(11) 9 9999-9999";
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de agendar uma consulta na ZY Odontologia."
)}`;
const LOGO_SRC  = "/logo.png";
const CLINIC_IMG = "/consultorio.jpg"; // coloque a foto real em public/

/* ─── Tokens de design ───────────────────────────────────────────────────── */
const C = {
  navy:     "#1A2E55",
  navyDark: "#0F1E38",
  teal:     "#2BA4B5",
  tealDk:   "#1d8090",
  yellow:   "#F4A51E",
  red:      "#CF3E43",
  green:    "#4C9E6B",
  white:    "#ffffff",
  off:      "#F5F7FA",
  border:   "#E2E8EF",
  text:     "#0F1E35",
  muted:    "#5C6B82",
  light:    "#94A3B8",
};

/* ─── ÚNICA MUDANÇA: fonte trocada de Manrope para Inter ─────────────────── */
const FONT  = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif";
const INNER = { width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 32px" };

/* ─── Estilos globais injetados uma vez ──────────────────────────────────── */
function GlobalStyle() {
  useEffect(() => {
    /* Google Font — Inter no lugar de Manrope */
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);

    /* Reset + classes utilitárias */
    if (document.getElementById("zy-gs")) return;
    const s = document.createElement("style");
    s.id = "zy-gs";
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { width: 100%; overflow-x: hidden; scroll-behavior: smooth; }
      body { font-family: ${FONT}; background: #fff; color: ${C.text}; -webkit-font-smoothing: antialiased; }
      #root { width: 100%; min-width: 0; overflow-x: hidden; }
      a { text-decoration: none; color: inherit; }
      button { font-family: inherit; }
      img { display: block; max-width: 100%; }

      .rv { opacity: 0; transform: translateY(26px); transition: opacity .72s ease, transform .72s ease; }
      .rv.in { opacity: 1; transform: none; }

      @keyframes heroIn  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
      @keyframes waPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.45);} 60%{box-shadow:0 0 0 12px rgba(37,211,102,0);} }

      @media(max-width:900px){
        .desk-only{display:none!important;}
        .mob-only{display:flex!important;}
        .two-col{grid-template-columns:1fr!important; gap:40px!important;}
        .loc-grid{grid-template-columns:1fr!important;}
        .footer-grid{grid-template-columns:1fr 1fr!important;}
        .hero-pad{padding:64px 24px!important;}
      }
      @media(min-width:901px){ .mob-only{display:none!important;} }

      @media(max-width:1024px){
        .g3{grid-template-columns:repeat(2,1fr)!important;}
        .g4{grid-template-columns:repeat(2,1fr)!important;}
      }
      @media(max-width:640px){
        .g3{grid-template-columns:1fr!important;}
      }
      @media(max-width:480px){
        .g4{grid-template-columns:1fr!important;}
        .footer-grid{grid-template-columns:1fr!important;}
      }
    `;
    document.head.appendChild(s);
    return () => {};
  }, []);
  return null;
}

/* ─── Scroll-reveal hook ─────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const run = () =>
      document.querySelectorAll(".rv:not(.in)").forEach(el => {
        const o = new IntersectionObserver(
          ([e]) => { if (e.isIntersecting) { el.classList.add("in"); o.disconnect(); } },
          { threshold: 0.1 }
        );
        o.observe(el);
      });
    run();
    const t = setTimeout(run, 200);
    return () => clearTimeout(t);
  }, []);
}

/* ─── Componentes primitivos ─────────────────────────────────────────────── */
function Label({ children, light = false }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, color: light ? C.teal : C.teal }}>
      {children}
    </p>
  );
}

function Heading({ children, light = false, center = false, as: Tag = "h2", style: ext = {} }) {
  return (
    <Tag style={{
      fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 700, lineHeight: 1.17,
      color: light ? C.white : C.navy, letterSpacing: "-0.02em",
      marginBottom: 14, textAlign: center ? "center" : "left", ...ext,
    }}>
      {children}
    </Tag>
  );
}

function Rule({ center = false }) {
  return (
    <div style={{
      width: 40, height: 3, borderRadius: 2, background: C.teal, marginBottom: 28,
      marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0,
    }} />
  );
}

function BtnSolid({ children, href, onClick, style: ext = {} }) {
  const [hov, sHov] = useState(false);
  const s = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "13px 26px", borderRadius: 4, border: "none",
    background: hov ? C.tealDk : C.teal, color: C.white,
    fontWeight: 700, fontSize: 14, letterSpacing: "0.02em",
    boxShadow: hov ? `0 8px 24px ${C.teal}55` : `0 2px 10px ${C.teal}33`,
    transition: "all .2s", cursor: "pointer", ...ext,
  };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={s} onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)}>{children}</a>
    : <button style={s} onClick={onClick} onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)}>{children}</button>;
}

function BtnGhost({ children, href, onClick, dark = false, style: ext = {} }) {
  const [hov, sHov] = useState(false);
  return (
    <a
      href={href || "#"} onClick={onClick}
      target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "13px 26px", borderRadius: 4, cursor: "pointer",
        background: hov ? (dark ? "rgba(255,255,255,.11)" : "rgba(26,46,85,.05)") : "transparent",
        color: dark ? C.white : C.navy, fontWeight: 600, fontSize: 14, letterSpacing: "0.02em",
        border: `1.5px solid ${hov ? (dark ? "rgba(255,255,255,.5)" : C.teal) : (dark ? "rgba(255,255,255,.28)" : C.border)}`,
        transition: "all .2s", ...ext,
      }}
      onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════════════════ */
function Header() {
  const [sc, setSc]     = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const NAV = ["Início","Sobre","Tecnologias","Tratamentos","Localização","Contato"];

  const go = label => {
    const id = label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 72, width: "100%",
        background: sc ? "rgba(255,255,255,.97)" : C.white,
        borderBottom: `1px solid ${C.border}`,
        boxShadow: sc ? "0 2px 20px rgba(0,0,0,.07)" : "none",
        backdropFilter: sc ? "blur(12px)" : "none",
        transition: "box-shadow .28s, backdrop-filter .28s",
      }}>
        <div style={{ ...INNER, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo + nome */}
          <button onClick={() => go("Início")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, padding: 0 }}>
            <img src={LOGO_SRC} alt="ZY Odontologia" style={{ height: 44, width: 44, borderRadius: 10, objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, letterSpacing: "-0.02em", lineHeight: 1.15 }}>ZY Odontologia</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.teal, letterSpacing: "0.16em", textTransform: "uppercase" }}>Osasco · SP</div>
            </div>
          </button>

          {/* Nav desktop */}
          <nav className="desk-only" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV.map(item => <NavItem key={item} label={item} onClick={() => go(item)} />)}
            <BtnSolid href={WA_LINK} style={{ marginLeft: 14, fontSize: 13, padding: "10px 20px" }}>
              <MessageCircle size={13} />Agendar consulta
            </BtnSolid>
          </nav>

          {/* Burger mobile */}
          <button className="mob-only" onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: C.navy }}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      {open && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, width: "100%", zIndex: 199,
          background: C.white, borderBottom: `1px solid ${C.border}`,
          boxShadow: "0 8px 28px rgba(0,0,0,.09)",
        }}>
          <div style={{ padding: "16px 32px 28px" }}>
            {NAV.map(item => (
              <button key={item} onClick={() => go(item)} style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", borderBottom: `1px solid ${C.border}`,
                padding: "14px 0", fontSize: 15, fontWeight: 600, color: C.navy, cursor: "pointer",
              }}>{item}</button>
            ))}
            <BtnSolid href={WA_LINK} style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
              <MessageCircle size={13} />Agendar consulta
            </BtnSolid>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ label, onClick }) {
  const [hov, sHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "8px 13px", fontSize: 14, fontWeight: 500,
        color: hov ? C.teal : C.muted, borderRadius: 3, transition: "color .18s",
      }}>
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — full-width, conteúdo centralizado com INNER, imagem 45% direita
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const pills = [
    { icon: <Heart size={14} />,      label: "Atendimento humanizado" },
    { icon: <Cpu size={14} />,        label: "Tecnologia importada" },
    { icon: <Shield size={14} />,     label: "Biossegurança rigorosa" },
    { icon: <BadgeCheck size={14} />, label: "Profissional qualificado" },
  ];

  const trustBar = [
    { icon: <Award size={18} />,  text: "Mais de 10 anos de prática clínica" },
    { icon: <Cpu size={18} />,    text: "Equipamentos importados" },
    { icon: <Heart size={18} />,  text: "Atendimento humanizado" },
    { icon: <Shield size={18} />, text: "Biossegurança rigorosa" },
  ];

  return (
    <section
      id="inicio"
      style={{ width: "100%", paddingTop: 72, background: C.white, overflow: "hidden" }}
    >
      {/* Linha de acento teal no topo */}
      <div style={{ width: "100%", height: 3, background: `linear-gradient(90deg,${C.teal},${C.navy}88)` }} />

      <div style={{
        position: "relative",
        width: "100%",
        minHeight: "calc(100vh - 75px)",
        display: "flex",
        alignItems: "center",
      }}>

        {/* z=0: fundo */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "linear-gradient(135deg,#d4e9f0 0%,#bdd9e6 28%,#a9cede 55%,#96c3d7 80%,#83b6ce 100%)",
        }}>
          <div style={{
            position: "absolute",
            right: "8%", top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            opacity: 0.25,
          }}>
            <Stethoscope size={112} color={C.navy} />
            <p style={{ fontSize: 11, color: C.navy, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Foto do consultório
            </p>
          </div>
        </div>

        {/* z=1a: gradiente branco → transparente */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: [
            `linear-gradient(to right,`,
            `  ${C.white}     0%,`,
            `  ${C.white}     50%,`,
            `  ${C.white}f0   57%,`,
            `  ${C.white}cc   63%,`,
            `  ${C.white}88   70%,`,
            `  ${C.white}33   78%,`,
            `  transparent    87%`,
            `)`,
          ].join(""),
        }} />

        {/* z=1b: véu */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "rgba(255,255,255,0.14)",
        }} />

        {/* z=2: conteúdo */}
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ ...INNER }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "55% 45%",
              alignItems: "center",
              minHeight: "calc(100vh - 78px)",
            }}>
              <div style={{ padding: "80px 40px 80px 0", textAlign: "left", animation: "heroIn .9s ease both" }}>

                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "6px 14px", borderRadius: 100,
                  background: `${C.teal}12`, border: `1px solid ${C.teal}28`,
                  marginBottom: 24,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.teal }}>
                    Clínica Odontológica · Osasco/SP
                  </span>
                </div>

                <h1 style={{
                  fontSize: "clamp(28px,3.2vw,46px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: C.navy,
                  letterSpacing: "-0.025em",
                  marginBottom: 22,
                  textAlign: "left",
                }}>
                  Odontologia moderna e{" "}
                  <span style={{ color: C.teal }}>humanizada</span>{" "}
                  em Osasco<span style={{ color: C.teal }}>/SP</span>
                </h1>

                <p style={{
                  fontSize: 16.5, lineHeight: 1.82, color: C.muted,
                  marginBottom: 36, maxWidth: 480,
                }}>
                  Na ZY Odontologia, unimos tecnologia importada, experiência clínica e cuidado
                  personalizado para transformar o seu sorriso com segurança e precisão.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                  <BtnSolid href={WA_LINK} style={{ fontSize: 15, padding: "14px 28px" }}>
                    <MessageCircle size={16} />Agendar avaliação
                  </BtnSolid>
                  <BtnGhost
                    onClick={() => document.getElementById("tratamentos")?.scrollIntoView({ behavior: "smooth" })}
                    style={{ fontSize: 15, padding: "14px 28px" }}
                  >
                    Ver tratamentos <ArrowRight size={15} />
                  </BtnGhost>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {pills.map(p => (
                    <div key={p.label} style={{
                      display: "flex", alignItems: "center", gap: 7,
                      padding: "7px 13px", borderRadius: 4,
                      border: `1px solid ${C.border}`,
                      background: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(6px)",
                    }}>
                      <span style={{ color: C.teal }}>{p.icon}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: C.muted }}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div />
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{
        width: "100%",
        background: C.off,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ ...INNER, padding: "18px 32px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {trustBar.map((it, i, arr) => (
            <div key={it.text} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 24px",
              borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
              flex: "1 0 160px",
            }}>
              <span style={{ color: C.teal, flexShrink: 0 }}>{it.icon}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: C.muted }}>{it.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-left { padding: 60px 0 60px 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOBRE
═══════════════════════════════════════════════════════════════════════════ */
function Sobre() {
  useReveal();
  const items = [
    { icon: <Award size={17} />,    text: "Mais de 10 anos de prática clínica" },
    { icon: <Users size={17} />,    text: "Atendimento personalizado e humanizado" },
    { icon: <Cpu size={17} />,      text: "Equipamentos importados de última geração" },
    { icon: <Activity size={17} />, text: "Atualização constante em novas técnicas" },
  ];

  return (
    <section id="sobre" style={{ width: "100%", padding: "100px 0", background: C.white }}>
      <div style={INNER}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          <div className="rv" style={{ position: "relative" }}>
            <div style={{
              borderRadius: 16, aspectRatio: "3/4",
              background: C.off, border: `1px solid ${C.border}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 16,
              overflow: "hidden", position: "relative",
            }}>
              <Users size={56} color={`${C.navy}18`} />
              <p style={{ fontSize: 11, color: C.light, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Foto do(a) dentista
              </p>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.teal},transparent)` }} />
            </div>
            <div style={{ position: "absolute", left: -12, top: "18%", width: 3, height: "64%", borderRadius: 2, background: `linear-gradient(to bottom,${C.teal},${C.navy}30)` }} />
          </div>

          <div className="rv" style={{ transitionDelay: ".1s" }}>
            <Label>Sobre a clínica</Label>
            <Heading>Cuidado, tecnologia e precisão em cada sorriso</Heading>
            <Rule />
            <p style={{ fontSize: 16, lineHeight: 1.88, color: C.muted, marginBottom: 18 }}>
              A ZY Odontologia nasceu do compromisso de oferecer tratamentos de alto padrão com o acolhimento que cada paciente merece. Unimos equipamentos importados de última geração com um atendimento próximo, empático e personalizado.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.88, color: C.muted, marginBottom: 40 }}>
              Cada detalhe da clínica foi pensado para proporcionar conforto, segurança e confiança — do primeiro contato até o resultado final do seu tratamento.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              {items.map(it => (
                <div key={it.text} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                    background: `${C.teal}12`, border: `1px solid ${C.teal}22`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: C.teal,
                  }}>{it.icon}</div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{it.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TECNOLOGIAS
═══════════════════════════════════════════════════════════════════════════ */
function TechCard({ icon, title, desc, accent }) {
  const [hov, sHov] = useState(false);
  return (
    <div onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)} style={{
      padding: "32px 28px", borderRadius: 12, background: C.white,
      border: `1px solid ${hov ? `${accent}40` : C.border}`,
      boxShadow: hov ? "0 16px 48px rgba(0,0,0,.09)" : "0 2px 8px rgba(0,0,0,.04)",
      transform: hov ? "translateY(-6px)" : "none",
      transition: "all .28s ease", cursor: "default", height: "100%",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 10,
        background: `${accent}12`, border: `1px solid ${accent}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent, marginBottom: 20,
      }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 9 }}>{title}</h3>
      <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.78 }}>{desc}</p>
      <div style={{ marginTop: 22, width: 32, height: 2, borderRadius: 1, background: accent }} />
    </div>
  );
}

function Tecnologias() {
  useReveal();
  const items = [
    { icon: <ScanLine size={22} />,  title: "Radiografia Digital",        desc: "Imagens de alta resolução com emissão de radiação reduzida para diagnósticos seguros e precisos.",            accent: C.teal   },
    { icon: <Cpu size={22} />,       title: "Fotopolimerizador LED",       desc: "Polimerização rápida e uniforme, garantindo restaurações duráveis com total conforto ao paciente.",             accent: C.yellow },
    { icon: <Sparkles size={22} />,  title: "Clareamento a Laser",         desc: "Tecnologia avançada para branqueamento dental eficaz, seguro e com resultados imediatos.",                      accent: C.red    },
    { icon: <Layers size={22} />,    title: "Implantes Guiados",           desc: "Planejamento digital 3D para implantes com máxima precisão cirúrgica e menor tempo de recuperação.",            accent: C.navy   },
    { icon: <Microscope size={22} />,title: "Scanner Intraoral 3D",        desc: "Mapeamento digital da cavidade bucal sem moldeiras tradicionais, com maior conforto e altíssima precisão.",      accent: C.green  },
    { icon: <Shield size={22} />,    title: "Protocolos de Biossegurança", desc: "Esterilização rigorosa conforme as normas mais exigentes para total segurança em cada procedimento.",          accent: C.teal   },
  ];

  return (
    <section id="tecnologias" style={{ width: "100%", padding: "100px 0", background: C.off }}>
      <div style={INNER}>
        <div className="rv" style={{ textAlign: "center", marginBottom: 64 }}>
          <Label>Infraestrutura</Label>
          <Heading center>Tecnologia importada a favor do seu sorriso</Heading>
          <Rule center />
          <p style={{ fontSize: 17, color: C.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            Investimos em equipamentos de ponta para oferecer diagnósticos mais precisos, tratamentos eficientes e máximo conforto.
          </p>
        </div>
        <div className="g3 rv" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {items.map((it, i) => (
            <div key={it.title} style={{ transitionDelay: `${i * .07}s` }}>
              <TechCard {...it} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRATAMENTOS
═══════════════════════════════════════════════════════════════════════════ */
function TreatCard({ icon, title, desc, accent }) {
  const [hov, sHov] = useState(false);
  return (
    <div onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)} style={{
      padding: "26px 22px", borderRadius: 10,
      background: hov ? C.white : C.off,
      border: `1px solid ${hov ? `${accent}30` : "transparent"}`,
      boxShadow: hov ? "0 10px 30px rgba(0,0,0,.08)" : "none",
      transform: hov ? "translateY(-4px)" : "none",
      transition: "all .25s ease", cursor: "default",
    }}>
      <div style={{ color: accent, marginBottom: 13 }}>{icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.72, marginBottom: 14 }}>{desc}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700, color: accent }}>
        Saiba mais <ArrowRight size={12} />
      </div>
    </div>
  );
}

function Tratamentos() {
  useReveal();
  const list = [
    { icon: <CircleDot size={20} />,   title: "Implantes",           desc: "Reabilitação oral com implantes de titânio de alta qualidade para devolver função e estética.", accent: C.navy   },
    { icon: <Sparkles size={20} />,    title: "Clareamento",         desc: "Branqueamento dental supervisionado com técnicas a laser ou moldeiras personalizadas.",           accent: C.yellow },
    { icon: <Activity size={20} />,    title: "Limpeza",             desc: "Profilaxia completa com remoção de tártaro e polimento para saúde periodontal.",                  accent: C.teal   },
    { icon: <Zap size={20} />,         title: "Tratamento de Canal", desc: "Endodontia precisa e confortável com tecnologia de localização eletrônica apical.",               accent: C.red    },
    { icon: <Layers size={20} />,      title: "Próteses",            desc: "Próteses fixas e removíveis confeccionadas com materiais de alta estética e durabilidade.",       accent: C.green  },
    { icon: <CheckCircle size={20} />, title: "Restaurações",        desc: "Restaurações em resina composta de alto padrão estético, precisas e imperceptíveis.",             accent: C.teal   },
    { icon: <AlignCenter size={20} />, title: "Ortodontia",          desc: "Aparelhos metálicos, estéticos ou alinhadores transparentes para sorriso harmonioso.",            accent: C.navy   },
    { icon: <Star size={20} />,        title: "Facetas",             desc: "Lentes de contato dental ultrafinas que transformam a forma, cor e proporção dos dentes.",        accent: C.yellow },
  ];

  return (
    <section id="tratamentos" style={{ width: "100%", padding: "100px 0", background: C.white }}>
      <div style={INNER}>
        <div className="rv" style={{ marginBottom: 64 }}>
          <Label>Especialidades</Label>
          <Heading>Tratamentos para cuidar do seu sorriso</Heading>
          <Rule />
          <p style={{ fontSize: 17, color: C.muted, maxWidth: 500, lineHeight: 1.75 }}>
            Uma gama completa de especialidades odontológicas com tecnologia de ponta e cuidado personalizado.
          </p>
        </div>
        <div className="g4 rv" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {list.map((t, i) => (
            <div key={t.title} style={{ transitionDelay: `${i * .05}s` }}>
              <TreatCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DIFERENCIAIS
═══════════════════════════════════════════════════════════════════════════ */
function DiffCard({ icon, title, desc, accent }) {
  const [hov, sHov] = useState(false);
  return (
    <div onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)} style={{
      padding: "30px 26px", borderRadius: 10,
      background: hov ? "rgba(255,255,255,.09)" : "rgba(255,255,255,.04)",
      border: `1px solid ${hov ? `${accent}45` : "rgba(255,255,255,.09)"}`,
      transform: hov ? "translateY(-5px)" : "none",
      transition: "all .28s ease", cursor: "default",
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 10,
        background: `${accent}20`, border: `1px solid ${accent}35`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent, marginBottom: 18,
      }}>{icon}</div>
      <h3 style={{ fontSize: 15.5, fontWeight: 700, color: C.white, marginBottom: 9 }}>{title}</h3>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,.52)", lineHeight: 1.75 }}>{desc}</p>
    </div>
  );
}

function Diferenciais() {
  useReveal();
  const items = [
    { icon: <Heart size={20} />,        title: "Atendimento humanizado",    desc: "Cada paciente recebe atenção individualizada, com empatia e respeito durante todo o tratamento.",     accent: C.red    },
    { icon: <Shield size={20} />,       title: "Ambiente acolhedor",        desc: "Clínica projetada para proporcionar bem-estar, conforto e tranquilidade desde a chegada.",            accent: C.green  },
    { icon: <Cpu size={20} />,          title: "Equipamentos modernos",     desc: "Tecnologia importada de ponta para diagnósticos mais precisos e tratamentos eficientes.",             accent: C.teal   },
    { icon: <Award size={20} />,        title: "Profissional qualificado",  desc: "Experiência clínica sólida aliada à atualização constante em novos procedimentos e técnicas.",        accent: "#8B9FCC" },
    { icon: <MapPin size={20} />,       title: "Fácil acesso",              desc: "Localização central em Osasco/SP, com acessibilidade para pacientes de toda a região.",               accent: C.yellow },
    { icon: <MessageCircle size={20} />,title: "Agendamento pelo WhatsApp", desc: "Marque sua consulta de forma rápida e prática diretamente pelo WhatsApp, sem burocracia.",           accent: C.green  },
  ];

  return (
    <section style={{ width: "100%", padding: "100px 0", background: C.navy, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 480, height: 480, borderRadius: "50%", background: `${C.teal}0C`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -60,  width: 320, height: 320, borderRadius: "50%", background: `${C.yellow}06`, pointerEvents: "none" }} />
      <div style={INNER}>
        <div className="rv" style={{ marginBottom: 64 }}>
          <Label>Por que nos escolher</Label>
          <Heading light>Nossos diferenciais</Heading>
          <div style={{ width: 40, height: 3, borderRadius: 2, background: C.teal, marginBottom: 28 }} />
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.52)", maxWidth: 480, lineHeight: 1.75 }}>
            Muito mais do que uma clínica — um espaço onde você se sente acolhido, seguro e bem cuidado.
          </p>
        </div>
        <div className="g3 rv" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {items.map((it, i) => (
            <div key={it.title} style={{ transitionDelay: `${i * .07}s` }}>
              <DiffCard {...it} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOCALIZAÇÃO
═══════════════════════════════════════════════════════════════════════════ */
function Localizacao() {
  useReveal();
  const info = [
    { icon: <MapPin size={17} />, label: "Endereço",                 value: "Rua Exemplo, 123 – Centro\nOsasco/SP – CEP 06000-000", accent: C.teal  },
    { icon: <Clock size={17} />,  label: "Horário de Funcionamento", value: "Segunda a Sexta: 8h às 20h\nSábado: 8h às 14h",        accent: C.green },
    { icon: <Phone size={17} />,  label: "Telefone / WhatsApp",      value: PHONE,                                                   accent: C.navy  },
  ];

  return (
    <section id="localizacao" style={{ width: "100%", padding: "100px 0", background: C.white }}>
      <div style={INNER}>
        <div className="rv" style={{ textAlign: "center", marginBottom: 64 }}>
          <Label>Onde estamos</Label>
          <Heading center>ZY Odontologia em Osasco/SP</Heading>
          <Rule center />
          <p style={{ fontSize: 17, color: C.muted, maxWidth: 460, margin: "0 auto", lineHeight: 1.75 }}>
            Estamos localizados em Osasco/SP, com fácil acesso para pacientes de toda a região.
          </p>
        </div>

        <div className="loc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 48, alignItems: "start" }}>
          <div className="rv" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {info.map(it => (
              <div key={it.label} style={{ display: "flex", gap: 15, alignItems: "flex-start" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: `${it.accent}12`, border: `1px solid ${it.accent}22`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: it.accent, marginTop: 2,
                }}>{it.icon}</div>
                <div>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: C.light, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 5 }}>{it.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: C.text, whiteSpace: "pre-line", lineHeight: 1.65 }}>{it.value}</p>
                </div>
              </div>
            ))}
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                padding: "13px 22px", borderRadius: 4,
                background: C.navy, color: C.white, fontWeight: 700, fontSize: 14,
                letterSpacing: "0.02em", marginTop: 8, transition: "background .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.navyDark}
              onMouseLeave={e => e.currentTarget.style.background = C.navy}
            >
              <Globe size={15} /> Ver rota no Google Maps
            </a>
          </div>

          <div className="rv" style={{ transitionDelay: ".1s" }}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, height: 420, boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58985.62!2d-46.83!3d-23.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf02b3ca8e1f0b%3A0x31b0f4a0f3d91ab4!2sOsasco%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                width="100%" height="100%" style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy" title="ZY Odontologia — Osasco/SP"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA FINAL
═══════════════════════════════════════════════════════════════════════════ */
function CTAFinal() {
  useReveal();
  return (
    <section id="contato" style={{ width: "100%", padding: "80px 0", background: C.off }}>
      <div style={INNER}>
        <div className="rv">
          <div style={{ borderRadius: 20, overflow: "hidden", background: C.navy, textAlign: "center", padding: "80px 48px", position: "relative" }}>
            <div style={{ position: "absolute", top: -80,  right: -80, width: 360, height: 360, borderRadius: "50%", background: `${C.teal}12`,   pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -70, left: -50, width: 280, height: 280, borderRadius: "50%", background: `${C.yellow}08`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.teal},transparent)` }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginBottom: 18 }}>Agende sua consulta</p>
              <h2 style={{ fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 700, color: C.white, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 18 }}>
                Cuide do seu sorriso com quem entende
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,.58)", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.8 }}>
                Na ZY Odontologia, unimos tecnologia, conforto e atendimento humanizado para cuidar da sua saúde bucal com excelência.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "16px 36px", borderRadius: 4, background: "#25D366",
                    color: C.white, fontWeight: 800, fontSize: 16, letterSpacing: "0.02em",
                    boxShadow: "0 8px 28px rgba(37,211,102,.35)",
                    animation: "waPulse 2.5s infinite", transition: "all .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1da854"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(37,211,102,.55)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#25D366";  e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,.35)"; }}
                >
                  <MessageCircle size={19} fill={C.white} /> Falar no WhatsApp
                </a>
                <a href={`tel:${WA_NUMBER}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "16px 32px", borderRadius: 4,
                    background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.2)",
                    color: C.white, fontWeight: 600, fontSize: 15, transition: "all .2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.14)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}
                >
                  <Phone size={16} /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const navLinks   = ["Início","Sobre","Tecnologias","Tratamentos","Localização"];
  const treatLinks = ["Implantes","Clareamento","Ortodontia","Facetas","Tratamento de Canal"];
  const lnk = { fontSize: 14, color: "rgba(255,255,255,.4)", textDecoration: "none", display: "block", marginBottom: 12, transition: "color .18s" };
  const ht  = e => e.currentTarget.style.color = C.teal;
  const lt  = e => e.currentTarget.style.color = "rgba(255,255,255,.4)";

  const socials = [
    { icon: <Camera size={16} />, label: "Instagram", href: "#" },
    { icon: <Share2  size={16} />, label: "Facebook",  href: "#" },
  ];

  return (
    <footer style={{ width: "100%", background: "#0A1422", padding: "64px 0 28px" }}>
      <div style={INNER}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,.07)", marginBottom: 28 }}>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
              <img src={LOGO_SRC} alt="ZY Odontologia" style={{ height: 44, width: 44, borderRadius: 10, objectFit: "cover" }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.white, letterSpacing: "-0.02em" }}>ZY Odontologia</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.teal, letterSpacing: "0.16em", textTransform: "uppercase" }}>Osasco · SP</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: "rgba(255,255,255,.38)", maxWidth: 280, marginBottom: 14 }}>
              Cuidando da saúde bucal com tecnologia, humanização e precisão em Osasco/SP.
            </p>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.22)", marginBottom: 20 }}>CRO-SP: XXXXXX</p>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: 34, height: 34, borderRadius: 6,
                  background: "rgba(255,255,255,.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,.45)", transition: "all .18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = C.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "rgba(255,255,255,.45)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.white, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 20 }}>Navegação</p>
            {navLinks.map(l => <a key={l} href="#" style={lnk} onMouseEnter={ht} onMouseLeave={lt}>{l}</a>)}
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.white, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 20 }}>Tratamentos</p>
            {treatLinks.map(l => <a key={l} href="#" style={lnk} onMouseEnter={ht} onMouseLeave={lt}>{l}</a>)}
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.white, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 20 }}>Contato</p>
            {[
              { icon: <MapPin size={14} />, text: "Rua Exemplo, 123\nOsasco/SP – 06000-000" },
              { icon: <Phone size={14} />,  text: PHONE },
              { icon: <Clock size={14} />,  text: "Seg–Sex 8h–20h\nSáb 8h–14h" },
            ].map(it => (
              <div key={it.text} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 18 }}>
                <span style={{ color: C.teal, flexShrink: 0, marginTop: 2 }}>{it.icon}</span>
                <span style={{ fontSize: 13.5, color: "rgba(255,255,255,.4)", whiteSpace: "pre-line", lineHeight: 1.65 }}>{it.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.26)" }}>
            © {new Date().getFullYear()} ZY Odontologia. Todos os direitos reservados.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Política de Privacidade","Termos de Uso"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12.5, color: "rgba(255,255,255,.24)", textDecoration: "none", transition: "color .18s" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.55)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.24)"}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHATSAPP FLUTUANTE
═══════════════════════════════════════════════════════════════════════════ */
function WAFloat() {
  const [hov, sHov] = useState(false);
  return (
    <a
      href={WA_LINK} target="_blank" rel="noopener noreferrer"
      title="Falar no WhatsApp"
      onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 999,
        width: 56, height: 56, borderRadius: "50%", background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov ? "0 10px 32px rgba(37,211,102,.55)" : "0 4px 18px rgba(37,211,102,.38)",
        transform: hov ? "scale(1.1)" : "scale(1)",
        transition: "all .22s ease",
        animation: "waPulse 2.5s infinite",
      }}
    >
      <MessageCircle size={24} color="#fff" fill="#fff" />
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <GlobalStyle />
      <div style={{ width: "100%", minWidth: 0, overflowX: "hidden", fontFamily: FONT }}>
        <Header />
        <Hero />
        <Sobre />
        <Tecnologias />
        <Tratamentos />
        <Diferenciais />
        <Localizacao />
        <CTAFinal />
        <Footer />
        <WAFloat />
      </div>
    </>
  );
}
