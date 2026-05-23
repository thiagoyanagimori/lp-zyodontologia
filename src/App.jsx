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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Configuração ───────────────────────────────────────────────────────── */
const WA_NUMBER = "5511947811500";
const PHONE     = "(11) 94781-1500";
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de agendar uma consulta na ZY Odontologia."
)}`;
const LOGO_SRC  = "/zydigital.png";
const CLINIC_IMG = "/consultorio.jpg";

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

const FONT  = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif";
const INNER = { width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 32px" };

/* ─── Estilos globais ─────────────────────────────────────────────────────── */
function GlobalStyle() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);

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

      /* Botões e labels curtos: não justificar */
      button, a, label, input, textarea { text-align: left; hyphens: none; }

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

/* ─── Primitivos ─────────────────────────────────────────────────────────── */
function Label({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, color: C.teal }}>
      {children}
    </p>
  );
}

function Heading({ children, light = false, center = false, as: Tag = "h2", style: ext = {} }) {
  return (
    <Tag style={{
      fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, lineHeight: 1.17,
      color: light ? C.white : C.navy, letterSpacing: "-0.025em",
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
    boxShadow: hov ? "0 4px 14px rgba(43,164,181,0.22)" : "0 1px 4px rgba(0,0,0,0.08)",
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

  const NAV = ["Início","Sobre","Tecnologias","Tratamentos","Profissionais","Localização","Contato"];

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
          <button onClick={() => go("Início")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, padding: 0 }}>
            <img src={LOGO_SRC} alt="ZY Odontologia Digital" style={{ height: 48, width: "auto", objectFit: "contain" }} />
          </button>

          <nav className="desk-only" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV.map(item => <NavItem key={item} label={item} onClick={() => go(item)} />)}
            <BtnSolid href={WA_LINK} style={{ marginLeft: 14, fontSize: 13, padding: "10px 20px" }}>
              <MessageCircle size={13} />Agendar consulta
            </BtnSolid>
          </nav>

          <button className="mob-only" onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: C.navy }}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

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
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const pills = [
    { icon: <Heart size={14} />,      label: "Atendimento humanizado" },
    { icon: <Cpu size={14} />,        label: "Tecnologia importada" },
    { icon: <Shield size={14} />,     label: "Biossegurança rigorosa" },
    { icon: <BadgeCheck size={14} />, label: "Profissional qualificado" },
  ];

  const trustBar = [
    { icon: <Award size={18} />,  text: "Mais de 50 anos de prática clínica" },
    { icon: <Cpu size={18} />,    text: "Equipamentos importados" },
    { icon: <Heart size={18} />,  text: "Atendimento humanizado" },
    { icon: <Shield size={18} />, text: "Biossegurança rigorosa" },
  ];

  return (
    <section id="inicio" style={{ width: "100%", paddingTop: 72, background: C.white, overflow: "hidden" }}>
      <div style={{ width: "100%", height: 3, background: `linear-gradient(90deg,${C.teal},${C.navy}88)` }} />

      <div className="hero-flex" style={{ width: "100%", minHeight: "calc(100vh - 75px)", display: "flex", alignItems: "stretch" }}>

        {/* ── Coluna esquerda: textos ── */}
        <div style={{ flex: "0 0 55%", display: "flex", alignItems: "center", background: C.white }}>
          <div style={{ paddingTop: 80, paddingBottom: 80, paddingRight: 56, paddingLeft: "clamp(80px, 10vw, 150px)", animation: "heroIn .9s ease both", width: "100%" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px", borderRadius: 100,
              background: `${C.teal}12`, border: `1px solid ${C.teal}28`, marginBottom: 24,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.teal }}>
                Clínica Odontológica · Osasco/SP
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(32px,3.6vw,52px)", fontWeight: 800, lineHeight: 1.13, color: C.navy, letterSpacing: "-0.03em", marginBottom: 22 }}>
              Odontologia moderna e{" "}
              <span style={{ color: C.teal }}>humanizada</span>{" "}
              em Osasco<span style={{ color: C.teal }}>/SP</span>
            </h1>

            <p style={{ fontSize: 16.5, lineHeight: 1.82, color: C.muted, marginBottom: 36, maxWidth: 480 }}>
              Na ZY Odontologia, unimos tecnologia importada, experiência clínica e cuidado personalizado para transformar o seu sorriso com segurança e precisão.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
              <BtnSolid href={WA_LINK} style={{ fontSize: 15, padding: "14px 28px" }}>
                <MessageCircle size={16} />Agendar avaliação
              </BtnSolid>
              <BtnGhost onClick={() => document.getElementById("tratamentos")?.scrollIntoView({ behavior: "smooth" })} style={{ fontSize: 15, padding: "14px 28px" }}>
                Ver tratamentos <ArrowRight size={15} />
              </BtnGhost>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: 8, justifyContent: "start" }}>
              {pills.map(p => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 4, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)" }}>
                  <span style={{ color: C.teal }}>{p.icon}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: C.muted }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Coluna direita: imagem ── */}
        <div style={{ flex: "1 1 45%", position: "relative", overflow: "hidden" }}>
          <img
            src="/fachada.png"
            alt="Fachada ZY Odontologia"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `linear-gradient(to right, ${C.white} 0%, ${C.white}dd 5%, transparent 28%)`,
          }} />
        </div>

      </div>

      <div style={{ width: "100%", background: C.off, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...INNER, padding: "18px 32px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {trustBar.map((it, i, arr) => (
            <div key={it.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 24px", borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none", flex: "1 0 160px" }}>
              <span style={{ color: C.teal, flexShrink: 0 }}>{it.icon}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: C.muted }}>{it.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:900px){.hero-flex{flex-direction:column!important;}.hero-flex>div:first-child{flex:0 0 auto!important;}.hero-flex>div:last-child{min-height:280px;flex:0 0 280px!important;}}`}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOBRE
═══════════════════════════════════════════════════════════════════════════ */
function Sobre() {
  useReveal();
  const items = [
    { icon: <Award size={17} />,    text: "Mais de 50 anos de prática clínica" },
    { icon: <Users size={17} />,    text: "Atendimento personalizado e humanizado" },
    { icon: <Cpu size={17} />,      text: "Equipamentos importados de última geração" },
    { icon: <Activity size={17} />, text: "Atualização constante em novas técnicas" },
  ];
  return (
    <section id="sobre" style={{ width: "100%", padding: "100px 0", background: C.white }}>
      <div style={INNER}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className="rv" style={{ position: "relative" }}>
            <div style={{ borderRadius: 16, aspectRatio: "3/4", overflow: "hidden", position: "relative", background: C.off }}>
              <img
                src="equipe.jpg"
                alt="Dentista ZY Odontologia"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,30,56,0.32) 0%, transparent 55%)", pointerEvents: "none" }} />
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
                  <div style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0, background: `${C.teal}12`, border: `1px solid ${C.teal}22`, display: "flex", alignItems: "center", justifyContent: "center", color: C.teal }}>{it.icon}</div>
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
   TECNOLOGIAS — Grid interativo com modal de detalhe
   8 originais + Invisalign + Shofu (Bioativos) = 10 tecnologias
═══════════════════════════════════════════════════════════════════════════ */
const techData = [
  {
    id: "cadcam",
    icon: <Cpu size={24} />,
    nome: "CAD CAM",
    subtitulo: "Restaurações digitais de alta precisão",
    resumo: "Coroa ou restauração feita no computador e entregue no mesmo dia. Sem moldagem, sem retorno extra.",
    cor: C.teal,
    imgBg: "linear-gradient(145deg, #c8e6f0 0%, #a8d4e4 100%)",
    imgUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "O sistema CAD CAM (Computer-Aided Design / Computer-Aided Manufacturing) representa o que há de mais avançado em restaurações odontológicas digitais. Por meio de escaneamento intraoral de alta resolução, um modelo tridimensional preciso do dente é criado em segundos, eliminando moldagens tradicionais com materiais desconfortáveis.",
    beneficios: [
      "Restauração concluída em uma única sessão clínica",
      "Precisão de encaixe superior às técnicas convencionais",
      "Sem moldeiras ou materiais de impressão desconfortáveis",
      "Peças cerâmicas de alta resistência e estética natural",
      "Menor tempo no consultório — mais conforto para o paciente",
    ],
    aplicacoes: ["Coroas cerâmicas", "Inlays e onlays", "Facetas", "Pontes fixas", "Restaurações parciais"],
    diferenciais: "Na ZY Odontologia, o CAD CAM permite que coroas e restaurações sejam confeccionadas com precisão digital e entregues no mesmo dia, sem necessidade de protético externo ou consultas intermediárias.",
  },
  {
    id: "litetouch",
    icon: <Zap size={24} />,
    nome: "LiteTouch",
    subtitulo: "Laser odontológico de última geração",
    resumo: "Laser que faz procedimentos sem bisturi e com muito menos dor. Você sai andando e se recupera rápido.",
    cor: C.yellow,
    imgBg: "linear-gradient(145deg, #fef3c7 0%, #fde68a 100%)",
    imgUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "O LiteTouch é um sistema laser Er:YAG de alta precisão desenvolvido especificamente para odontologia. Opera em comprimento de onda ideal para tecidos duros e moles, permitindo procedimentos cirúrgicos e restauradores com mínimo desconforto, redução significativa de sangramento e cicatrização acelerada.",
    beneficios: [
      "Procedimentos com mínima ou nenhuma dor",
      "Redução expressiva de sangramento cirúrgico",
      "Cicatrização até 3x mais rápida que técnicas convencionais",
      "Preservação máxima de tecido saudável",
      "Menor necessidade de anestesia em muitos procedimentos",
    ],
    aplicacoes: ["Cirurgias gengivais", "Tratamento de cáries", "Biópsias", "Descontaminação de implantes", "Aftas e lesões de mucosa"],
    diferenciais: "O LiteTouch eleva o padrão de atendimento da ZY Odontologia, tornando procedimentos que antes exigiam bisturi e pontos em tratamentos rápidos, confortáveis e com excelente resultado estético.",
  },
  {
    id: "sedacao",
    icon: <Heart size={24} />,
    nome: "Sedação Consciente",
    subtitulo: "Óxido Nitroso para conforto total",
    resumo: "Fica relaxado e sem ansiedade durante o tratamento. Você continua acordado e sem sentir nada.",
    cor: C.green,
    imgBg: "linear-gradient(145deg, #d1fae5 0%, #a7f3d0 100%)",
    imgUrl: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "A sedação consciente com óxido nitroso é uma técnica amplamente reconhecida pela segurança e eficácia no controle da ansiedade odontológica. O gás é inalado através de uma máscara nasal confortável, induzindo um estado de relaxamento profundo sem perda de consciência — o paciente permanece acordado, cooperativo e capaz de responder ao dentista.",
    beneficios: [
      "Eliminação da ansiedade e do medo do dentista",
      "Paciente permanece consciente e responsivo",
      "Efeito inicia em menos de 2 minutos",
      "Reversível imediatamente após suspender o fornecimento",
      "Indicado para crianças, adultos ansiosos e procedimentos longos",
    ],
    aplicacoes: ["Pacientes com fobia dentária", "Crianças com dificuldade de cooperação", "Procedimentos invasivos", "Extrações complexas", "Implantes e cirurgias"],
    diferenciais: "Na ZY Odontologia, a sedação consciente transforma a experiência de pacientes que anteriormente evitavam o dentista por medo, tornando cada consulta segura, confortável e até agradável.",
  },
  {
    id: "checkup",
    icon: <ScanLine size={24} />,
    nome: "Check-up Digital",
    subtitulo: "Diagnóstico completo com tecnologia de imagem",
    resumo: "Radiografias digitais que mostram tudo em detalhes — cárie, osso, raiz — com muito menos radiação.",
    cor: C.teal,
    imgBg: "linear-gradient(145deg, #cffafe 0%, #a5f3fc 100%)",
    imgUrl: "https://images.unsplash.com/photo-1588776814546-1ffedde94f02?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "O check-up digital integra radiografias digitais panorâmicas, periapicais e, quando indicado, tomografia cone beam para mapear completamente a saúde bucal do paciente. As imagens são capturadas instantaneamente, com até 80% menos radiação que sistemas convencionais, e visualizadas em alta resolução diretamente no monitor.",
    beneficios: [
      "Diagnóstico precoce de cáries, cistos e problemas ósseos",
      "Até 80% menos radiação que radiografias convencionais",
      "Imagens imediatas — sem espera por revelação",
      "Visualização ampliada para explicação clara ao paciente",
      "Histórico digital armazenado para acompanhamento evolutivo",
    ],
    aplicacoes: ["Triagem inicial completa", "Planejamento de implantes", "Avaliação periodontal", "Endodontia", "Acompanhamento de tratamentos"],
    diferenciais: "O check-up digital da ZY Odontologia permite identificar problemas que seriam invisíveis ao exame clínico convencional, possibilitando intervenções menos invasivas e mais eficazes.",
  },
  {
    id: "invisalign",
    icon: <AlignCenter size={24} />,
    nome: "Invisalign",
    subtitulo: "Alinhadores transparentes de última geração",
    resumo: "Aparelho invisível e removível pra alinhar os dentes. Tira pra comer, coloca de volta. Ninguém percebe.",
    cor: C.teal,
    imgBg: "linear-gradient(145deg, #e0f2fe 0%, #bae6fd 100%)",
    imgUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "O Invisalign é o sistema líder mundial em ortodontia com alinhadores transparentes. Utiliza tecnologia de escaneamento 3D e planejamento digital para fabricar uma série de alinhadores personalizados que movem gradualmente os dentes para a posição ideal, sem bráquetes metálicos ou arames. Cada alinhador é trocado a cada 1–2 semanas, sob orientação do ortodontista.",
    beneficios: [
      "Praticamente invisível — ninguém precisa saber que você usa aparelho",
      "Removível para comer, escovar e passar fio dental normalmente",
      "Sem restrições alimentares durante o tratamento",
      "Consultas menos frequentes que o aparelho convencional",
      "Planejamento digital permite visualizar o resultado final antes de começar",
    ],
    aplicacoes: ["Apinhamento dentário", "Diastemas (espaços entre dentes)", "Mordida aberta e cruzada", "Mordida profunda", "Realinhamento pós-tratamento ortodôntico"],
    diferenciais: "Na ZY Odontologia, o tratamento com Invisalign é planejado digitalmente com tecnologia de ponta, permitindo que o paciente visualize o sorriso final antes mesmo de iniciar, com acompanhamento próximo e personalizado em cada etapa.",
  },
  {
    id: "laser",
    icon: <Sparkles size={24} />,
    nome: "Laser Terapêutico",
    subtitulo: "Fotobiomodulação para recuperação acelerada",
    resumo: "Acelera a recuperação depois dos procedimentos. Menos dor, menos inchaço e cicatrização bem mais rápida.",
    cor: C.red,
    imgBg: "linear-gradient(145deg, #fee2e2 0%, #fecaca 100%)",
    imgUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "O laser de baixa potência (LLLT — Low Level Laser Therapy) utiliza comprimentos de onda específicos de luz para estimular a bioquímica celular, acelerando processos naturais de cicatrização e reduzindo a resposta inflamatória. Diferente do laser cirúrgico, não remove tecido — atua estimulando a regeneração celular.",
    beneficios: [
      "Redução de dor pós-operatória em até 70%",
      "Cicatrização até 2x mais rápida",
      "Alívio de sensibilidade dentinária",
      "Redução de edema e inflamação",
      "Sem efeitos colaterais ou contraindicações frequentes",
    ],
    aplicacoes: ["Pós-operatório de cirurgias", "Tratamento de aftas", "Herpes labial", "Sensibilidade dentária", "Xerostomia (boca seca)"],
    diferenciais: "Aplicado rotineiramente após procedimentos na ZY Odontologia, o laser terapêutico garante que os pacientes tenham recuperação mais confortável e rápida, retornando às suas atividades com mínimo desconforto.",
  },
  {
    id: "autoclave",
    icon: <Shield size={24} />,
    nome: "Autoclave",
    subtitulo: "Esterilização por vapor saturado",
    resumo: "Todos os instrumentos passam por esterilização a vapor que elimina 100% das bactérias e vírus.",
    cor: C.navy,
    imgBg: "linear-gradient(145deg, #dbeafe 0%, #bfdbfe 100%)",
    imgUrl: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "A autoclave é o padrão-ouro em esterilização odontológica. Utiliza vapor saturado sob alta pressão e temperatura para destruir completamente todas as formas de vida microbiana — incluindo esporos bacterianos, vírus e fungos — em todos os instrumentos e materiais utilizados nos atendimentos.",
    beneficios: [
      "Eliminação de 100% de microrganismos, incluindo esporos",
      "Processo monitorado e registrado por ciclo",
      "Instrumentos embalados e rastreáveis",
      "Total conformidade com normas da ANVISA e CFO",
      "Segurança comprovada para todos os pacientes",
    ],
    aplicacoes: ["Esterilização de instrumentos cortantes", "Pinças e afastadores", "Brocas e limas endodônticas", "Materiais cirúrgicos", "Todos os instrumentos reutilizáveis"],
    diferenciais: "Na ZY Odontologia, todos os instrumentos passam por processo completo de lavagem, empacotamento e esterilização em autoclave com registro de cada ciclo, garantindo rastreabilidade e segurança total.",
  },
  {
    id: "ultrassom",
    icon: <Activity size={24} />,
    nome: "Ultrassom para Esterilização",
    subtitulo: "Limpeza profunda por cavitação ultrassônica",
    resumo: "Limpeza profunda dos instrumentos antes de esterilizar. Mais uma camada de proteção pra você.",
    cor: C.green,
    imgBg: "linear-gradient(145deg, #d1fae5 0%, #6ee7b7 100%)",
    imgUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "O aparelho de ultrassom para esterilização utiliza o fenômeno de cavitação — criação e implosão de microbolhas em solução enzimática — para remover matéria orgânica, biofilme e resíduos de instrumentos odontológicos com eficiência muito superior à limpeza manual. É o primeiro passo essencial antes da autoclave.",
    beneficios: [
      "Remove até 99,9% de resíduos orgânicos e inorgânicos",
      "Acessa reentrâncias impossíveis para escovas manuais",
      "Reduz risco de contaminação cruzada",
      "Prolonga a vida útil dos instrumentos",
      "Etapa essencial para esterilização eficaz",
    ],
    aplicacoes: ["Pré-lavagem de instrumentos cirúrgicos", "Limas endodônticas", "Brocas e pontas", "Instrumentos com geometria complexa", "Materiais protéticos"],
    diferenciais: "A ZY Odontologia segue protocolo rigoroso de três etapas para todos os instrumentos: limpeza ultrassônica, embalagem rastreável e esterilização em autoclave — excedendo os padrões mínimos de biossegurança.",
  },
  {
    id: "localizador",
    icon: <Microscope size={24} />,
    nome: "Localizador Apical",
    subtitulo: "Precisão eletrônica em endodontia",
    resumo: "Aparelho eletrônico que guia o dentista no tratamento de canal com precisão total. Mais seguro e mais rápido.",
    cor: C.yellow,
    imgBg: "linear-gradient(145deg, #fef9c3 0%, #fef08a 100%)",
    imgUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "O localizador apical eletrônico é um dispositivo de alta precisão que mede a impedância elétrica do canal radicular para determinar com exatidão a posição do forame apical — o ponto final do tratamento de canal. Isso elimina a dependência exclusiva de radiografias para determinação do comprimento de trabalho.",
    beneficios: [
      "Precisão superior a 95% na determinação do comprimento do canal",
      "Redução de radiografias durante o procedimento",
      "Menor risco de extravasamento de material obturador",
      "Tratamentos mais rápidos e seguros",
      "Compatível com canais calcificados e anatomias complexas",
    ],
    aplicacoes: ["Tratamento de canal em dentes anteriores e posteriores", "Retratamentos endodônticos", "Canais curvos e calcificados", "Dentes com reabsorção radicular", "Endodontia pediátrica"],
    diferenciais: "Com o localizador apical, os endodontistas da ZY Odontologia executam tratamentos de canal com precisão milimétrica, reduzindo o número de radiografias e aumentando a previsibilidade do resultado.",
  },
  {
    id: "shofu",
    icon: <Star size={24} />,
    nome: "Shofu — Materiais Bioativos",
    subtitulo: "Restaurações que promovem remineralização ativa",
    resumo: "Restauração que continua protegendo o dente depois de colocada — libera cálcio e flúor pra fortalecer o esmalte.",
    cor: C.green,
    imgBg: "linear-gradient(145deg, #dcfce7 0%, #bbf7d0 100%)",
    imgUrl: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=400&h=160&q=80",
    descricao: "Os materiais bioativos Shofu representam uma nova geração de restaurações odontológicas. Diferente dos compósitos tradicionais, esses materiais interagem ativamente com a estrutura do dente, liberando continuamente íons de cálcio, fosfato e flúor que estimulam a remineralização do esmalte e da dentina ao redor da restauração, criando uma verdadeira barreira biológica contra cáries secundárias.",
    beneficios: [
      "Liberação contínua de íons de cálcio, fosfato e flúor",
      "Estimula ativamente a remineralização do dente",
      "Reduz significativamente o risco de cáries secundárias",
      "Alta estética com excelente mimetismo do dente natural",
      "Biocompatibilidade superior — menor resposta inflamatória pulpar",
    ],
    aplicacoes: ["Restaurações de cáries em adultos e crianças", "Pacientes de alto risco para cárie", "Restaurações cervicais e radiculares", "Selantes bioativos", "Proteção pulpar direta e indireta"],
    diferenciais: "A ZY Odontologia utiliza materiais Shofu bioativos como parte de um protocolo preventivo integrado, oferecendo restaurações que não apenas devolvem a forma e a função do dente, mas contribuem ativamente para a saúde da estrutura dental remanescente.",
  },
];

/* Modal de detalhe da tecnologia */
function TechModal({ tech, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(10, 20, 40, 0.72)", backdropFilter: "blur(4px)", animation: "fadeIn .25s ease" }}
      />

      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(680px, 100vw)", zIndex: 901, background: C.white, overflowY: "auto", boxShadow: "-8px 0 48px rgba(0,0,0,0.18)", animation: "slideInRight .3s ease" }}>

        <div style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.border}`, padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${C.teal}12`, border: `1px solid ${C.teal}25`, display: "flex", alignItems: "center", justifyContent: "center", color: C.teal }}>{tech.icon}</div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.teal }}>Tecnologia</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{tech.nome}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${C.border}`, background: C.off, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted, transition: "all .18s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.white; e.currentTarget.style.borderColor = C.navy; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.off; e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ height: 200, position: "relative", overflow: "hidden", background: tech.imgBg }}>
          {tech.imgUrl && (
            <img
              src={tech.imgUrl} alt={tech.nome}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,30,53,0.06) 0%, transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 56, background: `linear-gradient(to top, ${C.white}, transparent)`, pointerEvents: "none" }} />
        </div>

        <div style={{ padding: "32px 40px 56px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: C.navy, letterSpacing: "-0.025em", marginBottom: 6 }}>{tech.nome}</h2>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.teal, letterSpacing: "0.04em", marginBottom: 20 }}>{tech.subtitulo}</p>
          <div style={{ width: 36, height: 2, background: C.teal, borderRadius: 1, marginBottom: 24 }} />
          <p style={{ fontSize: 15, lineHeight: 1.88, color: C.muted, marginBottom: 32 }}>{tech.descricao}</p>

          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.navy, marginBottom: 16 }}>Benefícios para o paciente</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tech.beneficios.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${C.teal}12`, border: `1px solid ${C.teal}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <CheckCircle size={11} color={C.teal} />
                  </div>
                  <span style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.navy, marginBottom: 14 }}>Aplicações clínicas</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tech.aplicacoes.map((a, i) => (
                <span key={i} style={{ padding: "5px 12px", borderRadius: 100, background: `${C.teal}08`, border: `1px solid ${C.teal}22`, fontSize: 12.5, fontWeight: 500, color: C.teal }}>{a}</span>
              ))}
            </div>
          </div>

          <div style={{ padding: "20px 22px", borderRadius: 10, background: C.off, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.teal}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.teal, marginBottom: 8 }}>Na ZY Odontologia</p>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: C.muted }}>{tech.diferenciais}</p>
          </div>

          <div style={{ marginTop: 32 }}>
            <a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 4, background: C.teal, color: C.white, fontWeight: 700, fontSize: 14, letterSpacing: "0.02em", boxShadow: "0 2px 8px rgba(43,164,181,0.18)", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.tealDk; e.currentTarget.style.boxShadow = "0 4px 14px rgba(43,164,181,0.26)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.boxShadow = "0 2px 8px rgba(43,164,181,0.18)"; }}
            >
              <MessageCircle size={14} /> Agendar consulta
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn      { from { opacity: 0; }              to { opacity: 1; } }
        @keyframes slideInRight{ from { transform: translateX(48px); opacity: 0; } to { transform: none; opacity: 1; } }
      `}</style>
    </>
  );
}

/* Card da grade de tecnologias */
function TechGridCard({ tech, onOpen }) {
  const [hov, sh] = useState(false);
  return (
    <div
      onClick={() => onOpen(tech)}
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => sh(false)}
      style={{ borderRadius: 14, background: C.white, border: `1px solid ${hov ? `${C.teal}28` : C.border}`, boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.09)" : "0 2px 8px rgba(0,0,0,0.05)", transform: hov ? "translateY(-5px)" : "none", transition: "all .28s ease", cursor: "pointer", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div style={{ height: 120, position: "relative", overflow: "hidden", background: `linear-gradient(145deg, ${C.off} 0%, #e8eff5 100%)` }}>
        {tech.imgUrl && (
          <img
            src={tech.imgUrl} alt="" aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: hov ? 1 : 0.62, transition: "opacity .3s, transform .3s", transform: hov ? "scale(1.04)" : "scale(1)" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, background: hov ? "rgba(15,30,53,0.10)" : "rgba(245,247,250,0.35)", transition: "background .3s" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: hov ? C.teal : "transparent", transition: "background .28s" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 32, background: `linear-gradient(to top, ${C.white}, transparent)` }} />
      </div>
      <div style={{ padding: "22px 22px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 8, lineHeight: 1.3 }}>{tech.nome}</h3>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.72, flex: 1, marginBottom: 16 }}>{tech.resumo}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700, color: hov ? C.teal : C.light, transition: "color .22s" }}>
          Saiba mais <ArrowRight size={12} />
        </div>
      </div>
    </div>
  );
}

/* Seção principal */
function Tecnologias() {
  useReveal();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="tecnologias" style={{ width: "100%", padding: "100px 0", background: C.off }}>
        <div style={INNER}>
          <div className="rv" style={{ textAlign: "center", marginBottom: 64 }}>
            <Label>Infraestrutura</Label>
            <Heading center>Tecnologia importada a favor do seu sorriso</Heading>
            <Rule center />
            <p style={{ fontSize: 17, color: C.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
              Investimos nos melhores equipamentos para oferecer diagnósticos precisos, tratamentos eficientes e máximo conforto. Clique em cada tecnologia para conhecer em detalhe.
            </p>
          </div>

          <div className="rv tech-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridAutoRows: "330px", gap: 18 }}>
            {techData.map((tech, i) => (
              <div key={tech.id} style={{ transitionDelay: `${i * .05}s`, height: "100%" }}>
                <TechGridCard tech={tech} onOpen={setSelected} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && <TechModal tech={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @media (max-width: 1280px) { .tech-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 780px)  { .tech-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px)  { .tech-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRATAMENTOS
═══════════════════════════════════════════════════════════════════════════ */
function TreatCard({ icon, title, desc, accent }) {
  const [hov, sHov] = useState(false);
  return (
    <div onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)} style={{ padding: "26px 22px", borderRadius: 10, background: hov ? C.white : C.off, border: `1px solid ${hov ? `${C.teal}25` : "transparent"}`, boxShadow: hov ? "0 8px 28px rgba(0,0,0,.07)" : "none", transform: hov ? "translateY(-4px)" : "none", transition: "all .25s ease", cursor: "default" }}>
      <div style={{ color: C.teal, marginBottom: 13 }}>{icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.72, marginBottom: 14 }}>{desc}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700, color: C.teal }}>
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
            <div key={t.title} style={{ transitionDelay: `${i * .05}s` }}><TreatCard {...t} /></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROFISSIONAIS
═══════════════════════════════════════════════════════════════════════════ */
const doctors = [
  {
    nome: "Dra. Ana Lima",
    especialidade: "Implantodontia & Reabilitação Oral",
    cro: "CRO-SP 12.345",
    bio: "Com mais de 12 anos de experiência em implantodontia, a Dra. Ana Lima é referência na reabilitação oral com implantes de titânio de última geração. Formada pela USP com especialização em Zurique, oferece tratamentos precisos e humanizados.",
    foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    specs: [
      { icon: <Award size={14} />,       text: "Especialista em Implantodontia" },
      { icon: <Star size={14} />,        text: "Certificação Internacional — Zurique" },
      { icon: <Microscope size={14} />,  text: "Reabilitação com Carga Imediata" },
      { icon: <CheckCircle size={14} />, text: "Mais de 800 implantes realizados" },
    ],
  },
  {
    nome: "Dr. Carlos Mendes",
    especialidade: "Ortodontia & Alinhadores Invisíveis",
    cro: "CRO-SP 23.456",
    bio: "Dr. Carlos Mendes é especialista em ortodontia funcional e estética, com ampla experiência em alinhadores transparentes e aparelhos autoligados. Atende adultos e adolescentes com foco em resultados duradouros e confortáveis.",
    foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    specs: [
      { icon: <AlignCenter size={14} />, text: "Especialista em Ortodontia" },
      { icon: <Star size={14} />,        text: "Certificado em Alinhadores Invisíveis" },
      { icon: <Activity size={14} />,    text: "Ortodontia Funcional & Estética" },
      { icon: <CheckCircle size={14} />, text: "Mais de 50 anos de prática clínica" },
    ],
  },
  {
    nome: "Dra. Mariana Costa",
    especialidade: "Estética Dental & Facetas de Porcelana",
    cro: "CRO-SP 34.567",
    bio: "Especialista em odontologia estética de alta complexidade, a Dra. Mariana Costa transforma sorrisos com facetas ultrafinas e lentes de contato dental. Formada pela UNICAMP com pós-graduação em Estética Avançada.",
    foto: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
    specs: [
      { icon: <Sparkles size={14} />,    text: "Especialista em Estética Dental" },
      { icon: <Layers size={14} />,      text: "Facetas de Porcelana Ultrafinas" },
      { icon: <Star size={14} />,        text: "Pós-graduação em Estética Avançada" },
      { icon: <CheckCircle size={14} />, text: "Design Digital do Sorriso" },
    ],
  },
  {
    nome: "Dr. Rafael Souza",
    especialidade: "Endodontia & Tratamento de Canal",
    cro: "CRO-SP 45.678",
    bio: "Dr. Rafael Souza é especialista em endodontia com uso de microscopia cirúrgica e localização eletrônica apical. Procedimentos indolores, rápidos e com altíssima taxa de sucesso, para preservar dentes naturais com segurança.",
    foto: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    specs: [
      { icon: <Shield size={14} />,      text: "Especialista em Endodontia" },
      { icon: <Microscope size={14} />,  text: "Endodontia com Microscopia" },
      { icon: <Zap size={14} />,         text: "Procedimentos Indolores" },
      { icon: <CheckCircle size={14} />, text: "Localização Eletrônica Apical" },
    ],
  },
];

function FotoPlaceholder({ src, alt }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "linear-gradient(145deg, #d0e8f0 0%, #b8d8e8 50%, #a0c8e0 100%)" }}>
      {src && !err ? (
        <img
          src={src}
          alt={alt || ""}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
          onError={() => setErr(true)}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <Users size={72} color="rgba(26,46,85,0.20)" />
          <p style={{ fontSize: 10, color: "rgba(26,46,85,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Foto do profissional</p>
        </div>
      )}
    </div>
  );
}

function NavArrow({ direction, onClick }) {
  const [hov, sHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)}
      style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${hov ? C.teal : C.border}`, background: hov ? `${C.teal}10` : C.white, color: hov ? C.teal : C.muted, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s", flexShrink: 0 }}>
      {direction === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

function Profissionais() {
  useReveal();
  const [idx, setIdx]        = useState(0);
  const [animating, setAnim] = useState(false);
  const [direction, setDir]  = useState("right");

  const go = (next) => {
    if (animating || next === idx) return;
    setDir(next > idx ? "right" : "left");
    setAnim(true);
    setTimeout(() => { setIdx(next); setAnim(false); }, 300);
  };

  const prev = () => go(idx > 0 ? idx - 1 : doctors.length - 1);
  const next = () => go(idx < doctors.length - 1 ? idx + 1 : 0);

  const doc = doctors[idx];

  const anim = animating
    ? { opacity: 0, transform: direction === "right" ? "translateX(-20px)" : "translateX(20px)" }
    : { opacity: 1, transform: "translateX(0)" };

  return (
    <section id="profissionais" style={{ width: "100%", padding: "100px 0", background: C.off }}>
      <div style={INNER}>

        <div className="rv" style={{ textAlign: "center", marginBottom: 56 }}>
          <Label>Profissionais</Label>
          <h2 style={{ fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, lineHeight: 1.17, color: C.navy, letterSpacing: "-0.025em", marginBottom: 14 }}>
            Profissionais que cuidam do seu{" "}
            <span style={{ color: C.teal }}>melhor sorriso</span>
          </h2>
          <div style={{ width: 40, height: 3, borderRadius: 2, background: C.teal, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 16, color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>
            Nossa equipe é formada por especialistas altamente qualificados, comprometidos com sua saúde e bem-estar.
          </p>
        </div>

        <div className="rv" style={{ transitionDelay: ".1s" }}>
          <div style={{ borderRadius: 20, background: C.white, border: `1px solid ${C.border}`, boxShadow: "0 8px 48px rgba(0,0,0,0.08)", overflow: "hidden", display: "grid", gridTemplateColumns: "45% 55%", minHeight: 480 }} className="prof-card">

            <div style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, transition: "opacity .3s ease, transform .3s ease", ...anim }}>
                <FotoPlaceholder src={doc.foto} alt={doc.nome} />
              </div>
              <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: `linear-gradient(to right, transparent 0%, transparent 55%, ${C.white}22 70%, ${C.white}cc 85%, ${C.white} 100%)` }} />
              <div style={{ position: "absolute", top: 20, left: 20, zIndex: 2, padding: "5px 12px", borderRadius: 100, background: "rgba(255,255,255,0.92)", border: `1px solid ${C.border}`, backdropFilter: "blur(8px)", fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", transition: "opacity .3s ease", opacity: animating ? 0 : 1 }}>
                {doc.cro}
              </div>
            </div>

            <div style={{ padding: "48px 48px 48px 36px", display: "flex", flexDirection: "column", justifyContent: "center", transition: "opacity .3s ease, transform .3s ease", ...anim }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.teal, marginBottom: 10 }}>{doc.especialidade}</p>
              <h3 style={{ fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 800, color: C.navy, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>{doc.nome}</h3>
              <div style={{ width: 36, height: 2, borderRadius: 1, background: C.teal, marginBottom: 20 }} />
              <p style={{ fontSize: 15, lineHeight: 1.8, color: C.muted, marginBottom: 28, maxWidth: 440 }}>{doc.bio}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {doc.specs.map((sp, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0, background: `${C.teal}12`, border: `1px solid ${C.teal}22`, display: "flex", alignItems: "center", justifyContent: "center", color: C.teal }}>{sp.icon}</div>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: C.text }}>{sp.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 32 }}>
          <NavArrow direction="left" onClick={prev} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {doctors.map((_, i) => (
              <button key={i} onClick={() => go(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === idx ? C.teal : C.border, cursor: "pointer", transition: "all .3s ease", padding: 0 }} />
            ))}
          </div>
          <NavArrow direction="right" onClick={next} />
        </div>

        <p style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: C.light, letterSpacing: "0.1em" }}>
          {idx + 1} / {doctors.length}
        </p>
      </div>

      <style>{`
        .prof-card { grid-template-columns: 45% 55%; }
        @media (max-width: 780px) {
          .prof-card { grid-template-columns: 1fr !important; }
          .prof-card > div:first-child { min-height: 260px; max-height: 300px; }
          .prof-card > div:last-child { padding: 32px 28px !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOCALIZAÇÃO
═══════════════════════════════════════════════════════════════════════════ */
function Localizacao() {
  useReveal();
  const info = [
    { icon: <MapPin size={17} />, label: "Endereço",                 value: "R. Rui Barbosa, 89 - Centro\nOsasco - SP, 06018-010", accent: C.teal  },
    { icon: <Clock size={17} />,  label: "Horário de Funcionamento", value: "Segunda a Sexta\n08:00–12:00 | 14:00–18:00",        accent: C.green },
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
                <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: `${it.accent}12`, border: `1px solid ${it.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", color: it.accent, marginTop: 2 }}>{it.icon}</div>
                <div>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: C.light, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 5 }}>{it.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: C.text, whiteSpace: "pre-line", lineHeight: 1.65 }}>{it.value}</p>
                </div>
              </div>
            ))}
            <a href="https://www.google.com/maps/search/R.+Rui+Barbosa,+89+Centro+Osasco+SP" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "13px 22px", borderRadius: 4, background: C.navy, color: C.white, fontWeight: 700, fontSize: 14, letterSpacing: "0.02em", marginTop: 8, transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.navyDark}
              onMouseLeave={e => e.currentTarget.style.background = C.navy}>
              <Globe size={15} /> Ver rota no Google Maps
            </a>
          </div>
          <div className="rv" style={{ transitionDelay: ".1s" }}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, height: 420, boxShadow: "0 4px 24px rgba(0,0,0,.07)" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.9!2d-46.7919!3d-23.5329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf03a0b2e5a3b1%3A0x0!2sR.+Rui+Barbosa%2C+89+-+Centro%2C+Osasco+-+SP%2C+06018-010!5e0!3m2!1spt-BR!2sbr!4v1700000000000" width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" title="ZY Odontologia — Osasco/SP" />
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
            <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: `${C.teal}12`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -70, left: -50, width: 280, height: 280, borderRadius: "50%", background: `${C.yellow}08`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.teal},transparent)` }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginBottom: 18 }}>Agende sua consulta</p>
              <h2 style={{ fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, color: C.white, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 18 }}>
                Cuide do seu sorriso com quem entende
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,.58)", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.8 }}>
                Na ZY Odontologia, unimos tecnologia, conforto e atendimento humanizado para cuidar da sua saúde bucal com excelência.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 4, background: "#25D366", color: C.white, fontWeight: 800, fontSize: 16, letterSpacing: "0.02em", boxShadow: "0 8px 28px rgba(37,211,102,.35)", animation: "waPulse 2.5s infinite", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1da854"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(37,211,102,.55)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#25D366"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,.35)"; }}>
                  <MessageCircle size={19} fill={C.white} /> Falar no WhatsApp
                </a>
                <a href={`tel:${WA_NUMBER}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 4, background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.2)", color: C.white, fontWeight: 600, fontSize: 15, transition: "all .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.14)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
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
   FOOTER — Logo + formulário de orçamento via FormSubmit
═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  /* Ícones de redes sociais via SVG inline (lucide-react não inclui ícones de marca) */
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/zyodontologia/",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/zyodontologia",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
    },
  ];

  /* Estilo compartilhado dos campos */
  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: C.white,
    fontSize: 14,
    fontFamily: FONT,
    outline: "none",
    transition: "border-color .2s, background .2s",
  };

  const handleFocus = e => {
    e.target.style.borderColor = `${C.teal}80`;
    e.target.style.background  = "rgba(255,255,255,0.08)";
  };
  const handleBlur  = e => {
    e.target.style.borderColor = "rgba(255,255,255,0.12)";
    e.target.style.background  = "rgba(255,255,255,0.05)";
  };

  return (
    <footer style={{ width: "100%", background: "#0A1422", padding: "64px 0 0" }}>
      <div style={INNER}>

        {/* ── Corpo principal: marca + formulário ── */}
        <div
          className="footer-main"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 64, paddingBottom: 52, borderBottom: "1px solid rgba(255,255,255,.07)", marginBottom: 28 }}
        >

          {/* Coluna esquerda — marca */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ marginBottom: 20 }}>
              <img src="/logo.png" alt="ZY Odontologia" style={{ height: 60, width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.82, color: "rgba(255,255,255,.38)", maxWidth: 220, marginBottom: 14 }}>
              Cuidando da saúde bucal com tecnologia, humanização e precisão em Osasco/SP.
            </p>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.35)", marginBottom: 22 }}>R. Rui Barbosa, 89 - Centro, Osasco - SP</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  target="_blank" rel="noopener noreferrer"
                  style={{ width: 34, height: 34, borderRadius: 6, background: "rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.45)", transition: "all .18s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = C.white; e.currentTarget.style.boxShadow = `0 4px 16px ${C.teal}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "rgba(255,255,255,.45)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.teal, marginBottom: 8 }}>
              Orçamento
            </p>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: C.white, letterSpacing: "-0.02em", marginBottom: 6 }}>
              Solicite um orçamento
            </h3>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.40)", marginBottom: 24, lineHeight: 1.6 }}>
              Preencha os dados abaixo e entraremos em contato.
            </p>

            {/*
              FormSubmit.co — envia direto para zyodontologia@terra.com.br.
              Importante: a primeira submissão exige confirmação por e-mail (clique no link
              que o FormSubmit enviará para zyodontologia@terra.com.br).
              Após confirmar, todas as submissões chegam automaticamente.
            */}
            <form
              action="https://formsubmit.co/zyodontologia@terra.com.br"
              method="POST"
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {/* Campos ocultos de configuração */}
              <input type="hidden" name="_subject"  value="Novo orçamento pelo site ZY Odontologia" />
              <input type="hidden" name="_captcha"  value="false" />
              <input type="hidden" name="_template" value="table" />

              {/* Nome + Email em linha */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
                <input
                  type="text" name="nome" placeholder="Seu nome" required
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                />
                <input
                  type="email" name="email" placeholder="Seu e-mail" required
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                />
              </div>

              {/* Telefone + Assunto em linha */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
                <input
                  type="tel" name="telefone" placeholder="Telefone / WhatsApp"
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                />
                <input
                  type="text" name="assunto" placeholder="Assunto"
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                />
              </div>

              {/* Mensagem */}
              <textarea
                name="mensagem" placeholder="Sua mensagem" rows={4} required
                style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                onFocus={handleFocus} onBlur={handleBlur}
              />

              {/* Botão */}
              <button
                type="submit"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 4, border: "none",
                  background: C.teal, color: C.white,
                  fontWeight: 700, fontSize: 14, fontFamily: FONT,
                  letterSpacing: "0.02em", cursor: "pointer",
                  boxShadow: `0 4px 16px ${C.teal}44`,
                  transition: "all .2s", alignSelf: "flex-start",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.tealDk; e.currentTarget.style.boxShadow = `0 8px 24px ${C.teal}60`; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.teal;   e.currentTarget.style.boxShadow = `0 4px 16px ${C.teal}44`; }}
              >
                <MessageCircle size={15} /> Solicitar Orçamento
              </button>
            </form>
          </div>
        </div>

        {/* ── Barra inferior ── */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: 28 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,.26)", textAlign: "center" }}>
            Desenvolvido por Thiago Yanagimori © 2026 ZY Odontologia. Todos os direitos reservados.
          </span>
        </div>
      </div>

      {/* Responsivo */}
      <style>{`
        .footer-main { grid-template-columns: 1fr 1.7fr; }
        .form-row    { grid-template-columns: 1fr 1fr; }
        @media (max-width: 860px) {
          .footer-main { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        /* Placeholder color */
        footer input::placeholder,
        footer textarea::placeholder { color: rgba(255,255,255,0.30); }
        footer input, footer textarea { color-scheme: dark; }
      `}</style>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHATSAPP FLUTUANTE
═══════════════════════════════════════════════════════════════════════════ */
function WAFloat() {
  const [hov, sHov] = useState(false);
  return (
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" title="Falar no WhatsApp"
      onMouseEnter={() => sHov(true)} onMouseLeave={() => sHov(false)}
      style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hov ? "0 10px 32px rgba(37,211,102,.55)" : "0 4px 18px rgba(37,211,102,.38)", transform: hov ? "scale(1.1)" : "scale(1)", transition: "all .22s ease", animation: "waPulse 2.5s infinite" }}>
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
        <Profissionais />
        <Localizacao />
        <CTAFinal />
        <Footer />
        <WAFloat />
      </div>
    </>
  );
}