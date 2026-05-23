/* ═══════════════════════════════════════════════════════════════════
   ZY Odontologia — script.js
   Vanilla JS puro. Sem React, sem frameworks.
═══════════════════════════════════════════════════════════════════ */

/* ── Configuração ──────────────────────────────────────────────── */
const WA_NUMBER = "5511947811500";
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de agendar uma consulta na ZY Odontologia.")}`;

/* ── Ícones SVG (substitui lucide-react) ───────────────────────── */
const ICONS = {
  phone:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mappin:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  shield:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  heart:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  zap:        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  award:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  menu:       `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  x:          `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  check:      `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  arrow:      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  msg:        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  msgFill:    `<svg width="19" height="19" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  activity:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  users:      `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  usersSmall: `<svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="rgba(26,46,85,0.20)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  cpu:        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  scan:       `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>`,
  layers:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  star:       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  stethoscope:`<svg width="112" height="112" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
  aligncenter:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>`,
  circledot:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>`,
  sparkles:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  badgecheck: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  globe:      `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  microscope: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 21h18"/><path d="M14 21v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/><path d="M14 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12"/><circle cx="17" cy="7" r="3"/></svg>`,
  chevleft:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevright:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  instagram:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>`,
  facebook:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
};

/* ── Dados de tecnologias ──────────────────────────────────────── */
const TECH_DATA = [
  { id:"cadcam",    cor:"#2BA4B5", imgBg:"linear-gradient(145deg,#c8e6f0,#a8d4e4)", iconKey:"cpu",
    imgUrl:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=70",
    nome:"CAD CAM", subtitulo:"Restaurações digitais de alta precisão",
    resumo:"Tecnologia digital para design e fabricação de restaurações cerâmicas com precisão milimétrica em sessão única.",
    descricao:"O sistema CAD CAM (Computer-Aided Design / Computer-Aided Manufacturing) representa o que há de mais avançado em restaurações odontológicas digitais. Por meio de escaneamento intraoral de alta resolução, um modelo tridimensional preciso do dente é criado em segundos, eliminando moldagens tradicionais com materiais desconfortáveis.",
    beneficios:["Restauração concluída em uma única sessão clínica","Precisão de encaixe superior às técnicas convencionais","Sem moldeiras ou materiais de impressão desconfortáveis","Peças cerâmicas de alta resistência e estética natural","Menor tempo no consultório — mais conforto para o paciente"],
    aplicacoes:["Coroas cerâmicas","Inlays e onlays","Facetas","Pontes fixas","Restaurações parciais"],
    diferenciais:"Na ZY Odontologia, o CAD CAM permite que coroas e restaurações sejam confeccionadas com precisão digital e entregues no mesmo dia, sem necessidade de protético externo ou consultas intermediárias." },
  { id:"litetouch", cor:"#F4A51E", imgBg:"linear-gradient(145deg,#fef3c7,#fde68a)", iconKey:"zap",
    imgUrl:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=70",
    nome:"LiteTouch", subtitulo:"Laser odontológico de última geração",
    resumo:"Laser Er:YAG de alta performance para procedimentos minimamente invasivos, com menos dor e recuperação mais rápida.",
    descricao:"O LiteTouch é um sistema laser Er:YAG de alta precisão desenvolvido especificamente para odontologia. Opera em comprimento de onda ideal para tecidos duros e moles, permitindo procedimentos cirúrgicos e restauradores com mínimo desconforto, redução significativa de sangramento e cicatrização acelerada.",
    beneficios:["Procedimentos com mínima ou nenhuma dor","Redução expressiva de sangramento cirúrgico","Cicatrização até 3x mais rápida que técnicas convencionais","Preservação máxima de tecido saudável","Menor necessidade de anestesia em muitos procedimentos"],
    aplicacoes:["Cirurgias gengivais","Tratamento de cáries","Biópsias","Descontaminação de implantes","Aftas e lesões de mucosa"],
    diferenciais:"O LiteTouch eleva o padrão de atendimento da ZY Odontologia, tornando procedimentos que antes exigiam bisturi e pontos em tratamentos rápidos, confortáveis e com excelente resultado estético." },
  { id:"sedacao",   cor:"#4C9E6B", imgBg:"linear-gradient(145deg,#d1fae5,#a7f3d0)", iconKey:"heart",
    imgUrl:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=70",
    nome:"Sedação Consciente", subtitulo:"Óxido Nitroso para conforto total",
    resumo:"Técnica segura que reduz a ansiedade e o desconforto durante os procedimentos, mantendo o paciente consciente e tranquilo.",
    descricao:"A sedação consciente com óxido nitroso é uma técnica amplamente reconhecida pela segurança e eficácia no controle da ansiedade odontológica. O gás é inalado através de uma máscara nasal confortável, induzindo um estado de relaxamento profundo sem perda de consciência — o paciente permanece acordado, cooperativo e capaz de responder ao dentista.",
    beneficios:["Eliminação da ansiedade e do medo do dentista","Paciente permanece consciente e responsivo","Efeito inicia em menos de 2 minutos","Reversível imediatamente após suspender o fornecimento","Indicado para crianças, adultos ansiosos e procedimentos longos"],
    aplicacoes:["Pacientes com fobia dentária","Crianças com dificuldade de cooperação","Procedimentos invasivos","Extrações complexas","Implantes e cirurgias"],
    diferenciais:"Na ZY Odontologia, a sedação consciente transforma a experiência de pacientes que anteriormente evitavam o dentista por medo, tornando cada consulta segura, confortável e até agradável." },
  { id:"checkup",   cor:"#2BA4B5", imgBg:"linear-gradient(145deg,#cffafe,#a5f3fc)", iconKey:"scan",
    imgUrl:"https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=400&q=70",
    nome:"Check-up Digital", subtitulo:"Diagnóstico completo com tecnologia de imagem",
    resumo:"Avaliação odontológica completa utilizando imagens digitais de alta resolução para diagnósticos mais precisos e precoces.",
    descricao:"O check-up digital integra radiografias digitais panorâmicas, periapicais e, quando indicado, tomografia cone beam para mapear completamente a saúde bucal do paciente. As imagens são capturadas instantaneamente, com até 80% menos radiação que sistemas convencionais, e visualizadas em alta resolução diretamente no monitor.",
    beneficios:["Diagnóstico precoce de cáries, cistos e problemas ósseos","Até 80% menos radiação que radiografias convencionais","Imagens imediatas — sem espera por revelação","Visualização ampliada para explicação clara ao paciente","Histórico digital armazenado para acompanhamento evolutivo"],
    aplicacoes:["Triagem inicial completa","Planejamento de implantes","Avaliação periodontal","Endodontia","Acompanhamento de tratamentos"],
    diferenciais:"O check-up digital da ZY Odontologia permite identificar problemas que seriam invisíveis ao exame clínico convencional, possibilitando intervenções menos invasivas e mais eficazes." },
  { id:"invisalign", cor:"#2BA4B5", imgBg:"linear-gradient(145deg,#e0f2fe,#bae6fd)", iconKey:"aligncenter",
    imgUrl:"https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&w=400&q=70",
    nome:"Invisalign", subtitulo:"Alinhadores transparentes de última geração",
    resumo:"Sistema de alinhadores removíveis e praticamente invisíveis que corrigem o alinhamento dos dentes com conforto e discrição.",
    descricao:"O Invisalign é o sistema líder mundial em ortodontia com alinhadores transparentes. Utiliza tecnologia de escaneamento 3D e planejamento digital para fabricar uma série de alinhadores personalizados que movem gradualmente os dentes para a posição ideal, sem bráquetes metálicos ou arames. Cada alinhador é trocado a cada 1–2 semanas, sob orientação do ortodontista.",
    beneficios:["Praticamente invisível — ninguém precisa saber que você usa aparelho","Removível para comer, escovar e passar fio dental normalmente","Sem restrições alimentares durante o tratamento","Consultas menos frequentes que o aparelho convencional","Planejamento digital permite visualizar o resultado final antes de começar"],
    aplicacoes:["Apinhamento dentário","Diastemas (espaços entre dentes)","Mordida aberta e cruzada","Mordida profunda","Realinhamento pós-tratamento ortodôntico"],
    diferenciais:"Na ZY Odontologia, o tratamento com Invisalign é planejado digitalmente com tecnologia de ponta, permitindo que o paciente visualize o sorriso final antes mesmo de iniciar, com acompanhamento próximo e personalizado em cada etapa." },
  { id:"laser",     cor:"#CF3E43", imgBg:"linear-gradient(145deg,#fee2e2,#fecaca)", iconKey:"sparkles",
    imgUrl:"https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=70",
    nome:"Laser Terapêutico", subtitulo:"Fotobiomodulação para recuperação acelerada",
    resumo:"Laser de baixa potência que acelera a cicatrização, reduz inflamação e alivia a dor pós-operatória sem efeitos colaterais.",
    descricao:"O laser de baixa potência (LLLT — Low Level Laser Therapy) utiliza comprimentos de onda específicos de luz para estimular a bioquímica celular, acelerando processos naturais de cicatrização e reduzindo a resposta inflamatória. Diferente do laser cirúrgico, não remove tecido — atua estimulando a regeneração celular.",
    beneficios:["Redução de dor pós-operatória em até 70%","Cicatrização até 2x mais rápida","Alívio de sensibilidade dentinária","Redução de edema e inflamação","Sem efeitos colaterais ou contraindicações frequentes"],
    aplicacoes:["Pós-operatório de cirurgias","Tratamento de aftas","Herpes labial","Sensibilidade dentária","Xerostomia (boca seca)"],
    diferenciais:"Aplicado rotineiramente após procedimentos na ZY Odontologia, o laser terapêutico garante que os pacientes tenham recuperação mais confortável e rápida, retornando às suas atividades com mínimo desconforto." },
  { id:"autoclave", cor:"#1A2E55", imgBg:"linear-gradient(145deg,#dbeafe,#bfdbfe)", iconKey:"shield",
    imgUrl:"https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=400&q=70",
    nome:"Autoclave", subtitulo:"Esterilização por vapor saturado",
    resumo:"Sistema de esterilização por vapor sob pressão que elimina 100% de microrganismos, garantindo máxima biossegurança.",
    descricao:"A autoclave é o padrão-ouro em esterilização odontológica. Utiliza vapor saturado sob alta pressão e temperatura para destruir completamente todas as formas de vida microbiana — incluindo esporos bacterianos, vírus e fungos — em todos os instrumentos e materiais utilizados nos atendimentos.",
    beneficios:["Eliminação de 100% de microrganismos, incluindo esporos","Processo monitorado e registrado por ciclo","Instrumentos embalados e rastreáveis","Total conformidade com normas da ANVISA e CFO","Segurança comprovada para todos os pacientes"],
    aplicacoes:["Esterilização de instrumentos cortantes","Pinças e afastadores","Brocas e limas endodônticas","Materiais cirúrgicos","Todos os instrumentos reutilizáveis"],
    diferenciais:"Na ZY Odontologia, todos os instrumentos passam por processo completo de lavagem, empacotamento e esterilização em autoclave com registro de cada ciclo, garantindo rastreabilidade e segurança total." },
  { id:"ultrassom", cor:"#4C9E6B", imgBg:"linear-gradient(145deg,#d1fae5,#6ee7b7)", iconKey:"activity",
    imgUrl:"champions.webp",
    nome:"Ultrassom para Esterilização", subtitulo:"Limpeza profunda por cavitação ultrassônica",
    resumo:"Equipamento de limpeza ultrassônica que remove resíduos de instrumentos antes da esterilização, garantindo eficácia total.",
    descricao:"O aparelho de ultrassom para esterilização utiliza o fenômeno de cavitação — criação e implosão de microbolhas em solução enzimática — para remover matéria orgânica, biofilme e resíduos de instrumentos odontológicos com eficiência muito superior à limpeza manual. É o primeiro passo essencial antes da autoclave.",
    beneficios:["Remove até 99,9% de resíduos orgânicos e inorgânicos","Acessa reentrâncias impossíveis para escovas manuais","Reduz risco de contaminação cruzada","Prolonga a vida útil dos instrumentos","Etapa essencial para esterilização eficaz"],
    aplicacoes:["Pré-lavagem de instrumentos cirúrgicos","Limas endodônticas","Brocas e pontas","Instrumentos com geometria complexa","Materiais protéticos"],
    diferenciais:"A ZY Odontologia segue protocolo rigoroso de três etapas para todos os instrumentos: limpeza ultrassônica, embalagem rastreável e esterilização em autoclave — excedendo os padrões mínimos de biossegurança." },
  { id:"localizador",cor:"#F4A51E", imgBg:"linear-gradient(145deg,#fef9c3,#fef08a)", iconKey:"microscope",
    imgUrl:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=70",
    nome:"Localizador Apical", subtitulo:"Precisão eletrônica em endodontia",
    resumo:"Dispositivo eletrônico que determina o comprimento exato do canal radicular, tornando o tratamento de canal mais seguro e preciso.",
    descricao:"O localizador apical eletrônico é um dispositivo de alta precisão que mede a impedância elétrica do canal radicular para determinar com exatidão a posição do forame apical — o ponto final do tratamento de canal. Isso elimina a dependência exclusiva de radiografias para determinação do comprimento de trabalho.",
    beneficios:["Precisão superior a 95% na determinação do comprimento do canal","Redução de radiografias durante o procedimento","Menor risco de extravasamento de material obturador","Tratamentos mais rápidos e seguros","Compatível com canais calcificados e anatomias complexas"],
    aplicacoes:["Tratamento de canal em dentes anteriores e posteriores","Retratamentos endodônticos","Canais curvos e calcificados","Dentes com reabsorção radicular","Endodontia pediátrica"],
    diferenciais:"Com o localizador apical, os endodontistas da ZY Odontologia executam tratamentos de canal com precisão milimétrica, reduzindo o número de radiografias e aumentando a previsibilidade do resultado." },
  { id:"shofu",     cor:"#4C9E6B", imgBg:"linear-gradient(145deg,#dcfce7,#bbf7d0)", iconKey:"star",
    imgUrl:"https://images.unsplash.com/photo-1607872629009-de4a0ac84d91?auto=format&fit=crop&w=400&q=70",
    nome:"Shofu — Materiais Bioativos", subtitulo:"Restaurações que promovem remineralização ativa",
    resumo:"Materiais restauradores bioativos que liberam íons benéficos, estimulam a remineralização e protegem o dente de dentro para fora.",
    descricao:"Os materiais bioativos Shofu representam uma nova geração de restaurações odontológicas. Diferente dos compósitos tradicionais, esses materiais interagem ativamente com a estrutura do dente, liberando continuamente íons de cálcio, fosfato e flúor que estimulam a remineralização do esmalte e da dentina ao redor da restauração, criando uma verdadeira barreira biológica contra cáries secundárias.",
    beneficios:["Liberação contínua de íons de cálcio, fosfato e flúor","Estimula ativamente a remineralização do dente","Reduz significativamente o risco de cáries secundárias","Alta estética com excelente mimetismo do dente natural","Biocompatibilidade superior — menor resposta inflamatória pulpar"],
    aplicacoes:["Restaurações de cáries em adultos e crianças","Pacientes de alto risco para cárie","Restaurações cervicais e radiculares","Selantes bioativos","Proteção pulpar direta e indireta"],
    diferenciais:"A ZY Odontologia utiliza materiais Shofu bioativos como parte de um protocolo preventivo integrado, oferecendo restaurações que não apenas devolvem a forma e a função do dente, mas contribuem ativamente para a saúde da estrutura dental remanescente." },
];

/* ── Dados de profissionais ────────────────────────────────────── */
const DOCTORS = [
  { nome:"Dr. Ziró Yanagimori", esp:"Implantodontia & Reabilitação Oral", cro:"CRO-SP 13.090",
    foto:"ziro.jpg",
    bio:"Com mais de 12 anos de experiência em implantodontia, a Dra. Ana Lima é referência na reabilitação oral com implantes de titânio de última geração. Formada pela USP com especialização em Zurique, oferece tratamentos precisos e humanizados.",
    specs:["Especialista em Implantodontia","Certificação Internacional — Zurique","Reabilitação com Carga Imediata","Mais de 800 implantes realizados"] },
  { nome:"Dra. Eurica Yanagimori", esp:"Ortodontia & Alinhadores Invisíveis", cro:"CRO-SP 23.456",
    foto:"eurica.jpg",
    bio:"Dr. Carlos Mendes é especialista em ortodontia funcional e estética, com ampla experiência em alinhadores transparentes e aparelhos autoligados. Atende adultos e adolescentes com foco em resultados duradouros e confortáveis.",
    specs:["Especialista em Ortodontia","Certificado em Alinhadores Invisíveis","Ortodontia Funcional & Estética","Mais de 50 anos de prática clínica"] },
  { nome:"Dra. Juliana Yanagimori", esp:"Estética Dental & Facetas de Porcelana", cro:"CRO-SP 34.567",
    foto:"juliana.jpg",
    bio:"Especialista em odontologia estética de alta complexidade, a Dra. Mariana Costa transforma sorrisos com facetas ultrafinas e lentes de contato dental. Formada pela UNICAMP com pós-graduação em Estética Avançada.",
    specs:["Especialista em Estética Dental","Facetas de Porcelana Ultrafinas","Pós-graduação em Estética Avançada","Design Digital do Sorriso"] },
  { nome:"Dra. Yoshie", esp:"Endodontia & Tratamento de Canal", cro:"CRO-SP 45.678",
    foto:"yoshie.jpg",
    bio:"Dr. Rafael Souza é especialista em endodontia com uso de microscopia cirúrgica e localização eletrônica apical. Procedimentos indolores, rápidos e com altíssima taxa de sucesso, para preservar dentes naturais com segurança.",
    specs:["Especialista em Endodontia","Endodontia com Microscopia","Procedimentos Indolores","Localização Eletrônica Apical"] },
];

/* ═══════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initScrollReveal();
  initTechGrid();
  initProfissionais();
  updateWaLinks();
});

/* ── Header ────────────────────────────────────────────────────── */
function initHeader() {
  const header  = document.getElementById("site-header");
  const burger  = document.getElementById("burger-btn");
  const drawer  = document.getElementById("mobile-drawer");
  const burgerIcon = document.getElementById("burger-icon");

  // Scroll → adicionar classe scrolled
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Burger toggle
  burger.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    burgerIcon.innerHTML = isOpen ? ICONS.x : ICONS.menu;
  });

  // Nav links
  document.querySelectorAll("[data-nav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.nav;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      drawer.classList.remove("open");
      burgerIcon.innerHTML = ICONS.menu;
    });
  });
}

/* ── Scroll reveal ─────────────────────────────────────────────── */
function initScrollReveal() {
  const run = () => {
    document.querySelectorAll(".rv:not(.in)").forEach(el => {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); }
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  };
  run();
  setTimeout(run, 200);
}

/* ── Tecnologias — grid + modal ────────────────────────────────── */
function initTechGrid() {
  const grid    = document.getElementById("tech-grid");
  const overlay = document.getElementById("tech-overlay");
  const panel   = document.getElementById("tech-panel");

  // Build cards
  TECH_DATA.forEach(tech => {
    const card = document.createElement("div");
    card.className = "tech-card";
    card.style.setProperty("--card-cor", tech.cor);
    card.style.setProperty("--card-bg",  tech.imgBg);

    card.innerHTML = `
      <div class="tech-card-img">
        <div class="tech-card-top-line"></div>
        ${tech.imgUrl ? `<img src="${tech.imgUrl}" alt="" class="tech-card-img-photo" loading="lazy" onerror="this.style.display='none'" />` : ''}
      </div>
      <div class="tech-card-body">
        <h3>${tech.nome}</h3>
        <p>${tech.resumo}</p>
        <span class="tech-card-link">Saiba mais ${ICONS.arrow}</span>
      </div>`;

    card.addEventListener("click", () => openTechModal(tech));
    grid.appendChild(card);
  });

  // Close modal
  overlay.addEventListener("click", closeTechModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeTechModal(); });
  document.getElementById("tech-close").addEventListener("click", closeTechModal);
}

function makeSvg24(svgStr) {
  return svgStr.replace(/width="\d+"/, 'width="24"').replace(/height="\d+"/, 'height="24"');
}

function openTechModal(tech) {
  const overlay = document.getElementById("tech-overlay");
  const panel   = document.getElementById("tech-panel");
  const TEAL    = "#2BA4B5";

  document.getElementById("tp-icon").style.display   = "none";
  document.getElementById("tp-label").textContent    = "Tecnologia";
  document.getElementById("tp-nome-hdr").textContent = tech.nome;

  // Hero bg — gradiente neutro premium
  const heroDiv = document.getElementById("tp-hero");
  heroDiv.style.background = "linear-gradient(145deg, #f0f5f8 0%, #e4ecf2 100%)";
  document.getElementById("tp-hero-icon").style.display = "none";

  // Body
  document.getElementById("tp-title").textContent    = tech.nome;
  const subtitle = document.getElementById("tp-subtitle");
  subtitle.textContent = tech.subtitulo;
  subtitle.style.color = TEAL;

  const rule = document.getElementById("tp-rule");
  rule.style.background = TEAL;

  document.getElementById("tp-desc").textContent = tech.descricao;

  // Benefits — ícones teal suave
  const benefList = document.getElementById("tp-benefits");
  benefList.innerHTML = tech.beneficios.map(b => `
    <div class="tech-benefit">
      <div class="tech-benefit-icon" style="background:rgba(43,164,181,.08);border:1px solid rgba(43,164,181,.18);">
        <span style="color:${TEAL}">${ICONS.check}</span>
      </div>
      <span>${b}</span>
    </div>`).join("");

  // Tags — estilo neutro premium
  const tagsList = document.getElementById("tp-tags");
  tagsList.innerHTML = tech.aplicacoes.map(a => `
    <span class="tech-tag" style="background:rgba(43,164,181,.07);border:1px solid rgba(43,164,181,.16);color:${TEAL}">${a}</span>
  `).join("");

  // ZY box — borda teal discreta
  const zyLabel = document.getElementById("tp-zy-label");
  zyLabel.style.color = TEAL;
  document.getElementById("tp-zy-box").style.borderLeftColor = TEAL;
  document.getElementById("tp-diferenciais").textContent = tech.diferenciais;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  panel.scrollTop = 0;
}

function closeTechModal() {
  document.getElementById("tech-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ── Profissionais — carousel ──────────────────────────────────── */
function initProfissionais() {
  let idx = 0;
  let animating = false;

  const fotoInner  = document.getElementById("prof-foto-inner");
  const contentCol = document.getElementById("prof-content-col");
  const croEl      = document.getElementById("prof-cro");
  const dotsEl     = document.getElementById("prof-dots");
  const counter    = document.getElementById("prof-counter");

  // Dots
  DOCTORS.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "prof-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Profissional ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(dot);
  });

  document.getElementById("prof-prev").addEventListener("click", () =>
    goTo(idx > 0 ? idx - 1 : DOCTORS.length - 1));
  document.getElementById("prof-next").addEventListener("click", () =>
    goTo(idx < DOCTORS.length - 1 ? idx + 1 : 0));

  function goTo(next) {
    if (animating || next === idx) return;
    animating = true;
    const dir = next > idx ? -1 : 1;

    // fade out
    fotoInner.classList.add("animating");
    contentCol.classList.add("animating");
    fotoInner.style.transform  = `translateX(${-dir * 20}px)`;
    contentCol.style.transform = `translateX(${-dir * 20}px)`;
    if (croEl) { croEl.style.opacity = "0"; }

    setTimeout(() => {
      idx = next;
      renderDoctor();
      // reset then fade in
      fotoInner.style.transition  = "none";
      contentCol.style.transition = "none";
      fotoInner.style.transform   = `translateX(${dir * 20}px)`;
      contentCol.style.transform  = `translateX(${dir * 20}px)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fotoInner.style.transition  = "";
          contentCol.style.transition = "";
          fotoInner.classList.remove("animating");
          contentCol.classList.remove("animating");
          fotoInner.style.transform   = "translateX(0)";
          contentCol.style.transform  = "translateX(0)";
          if (croEl) { croEl.style.opacity = "1"; }
          animating = false;
        });
      });
    }, 300);
  }

  function renderDoctor() {
    const doc = DOCTORS[idx];

    // Atualiza foto
    fotoInner.innerHTML = `
      <div class="prof-foto-placeholder">
        ${ICONS.usersSmall}
        <p>Foto do profissional</p>
      </div>
      ${doc.foto ? `<img
        src="${doc.foto}"
        alt="${doc.nome}"
        class="prof-foto-img"
        loading="lazy"
        onerror="this.style.display='none'"
      />` : ''}
    `;

    if (croEl) croEl.textContent = doc.cro;

    document.getElementById("prof-esp").textContent  = doc.esp;
    document.getElementById("prof-nome").textContent = doc.nome;
    document.getElementById("prof-bio").textContent  = doc.bio;

    const specList = document.getElementById("prof-specs");
    specList.innerHTML = doc.specs.map(s => `
      <div class="prof-spec">
        <div class="prof-spec-icon">${ICONS.check.replace('width="11"','width="14"').replace('height="11"','height="14"')}</div>
        <span>${s}</span>
      </div>`).join("");

    // Dots
    document.querySelectorAll(".prof-dot").forEach((d, i) => {
      d.classList.toggle("active", i === idx);
    });
    if (counter) counter.textContent = `${idx + 1} / ${DOCTORS.length}`;
  }

  renderDoctor();
}

/* ── WA links ──────────────────────────────────────────────────── */
function updateWaLinks() {
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.href = WA_LINK;
  });
}
