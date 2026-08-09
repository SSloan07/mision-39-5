(function () {
  'use strict';

  const SGP_MILESTONES = [
    { sgp: 29.5, competencyLoad: 35 },
    { sgp: 32.8, competencyLoad: 55 },
    { sgp: 36.2, competencyLoad: 75 },
    { sgp: 39.5, competencyLoad: 90 }
  ];

  const INITIAL_INDICATORS = {
    wellbeing: 50,
    capacity: 40,
    fiscalMargin: 50,
    competencyLoad: 35
  };

  const OUTCOMES = {
    descentralizacion_viable: {
      id: 'descentralizacion_viable',
      title: 'Descentralización viable',
      interpretation: 'El municipio aumentó su capacidad al ritmo de las responsabilidades y conservó margen para sostenerlas.',
      connection: 'Los recursos funcionan mejor cuando llegan con capacidad, planeación y reglas claras.'
    },
    municipio_al_limite: {
      id: 'municipio_al_limite',
      title: 'Municipio al límite',
      interpretation: 'La respuesta inmediata mejoró, pero la carga final supera la capacidad o el margen disponible.',
      connection: 'Transferir responsabilidades sin financiación y capacidad puede convertir el aumento de recursos en presión.'
    },
    bienestar_fragil: {
      id: 'bienestar_fragil',
      title: 'Bienestar frágil',
      interpretation: 'La población percibió mejoras, pero el resultado depende demasiado de decisiones de corto plazo.',
      connection: 'Un resultado visible no equivale a sostenibilidad.'
    },
    capacidad_sin_resultados: {
      id: 'capacidad_sin_resultados',
      title: 'Capacidad sin resultados',
      interpretation: 'Se fortaleció la estructura, pero el bienestar no mejoró suficientemente durante la transición.',
      connection: 'La capacidad es necesaria, pero debe traducirse en servicios y bienestar.'
    },
    descentralizacion_inconclusa: {
      id: 'descentralizacion_inconclusa',
      title: 'Descentralización inconclusa',
      interpretation: 'Se evitó el colapso, pero no se equilibraron completamente bienestar, capacidad y margen.',
      connection: 'La norma debe definir competencias, recursos, tiempos y controles; no existe una solución aislada.'
    }
  };

  const ROUND_DATA = [
    {
      round: 1,
      question: 'El primer incremento llega. ¿Qué financias primero?',
      options: [
        {
          id: 'r1_services_now',
          title: 'Servicios visibles',
          benefit: 'Resultados que la gente puede ver hoy.',
          cost: 'Menos margen y menos capacidad instalada.',
          narrative: 'La ciudadanía ve resultados rápidos, pero la alcaldía empieza a operar con menos margen y menos capacidad instalada.',
          effects: { wellbeing: 14, capacity: -6, fiscalMargin: -10 }
        },
        {
          id: 'r1_build_capacity',
          title: 'Fortalecer la alcaldía',
          benefit: 'Personal, planeación y control para sostener lo que viene.',
          cost: 'La mejora visible tarda más en aparecer.',
          narrative: 'La mejora es menos visible al principio, pero ahora hay más planeación y control para asumir nuevas tareas.',
          effects: { wellbeing: 3, capacity: 14, fiscalMargin: -8 }
        },
        {
          id: 'r1_reserve_coordinate',
          title: 'Reservar y coordinar',
          benefit: 'Proteges el margen mientras organizas la respuesta.',
          cost: 'La demanda sigue presente y el alivio ciudadano es menor.',
          narrative: 'Evitaste gastar todo de inmediato. La necesidad sigue visible, pero conservas espacio para coordinar y responder.',
          effects: { wellbeing: -4, capacity: 6, fiscalMargin: 12 }
        }
      ]
    },
    {
      round: 2,
      question: 'Una nueva responsabilidad aparece: coordinar agua y saneamiento básico. ¿Cómo la implementas?',
      options: [
        {
          id: 'r2_assume_now',
          title: 'Asumirla de inmediato',
          benefit: 'Respuesta rápida ante la nueva demanda.',
          cost: 'El equipo todavía no está listo para sostenerla.',
          narrative: 'El servicio se expande rápido, pero el equipo recibe una carga que no estaba preparado para sostener.',
          effects: { wellbeing: 15, capacity: -9, fiscalMargin: -12 }
        },
        {
          id: 'r2_phase',
          title: 'Implementarla por fases',
          benefit: 'Avanzas gradualmente sin romper la operación.',
          cost: 'No resuelves todo al mismo tiempo.',
          narrative: 'La implementación gradual reduce el impacto inmediato y protege la continuidad del servicio.',
          effects: { wellbeing: 7, capacity: 7, fiscalMargin: -5 }
        },
        {
          id: 'r2_cofinance',
          title: 'Coordinar y cofinanciar',
          benefit: 'Distribuyes el esfuerzo y proteges el margen.',
          cost: 'Debes negociar y planear con más actores.',
          narrative: 'La coordinación distribuye el esfuerzo y protege el margen, pero exige negociar y planear.',
          effects: { wellbeing: 4, capacity: 10, fiscalMargin: 1 }
        }
      ]
    },
    {
      round: 3,
      question: 'Una crisis de servicio y una auditoría de ejecución ponen a prueba al municipio. ¿Qué haces?',
      options: [
        {
          id: 'r3_emergency',
          title: 'Apagar el incendio',
          benefit: 'Resuelves lo urgente y calmas la presión inmediata.',
          cost: 'La reestructuración queda para después.',
          narrative: 'Apagaste el incendio. El problema visible baja, pero la estructura queda más vulnerable ante la próxima crisis.',
          effects: { wellbeing: 12, capacity: -7, fiscalMargin: -14 }
        },
        {
          id: 'r3_audit_replan',
          title: 'Auditar y replanificar',
          benefit: 'Corriges la ejecución y fortaleces el control.',
          cost: 'Aceptas una desaceleración visible en el corto plazo.',
          narrative: 'El control no luce como una obra, pero permite corregir la ejecución y evitar que el problema se repita.',
          effects: { wellbeing: -6, capacity: 13, fiscalMargin: 5 }
        },
        {
          id: 'r3_request_support',
          title: 'Pedir apoyo y cofinanciar',
          benefit: 'Compartes el riesgo para no cargarlo todo en el municipio.',
          cost: 'Dependes de coordinación externa y tiempos de respuesta ajenos.',
          narrative: 'Compartir riesgos no resuelve todo hoy, pero evita que el municipio cargue solo con una responsabilidad que excede su capacidad.',
          effects: { wellbeing: 5, capacity: 7, fiscalMargin: 8 }
        }
      ]
    }
  ];

  const BRIEFING_POINTS = [
    'El Acto Legislativo 03 de 2024 estableció una transición gradual del SGP hacia el 39,5 % de los ingresos corrientes de la Nación.',
    'La reforma establece una transición hacia el 39,5 %.',
    'Eso no significa que las regiones ya reciban el 39,5 %.',
    'El 29 de julio de 2026 se radicó un Proyecto de Ley de Competencias.',
    'El 31 de julio de 2026 se anunció que el proyecto será retirado para construir otro con mayor concertación.',
    'El texto específico está en discusión.'
  ];

  const BRIEFING_TIMELINE = [
    { label: 'Inicio', value: '29,5 %' },
    { label: 'Ronda 1', value: '32,8 %' },
    { label: 'Ronda 2', value: '36,2 %' },
    { label: 'Ronda 3', value: '39,5 %' }
  ];

  const app = document.getElementById('app');
  const state = createInitialState();
  let transitionLock = false;

  if (!app) {
    exposeDebugApi();
    return;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function formatPercent(value) {
    return `${value.toFixed(1).replace('.', ',')} %`;
  }

  function formatSigned(value) {
    return value > 0 ? `+${value}` : `${value}`;
  }

  function createInitialState() {
    return {
      screen: 'INTRO',
      currentRound: 0,
      sgp: 29.5,
      indicators: { ...INITIAL_INDICATORS },
      history: [],
      selectedDecisionId: null,
      lastConsequence: null,
      completed: false,
      finalOutcome: null,
      uiMessage: ''
    };
  }

  function getRound(roundNumber) {
    return ROUND_DATA.find((round) => round.round === roundNumber) || null;
  }

  function getDecisionById(roundNumber, decisionId) {
    const round = getRound(roundNumber);
    if (!round) {
      return null;
    }
    return round.options.find((option) => option.id === decisionId) || null;
  }

  function milestoneForRound(roundNumber) {
    return SGP_MILESTONES[clamp(roundNumber, 0, SGP_MILESTONES.length - 1)];
  }

  function buildIndicatorsMarkup(indicators, roundNumber) {
    const currentMilestone = milestoneForRound(roundNumber);
    const items = [
      {
        key: 'wellbeing',
        label: 'Bienestar',
        value: indicators.wellbeing,
        className: 'metric--positive',
        caption: 'Percepción y calidad de los servicios.',
        fill: indicators.wellbeing
      },
      {
        key: 'capacity',
        label: 'Capacidad institucional',
        value: indicators.capacity,
        className: 'metric--positive',
        caption: 'Personal, planeación, ejecución y control.',
        fill: indicators.capacity
      },
      {
        key: 'fiscalMargin',
        label: 'Margen fiscal',
        value: indicators.fiscalMargin,
        className: 'metric--warning',
        caption: 'Espacio para sostener gastos y responder a crisis.',
        fill: indicators.fiscalMargin
      },
      {
        key: 'competencyLoad',
        label: 'Carga de competencias',
        value: indicators.competencyLoad,
        className: 'metric--demand',
        caption: 'Demanda institucional que presiona la alcaldía.',
        fill: indicators.competencyLoad
      }
    ];

    return `
      <section class="metric-grid" aria-label="Indicadores de simulación">
        ${items.map((item) => `
          <article class="metric ${item.className}">
            <div class="metric__head">
              <span class="metric__label">${item.label}</span>
              <span class="metric__value">${item.value}</span>
            </div>
            <div class="metric__track" aria-hidden="true">
              <span class="metric__fill" style="--fill: ${item.fill}%"></span>
            </div>
            <p class="metric__caption">${item.caption}</p>
          </article>
        `).join('')}
      </section>
      <div class="summary-badge">SGP visible: ${formatPercent(currentMilestone.sgp)} · Carga objetivo ${currentMilestone.competencyLoad}</div>
    `;
  }

  function buildMainShell(content, activeLabel) {
    const roundLabel = activeLabel ? `<span class="badge">${activeLabel}</span>` : '';
    return `
      <div class="app-shell">
        <header class="masthead">
          <div class="brand-row">
            <div class="brand">
              <span class="brand__kicker">Simulación pedagógica</span>
              <span class="brand__name">Municipio al Límite</span>
            </div>
            ${roundLabel}
          </div>
        </header>
        ${content}
        <p id="status-message" class="sr-only" aria-live="polite" aria-atomic="true">${escapeHtml(state.uiMessage || '')}</p>
      </div>
    `;
  }

  function renderIntro() {
    const current = milestoneForRound(0);
    return buildMainShell(`
      <section class="hero">
        <article class="card hero__intro">
          <span class="eyebrow">12 años · 3 decisiones · 1 dilema</span>
          <h1 class="title">¿Qué pasa cuando llegan más recursos y crecen más rápido las responsabilidades?</h1>
          <p class="subtitle">Gobiernas una municipalidad ficticia durante tres rondas. No hay respuesta perfecta: cada opción mueve servicios, capacidad y margen de forma distinta.</p>
          <div class="chip-row" aria-label="Características del juego">
            <span class="chip">Español de Colombia</span>
            <span class="chip">Sin backend</span>
            <span class="chip">Determinista</span>
          </div>
        </article>
        <article class="hero__stat" aria-labelledby="sgp-main-title">
          <div class="stat-label">
            <span id="sgp-main-title">SGP de partida</span>
            <span>Hito inicial</span>
          </div>
          <div class="sgp-value" aria-label="Sistema General de Participaciones 29,5 por ciento">
            <span class="sgp-value__number">${formatPercent(current.sgp).replace(' %', '')}</span>
            <span class="sgp-value__suffix">%</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-track" aria-hidden="true">
              <span class="progress-fill" style="--fill: 0%"></span>
            </div>
            <div class="track-note">
              <span>Inicio de la transición</span>
              <span>Meta visual: 39,5 %</span>
            </div>
          </div>
        </article>
      </section>
      <section class="card step-card">
        <span class="eyebrow">Dilema central</span>
        <h2 class="step-card__title">Más plata no equivale automáticamente a más capacidad.</h2>
        <p class="step-card__text">El juego muestra cómo una decisión que mejora hoy puede elevar la presión institucional mañana.</p>
        <div class="action-row">
          <button class="btn btn--primary" type="button" data-action="start-game">Comenzar</button>
        </div>
      </section>
    `);
  }

  function renderBriefing() {
    return buildMainShell(`
      <section class="panel-grid">
        <article class="card summary">
          <span class="eyebrow">Contexto</span>
          <h2 class="summary__title">La transición del SGP y el Proyecto de Ley de Competencias</h2>
          <p class="summary__copy">El Acto Legislativo 03 de 2024 fijó una transición gradual del SGP hacia el 39,5 % de los ingresos corrientes de la Nación. La reforma establece una transición hacia el 39,5 %. El texto específico está en discusión.</p>
          <div class="summary__copy">
            ${BRIEFING_POINTS.map((point) => `<p>${escapeHtml(point)}</p>`).join('')}
          </div>
        </article>
        <article class="card">
          <div class="timeline" aria-label="Hitos de simulación del SGP">
            ${BRIEFING_TIMELINE.map((item, index) => `
              <div class="timeline__row">
                <strong>${item.label}</strong>
                <span class="timeline__arrow">${index < BRIEFING_TIMELINE.length - 1 ? '→' : '•'}</span>
                <span>${item.value}</span>
              </div>
            `).join('')}
          </div>
        </article>
      </section>
      <section class="card step-card">
        <span class="eyebrow">Lo que vas a hacer</span>
        <h2 class="step-card__title">Tomar tres decisiones y ver el costo visible de cada una.</h2>
        <p class="step-card__text">La partida empieza con 29,5 % de SGP visible y termina en 39,5 %. Entre medio, la carga de competencias sube más rápido que la capacidad si las decisiones no acompañan.</p>
        <div class="action-row">
          <button class="btn btn--primary" type="button" data-action="govern-municipio">Gobernar el municipio</button>
        </div>
      </section>
    `, 'BRIEFING');
  }

  function renderDecision() {
    const round = getRound(state.currentRound + 1);
    const currentMilestone = milestoneForRound(state.currentRound);
    const nextMilestone = milestoneForRound(state.currentRound + 1);

    return buildMainShell(`
      <section class="decision-shell">
        <article class="card">
          <div class="hero">
            <div class="hero__stat">
              <div class="stat-label">
                <span>Ronda ${round.round} de 3</span>
                <span>Hito actual</span>
              </div>
              <div class="sgp-value" aria-label="Sistema General de Participaciones ${formatPercent(state.sgp)}">
                <span class="sgp-value__number">${formatPercent(state.sgp).replace(' %', '')}</span>
                <span class="sgp-value__suffix">%</span>
              </div>
              <div class="progress-wrap">
                <div class="progress-track" aria-hidden="true">
                  <span class="progress-fill" style="--fill: ${(state.currentRound / 3) * 100}%"></span>
                </div>
                <div class="track-note">
                  <span>Después de la ronda ${state.currentRound}</span>
                  <span>Próximo hito ${formatPercent(nextMilestone.sgp)}</span>
                </div>
              </div>
            </div>
            <div class="hero__intro">
              <span class="round-tag">Decisión obligatoria</span>
              <h2 class="question">${escapeHtml(round.question)}</h2>
              <p class="question-copy">Selecciona una tarjeta y confirma. La decisión no se puede modificar después de aplicarla.</p>
            </div>
          </div>
        </article>

        <div class="panel-grid">
          <article class="surface">
            ${buildIndicatorsMarkup(state.indicators, state.currentRound)}
          </article>
          <article class="surface">
            <div class="decision-head">
              <span class="eyebrow">Opciones</span>
              <p class="question-copy">Cada alternativa tiene una ventaja y un costo. No hay respuesta perfecta.</p>
            </div>
            <div class="decision-list" role="list" aria-label="Opciones de la ronda">
              ${round.options.map((option, index) => `
                <button
                  class="decision-option"
                  type="button"
                  role="listitem"
                  data-action="select-decision"
                  data-decision-id="${option.id}"
                  aria-pressed="${state.selectedDecisionId === option.id ? 'true' : 'false'}"
                >
                  <div class="decision-option__top">
                    <span class="decision-option__title">${escapeHtml(option.title)}</span>
                    <span class="decision-option__mark">${String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div class="tradeoff">
                    <div class="tradeoff__line">
                      <span class="tradeoff__label">Beneficio</span>
                      <span>${escapeHtml(option.benefit)}</span>
                    </div>
                    <div class="tradeoff__line">
                      <span class="tradeoff__label">Costo</span>
                      <span>${escapeHtml(option.cost)}</span>
                    </div>
                  </div>
                </button>
              `).join('')}
            </div>
          </article>
        </div>

        <section class="card step-card">
          <div class="selection-hint">
            <span>${state.selectedDecisionId ? `Opción seleccionada: ${getSelectedTitle(round, state.selectedDecisionId)}` : 'Selecciona una opción para continuar.'}</span>
            <span>La siguiente pantalla mostrará la consecuencia.</span>
          </div>
          <div class="action-row">
            <button
              class="btn btn--primary"
              type="button"
              data-action="confirm-decision"
              ${state.selectedDecisionId ? '' : 'disabled'}
            >
              Confirmar decisión
            </button>
          </div>
          <p class="feedback ${state.uiMessage && state.uiMessage.startsWith('Selecciona') ? '' : 'feedback--positive'}" aria-hidden="true">${escapeHtml(state.uiMessage || '')}</p>
        </section>
      </section>
    `, `Ronda ${round.round} de 3`);
  }

  function renderConsequence() {
    const consequence = state.lastConsequence;
    const nextMilestone = milestoneForRound(state.currentRound);
    const continueLabel = state.currentRound === 3 ? 'Ver resultado' : 'Continuar';

    return buildMainShell(`
      <section class="consequence-shell">
        <article class="card consequence-card" aria-live="polite">
          <div class="consequence-head">
            <span class="eyebrow">Consecuencia visible</span>
            <h2 class="consequence-title">${escapeHtml(consequence.decisionTitle)}</h2>
            <p class="consequence-narrative">${escapeHtml(consequence.narrative)}</p>
          </div>
          <div class="delta-grid" aria-label="Cambios de indicadores">
            ${renderDelta('Bienestar', consequence.previous.indicators.wellbeing, consequence.next.indicators.wellbeing, consequence.changes.indicators.wellbeing)}
            ${renderDelta('Capacidad', consequence.previous.indicators.capacity, consequence.next.indicators.capacity, consequence.changes.indicators.capacity)}
            ${renderDelta('Margen fiscal', consequence.previous.indicators.fiscalMargin, consequence.next.indicators.fiscalMargin, consequence.changes.indicators.fiscalMargin)}
            ${renderDelta('Carga de competencias', consequence.previous.indicators.competencyLoad, consequence.next.indicators.competencyLoad, consequence.changes.indicators.competencyLoad)}
          </div>
          <div class="milestone-card">
            <div class="milestone-card__title">
              <span>Próximo hito</span>
              <span>${state.currentRound < 3 ? `Ronda ${state.currentRound + 1}` : 'Cierre'}</span>
            </div>
            <div class="milestone-card__value">${formatPercent(nextMilestone.sgp)}</div>
            <div class="track-note">
              <span>Carga de competencias</span>
              <span>${nextMilestone.competencyLoad}</span>
            </div>
          </div>
        </article>
        <article class="surface">
          <div class="summary">
            <span class="eyebrow">Lectura rápida</span>
            <h3 class="summary__title">${state.currentRound === 3 ? 'La partida ya cerró el ciclo' : 'La presión no desaparece; cambia de forma'}</h3>
            <p class="summary__copy">La decisión aplicada no se puede modificar. Lo siguiente es responder a la nueva presión institucional.</p>
          </div>
          <div class="action-row" style="margin-top: 14px;">
            <button class="btn btn--primary" type="button" data-action="advance-consequence">${continueLabel}</button>
          </div>
        </article>
      </section>
    `, 'CONSEQUENCE');
  }

  function renderFinal() {
    const outcome = state.finalOutcome || getOutcome(state);
    const pressure = Math.max(0, state.indicators.competencyLoad - state.indicators.capacity);

    return buildMainShell(`
      <section class="final-card">
        <article class="card final-card__intro">
          <span class="eyebrow">Perfil final</span>
          <div class="outcome-strip">
            <span class="outcome-strip__label">Resultado</span>
            <span class="outcome-strip__value ${outcomeClass(outcome.id)}">${escapeHtml(outcome.title)}</span>
          </div>
          <p class="summary__copy">${escapeHtml(outcome.interpretation)}</p>
        </article>
        <article class="card">
          <div class="summary-metrics">
            ${renderSummaryMetric('Bienestar', state.indicators.wellbeing, 'metric--positive')}
            ${renderSummaryMetric('Capacidad institucional', state.indicators.capacity, 'metric--positive')}
            ${renderSummaryMetric('Margen fiscal', state.indicators.fiscalMargin, 'metric--warning')}
            ${renderSummaryMetric('Carga de competencias', state.indicators.competencyLoad, 'metric--demand')}
          </div>
          <div class="final-card__pressure" style="margin-top: 14px;">
            <span class="label">Presión institucional final</span>
            <span class="value">${pressure}</span>
            <p>Se calcula como carga de competencias menos capacidad.</p>
          </div>
        </article>
        <article class="card final-card__law">
          <span class="eyebrow">Conexión con la Ley de Competencias</span>
          <p>${escapeHtml(outcome.connection)}</p>
          <p class="closing">La reforma puede mover más recursos hacia las regiones. La discusión decisiva es qué competencias se transfieren, cuánto cuesta ejercerlas y si existen capacidades y controles para hacerlo.</p>
        </article>
      </section>
      <div class="action-row" style="margin-top: 14px;">
        <button class="btn btn--primary" type="button" data-action="reset-game">Jugar otra vez</button>
      </div>
    `, 'FINAL');
  }

  function renderSummaryMetric(label, value, modifierClass) {
    return `
      <article class="metric ${modifierClass}">
        <div class="metric__head">
          <span class="metric__label">${label}</span>
          <span class="metric__value">${value}</span>
        </div>
        <div class="metric__track" aria-hidden="true">
          <span class="metric__fill" style="--fill: ${value}%"></span>
        </div>
      </article>
    `;
  }

  function renderDelta(label, before, after, change) {
    const directionClass = change > 0 ? 'delta__value--up' : change < 0 ? 'delta__value--down' : '';
    const fillClass = change > 0 ? 'delta__fill--positive' : change < 0 ? 'delta__fill--negative' : '';
    return `
      <article class="delta">
        <div class="delta__head">
          <span class="delta__label">${label}</span>
          <span class="delta__value ${directionClass}">${before} → ${after} (${formatSigned(change)})</span>
        </div>
        <div class="delta__bar" aria-hidden="true">
          <span class="delta__fill ${fillClass}" style="--fill: ${after}%"></span>
        </div>
      </article>
    `;
  }

  function outcomeClass(id) {
    if (id === 'descentralizacion_viable') return 'outcome-strip__value--positive';
    if (id === 'descentralizacion_inconclusa') return 'outcome-strip__value--warning';
    return 'outcome-strip__value--negative';
  }

  function getSelectedTitle(round, decisionId) {
    const selected = round.options.find((option) => option.id === decisionId);
    return selected ? selected.title : '';
  }

  function startGame(nextState) {
    if (nextState.screen !== 'INTRO') {
      throw new Error('startGame solo puede ejecutarse desde INTRO.');
    }
    return {
      ...nextState,
      screen: 'BRIEFING',
      uiMessage: 'Lee el contexto y continúa.'
    };
  }

  function selectDecision(nextState, decisionId) {
    if (nextState.screen !== 'DECISION') {
      throw new Error('Solo se puede seleccionar una decisión en la pantalla DECISION.');
    }
    const round = getRound(nextState.currentRound + 1);
    const decision = getDecisionById(nextState.currentRound + 1, decisionId);
    if (!round || !decision) {
      throw new Error(`La decisión ${decisionId} no pertenece a la ronda actual.`);
    }
    return {
      ...nextState,
      selectedDecisionId: decisionId,
      uiMessage: `Opción seleccionada: ${decision.title}.`
    };
  }

  function applyDecision(nextState, decisionId) {
    if (nextState.screen !== 'DECISION') {
      throw new Error('applyDecision solo puede ejecutarse desde DECISION.');
    }
    if (nextState.selectedDecisionId !== decisionId) {
      throw new Error('La decisión debe coincidir con la opción seleccionada.');
    }
    if (nextState.history.length >= 3 || nextState.currentRound >= 3) {
      throw new Error('No existen más de tres decisiones por partida.');
    }

    const roundNumber = nextState.currentRound + 1;
    const round = getRound(roundNumber);
    const decision = getDecisionById(roundNumber, decisionId);
    if (!round || !decision) {
      throw new Error(`La decisión ${decisionId} no pertenece a la ronda ${roundNumber}.`);
    }

    const milestone = milestoneForRound(roundNumber);
    const previousIndicators = { ...nextState.indicators };
    const nextIndicators = {
      wellbeing: clamp(previousIndicators.wellbeing + decision.effects.wellbeing, 0, 100),
      capacity: clamp(previousIndicators.capacity + decision.effects.capacity, 0, 100),
      fiscalMargin: clamp(previousIndicators.fiscalMargin + decision.effects.fiscalMargin, 0, 100),
      competencyLoad: clamp(milestone.competencyLoad, 0, 100)
    };

    const changes = {
      indicators: {
        wellbeing: nextIndicators.wellbeing - previousIndicators.wellbeing,
        capacity: nextIndicators.capacity - previousIndicators.capacity,
        fiscalMargin: nextIndicators.fiscalMargin - previousIndicators.fiscalMargin,
        competencyLoad: nextIndicators.competencyLoad - previousIndicators.competencyLoad
      }
    };

    const consequence = {
      decisionId,
      decisionTitle: decision.title,
      round: roundNumber,
      previous: {
        indicators: previousIndicators,
        sgp: nextState.sgp
      },
      next: {
        indicators: nextIndicators,
        sgp: milestone.sgp
      },
      changes,
      narrative: decision.narrative,
      nextHito: milestone
    };

    const historyEntry = {
      decisionId,
      round: roundNumber,
      decisionTitle: decision.title,
      previous: consequence.previous,
      next: consequence.next,
      changes,
      narrative: decision.narrative,
      nextHito: milestone
    };

    return {
      ...nextState,
      currentRound: roundNumber,
      sgp: milestone.sgp,
      indicators: nextIndicators,
      history: [...nextState.history, historyEntry],
      selectedDecisionId: decisionId,
      lastConsequence: consequence,
      completed: false,
      uiMessage: decision.narrative,
      screen: 'CONSEQUENCE'
    };
  }

  function advanceFromConsequence(nextState) {
    if (nextState.screen !== 'CONSEQUENCE') {
      throw new Error('advanceFromConsequence solo puede ejecutarse desde CONSEQUENCE.');
    }
    if (nextState.currentRound === 3) {
      const outcome = getOutcome(nextState);
      return {
        ...nextState,
        screen: 'FINAL',
        completed: true,
        selectedDecisionId: null,
        finalOutcome: outcome,
        uiMessage: outcome.title
      };
    }
    return {
      ...nextState,
      screen: 'DECISION',
      selectedDecisionId: null,
      uiMessage: `La ronda ${nextState.currentRound + 1} está lista.`
    };
  }

  function getOutcome(nextState) {
    const pressure = Math.max(0, nextState.indicators.competencyLoad - nextState.indicators.capacity);
    const { wellbeing, capacity, fiscalMargin } = nextState.indicators;

    if (fiscalMargin <= 24 || capacity <= 34 || pressure >= 50) {
      return OUTCOMES.municipio_al_limite;
    }

    if (wellbeing >= 60 && capacity >= 60 && fiscalMargin >= 40 && pressure <= 35) {
      return OUTCOMES.descentralizacion_viable;
    }

    if (wellbeing >= 70 && (capacity < 55 || fiscalMargin < 35)) {
      return OUTCOMES.bienestar_fragil;
    }

    if (capacity >= 65 && wellbeing < 60) {
      return OUTCOMES.capacidad_sin_resultados;
    }

    return OUTCOMES.descentralizacion_inconclusa;
  }

  function resetGame() {
    Object.assign(state, createInitialState());
    render();
  }

  function render() {
    const output = state.screen === 'INTRO'
      ? renderIntro()
      : state.screen === 'BRIEFING'
        ? renderBriefing()
        : state.screen === 'DECISION'
          ? renderDecision()
          : state.screen === 'CONSEQUENCE'
            ? renderConsequence()
            : renderFinal();

    app.innerHTML = output;
    app.focus({ preventScroll: true });
    updateDocumentTitle();
  }

  function updateDocumentTitle() {
    if (state.screen === 'FINAL' && state.finalOutcome) {
      document.title = `${state.finalOutcome.title} · Municipio al Límite`;
      return;
    }
    document.title = state.screen === 'BRIEFING'
      ? 'Briefing · Municipio al Límite'
      : state.screen === 'DECISION'
        ? `Ronda ${state.currentRound + 1} · Municipio al Límite`
        : state.screen === 'CONSEQUENCE'
          ? 'Consecuencia · Municipio al Límite'
          : 'Municipio al Límite';
  }

  function handleAction(event) {
    const button = event.target.closest('button[data-action]');
    if (!button || !app.contains(button)) {
      return;
    }

    const action = button.getAttribute('data-action');

    try {
      if (action === 'start-game') {
        Object.assign(state, startGame(state));
        render();
        return;
      }

      if (action === 'govern-municipio') {
        if (state.screen !== 'BRIEFING') {
          throw new Error('Solo se puede pasar a la ronda 1 desde BRIEFING.');
        }
        Object.assign(state, {
          ...state,
          screen: 'DECISION',
          uiMessage: 'Ronda 1 lista.'
        });
        render();
        return;
      }

      if (action === 'select-decision') {
        if (state.screen !== 'DECISION') {
          return;
        }
        const decisionId = button.getAttribute('data-decision-id');
        Object.assign(state, selectDecision(state, decisionId));
        render();
        return;
      }

      if (action === 'confirm-decision') {
        if (state.screen !== 'DECISION') {
          return;
        }
        if (!state.selectedDecisionId) {
          Object.assign(state, { ...state, uiMessage: 'Selecciona una opción antes de confirmar.' });
          render();
          return;
        }
        if (transitionLock) {
          return;
        }
        transitionLock = true;
        try {
          Object.assign(state, applyDecision(state, state.selectedDecisionId));
          render();
        } finally {
          transitionLock = false;
        }
        return;
      }

      if (action === 'advance-consequence') {
        if (state.screen !== 'CONSEQUENCE') {
          return;
        }
        Object.assign(state, advanceFromConsequence(state));
        render();
        return;
      }

      if (action === 'reset-game') {
        resetGame();
      }
    } catch (error) {
      state.uiMessage = error instanceof Error ? error.message : 'No se pudo completar la acción.';
      render();
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function exposeDebugApi() {
    if (typeof window === 'undefined') {
      return;
    }
    window.__MUNICIPIO_AL_LIMITE__ = {
      clamp,
      createInitialState,
      startGame,
      selectDecision,
      applyDecision,
      advanceFromConsequence,
      getOutcome,
      resetGame,
      render,
      ROUND_DATA,
      SGP_MILESTONES,
      OUTCOMES
    };
  }

  app.addEventListener('click', handleAction);
  exposeDebugApi();
  render();
})();
