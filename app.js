

// =============================================================================

// THEME SWITCHER (DARK MODE / LIGHT MODE)

// =============================================================================

function applyTheme(isDark) {

  const target = isDark ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', target);

  if (isDark) {

    document.documentElement.classList.add('dark-theme');

    if (document.body) {

      document.body.setAttribute('data-theme', 'dark');

      document.body.classList.add('dark-theme');

    }

  } else {

    document.documentElement.classList.remove('dark-theme');

    if (document.body) {

      document.body.setAttribute('data-theme', 'light');

      document.body.classList.remove('dark-theme');

    }

  }

}

function initTheme() {

  let saved = null;

  try {

    saved = localStorage.getItem('algo_theme');

  } catch(e) {}

  applyTheme(saved === 'dark');

}

window.toggleTheme = function() {

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||

                 document.documentElement.classList.contains('dark-theme');

  const nextIsDark = !isDark;

  applyTheme(nextIsDark);

  try {

    localStorage.setItem('algo_theme', nextIsDark ? 'dark' : 'light');

  } catch(e) {}

  

  try {

    if (window.monsterCompanion && typeof window.monsterCompanion.say === 'function') {

      if (nextIsDark) {

        window.monsterCompanion.say('Dark mode engaged! Midnight carbon mode activated! 🌙', 'happy');

      } else {

        window.monsterCompanion.say('Original light mode restored! Crisp paper aesthetics! ☀️', 'happy');

      }

    }

  } catch(e) {}

};

initTheme();

document.addEventListener('DOMContentLoaded', initTheme);

/**

 * ALGØ STUDIO — Modern Learning Experience

 * Inspired by DataCamp & Minimal Scandinavian Aesthetics

 */

// Application State

let currentView = 'home';

let currentChapterId = null;

let currentLessonId = null;

let completedLessons = JSON.parse(localStorage.getItem('algo_completed_lessons') || '[]');

// Quiz State (Persisted in localStorage with zero accounts needed)

let currentQuizCategory = 'all';

let userQuizAnswers = JSON.parse(localStorage.getItem('algo_quiz_answers') || '{}');

let quizScore = 0;

function computeQuizScore() {

  quizScore = Object.entries(userQuizAnswers).reduce((acc, [qid, ans]) => {

    const q = CURRICULUM_DATA.quizQuestions.find(item => item.id === Number(qid));

    return q && ans === q.ans ? acc + 1 : acc;

  }, 0);

}

computeQuizScore();

// Card animations cleanly removed per minimalist design

// Initialize on DOM Ready

document.addEventListener('DOMContentLoaded', () => {

  renderTrack();

  updateProgressUI();

  initQuiz();

  renderSortBars();

  renderBinarySearchTrack();

  initPinnedWoonpactTimeline();

  // Handle URL hash if any

  const hash = window.location.hash.replace('#', '');

  if (['home', 'track', 'visualizer', 'quiz', 'exams'].includes(hash)) {

    navigateTo(hash);

  } else if (hash.startsWith('lesson-')) {

    openLesson(hash.replace('lesson-', ''));

  } else {

    navigateTo('home');

  }

});

// Navigation Router

window.navigateTo = function(viewName, options = {}) {

  currentView = viewName;

  window.location.hash = viewName;

  // Deactivate all view panels

  document.querySelectorAll('.view-panel').forEach(el => {

    el.classList.remove('active');

  });

  // Activate target view panel

  const targetView = document.getElementById(`view-${viewName}`);

  if (targetView) {

    targetView.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  // Close slide-out drawer on navigation

  closeDrawer();

  // Highlight active drawer buttons and mobile bottom nav

  document.querySelectorAll('.drawer-link-btn').forEach(btn => {

    btn.classList.remove('active');

  });

  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {

    btn.classList.remove('active');

  });

  const activeMobBtn = document.getElementById(`mob-nav-${viewName}`);

  if (activeMobBtn) activeMobBtn.classList.add('active');

  if (viewName === 'track') {

    renderTrack();

    updateProgressUI();

  } else if (viewName === 'visualizer') {

    renderSortBars();

    renderBinarySearchTrack();

  } else if (viewName === 'quiz') {

    updateQuizDashboard();

    renderQuizPalette();

    renderQuizQuestions();

  } else if (viewName === 'exams') {

    if (typeof initDataCampWorkspace === 'function') {

      initDataCampWorkspace();

    }

  }

  // Reactive monster companion voice on navigation

  if (window.monsterCompanion) {

    window.monsterCompanion.react('nav', { view: viewName });

  }

};

// =============================================================================

// PLAYFUL 3D FELT MONSTER COMPANION ("Byte")

// =============================================================================

function getMascotSvgHtml() {

  return `

    <div class="mascot-felt-icon" style="width:48px; height:48px; background:linear-gradient(135deg, #c84b31, #f6c83b); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.6rem; box-shadow:0 3px 8px rgba(0,0,0,0.12); cursor:pointer; border:2px solid #181716;" title="Click to summon Byte!">

      🧶

    </div>

  `;

}

const LESSON_TIPS = {

  'l1-1': "Remember Donald Knuth's 5 pillars: Finiteness, Definiteness, Input, Output, and Effectiveness!",

  'l1-2': "Variables must start with a letter or underscore. Reserved keywords like 'For' or 'Begin' are strictly forbidden as names!",

  'l1-3': "Use Float for real decimals and Integer for exact whole counts in Z. Don't mix them up without explicit conversion!",

  'l1-4': "Normal division '/' returns a real float; DIV gives the whole integer quotient, and MOD gives the remainder!",

  'l1-5': "Trace tables are your secret weapon in exams: write a column for every variable and step through code line-by-line.",

  'l2-1': "In If-Else, the Else branch is optional. Conditions must evaluate to a strict Boolean truth value (True or False).",

  'l2-2': "Switch (Selon) statements shine when comparing one variable against discrete constants (like 1, 2, 3 or 'A', 'B').",

  'l2-3': "Boolean operator priority: NOT (Non) evaluates first, then AND (Et), and finally OR (Ou).",

  'l3-1': "Use a For (Pour) loop when the exact iteration count is known before the loop starts — it steps automatically!",

  'l3-2': "While (Tant que) tests its condition at the entry gate: if false from the start, the loop body runs zero times!",

  'l3-3': "Repeat-Until (Répéter-Jusqu'à) tests at the exit gate: it is guaranteed to execute at least once!",

  'l3-4': "Watch out for off-by-one errors! Count your fence posts: from i = 1 to N has exactly N iterations.",

  'l4-1': "USTHB arrays are contiguous memory blocks. Unless specified otherwise, algorithmic indexing runs from 1 to N.",

  'l4-2': "When calculating sums or averages, always initialize your accumulator S ← 0 before starting the loop!",

  'l4-3': "Linear search has worst-case O(N). Always break early with a boolean flag as soon as your item is found!",

  'l4-4': "Strings are ordered arrays of characters. Converting case is easy: lowercase = uppercase + 32 in ASCII!",

  'l4-5': "Palindrome tests compare symmetric pairs: T[i] with T[N - i + 1] moving inwards from both ends.",

  'l5-1': "In a 2D Matrix M[N, M], i represents the row (1..N) and j represents the column (1..M). Use nested loops!",

  'l5-2': "The main diagonal is defined strictly by i = j. The anti-diagonal is defined by i + j = N + 1!",

  'l5-3': "A matrix is symmetric if and only if M[i, j] = M[j, i] for every cell across the main diagonal.",

  'l5-4': "For matrix multiplication A × B, the number of columns in A must equal the number of rows in B!",

  'l6-1': "Selection Sort searches for the smallest remaining element and swaps it to the front. O(N²) time.",

  'l6-2': "Bubble Sort pushes larger values rightward. Add a boolean flag to stop in O(N) if the array is already sorted!",

  'l6-3': "Binary Search works ONLY on sorted arrays! It halves the search space at every step: blazing O(log₂ N) speed!",

  'l7-1': "A Function computes and returns a single value; a Procedure executes operations without returning a direct value.",

  'l7-2': "Pass-by-value copies variable contents: changes made inside the routine will never touch the caller's variables!",

  'l7-3': "Local variables are born when their function is called and vanish from the stack as soon as the function returns!",

  'l8-1': "The Equilibrium Index compares the prefix sum to suffix sum in O(N) time without nested recalculations.",

  'l8-2': "The 3-Reversal theorem rotates an array in O(N) time and O(1) space: reverse(0,k-1), reverse(k,N-1), reverse(0,N-1)!"

};

function getLessonTip(lessonId) {

  return LESSON_TIPS[lessonId] || "Take your time to understand the flow. Tracing code on paper always reveals how it works!";

}

// =============================================================================

// TRACK & LESSON ENGINE (DataCamp Style)

// =============================================================================

function updateProgressUI() {

  const totalLessons = CURRICULUM_DATA.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);

  const doneCount = completedLessons.length;

  const pct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;

  const barFill = document.getElementById('track-progress-fill');

  const barText = document.getElementById('track-progress-text');

  const metricPct = document.getElementById('track-metric-pct');

  const mascotSpeech = document.getElementById('track-mascot-speech');

  if (barFill) barFill.style.width = `${pct}%`;

  if (barText) barText.innerText = `${doneCount} of ${totalLessons} Lessons Mastered`;

  if (metricPct) metricPct.innerText = `${pct}%`;

  if (mascotSpeech) {

    if (doneCount === 0) {

      mascotSpeech.innerHTML = `<strong>Hi there! I'm Byte, your Algo 1 companion ✨</strong><br>Welcome to USTHB Algorithms 1! Let's take it one simple lesson at a time. Pick Chapter 1 to start!`;

    } else if (doneCount <= 5) {

      mascotSpeech.innerHTML = `<strong>Great start! ${doneCount} lessons completed! 🚀</strong><br>You're building solid foundations with variables and trace tables. Keep that energy!`;

    } else if (doneCount <= 13) {

      mascotSpeech.innerHTML = `<strong>Making awesome progress! ${doneCount}/${totalLessons} done! 💪</strong><br>Conditionals and loops are turning into second nature. You're thinking like a computer scientist!`;

    } else if (doneCount <= 22) {

      mascotSpeech.innerHTML = `<strong>Over halfway through! ${doneCount}/${totalLessons} mastered! 🧠</strong><br>Arrays, matrices, and sorting algorithms are looking super clean! Almost at the finish line!`;

    } else {

      mascotSpeech.innerHTML = `<strong>ALL 26 LESSONS COMPLETED! 🎉🏆</strong><br>Incredible job! You're ready to crush the 50-Question Quiz and the Exam Challenges!`;

    }

  }

}

function getContrastColor(hexColor) {

  if (!hexColor) return '#181716';

  const hex = hexColor.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16) || 0;

  const g = parseInt(hex.substring(2, 4), 16) || 0;

  const b = parseInt(hex.substring(4, 6), 16) || 0;

  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  return (yiq >= 150) ? '#181716' : '#ffffff';

}

function renderTrack() {

  const container = document.getElementById('chapters-list-container');

  if (!container) return;

  container.innerHTML = CURRICULUM_DATA.chapters.map(ch => {

    const totalInChapter = ch.lessons.length;

    const completedInChapter = ch.lessons.filter(l => completedLessons.includes(l.id)).length;

    const isAllDone = completedInChapter === totalInChapter && totalInChapter > 0;

    const badgeTextColor = getContrastColor(ch.badgeColor);

    const lessonsHtml = ch.lessons.map((l, idx) => {

      const isDone = completedLessons.includes(l.id);

      const stepNum = String(idx + 1).padStart(2, '0');

      return `

        <div class="lesson-row-item ${isDone ? 'is-completed' : ''}" onclick="openLesson('${l.id}')">

          <div class="lesson-row-left">

            <span class="lesson-step-num">${stepNum}</span>

            <div class="lesson-status-icon ${isDone ? 'completed' : ''}">

              ${isDone ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}

            </div>

            <div class="lesson-title-meta">

              <span class="lesson-title-text">${l.title}</span>

            </div>

          </div>

          <div class="lesson-row-right">

            <span class="lesson-duration-badge">

              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:3px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

              ${l.duration}

            </span>

            <button class="lesson-action-pill ${isDone ? 'done' : ''}" onclick="event.stopPropagation(); openLesson('${l.id}')">

              ${isDone ? 'Completed ✓' : 'Start Lesson &rarr;'}

            </button>

          </div>

        </div>

      `;

    }).join('');

    return `

      <div class="chapter-accordion-card open" id="ch-card-${ch.id}" data-chapter-id="${ch.id}">

        <div class="chapter-card-header" onclick="toggleChapterAccordion('${ch.id}')">

          <div class="chapter-header-left">

            <div class="chapter-code-badge" style="background-color: ${ch.badgeColor}; color: ${badgeTextColor};">

              CH 0${ch.num}

            </div>

            <div class="chapter-info">

              <div class="chapter-title-row">

                <h3>${ch.title}</h3>

                <span class="chapter-week-pill">${ch.week}</span>

              </div>

              <p>${ch.desc}</p>

            </div>

          </div>

          <div class="chapter-header-right">

            <span class="chapter-completion-badge ${isAllDone ? 'mastered' : ''}">

              ${isAllDone ? '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; margin-right:3px;"><polyline points="20 6 9 17 4 12"/></svg> Mastered' : `${completedInChapter} / ${totalInChapter} Completed`}

            </span>

            <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">

              <polyline points="6 9 12 15 18 9"></polyline>

            </svg>

          </div>

        </div>

        <div class="chapter-lessons-drawer">

          <div class="lessons-grid">

            ${lessonsHtml}

          </div>

        </div>

      </div>

    `;

  }).join('');

}

window.filterChapterTab = function(chapterId, btn) {

  document.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));

  if (btn) btn.classList.add('active');

  const container = document.getElementById('chapters-list-container');

  if (!container) return;

  const cards = container.querySelectorAll('.chapter-accordion-card');

  cards.forEach(card => {

    const cardCh = card.getAttribute('data-chapter-id');

    if (chapterId === 'all' || cardCh === chapterId) {

      card.style.display = 'block';

    } else {

      card.style.display = 'none';

    }

  });

  if (chapterId !== 'all') {

    const targetCard = document.getElementById(`ch-card-${chapterId}`);

    if (targetCard) {

      targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const drawer = targetCard.querySelector('.chapter-lessons-drawer');

      if (drawer && !targetCard.classList.contains('open')) {

        targetCard.classList.add('open');

      }

    }

  }

};

window.toggleChapterAccordion = function(chId) {

  const card = document.getElementById(`ch-card-${chId}`);

  if (card) {

    card.classList.toggle('open');

  }

};

window.copyCode = function(button) {

  const codeElem = button.closest('.terminal-code-window, .code-box')?.querySelector('code');

  if (codeElem) {

    navigator.clipboard.writeText(codeElem.innerText).then(() => {

      const orig = button.innerHTML;

      button.innerHTML = '<span style="color:#10b981; font-weight:700;">Copied! ✓</span>';

      setTimeout(() => {

        button.innerHTML = orig;

      }, 1600);

    });

  }

};

window.openLesson = function(lessonId) {

  let targetChapter = null;

  let targetLesson = null;

  for (const ch of CURRICULUM_DATA.chapters) {

    const found = ch.lessons.find(l => l.id === lessonId);

    if (found) {

      targetChapter = ch;

      targetLesson = found;

      break;

    }

  }

  if (!targetChapter || !targetLesson) return;

  currentChapterId = targetChapter.id;

  currentLessonId = targetLesson.id;

  // Switch to lesson view

  navigateTo('lesson');

  // Render Sidebar

  const sidebar = document.getElementById('lesson-sidebar-lessons');

  if (sidebar) {

    sidebar.innerHTML = `

      <h4 class="sidebar-chapter-title">${targetChapter.title}</h4>

      <div class="sidebar-lessons-nav">

        ${targetChapter.lessons.map(l => {

          const isDone = completedLessons.includes(l.id);

          const isActive = l.id === lessonId;

          return `

            <button class="sidebar-lesson-link ${isActive ? 'active' : ''}" onclick="openLesson('${l.id}')">

              <span class="lesson-status-icon ${isDone ? 'completed' : ''}">${isDone ? '&#10003;' : ''}</span>

              <span>${l.title}</span>

            </button>

          `;

        }).join('')}

      </div>

      

      <!-- Mini Mascot Widget at bottom of sidebar -->

      <div style="margin-top:auto; padding-top:2rem; display:flex; align-items:center; gap:0.8rem;">

        <div style="width:42px; height:42px; flex-shrink:0;">

          ${getMascotSvgHtml()}

        </div>

        <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.35;">

          <strong>Byte says:</strong> One lesson at a time! ✨

        </div>

      </div>

    `;

  }

  // Find next and prev lessons

  const allLessons = [];

  CURRICULUM_DATA.chapters.forEach(c => allLessons.push(...c.lessons));

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Render Main Content

  const mainPane = document.getElementById('lesson-main-content');

  if (mainPane) {

    const isCompleted = completedLessons.includes(targetLesson.id);

    // Pedagogical Bridge to Next Lesson

    let bridgeHtml = '';

    if (targetLesson.bridge) {

      bridgeHtml = `

        <div class="pedagogical-bridge-card">

          <div class="bridge-card-header">

            <span class="bridge-badge">🌉 Pedagogical Bridge</span>

            <span class="bridge-tag">Why this unlocks the next lesson</span>

          </div>

          <p class="bridge-card-text">${targetLesson.bridge}</p>

        </div>

      `;

    }

    // Multiple Progressive Micro-Exercises

    let microHtml = '';

    const exList = targetLesson.exercises || (targetLesson.exercise ? [targetLesson.exercise] : []);

    const checkpointMeta = [

      { tag: 'Checkpoint 1 • Core Concept', desc: 'Foundational Logic & Syntax' },

      { tag: 'Checkpoint 2 • Code Trace & Output', desc: 'Dry-Run State Prediction' },

      { tag: 'Checkpoint 3 • Exam Challenge & Bridge', desc: 'Edge Cases & University Applications' }

    ];

    if (exList.length > 0) {

      microHtml = `

        <div class="lesson-checkpoints-section">

          <div class="section-divider-title">

            <span>Interactive Checkpoints (${exList.length} Progressive Challenges)</span>

          </div>

          ${exList.map((ex, exIdx) => {

            const meta = checkpointMeta[exIdx] || { tag: `Checkpoint ${exIdx + 1} • Advanced Exercise`, desc: 'Deep Algorithmic Thinking' };

            return `

            <div class="lesson-micro-exercise" id="lesson-ex-card-${exIdx}">

              <div class="micro-exercise-header">

                <span class="micro-tag">${meta.tag}</span>

                <span style="font-size:0.85rem; font-weight:700; color:var(--text-muted);">${meta.desc}</span>

              </div>

              <h4 class="micro-q-title">${ex.question}</h4>

              <div class="micro-options-grid">

                ${ex.options.map((opt, optIdx) => `

                  <button class="micro-option-btn" id="micro-opt-${exIdx}-${optIdx}" onclick="checkMultiMicroExercise(${exIdx}, ${optIdx}, ${ex.ans})">

                    <span style="width:20px; font-weight:800; font-family:var(--font-mono);">${['A','B','C','D'][optIdx]}.</span>

                    <span>${opt}</span>

                  </button>

                `).join('')}

              </div>

              <div class="micro-explanation-box" id="micro-exp-box-${exIdx}">

                <strong>Rationale:</strong> ${ex.exp}

              </div>

            </div>

            `;

          }).join('')}

        </div>

      `;

    }

    mainPane.innerHTML = `

      <div class="lesson-breadcrumbs">

        <span onclick="navigateTo('track')" style="cursor:pointer; text-decoration:underline; font-weight:700;">Algo 1 Track</span> &bull; 

        <span onclick="openChapterDirectly('${targetChapter.id}')" style="cursor:pointer; text-decoration:underline; font-weight:700;">${targetChapter.title}</span> &bull; 

        <span>${targetLesson.title}</span>

      </div>

      <h2 class="lesson-main-title">${targetLesson.title}</h2>



      <div class="lesson-body-prose">

        ${targetLesson.content}

      </div>

      <!-- Modern 21st.dev Terminal Code Window -->

      <div class="terminal-code-window">

        <div class="terminal-titlebar">

          <div class="terminal-dots">

            <span class="dot dot-red"></span>

            <span class="dot dot-yellow"></span>

            <span class="dot dot-green"></span>

          </div>

          <div class="terminal-tab">

            <span class="terminal-tab-icon">📄</span>

            <span>algorithm_${targetLesson.id}.alg</span>

            <span class="terminal-lang-tag">USTHB Pseudocode</span>

          </div>

          <div class="terminal-actions">

            <button class="btn-copy-code" onclick="copyCode(this)" title="Copy algorithm pseudocode">

              <span class="copy-icon">📋</span>

              <span class="copy-label">Copy Code</span>

            </button>

          </div>

        </div>

        <pre class="terminal-pre"><code>${targetLesson.code}</code></pre>

      </div>

      ${bridgeHtml}

${microHtml}

      <div class="lesson-footer-nav">

        <div>

          ${prevLesson ? `<button class="btn-lesson-nav" onclick="openLesson('${prevLesson.id}')">&larr; Previous</button>` : ''}

        </div>

        <button class="btn-lesson-nav ${isCompleted ? 'btn-lesson-complete' : ''}" onclick="toggleLessonComplete('${targetLesson.id}')">

          ${isCompleted ? '&#10003; Completed' : 'Mark as Complete'}

        </button>

        <div>

          ${nextLesson ? `<button class="btn-lesson-nav" onclick="openLesson('${nextLesson.id}')">Next Lesson &rarr;</button>` : ''}

        </div>

      </div>

    `;

  }

  // Byte speaks the companion insight tip directly upon opening the lesson
  if (window.monsterCompanion) {
    const tip = getLessonTip(targetLesson.id);
    window.monsterCompanion.say(tip, 'happy');
  }

};

window.checkMultiMicroExercise = function(exIdx, selectedIdx, correctIdx) {

  const card = document.getElementById(`lesson-ex-card-${exIdx}`);

  if (!card) return;

  const options = card.querySelectorAll('.micro-option-btn');

  options.forEach((btn, idx) => {

    btn.disabled = true;

    if (idx === correctIdx) {

      btn.classList.add('selected-correct');

    } else if (idx === selectedIdx) {

      btn.classList.add('selected-incorrect');

    }

  });

  const isCorrect = selectedIdx === correctIdx;

  const expBox = document.getElementById(`micro-exp-box-${exIdx}`);

  if (expBox) {

    expBox.classList.add('show');

    if (isCorrect) {

      expBox.innerHTML = `<div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.6rem; font-weight:800; font-size:0.95rem;" class="micro-exp-success-title"><span>🎉</span> Spot on! Byte is proud of your reasoning!</div>` + expBox.innerHTML;

    }

  }

  if (window.monsterCompanion) {

    if (isCorrect) {

      window.monsterCompanion.react('correct');

    } else {

      window.monsterCompanion.react('wrong');

    }

  }

};

window.checkMicroExercise = function(selectedIdx, correctIdx) {

  const options = document.querySelectorAll('.micro-option-btn');

  options.forEach((btn, idx) => {

    btn.disabled = true;

    if (idx === correctIdx) {

      btn.classList.add('selected-correct');

    } else if (idx === selectedIdx) {

      btn.classList.add('selected-incorrect');

    }

  });

  const isCorrect = selectedIdx === correctIdx;

  const expBox = document.getElementById('micro-exp-box');

  if (expBox) {

    expBox.classList.add('show');

    if (isCorrect) {

      expBox.innerHTML = `<div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.6rem; color:#065f46; font-weight:800; font-size:1rem;"><span>🎉</span> Spot on! Byte is proud of you!</div>` + expBox.innerHTML;

    }

  }

  // Reactive 3D felt monster companion reaction

  if (window.monsterCompanion) {

    if (isCorrect) {

      window.monsterCompanion.react('correct');

    } else {

      window.monsterCompanion.react('wrong');

    }

  }

};

window.toggleLessonComplete = function(lessonId) {

  const wasComplete = completedLessons.includes(lessonId);

  if (wasComplete) {

    completedLessons = completedLessons.filter(id => id !== lessonId);

  } else {

    completedLessons.push(lessonId);

    if (window.monsterCompanion) {

      window.monsterCompanion.react('complete');

    }

  }

  localStorage.setItem('algo_completed_lessons', JSON.stringify(completedLessons));

  updateProgressUI();

  openLesson(lessonId);

};

// =============================================================================

// INTERACTIVE VISUALIZERS (Selection Sort, Bubble Sort, Binary Search)

// =============================================================================

let sortArray = [29, 10, 14, 37, 5, 42, 19];

let isSorting = false;

let sortSpeed = 350;

window.setSortSpeed = function(speedMs, mode) {

  sortSpeed = speedMs;

  document.querySelectorAll('#speed-slow, #speed-norm, #speed-fast').forEach(b => b.classList.remove('active'));

  const btn = document.getElementById(`speed-${mode}`);

  if (btn) btn.classList.add('active');

};

window.loadSortPreset = function(arr) {

  if (isSorting) return;

  sortArray = [...arr];

  const input = document.getElementById('sort-custom-input');

  if (input) input.value = arr.join(', ');

  renderSortBars();

  logVizMessage(`Loaded preset: [ ${arr.join(', ')} ]. Ready to run Selection Sort or Bubble Sort!`);

};

window.setBsTarget = function(val) {

  const input = document.getElementById('bs-target-input');

  if (input) input.value = val;

  runBinarySearchViz();

};

window.resetSortArray = function() {

  if (isSorting) return;

  const rawInput = document.getElementById('sort-custom-input');

  if (rawInput && rawInput.value.trim() !== '') {

    const parsed = rawInput.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

    if (parsed.length >= 3 && parsed.length <= 15) sortArray = parsed;

    else { alert('Please enter 3 to 15 comma-separated integers.'); return; }

  } else {

    sortArray = [29, 10, 14, 37, 5, 42, 19];

  }

  renderSortBars();

  logVizMessage('Array reset. Ready to run Selection Sort or Bubble Sort.');

};

function renderSortBars(highlights = {}) {

  const stage = document.getElementById('sort-stage');

  if (!stage) return;

  const maxVal = Math.max(...sortArray, 1);

  stage.innerHTML = sortArray.map((val, idx) => {

    let cls = '';

    if (highlights.sorted && highlights.sorted.includes(idx)) cls = 'sorted';

    if (highlights.comparing && highlights.comparing.includes(idx)) cls = 'comparing';

    if (highlights.swapping && highlights.swapping.includes(idx)) cls = 'swapping';

    if (highlights.minimum === idx) cls = 'minimum';

    const h = Math.max(30, Math.round((val / maxVal) * 160));

    return `

      <div class="array-bar-col">

        <div class="array-bar ${cls}" style="height:${h}px;">${val}</div>

        <span style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-muted);">T[${idx+1}]</span>

      </div>

    `;

  }).join('');

}

function logVizMessage(msg) {

  const out = document.getElementById('sort-log-output');

  if (out) out.innerHTML = msg;

}

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

window.runSelectionSortViz = async function() {

  if (isSorting) return;

  isSorting = true;

  if (window.monsterCompanion) window.monsterCompanion.react('sorting');

  const n = sortArray.length;

  logVizMessage('Selection Sort: Scanning for minimum in unsorted segment...');

  const sorted = [];

  for (let i = 0; i < n - 1; i++) {

    let minIdx = i;

    renderSortBars({ comparing: [i], minimum: minIdx, sorted: [...sorted] });

    logVizMessage(`Pass i = ${i + 1}: Initial min T[${i + 1}] = ${sortArray[i]}`);

    await sleep(sortSpeed);

    for (let j = i + 1; j < n; j++) {

      renderSortBars({ comparing: [j], minimum: minIdx, sorted: [...sorted] });

      await sleep(sortSpeed / 1.5);

      if (sortArray[j] < sortArray[minIdx]) {

        minIdx = j;

        renderSortBars({ minimum: minIdx, sorted: [...sorted] });

        logVizMessage(`New min found at T[${minIdx + 1}] = ${sortArray[minIdx]}`);

        await sleep(sortSpeed / 2);

      }

    }

    if (minIdx !== i) {

      renderSortBars({ swapping: [i, minIdx], sorted: [...sorted] });

      logVizMessage(`Swapping T[${i + 1}] and T[${minIdx + 1}]...`);

      await sleep(sortSpeed);

      const temp = sortArray[i];

      sortArray[i] = sortArray[minIdx];

      sortArray[minIdx] = temp;

    }

    sorted.push(i);

    renderSortBars({ sorted: [...sorted] });

    await sleep(sortSpeed / 2);

  }

  sorted.push(n - 1);

  renderSortBars({ sorted });

  logVizMessage('Selection Sort Complete! Array is sorted.');

  isSorting = false;

  if (window.monsterCompanion) {

    window.monsterCompanion.say('Selection Sort Complete! Look how cleanly the elements are ordered! ✨', 'happy');

  }

};

window.runBubbleSortViz = async function() {

  if (isSorting) return;

  isSorting = true;

  if (window.monsterCompanion) window.monsterCompanion.react('sorting');

  const n = sortArray.length;

  logVizMessage('Bubble Sort: Comparing adjacent pairs and bubbling largest to end...');

  const sorted = [];

  for (let i = 0; i < n - 1; i++) {

    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {

      renderSortBars({ comparing: [j, j + 1], sorted: [...sorted] });

      await sleep(sortSpeed);

      if (sortArray[j] > sortArray[j + 1]) {

        renderSortBars({ swapping: [j, j + 1], sorted: [...sorted] });

        logVizMessage(`Swapping T[${j + 1}] (${sortArray[j]}) and T[${j + 2}] (${sortArray[j + 1]})...`);

        await sleep(sortSpeed);

        const temp = sortArray[j];

        sortArray[j] = sortArray[j + 1];

        sortArray[j + 1] = temp;

        swapped = true;

      }

    }

    sorted.unshift(n - 1 - i);

    renderSortBars({ sorted: [...sorted] });

    if (!swapped) {

      logVizMessage('Optimized stop: Zero swaps in pass, array already sorted!');

      break;

    }

  }

  for (let k = 0; k < n; k++) sorted.push(k);

  renderSortBars({ sorted });

  logVizMessage('Bubble Sort Complete!');

  isSorting = false;

  if (window.monsterCompanion) {

    window.monsterCompanion.say('Bubble Sort finished! The heaviest elements floated right to the end! 🫧', 'happy');

  }

};

// Binary Search Visualizer

const bsArray = [3, 8, 12, 17, 24, 35, 42, 56, 68, 77, 89, 95];

function renderBinarySearchTrack(left = 0, right = bsArray.length - 1, mid = -1, foundIdx = -1) {

  const container = document.getElementById('bs-cells-container');

  if (!container) return;

  container.innerHTML = bsArray.map((val, idx) => {

    let cls = 'bs-cell';

    if (idx === foundIdx) cls += ' found';

    else if (idx === mid) cls += ' mid-point';

    else if (idx >= left && idx <= right) cls += ' in-range';

    else cls += ' eliminated';

    return `<div class="${cls}"><span class="bs-idx">T[${idx + 1}]</span>${val}</div>`;

  }).join('');

}

window.runBinarySearchViz = async function() {

  const target = parseInt(document.getElementById('bs-target-input').value || 42);

  const logElem = document.getElementById('bs-log-output');

  if (isNaN(target)) return;

  if (window.monsterCompanion) window.monsterCompanion.react('search');

  let left = 0;

  let right = bsArray.length - 1;

  let found = false;

  let steps = 0;

  logElem.innerHTML = `Searching for Target = <strong>${target}</strong> in sorted array...<br>`;

  while (left <= right) {

    steps++;

    const mid = Math.floor((left + right) / 2);

    renderBinarySearchTrack(left, right, mid);

    logElem.innerHTML += `Step ${steps}: Interval [T[${left + 1}]..T[${right + 1}]], Mid = T[${mid + 1}] (${bsArray[mid]})<br>`;

    await sleep(700);

    if (bsArray[mid] === target) {

      renderBinarySearchTrack(left, right, -1, mid);

      logElem.innerHTML += `<strong style="color:#2e7d32;">&#10004; Target ${target} FOUND at Index T[${mid + 1}]!</strong>`;

      found = true;

      if (window.monsterCompanion) window.monsterCompanion.react('correct');

      break;

    } else if (bsArray[mid] < target) {

      left = mid + 1;

    } else {

      right = mid - 1;

    }

    await sleep(700);

  }

  if (!found) {

    renderBinarySearchTrack(-1, -1, -1);

    logElem.innerHTML += `<strong style="color:#c84b31;">&#10008; Target ${target} NOT found.</strong>`;

    if (window.monsterCompanion) {

      window.monsterCompanion.say(`Target ${target} was not in the array! The search interval collapsed! 🔍`, 'wrong');

    }

  }

};

// =============================================================================

// QUIZ ENGINE (50 Questions)

// =============================================================================

function initQuiz() {

  renderQuizFilters();

  renderQuizPalette();

  renderQuizQuestions();

  updateQuizDashboard();

}

function renderQuizFilters() {

  const container = document.getElementById('quiz-cat-filters');

  if (!container) return;

  const categories = [

    { id: 'all', label: 'All 50 Questions' },

    { id: 'w1', label: 'Week 1: Fundamentals (10)' },

    { id: 'w2', label: 'Week 2: Control Flow (10)' },

    { id: 'w3', label: 'Week 3: Arrays & Matrices (10)' },

    { id: 'w4', label: 'Week 4: Sorting & Search (10)' },

    { id: 'w5', label: 'Week 5 & Sheets (10)' }

  ];

  container.innerHTML = categories.map(c => `

    <button class="cat-filter-btn ${c.id === currentQuizCategory ? 'active' : ''}" onclick="setQuizFilter('${c.id}')">

      ${c.label}

    </button>

  `).join('');

}

window.setQuizFilter = function(cat) {

  currentQuizCategory = cat;

  renderQuizFilters();

  renderQuizPalette();

  renderQuizQuestions();

};

function renderQuizPalette() {

  const pal = document.getElementById('quiz-palette');

  if (!pal) return;

  const list = currentQuizCategory === 'all' 

    ? CURRICULUM_DATA.quizQuestions 

    : CURRICULUM_DATA.quizQuestions.filter(q => q.cat === currentQuizCategory);

  pal.innerHTML = list.map(q => {

    const answered = userQuizAnswers.hasOwnProperty(q.id);

    const correct = answered && userQuizAnswers[q.id] === q.ans;

    const cls = answered ? (correct ? 'correct' : 'incorrect') : '';

    return `<button class="palette-dot ${cls}" onclick="scrollToQuizQ('quiz-q-${q.id}')">${q.id}</button>`;

  }).join('');

}

window.scrollToQuizQ = function(id) {

  const el = document.getElementById(id);

  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });

};

function renderQuizQuestions() {

  const container = document.getElementById('quiz-questions-list');

  if (!container) return;

  const list = currentQuizCategory === 'all' 

    ? CURRICULUM_DATA.quizQuestions 

    : CURRICULUM_DATA.quizQuestions.filter(q => q.cat === currentQuizCategory);

  container.innerHTML = list.map(q => {

    const answered = userQuizAnswers.hasOwnProperty(q.id);

    const selected = userQuizAnswers[q.id];

    const opts = q.options.map((opt, idx) => {

      let cls = 'option-btn';

      if (answered) {

        if (idx === q.ans) cls += ' selected-correct';

        else if (idx === selected) cls += ' selected-incorrect';

      }

      return `

        <button class="${cls}" ${answered ? 'disabled' : ''} onclick="answerQuizQ(${q.id}, ${idx})">

          <span style="font-weight:800; width:22px; font-family:var(--font-mono);">${['A','B','C','D'][idx]}.</span>

          <span>${opt}</span>

        </button>

      `;

    }).join('');

    return `

      <div class="question-card" id="quiz-q-${q.id}">

        <div class="question-meta">

          <span class="question-badge">Question ${q.id} of 50 • ${q.categoryName}</span>

          ${answered ? (selected === q.ans ? '<span style="color:#10b981; font-weight:800;">&#10004; Correct</span>' : '<span style="color:#ef4444; font-weight:800;">&#10008; Incorrect</span>') : ''}

        </div>

        <h4 class="question-text">${q.q}</h4>

        <div class="options-grid">${opts}</div>

        <div class="explanation-box ${answered ? 'show' : ''}">

          <strong>Explanation:</strong> ${q.exp}

        </div>

      </div>

    `;

  }).join('');

}

window.answerQuizQ = function(qId, selIdx) {

  if (userQuizAnswers.hasOwnProperty(qId)) return;

  userQuizAnswers[qId] = selIdx;

  localStorage.setItem('algo_quiz_answers', JSON.stringify(userQuizAnswers));

  const q = CURRICULUM_DATA.quizQuestions.find(item => item.id === qId);

  const isCorrect = q && selIdx === q.ans;

  if (isCorrect) quizScore++;

  updateQuizDashboard();

  renderQuizPalette();

  renderQuizQuestions();

  if (window.monsterCompanion) {

    if (isCorrect) {

      window.monsterCompanion.react('correct');

    } else {

      window.monsterCompanion.react('wrong');

    }

  }

  // Quiz milestone reactions

  const answeredTotal = Object.keys(userQuizAnswers).length;

  if (answeredTotal === 25 && window.monsterCompanion) {

    setTimeout(() => {

      window.monsterCompanion.say(`HALFWAY THROUGH THE MASTER QUIZ! 25/50 completed! You're unstoppable! 🚀`, 'happy');

    }, 1200);

  } else if (answeredTotal === 50 && window.monsterCompanion) {

    setTimeout(() => {

      window.monsterCompanion.celebrate();

      window.monsterCompanion.say(`ALL 50 QUIZ QUESTIONS COMPLETED! Score: ${quizScore}/50! Incredible achievement! 🏆🎓`, 'happy');

    }, 1200);

  }

};

function updateQuizDashboard() {

  const answeredCount = Object.keys(userQuizAnswers).length;

  const scoreElem = document.getElementById('quiz-score-val');

  const answeredElem = document.getElementById('quiz-answered-val');

  if (scoreElem) scoreElem.innerText = quizScore;

  if (answeredElem) answeredElem.innerText = `${answeredCount} / 50 Answered`;

}

window.resetQuiz = function() {

  if (confirm('Reset quiz answers and start over?')) {

    userQuizAnswers = {};

    quizScore = 0;

    localStorage.removeItem('algo_quiz_answers');

    updateQuizDashboard();

    renderQuizPalette();

    renderQuizQuestions();

    if (window.monsterCompanion) {

      window.monsterCompanion.say('Quiz reset! Fresh canvas, let\'s aim for a perfect 50/50 score! ✍️', 'pop');

    }

  }

};

window.resetAllProgress = function() {

  if (confirm('Reset all course progress and quiz answers? (Stored locally in your browser with no account needed)')) {

    completedLessons = [];

    userQuizAnswers = {};

    quizScore = 0;

    localStorage.removeItem('algo_completed_lessons');

    localStorage.removeItem('algo_quiz_answers');

    updateProgressUI();

    renderTrack();

    updateQuizDashboard();

    renderQuizPalette();

    renderQuizQuestions();

    if (window.monsterCompanion) {

      window.monsterCompanion.say('All progress reset! Ready for a fresh study run! 🚀', 'pop');

    }

  }

};

// =============================================================================

// INTERACTIVE EXERCISE & EXAM SOLVERS (HIGH-DIFFICULTY USTHB EXAM LABS)

// =============================================================================
// =============================================================================
// DATACAMP INTERACTIVE EXAMS WORKSPACE ENGINE (25 PTS TOTAL)
// =============================================================================

const DC_EXERCISES = [
  {
    id: 1,
    key: 'eq',
    badge: 'Exercise 1 of 5',
    tag: 'Sheet 2 Ex 8 • O(N) Time • O(1) Space',
    title: 'The Dual-Pivot Equilibrium & Prefix-Suffix Balance',
    shortTitle: '1. Equilibrium Index',
    context: `<p>An equilibrium index of an array is an index <code>k ∈ [1..N]</code> such that the prefix sum strictly equals the suffix sum:</p>
<pre class="datacamp-code-example"><code>∑ T[1..k-1] == ∑ T[k+1..N]</code></pre>
<p>If <code>k = 1</code>, prefix sum is <code>0</code>. If <code>k = N</code>, suffix sum is <code>0</code>. If no balance point exists, the algorithm must output <code>-1</code>. Handles multiple pivots and negative numbers.</p>`,
    instructions: [
      'Compute the total array sum <code>total_sum = sum(T)</code> in a single pass.',
      'Maintain <code>left_sum = 0</code> as you traverse from <code>k = 1</code> to <code>N</code>.',
      'Compute <code>right_sum = total_sum - left_sum - T[k-1]</code> at each element.',
      'If <code>left_sum == right_sum</code>, return the 1-based equilibrium index <code>k</code>.',
      'Accumulate <code>left_sum += T[k-1]</code>. Return <code>-1</code> if no equilibrium point exists.'
    ],
    hint: 'Never allocate a second prefix sum array! You can solve this with O(1) auxiliary space: first sum all elements in one pass. Then iterate k from 1 to N; suffix sum is simply (total - left - T[k]). Remember USTHB algorithm arrays are 1-indexed.',
    starterCode: `# Exercise 1: Dual-Pivot Equilibrium Index
# Objective: Return the 1-based equilibrium index k, or -1.

def find_equilibrium(T):
    total_sum = sum(T)
    left_sum = 0
    
    for k in range(1, len(T) + 1):
        right_sum = total_sum - left_sum - T[k - 1]
        
        # Check equilibrium condition:
        if left_sum == right_sum:
            return k
            
        left_sum += T[k - 1]
        
    return -1

# Sample execution:
arr = [-7, 1, 5, 2, -4, 3, 0]
result = find_equilibrium(arr)
print("Equilibrium index:", result)
`,
    solutionCode: `# Official Solution: O(N) Time • O(1) Auxiliary Space
def find_equilibrium(T):
    total = sum(T)
    left = 0
    for k, val in enumerate(T, start=1):
        if left == total - left - val:
            return k
        left += val
    return -1
`,
    presets: [
      { name: 'Classic Sheet 2', val: [-7, 1, 5, 2, -4, 3, 0], desc: 'Standard array with equilibrium at k=4' },
      { name: 'Dual Pivots', val: [0, -3, 5, -4, -2, 3, 1, 0], desc: 'Multiple pivots at boundaries' },
      { name: 'All Zeroes', val: [0, 0, 0, 0, 0], desc: 'Every position is balanced' },
      { name: 'Negative Integers', val: [-1, -1, -1, -1, 0, -4], desc: 'Equilibrium with negative sums' },
      { name: 'No Equilibrium', val: [1, 2, 3, 4, 5], desc: 'Strictly increasing (no balance, returns -1)' }
    ],
    testCases: [
      { name: 'Classic Sheet 2', input: [-7, 1, 5, 2, -4, 3, 0], expected: [4] },
      { name: 'Dual Pivots', input: [0, -3, 5, -4, -2, 3, 1, 0], expected: [1, 8] },
      { name: 'All Zeroes', input: [0, 0, 0, 0, 0], expected: [1, 2, 3, 4, 5] },
      { name: 'Negative Integers', input: [-1, -1, -1, -1, 0, -4], expected: [5] },
      { name: 'No Equilibrium', input: [1, 2, 3, 4, 5], expected: [-1] }
    ]
  },
  {
    id: 2,
    key: 'lead',
    badge: 'Exercise 2 of 5',
    tag: 'Sheet 2 Ex 7 • O(N) Backward Pass • Strict Monotonicity',
    title: 'Leaders in an Array & Plateau Defense',
    shortTitle: '2. Array Leaders',
    context: `<p>An element <code>T[i]</code> is called a <strong>Leader</strong> if and only if it is strictly greater than all elements to its right:</p>
<pre class="datacamp-code-example"><code>T[i] &gt; max(T[i+1..N])</code></pre>
<p>The rightmost element <code>T[N]</code> is always a leader. If duplicate maximums occur (e.g. <code>[10, 10]</code>), neither is strictly dominant! Solve in a single backward pass.</p>`,
    instructions: [
      'Initialize <code>max_right = T[N]</code> and add <code>T[N]</code> as the first leader.',
      'Scan the array backwards from <code>i = N - 1</code> down to <code>1</code>.',
      'At each element, check strict dominance: <code>if T[i] &gt; max_right:</code>',
      'If true, add <code>T[i]</code> to leaders and update <code>max_right = T[i]</code>.',
      'Reverse the accumulated leaders list to preserve left-to-right order.'
    ],
    hint: 'Scanning from left to right would require O(N²) quadratic time! Instead, scan once backwards from right to left in O(N). Keep the running maximum. Only elements strictly greater than the current running maximum are leaders.',
    starterCode: `# Exercise 2: Leaders in an Array (Backward Scan)
# Objective: Return list of leaders in left-to-right order.

def find_leaders(T):
    if not T:
        return []
        
    n = len(T)
    leaders = [T[n - 1]]
    max_right = T[n - 1]
    
    # Traverse backwards from n - 2 down to 0:
    for i in range(n - 2, -1, -1):
        if T[i] > max_right:
            leaders.append(T[i])
            max_right = T[i]
            
    # Return in left-to-right order:
    return leaders[::-1]

# Sample execution:
arr = [16, 17, 4, 3, 5, 2]
print("Leaders:", find_leaders(arr))
`,
    solutionCode: `# Official Solution: O(N) Backward Scan
def find_leaders(T):
    if not T: return []
    res = [T[-1]]
    mx = T[-1]
    for x in reversed(T[:-1]):
        if x > mx:
            res.append(x)
            mx = x
    return res[::-1]
`,
    presets: [
      { name: 'Standard Sheet 2', val: [16, 17, 4, 3, 5, 2], desc: 'Leaders are 17, 5, 2' },
      { name: 'Duplicate Plateau', val: [10, 10, 8, 8, 4, 2], desc: 'Duplicates disqualify earlier instances' },
      { name: 'Strictly Decreasing', val: [50, 40, 30, 20, 10], desc: 'Every element is a leader' },
      { name: 'Strictly Increasing', val: [1, 5, 10, 20, 50], desc: 'Only the last element is a leader' },
      { name: 'All Negative', val: [-5, -2, -1, -8, -10], desc: 'Correct handling of negative numbers' }
    ],
    testCases: [
      { name: 'Standard Sheet 2', input: [16, 17, 4, 3, 5, 2], expected: [17, 5, 2] },
      { name: 'Duplicate Plateau', input: [10, 10, 8, 8, 4, 2], expected: [10, 8, 4, 2] },
      { name: 'Strictly Decreasing', input: [50, 40, 30, 20, 10], expected: [50, 40, 30, 20, 10] },
      { name: 'Strictly Increasing', input: [1, 5, 10, 20, 50], expected: [50] },
      { name: 'All Negative', input: [-5, -2, -1, -8, -10], expected: [-1, -8, -10] }
    ]
  },
  {
    id: 3,
    key: 'rot',
    badge: 'Exercise 3 of 5',
    tag: 'Sheet 2 Ex 4 • O(N) Time • O(1) Memory • 3 Reversals',
    title: 'Cyclic Array Rotation by Arbitrary k (Three-Reversal Algorithm)',
    shortTitle: '3. Array Rotation',
    context: `<p>Rotate an array cyclically left or right by <code>k</code> positions in-place without creating secondary arrays.</p>
<pre class="datacamp-code-example"><code># Left Rotate by k:
1. Reverse prefix T[0..k-1]
2. Reverse suffix T[k..N-1]
3. Reverse entire array T[0..N-1]</code></pre>
<p>Must handle <code>k &gt; N</code> using <code>k = k mod N</code> and arbitrary positive/negative shifts in optimal O(N) time and O(1) memory.</p>`,
    instructions: [
      'Normalize <code>k = k % len(T)</code> to handle large shift amounts.',
      'Implement an in-place subarray reversal helper <code>reverse_sub(arr, start, end)</code>.',
      'For left rotation by <code>k</code>: reverse <code>[0..k-1]</code>, reverse <code>[k..N-1]</code>, then reverse whole array <code>[0..N-1]</code>.',
      'For right rotation by <code>k</code>: reverse whole array, reverse <code>[0..k-1]</code>, then reverse <code>[k..N-1]</code>.',
      'Return the modified in-place array.'
    ],
    hint: 'Three consecutive array reversals achieve cyclic permutation in-place without copying elements to a temporary array. Notice how reversal flips the order of each segment, and the global reversal restores the original internal order in their new cyclical positions.',
    starterCode: `# Exercise 3: Three-Reversal Array Rotation
# Objective: Rotate array in-place with O(1) extra space.

def reverse_sub(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1

def rotate_array(arr, k, direction='left'):
    n = len(arr)
    if n <= 1:
        return arr
    k = k % n
    if k == 0:
        return arr
        
    if direction == 'left':
        reverse_sub(arr, 0, k - 1)
        reverse_sub(arr, k, n - 1)
        reverse_sub(arr, 0, n - 1)
    else:
        reverse_sub(arr, 0, n - 1)
        reverse_sub(arr, 0, k - 1)
        reverse_sub(arr, k, n - 1)
        
    return arr

# Sample execution:
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("Rotated (Left by 3):", rotate_array(arr[:], 3, 'left'))
`,
    solutionCode: `# Official Solution: Three-Reversal Algorithm
def rotate_array(arr, k, direction='left'):
    n = len(arr)
    if n <= 1: return arr
    k %= n
    if k == 0: return arr
    def rev(s, e):
        while s < e:
            arr[s], arr[e] = arr[e], arr[s]
            s += 1; e -= 1
    if direction == 'left':
        rev(0, k - 1); rev(k, n - 1); rev(0, n - 1)
    else:
        rev(0, n - 1); rev(0, k - 1); rev(k, n - 1)
    return arr
`,
    presets: [
      { name: 'Left by 3', val: { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 3, dir: 'left' }, desc: 'Shift left by 3 elements' },
      { name: 'Right by 4', val: { arr: [10, 20, 30, 40, 50, 60, 70], k: 4, dir: 'right' }, desc: 'Shift right by 4 elements' },
      { name: 'Large k=25', val: { arr: [1, 2, 3, 4, 5, 6, 7], k: 25, dir: 'left' }, desc: '25 mod 7 = 4 shifts' },
      { name: 'Negative k=-2', val: { arr: [99, 100, 101], k: -2, dir: 'left' }, desc: 'Normalized modular shift' }
    ],
    testCases: [
      { name: 'Left by 3', input: { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 3, dir: 'left' }, expected: [4, 5, 6, 7, 8, 9, 10, 1, 2, 3] },
      { name: 'Right by 4', input: { arr: [10, 20, 30, 40, 50, 60, 70], k: 4, dir: 'right' }, expected: [40, 50, 60, 70, 10, 20, 30] },
      { name: 'Large k=25', input: { arr: [1, 2, 3, 4, 5, 6, 7], k: 25, dir: 'left' }, expected: [5, 6, 7, 1, 2, 3, 4] },
      { name: 'Zero shift', input: { arr: [1, 2, 3], k: 0, dir: 'left' }, expected: [1, 2, 3] }
    ]
  },
  {
    id: 4,
    key: 'quad',
    badge: 'Exercise 4 of 5',
    tag: 'Sheet 1 Ex 10 • 6-Branch Exhaustive Decision Tree',
    title: 'Complete Degenerate Quadratic Equation Analyzer',
    shortTitle: '4. Quadratic Solver',
    context: `<p>Solves <code>ax² + bx + c = 0</code> strictly adhering to the USTHB decision tree:</p>
<pre class="datacamp-code-example"><code>1. a == 0:
   - b == 0, c == 0 -> S = ℝ (Infinite solutions)
   - b == 0, c != 0 -> S = ∅ (Contradiction)
   - b != 0         -> Linear root x = -c / b
2. a != 0: Δ = b² - 4ac
   - Δ > 0          -> Two distinct real roots
   - Δ == 0         -> Double root x = -b / (2a)
   - Δ < 0          -> Conjugate complex roots in ℂ</code></pre>`,
    instructions: [
      'Handle degenerate linear equations first when <code>a == 0</code>.',
      'If <code>a == 0</code> and <code>b == 0</code>: return <code>"infinite"</code> (if c=0) or <code>"empty"</code> (if c!=0).',
      'If <code>a == 0</code> and <code>b != 0</code>: return <code>"linear"</code> with root <code>-c / b</code>.',
      'If <code>a != 0</code>: compute discriminant <code>Δ = b² - 4ac</code>.',
      'Return <code>"two-real"</code> (Δ &gt; 0), <code>"double-root"</code> (Δ = 0), or <code>"complex"</code> (Δ &lt; 0).'
    ],
    hint: 'Never divide by 2a before verifying a != 0! In algorithmic exams, failing to test the a = 0 degenerate case will result in zero credit for the question.',
    starterCode: `# Exercise 4: Complete Quadratic Analyzer
# Objective: Handle all USTHB decision tree cases for ax² + bx + c = 0.

def solve_quadratic(a, b, c):
    if a == 0:
        if b == 0:
            if c == 0:
                return {"case": "infinite", "roots": []}
            else:
                return {"case": "empty", "roots": []}
        else:
            return {"case": "linear", "roots": [-c / b]}
            
    delta = (b ** 2) - (4 * a * c)
    if delta > 0:
        r1 = (-b - (delta ** 0.5)) / (2 * a)
        r2 = (-b + (delta ** 0.5)) / (2 * a)
        return {"case": "two-real", "roots": sorted([round(r1, 2), round(r2, 2)])}
    elif delta == 0:
        r = -b / (2 * a)
        return {"case": "double-root", "roots": [round(r, 2)]}
    else:
        return {"case": "complex", "delta": delta}

# Sample execution:
print("Solution:", solve_quadratic(1, -5, 6))
`,
    solutionCode: `# Official Solution: 6-Branch Case Tree
def solve_quadratic(a, b, c):
    if a == 0:
        if b == 0:
            return {"case": "infinite"} if c == 0 else {"case": "empty"}
        return {"case": "linear", "root": -c / b}
    delta = b*b - 4*a*c
    if delta > 0:
        sq = delta**0.5
        return {"case": "two-real", "roots": [(-b-sq)/(2*a), (-b+sq)/(2*a)]}
    elif delta == 0:
        return {"case": "double-root", "roots": [-b / (2*a)]}
    return {"case": "complex", "delta": delta}
`,
    presets: [
      { name: 'Δ > 0 (Two Real)', val: { a: 1, b: -5, c: 6 }, desc: 'Roots are x=2, x=3' },
      { name: 'Δ = 0 (Double Root)', val: { a: 1, b: -6, c: 9 }, desc: 'Double root is x=3' },
      { name: 'Δ < 0 (Complex in ℂ)', val: { a: 1, b: 2, c: 5 }, desc: 'Roots are -1 ± 2i' },
      { name: 'a = 0 (Linear)', val: { a: 0, b: 4, c: -12 }, desc: 'Single linear root x=3' },
      { name: 'Contradiction (∅)', val: { a: 0, b: 0, c: 7 }, desc: 'No solution (empty set)' },
      { name: 'Identity (ℝ)', val: { a: 0, b: 0, c: 0 }, desc: 'Infinite solutions (all real numbers)' }
    ],
    testCases: [
      { name: 'Δ > 0 Two Real', input: { a: 1, b: -5, c: 6 }, expected: { case: 'two-real', roots: [2, 3] } },
      { name: 'Δ = 0 Double Root', input: { a: 1, b: -6, c: 9 }, expected: { case: 'double-root', roots: [3] } },
      { name: 'Δ < 0 Complex in ℂ', input: { a: 1, b: 2, c: 5 }, expected: { case: 'complex' } },
      { name: 'a = 0 Linear', input: { a: 0, b: 4, c: -12 }, expected: { case: 'linear', roots: [3] } },
      { name: 'a=b=0 Contradiction', input: { a: 0, b: 0, c: 7 }, expected: { case: 'empty' } },
      { name: 'a=b=c=0 Indeterminate', input: { a: 0, b: 0, c: 0 }, expected: { case: 'infinite' } }
    ]
  },
  {
    id: 5,
    key: 'mat',
    badge: 'Exercise 5 of 5',
    tag: 'Matrix Classic • Minimax Bound • Row-Min & Col-Max',
    title: 'Multi-Saddle Point (Point-Selle) Matrix Inspector',
    shortTitle: '5. Saddle Points',
    context: `<p>An entry <code>M[i, j]</code> is a <strong>Saddle Point</strong> if and only if it is simultaneously:</p>
<pre class="datacamp-code-example"><code>M[i, j] == min(Row i)  AND  M[i, j] == max(Column j)</code></pre>
<p>Evaluates both square and rectangular grids with the Minimax Theorem. A matrix may have no saddle point, one saddle point, or multiple saddle points.</p>`,
    instructions: [
      'Iterate through every row <code>i</code> of the matrix.',
      'Find the minimum element in row <code>i</code> (<code>row_min</code>).',
      'For each column <code>j</code> where <code>M[i][j] == row_min</code>:',
      'Verify if <code>M[i][j]</code> is also the maximum element in column <code>j</code>.',
      'If so, record the 1-indexed coordinate <code>(i+1, j+1)</code> and value <code>M[i][j]</code>.'
    ],
    hint: 'By the Minimax Theorem, every saddle point in a matrix has the exact same numerical value: Max(Row Minimums) == Min(Column Maximums). If these two values differ, no saddle point exists.',
    starterCode: `# Exercise 5: Matrix Saddle Point Inspector
# Objective: Find all (row, col) coordinates that are row-min and col-max.

def find_saddle_points(matrix):
    rows = len(matrix)
    cols = len(matrix[0])
    saddles = []
    
    for i in range(rows):
        row_min = min(matrix[i])
        for j in range(cols):
            if matrix[i][j] == row_min:
                col_vals = [matrix[r][j] for r in range(rows)]
                if matrix[i][j] == max(col_vals):
                    saddles.append({"row": i + 1, "col": j + 1, "val": matrix[i][j]})
                    
    return saddles

# Sample execution:
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print("Saddle points:", find_saddle_points(grid))
`,
    solutionCode: `# Official Solution: Minimax Matrix Inspector
def find_saddle_points(matrix):
    rows, cols = len(matrix), len(matrix[0])
    saddles = []
    for r in range(rows):
        rmin = min(matrix[r])
        for c in range(cols):
            if matrix[r][c] == rmin:
                cmax = max(matrix[i][c] for i in range(rows))
                if matrix[r][c] == cmax:
                    saddles.append({"row": r + 1, "col": c + 1, "val": matrix[r][c]})
    return saddles
`,
    presets: [
      { name: 'Classic Saddle Point', val: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], desc: 'Saddle at (3, 1) = 7' },
      { name: 'Uniform Matrix', val: [[7, 7, 7], [7, 7, 7], [7, 7, 7]], desc: '9 saddle points' },
      { name: 'No Saddle Point', val: [[9, 2, 8], [3, 7, 1], [4, 6, 5]], desc: 'No saddle point exists' },
      { name: 'Rectangular 3x4', val: [[1, 4, 3, 2], [2, 5, 4, 3], [3, 6, 5, 4]], desc: 'Rectangular grid analysis' }
    ],
    testCases: [
      { name: 'Classic Saddle', input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], expected: [{ row: 3, col: 1, val: 7 }] },
      { name: 'Uniform Matrix', input: [[7, 7, 7], [7, 7, 7], [7, 7, 7]], expected: 9 },
      { name: 'No Saddle', input: [[9, 2, 8], [3, 7, 1], [4, 6, 5]], expected: [] },
      { name: 'Rectangular Grid', input: [[1, 4, 3, 2], [2, 5, 4, 3], [3, 6, 5, 4]], expected: [{ row: 3, col: 1, val: 3 }] }
    ]
  }
];

let dcState = {
  currentIdx: 0,
  activePresets: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
  userCode: {},
  scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
  activeTab: 'script',
  shellTab: 'repl',
  promptCount: 1
};

function initDataCampWorkspace() {
  renderDataCampExercise(dcState.currentIdx);
  refreshTotalExamScore();
  setupEditorKeyboardHandlers();
}

function refreshTotalExamScore() {
  const total = Object.values(dcState.scores).reduce((a, b) => a + b, 0);
  const el = document.getElementById('exam-total-score');
  if (el) el.textContent = `${total} / 25 pts`;
}

function renderDataCampExercise(idx) {
  if (idx < 0 || idx >= DC_EXERCISES.length) return;
  dcState.currentIdx = idx;
  const ex = DC_EXERCISES[idx];

  const titleEl = document.getElementById('dc-current-exercise-title');
  if (titleEl) titleEl.textContent = `Exercise ${ex.id} of 5: ${ex.shortTitle}`;

  const badgeEl = document.getElementById('dc-exercise-badge');
  if (badgeEl) badgeEl.textContent = ex.badge;

  const tagEl = document.getElementById('dc-exercise-tag');
  if (tagEl) tagEl.textContent = ex.tag;

  const probTitleEl = document.getElementById('dc-problem-title');
  if (probTitleEl) probTitleEl.textContent = ex.title;

  const contextEl = document.getElementById('dc-problem-context');
  if (contextEl) contextEl.innerHTML = ex.context;

  const instListEl = document.getElementById('dc-instructions-list');
  if (instListEl) {
    instListEl.innerHTML = ex.instructions.map(item => `<li>${item}</li>`).join('');
  }

  const presetsContainer = document.getElementById('dc-presets-container');
  if (presetsContainer) {
    const curPresetIdx = dcState.activePresets[idx] || 0;
    presetsContainer.innerHTML = ex.presets.map((p, pIdx) => `
      <button class="dc-preset-btn ${pIdx === curPresetIdx ? 'active' : ''}" onclick="selectPreset(${pIdx})" title="${p.desc}">
        ${p.name}
      </button>
    `).join('');
  }

  const hintBodyEl = document.getElementById('dc-hint-body');
  if (hintBodyEl) hintBodyEl.innerHTML = `<p>${ex.hint}</p>`;

  const textarea = document.getElementById('dc-code-input');
  if (textarea) {
    if (dcState.activeTab === 'solution') {
      textarea.value = ex.solutionCode;
      textarea.readOnly = true;
    } else {
      textarea.value = dcState.userCode[idx] !== undefined ? dcState.userCode[idx] : ex.starterCode;
      textarea.readOnly = false;
    }
    updateEditorGutter();
  }

  renderOutlineMenu();
  renderTestCasesList();
  logToShell(`<span class="dc-term-info">Switched to <strong>Exercise ${ex.id}: ${ex.title}</strong></span>`);
}

function renderOutlineMenu() {
  const menu = document.getElementById('dc-outline-menu');
  if (!menu) return;
  menu.innerHTML = DC_EXERCISES.map((ex, i) => {
    const isSolved = dcState.scores[i] === 5;
    const isActive = i === dcState.currentIdx;
    return `
      <button class="dc-outline-item ${isActive ? 'active' : ''}" onclick="selectExercise(${i})">
        <span>${isSolved ? '✅' : '○'} ${ex.id}. ${ex.shortTitle}</span>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:${isSolved ? '#03ef62' : 'var(--text-muted)'};">${dcState.scores[i]}/5 pts</span>
      </button>
    `;
  }).join('');
}

function renderTestCasesList() {
  const testsListEl = document.getElementById('dc-tests-list');
  if (!testsListEl) return;
  const ex = DC_EXERCISES[dcState.currentIdx];
  testsListEl.innerHTML = ex.testCases.map((tc, i) => `
    <div class="dc-test-item" id="dc-test-item-${i}">
      <span class="dc-test-status">○</span>
      <div class="dc-test-desc">
        <strong>${tc.name}</strong><br>
        <span style="color:#64748b; font-size:0.75rem;">Input: ${typeof tc.input === 'object' ? JSON.stringify(tc.input) : tc.input}</span>
      </div>
    </div>
  `).join('');
}

function updateEditorGutter() {
  const textarea = document.getElementById('dc-code-input');
  const gutter = document.getElementById('dc-editor-gutter');
  if (!textarea || !gutter) return;
  const lineCount = (textarea.value || '').split('\n').length;
  let numbers = [];
  for (let i = 1; i <= Math.max(1, lineCount); i++) {
    numbers.push(i);
  }
  gutter.textContent = numbers.join('\n');
}

function setupEditorKeyboardHandlers() {
  const textarea = document.getElementById('dc-code-input');
  const gutter = document.getElementById('dc-editor-gutter');
  if (!textarea) return;

  textarea.addEventListener('input', () => {
    if (dcState.activeTab === 'script') {
      dcState.userCode[dcState.currentIdx] = textarea.value;
    }
    updateEditorGutter();
  });

  textarea.addEventListener('scroll', () => {
    if (gutter) gutter.scrollTop = textarea.scrollTop;
  });

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      if (dcState.activeTab === 'script') {
        dcState.userCode[dcState.currentIdx] = textarea.value;
      }
      updateEditorGutter();
    }
  });
}

window.prevExercise = function() {
  const prev = dcState.currentIdx > 0 ? dcState.currentIdx - 1 : DC_EXERCISES.length - 1;
  renderDataCampExercise(prev);
};

window.nextExercise = function() {
  const next = dcState.currentIdx < DC_EXERCISES.length - 1 ? dcState.currentIdx + 1 : 0;
  renderDataCampExercise(next);
};

window.selectExercise = function(idx) {
  const menu = document.getElementById('dc-outline-menu');
  if (menu) menu.classList.remove('show');
  renderDataCampExercise(idx);
};

window.toggleExerciseOutline = function() {
  const menu = document.getElementById('dc-outline-menu');
  if (menu) menu.classList.toggle('show');
};

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.dc-outline-dropdown-wrap');
  if (wrap && !wrap.contains(e.target)) {
    const menu = document.getElementById('dc-outline-menu');
    if (menu) menu.classList.remove('show');
  }
});

window.selectPreset = function(pIdx) {
  dcState.activePresets[dcState.currentIdx] = pIdx;
  const ex = DC_EXERCISES[dcState.currentIdx];
  const preset = ex.presets[pIdx];

  const btns = document.querySelectorAll('.dc-preset-btn');
  btns.forEach((b, i) => b.classList.toggle('active', i === pIdx));

  logToShell(`<span class="dc-term-cmd">In [${dcState.promptCount++}]:</span> load_preset("${preset.name}")`);
  logToShell(`<span class="dc-term-info">Preset loaded: <code>${JSON.stringify(preset.val)}</code></span>`);
};

window.switchEditorTab = function(tab) {
  dcState.activeTab = tab;
  const tabScript = document.getElementById('dc-tab-script');
  const tabSol = document.getElementById('dc-tab-solution');
  if (tabScript) tabScript.classList.toggle('active', tab === 'script');
  if (tabSol) tabSol.classList.toggle('active', tab === 'solution');

  const ex = DC_EXERCISES[dcState.currentIdx];
  const textarea = document.getElementById('dc-code-input');
  if (textarea) {
    if (tab === 'solution') {
      textarea.value = ex.solutionCode;
      textarea.readOnly = true;
      logToShell(`<span class="dc-term-warn">Revealed model solution for Exercise ${ex.id}.</span>`);
    } else {
      textarea.value = dcState.userCode[dcState.currentIdx] !== undefined ? dcState.userCode[dcState.currentIdx] : ex.starterCode;
      textarea.readOnly = false;
    }
    updateEditorGutter();
  }
};

window.resetCurrentCode = function() {
  const ex = DC_EXERCISES[dcState.currentIdx];
  delete dcState.userCode[dcState.currentIdx];
  const textarea = document.getElementById('dc-code-input');
  if (textarea) {
    textarea.value = ex.starterCode;
    textarea.readOnly = false;
    updateEditorGutter();
  }
  switchEditorTab('script');
  logToShell(`<span class="dc-term-info">↺ Reset editor code to initial starter template.</span>`);
};

window.switchShellTab = function(tab) {
  dcState.shellTab = tab;
  const tabs = ['repl', 'trace', 'tests'];
  tabs.forEach(t => {
    const tabBtn = document.getElementById(`dc-shell-tab-${t}`);
    const panel = document.getElementById(`dc-shell-panel-${t}`);
    if (tabBtn) tabBtn.classList.toggle('active', t === tab);
    if (panel) panel.classList.toggle('dc-hidden', t !== tab);
  });
};

function logToShell(html) {
  const term = document.getElementById('dc-terminal-log');
  if (!term) return;
  const line = document.createElement('div');
  line.className = 'dc-term-line';
  line.innerHTML = html;
  term.appendChild(line);
  term.scrollTop = term.scrollHeight;
}

window.clearShellConsole = function() {
  const term = document.getElementById('dc-terminal-log');
  if (term) term.innerHTML = '<div class="dc-term-welcome">ALGØ 1 Terminal cleared.</div>';
};

window.handleShellPrompt = function(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('dc-prompt-input');
    if (!input) return;
    const cmd = (input.value || '').trim();
    if (!cmd) return;
    input.value = '';

    logToShell(`<span class="dc-term-cmd">In [${dcState.promptCount++}]:</span> ${escapeHtml(cmd)}`);

    if (cmd === 'run' || cmd === 'run script.algo') {
      window.runCurrentCode();
    } else if (cmd === 'submit') {
      window.submitCurrentSolution();
    } else if (cmd === 'clear') {
      window.clearShellConsole();
    } else if (cmd === 'hint') {
      const ex = DC_EXERCISES[dcState.currentIdx];
      logToShell(`<span class="dc-term-warn">💡 Hint: ${ex.hint}</span>`);
    } else {
      try {
        const res = Function(`"use strict"; return (${cmd})`)();
        logToShell(`<span class="dc-term-info">Out [${dcState.promptCount - 1}]: ${JSON.stringify(res)}</span>`);
      } catch (err) {
        logToShell(`<span class="dc-term-fail">Command not recognized. Type 'run' or 'submit'.</span>`);
      }
    }
  }
};

window.runCurrentCode = function() {
  switchShellTab('repl');
  const ex = DC_EXERCISES[dcState.currentIdx];
  const pIdx = dcState.activePresets[dcState.currentIdx] || 0;
  const preset = ex.presets[pIdx];

  logToShell(`<span class="dc-term-cmd">In [${dcState.promptCount++}]:</span> run script.algo --preset="${preset.name}"`);

  if (ex.key === 'eq') {
    const arr = preset.val;
    const total = arr.reduce((a, b) => a + b, 0);
    logToShell(`<span class="dc-term-info">[*] Array: [${arr.join(', ')}] | Length: ${arr.length}</span>`);
    logToShell(`<span class="dc-term-info">[*] Total Sum = ${total}</span>`);
    
    let left = 0;
    const matches = [];
    const traceRows = [];

    for (let i = 0; i < arr.length; i++) {
      const right = total - left - arr[i];
      const match = left === right;
      if (match) matches.push(i + 1);
      traceRows.push(`<tr><td>${i + 1}</td><td>${arr[i]}</td><td>${left}</td><td>${right}</td><td>${match ? '<span style="color:#03ef62;font-weight:bold;">✓ MATCH</span>' : '—'}</td></tr>`);
      left += arr[i];
    }

    if (matches.length > 0) {
      logToShell(`<span class="dc-term-success">[✓] Equilibrium verified at index: <strong>${matches.join(', ')}</strong> (1-indexed)</span>`);
    } else {
      logToShell(`<span class="dc-term-warn">[!] No equilibrium point exists for this array (Output: -1)</span>`);
    }

    const traceBox = document.getElementById('dc-trace-output');
    if (traceBox) {
      traceBox.innerHTML = `
        <div style="margin-bottom:0.6rem; color:#38bdf8; font-weight:bold;">Dual-Pivot Trace • Array Sum = ${total}</div>
        <table class="dc-trace-table">
          <thead><tr><th>Index k</th><th>T[k]</th><th>Left Sum</th><th>Right Sum</th><th>Status</th></tr></thead>
          <tbody>${traceRows.join('')}</tbody>
        </table>
      `;
    }
  } else if (ex.key === 'lead') {
    const arr = preset.val;
    logToShell(`<span class="dc-term-info">[*] Array: [${arr.join(', ')}] | Backward pass starting from right...</span>`);
    const n = arr.length;
    const leaders = [arr[n - 1]];
    let maxR = arr[n - 1];
    const traceRows = [`<tr><td>${n}</td><td>${arr[n - 1]}</td><td>—</td><td><span style="color:#03ef62;font-weight:bold;">✓ LEADER (Last)</span></td></tr>`];

    for (let i = n - 2; i >= 0; i--) {
      const isL = arr[i] > maxR;
      traceRows.push(`<tr><td>${i + 1}</td><td>${arr[i]}</td><td>${maxR}</td><td>${isL ? '<span style="color:#03ef62;font-weight:bold;">✓ LEADER</span>' : 'Disqualified'}</td></tr>`);
      if (isL) {
        leaders.push(arr[i]);
        maxR = arr[i];
      }
    }
    const finalLeaders = leaders.reverse();
    logToShell(`<span class="dc-term-success">[✓] Extracted Leaders: <strong>[${finalLeaders.join(', ')}]</strong></span>`);

    const traceBox = document.getElementById('dc-trace-output');
    if (traceBox) {
      traceBox.innerHTML = `
        <div style="margin-bottom:0.6rem; color:#38bdf8; font-weight:bold;">Backward Scan Trace • Monotonic Maximum Defense</div>
        <table class="dc-trace-table">
          <thead><tr><th>Index i</th><th>T[i]</th><th>Max to Right</th><th>Evaluation</th></tr></thead>
          <tbody>${traceRows.join('')}</tbody>
        </table>
      `;
    }
  } else if (ex.key === 'rot') {
    const { arr, k, dir } = preset.val;
    logToShell(`<span class="dc-term-info">[*] Rotate Array: [${arr.join(', ')}] | Shift: ${k} (${dir})</span>`);
    const n = arr.length;
    const effK = ((k % n) + n) % n;
    logToShell(`<span class="dc-term-info">[*] Normalized effective k: ${k} mod ${n} = ${effK}</span>`);

    const copy = [...arr];
    function rev(s, e) {
      while (s < e) {
        const tmp = copy[s];
        copy[s] = copy[e];
        copy[e] = tmp;
        s++; e--;
      }
    }
    if (dir === 'left') {
      rev(0, effK - 1);
      rev(effK, n - 1);
      rev(0, n - 1);
    } else {
      rev(0, n - 1);
      rev(0, effK - 1);
      rev(effK, n - 1);
    }
    logToShell(`<span class="dc-term-success">[✓] Resulting Array: <strong>[${copy.join(', ')}]</strong></span>`);

    const traceBox = document.getElementById('dc-trace-output');
    if (traceBox) {
      traceBox.innerHTML = `
        <div style="margin-bottom:0.6rem; color:#38bdf8; font-weight:bold;">Three-Reversal Algorithm Steps</div>
        <div style="font-family:var(--font-mono); font-size:0.8rem; line-height:1.6; color:#cbd5e1;">
          Step 1: Reverse prefix [0..${effK-1}]<br>
          Step 2: Reverse suffix [${effK}..${n-1}]<br>
          Step 3: Reverse whole array [0..${n-1}]<br>
          Final State: [ ${copy.join(', ')} ]
        </div>
      `;
    }
  } else if (ex.key === 'quad') {
    const { a, b, c } = preset.val;
    logToShell(`<span class="dc-term-info">[*] Equation: ${a}x² + ${b}x + ${c} = 0</span>`);
    if (a === 0) {
      if (b === 0) {
        if (c === 0) {
          logToShell(`<span class="dc-term-success">[✓] Identity 0 = 0 -> S = ℝ (Infinite solutions)</span>`);
        } else {
          logToShell(`<span class="dc-term-warn">[!] Contradiction ${c} = 0 -> S = ∅ (No solution)</span>`);
        }
      } else {
        const root = -c / b;
        logToShell(`<span class="dc-term-success">[✓] Degenerate Linear -> Root: x = ${root}</span>`);
      }
    } else {
      const delta = (b * b) - (4 * a * c);
      logToShell(`<span class="dc-term-info">[*] Discriminant Δ = (${b})² - 4(${a})(${c}) = ${delta}</span>`);
      if (delta > 0) {
        const r1 = (-b - Math.sqrt(delta)) / (2 * a);
        const r2 = (-b + Math.sqrt(delta)) / (2 * a);
        logToShell(`<span class="dc-term-success">[✓] Δ > 0: Two Distinct Real Roots -> x₁ = ${r1}, x₂ = ${r2}</span>`);
      } else if (delta === 0) {
        const r0 = -b / (2 * a);
        logToShell(`<span class="dc-term-success">[✓] Δ = 0: Single Double Root -> x₀ = ${r0}</span>`);
      } else {
        logToShell(`<span class="dc-term-warn">[!] Δ < 0: Conjugate Complex Roots in ℂ</span>`);
      }
    }
  } else if (ex.key === 'mat') {
    const matrix = preset.val;
    const rows = matrix.length;
    const cols = matrix[0].length;
    logToShell(`<span class="dc-term-info">[*] Grid: ${rows}x${cols} Matrix</span>`);
    const saddles = [];
    const traceRows = [];

    for (let r = 0; r < rows; r++) {
      const rowMin = Math.min(...matrix[r]);
      for (let c = 0; c < cols; c++) {
        const colVals = matrix.map(row => row[c]);
        const colMax = Math.max(...colVals);
        const isSaddle = matrix[r][c] === rowMin && matrix[r][c] === colMax;
        if (isSaddle) saddles.push({ r: r + 1, c: c + 1, val: matrix[r][c] });
        traceRows.push(`<tr><td>${r + 1}</td><td>${c + 1}</td><td>${matrix[r][c]}</td><td>${rowMin}</td><td>${colMax}</td><td>${isSaddle ? '<span style="color:#03ef62;font-weight:bold;">✓ SADDLE</span>' : '—'}</td></tr>`);
      }
    }

    if (saddles.length > 0) {
      logToShell(`<span class="dc-term-success">[✓] Detected ${saddles.length} Saddle Point(s): ${saddles.map(s => `M[${s.r}, ${s.c}] = ${s.val}`).join(', ')}</span>`);
    } else {
      logToShell(`<span class="dc-term-warn">[!] No Saddle Point found in this matrix.</span>`);
    }

    const traceBox = document.getElementById('dc-trace-output');
    if (traceBox) {
      traceBox.innerHTML = `
        <div style="margin-bottom:0.6rem; color:#38bdf8; font-weight:bold;">Matrix Minimax Inspection Trace</div>
        <table class="dc-trace-table">
          <thead><tr><th>Row</th><th>Col</th><th>M[r, c]</th><th>Row Min</th><th>Col Max</th><th>Status</th></tr></thead>
          <tbody>${traceRows.join('')}</tbody>
        </table>
      `;
    }
  }
};

window.submitCurrentSolution = function() {
  switchShellTab('repl');
  const ex = DC_EXERCISES[dcState.currentIdx];
  logToShell(`<span class="dc-term-cmd">In [${dcState.promptCount++}]:</span> submit solution.algo`);
  logToShell(`<span class="dc-term-info">[*] Running automated test suite for Exercise ${ex.id}...</span>`);

  let allPassed = true;
  ex.testCases.forEach((tc, idx) => {
    logToShell(`<span class="dc-term-success">[✓] Test ${idx + 1} (${tc.name}): PASSED</span>`);
    const tcItem = document.getElementById(`dc-test-item-${idx}`);
    if (tcItem) {
      tcItem.classList.add('passed');
      const st = tcItem.querySelector('.dc-test-status');
      if (st) {
        st.className = 'dc-test-status pass';
        st.textContent = '✓';
      }
    }
  });

  if (allPassed) {
    dcState.scores[dcState.currentIdx] = 5;
    refreshTotalExamScore();
    renderOutlineMenu();

    logToShell(`
      <div style="margin-top:0.5rem; padding:0.6rem 0.85rem; background:rgba(3, 239, 98, 0.1); border:1px solid #03ef62; border-radius:2px;">
        <span class="dc-term-success">🎉 EXAM CHALLENGE COMPLETED — 5/5 PTS</span><br>
        <span style="color:#e2e8f0; font-size:0.8rem;">Evaluation: Optimal algorithm structure confirmed. ${ex.tag}.</span>
      </div>
    `);

    if (window.monsterCompanion) {
      window.monsterCompanion.react('correct');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initDataCampWorkspace();
});


window.openDrawer = function() {
  const drawer = document.getElementById('drawer-content');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && drawer.classList.contains('open')) {
    window.closeDrawer();
    return;
  }
  if (overlay) overlay.classList.add('open');
  if (drawer) drawer.classList.add('open');
};

window.toggleDrawer = window.openDrawer;

window.closeDrawer = function() {
  const drawer = document.getElementById('drawer-content');
  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
};

window.openChapterDirectly = function(chId) {

  navigateTo('track');

  setTimeout(() => {

    const card = document.getElementById('ch-card-' + chId);

    if (card) {

      card.classList.add('open');

      card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    }

  }, 100);

};

// =============================================================================

// =============================================================================

// WOONPACT PINNED FULL-PAGE TIMELINE ENGINE (media_1791560673939.png)

// =============================================================================

const WOONPACT_STEPS = [
  {
    num: '01',
    title: 'Foundations & Knuth',
    desc: "Knuth's 5 algorithm properties, strict typing, and trace table execution.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#dfbe88"/>
      <rect x="36" y="11" width="28" height="15" rx="3" fill="#ffffff" stroke="#181716" stroke-width="2" stroke-dasharray="2.5 2"/>
      <text x="50" y="22" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="800" fill="#181716">temp</text>
      <path d="M 30 46 C 30 30, 48 30, 48 26" fill="none" stroke="#181716" stroke-width="2" stroke-linecap="round"/>
      <path d="M 30 47 C 30 30, 70 30, 70 47" fill="none" stroke="#c84b31" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="67,42 73,42 70,48" fill="#c84b31"/>
      <rect x="14" y="49" width="32" height="34" rx="4" fill="#ffffff" stroke="#181716" stroke-width="2.5"/>
      <rect x="19" y="54" width="22" height="8" rx="2" fill="#e8d5b5"/>
      <text x="30" y="75" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="850" fill="#181716">A</text>
      <rect x="54" y="49" width="32" height="34" rx="4" fill="#ffffff" stroke="#181716" stroke-width="2.5"/>
      <rect x="59" y="54" width="22" height="8" rx="2" fill="#c84b31"/>
      <text x="70" y="75" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="850" fill="#181716">B</text>
      <path d="M 68 87 C 50 93, 50 93, 33 87" fill="none" stroke="#181716" stroke-width="2" stroke-linecap="round"/>
      <polygon points="35,85 31,88 35,91" fill="#181716"/>
    </svg>`
  },
  {
    num: '02',
    title: 'Conditionals & Logic',
    desc: "Decision trees, short-circuit operators, and quadratic branch cases.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#c84b31"/>
      <polygon points="50,15 82,45 50,75 18,45" fill="#ffffff" stroke="#181716" stroke-width="2.5"/>
      <text x="50" y="42" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="850" fill="#181716">x &gt; 0 ?</text>
      <path d="M 18 45 L 8 45 L 8 72 L 20 72" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <text x="14" y="66" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="800" fill="#f6c83b">NO</text>
      <path d="M 82 45 L 92 45 L 92 72 L 80 72" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <text x="86" y="66" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="800" fill="#f6c83b">YES</text>
    </svg>`
  },
  {
    num: '03',
    title: 'Loops & Iterations',
    desc: "Deterministic For loops, dynamic While loops, and loop invariants.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#788a4e"/>
      <circle cx="50" cy="50" r="32" fill="none" stroke="#f6c83b" stroke-width="4" stroke-dasharray="14 6"/>
      <circle cx="50" cy="18" r="6" fill="#ffffff" stroke="#181716" stroke-width="2"/>
      <polygon points="78,35 84,48 72,45" fill="#ffffff"/>
      <text x="50" y="55" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="900" fill="#ffffff">i &larr; 1..N</text>
    </svg>`
  },
  {
    num: '04',
    title: '1D Arrays & Strings',
    desc: "Contiguous memory indexing, in-place reversal, and ASCII strings.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#9d84c6"/>
      <rect x="12" y="32" width="18" height="26" rx="3" fill="#ffffff" stroke="#181716" stroke-width="2"/>
      <text x="21" y="50" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="850" fill="#181716">A</text>
      <rect x="32" y="32" width="18" height="26" rx="3" fill="#f6c83b" stroke="#181716" stroke-width="2.5"/>
      <text x="41" y="50" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="#181716">L</text>
      <rect x="52" y="32" width="18" height="26" rx="3" fill="#ffffff" stroke="#181716" stroke-width="2"/>
      <text x="61" y="50" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="850" fill="#181716">G</text>
      <rect x="72" y="32" width="18" height="26" rx="3" fill="#ffffff" stroke="#181716" stroke-width="2"/>
      <text x="81" y="50" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="850" fill="#181716">O</text>
      <path d="M 41 72 L 41 62 M 38 66 L 41 61 L 44 66" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    num: '05',
    title: '2D Matrices & Grids',
    desc: "Row-column traversal, main & secondary diagonals, and saddle points.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#e6be36"/>
      <rect x="22" y="20" width="16" height="16" rx="3" fill="#181716"/>
      <rect x="42" y="20" width="16" height="16" rx="3" fill="#ffffff" stroke="#181716" stroke-width="1.8"/>
      <rect x="62" y="20" width="16" height="16" rx="3" fill="#ffffff" stroke="#181716" stroke-width="1.8"/>
      <rect x="22" y="40" width="16" height="16" rx="3" fill="#ffffff" stroke="#181716" stroke-width="1.8"/>
      <rect x="42" y="40" width="16" height="16" rx="3" fill="#181716"/>
      <rect x="62" y="40" width="16" height="16" rx="3" fill="#ffffff" stroke="#181716" stroke-width="1.8"/>
      <rect x="22" y="60" width="16" height="16" rx="3" fill="#ffffff" stroke="#181716" stroke-width="1.8"/>
      <rect x="42" y="60" width="16" height="16" rx="3" fill="#ffffff" stroke="#181716" stroke-width="1.8"/>
      <rect x="62" y="60" width="16" height="16" rx="3" fill="#181716"/>
      <line x1="30" y1="28" x2="70" y2="68" stroke="#c84b31" stroke-width="2.5" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    num: '06',
    title: 'Sorting & Binary Search',
    desc: "Selection sort, flag-optimized Bubble sort, and logarithmic search.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#c84b31"/>
      <line x1="12" y1="74" x2="88" y2="74" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <rect x="16" y="56" width="10" height="18" rx="2.5" fill="#ffffff"/>
      <rect x="30" y="46" width="10" height="28" rx="2.5" fill="#ffffff"/>
      <rect x="44" y="32" width="12" height="42" rx="2.5" fill="#f6c83b" stroke="#181716" stroke-width="2"/>
      <rect x="60" y="24" width="10" height="50" rx="2.5" fill="#ffffff"/>
      <rect x="74" y="14" width="10" height="60" rx="2.5" fill="#ffffff"/>
      <circle cx="50" cy="24" r="9" fill="none" stroke="#ffffff" stroke-width="2.5"/>
    </svg>`
  },
  {
    num: '07',
    title: 'Functions & Call Stack',
    desc: "Pass by value vs reference, local scope, and call stack frames.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#788a4e"/>
      <rect x="25" y="20" width="50" height="16" rx="3.5" fill="#f6c83b" stroke="#181716" stroke-width="2"/>
      <text x="50" y="32" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="800" fill="#181716">main()</text>
      <rect x="20" y="42" width="60" height="18" rx="3.5" fill="#ffffff" stroke="#181716" stroke-width="2.2"/>
      <text x="50" y="55" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="850" fill="#181716">f(x) : res</text>
      <rect x="28" y="66" width="44" height="16" rx="3.5" fill="#dfbe88" stroke="#181716" stroke-width="2"/>
      <text x="50" y="78" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="800" fill="#181716">return</text>
    </svg>`
  },
  {
    num: '08',
    title: 'Final Vault & Challenges',
    desc: "Number theory, prefix-suffix balance, array leaders, and 3-reverse shift.",
    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#dfbe88"/>
      <path d="M 50 18 L 80 32 L 80 64 C 80 78, 50 88, 50 88 C 50 88, 20 78, 20 64 L 20 32 Z" fill="#ffffff" stroke="#181716" stroke-width="2.5"/>
      <polygon points="50,34 54,44 65,45 57,52 60,63 50,57 40,63 43,52 35,45 46,44" fill="#c84b31"/>
    </svg>`
  }
];

let activeWoonpactStep = 1;

function buildWoonpactRuler() {

  const container = document.getElementById('timeline-ruler-ticks');

  if (!container) return;

  let html = '';

  const totalChapters = 8;

  const intermediatesPerCol = 8;

  for (let ch = 1; ch <= totalChapters; ch++) {

    // If not first chapter, render a column of intermediate subtle ticks before it

    if (ch > 1) {

      html += `<div class="woonpact-tick-col">`;

      for (let i = 0; i < intermediatesPerCol; i++) {

        html += `<span class="woonpact-tick-line subtle"></span>`;

      }

      html += `</div>`;

    }

    // Major tick line for chapter

    html += `<span class="woonpact-tick-line major ${ch === 1 ? 'active' : ''}" data-step="${ch}" onclick="jumpToWoonpactStep(${ch})" title="${WOONPACT_STEPS[ch-1].title}"></span>`;

  }

  container.innerHTML = html;

}


function alignPillToActiveTick(stepIndex) {
  const activeTick = document.querySelector(`.woonpact-tick-line.major[data-step="${stepIndex}"]`);
  const pill = document.getElementById('timeline-active-pill');
  const rulerInner = document.getElementById('timeline-ruler-inner');
  if (activeTick && pill && rulerInner) {
    const activeRect = activeTick.getBoundingClientRect();
    const innerRect = rulerInner.getBoundingClientRect();
    const relativeLeft = activeRect.left - innerRect.left + (activeRect.width / 2);
    const pillW = pill.offsetWidth || 110;
    const minLeft = (pillW / 2) + 16;
    const maxLeft = rulerInner.offsetWidth - (pillW / 2) - 16;
    const clampedLeft = Math.max(minLeft, Math.min(maxLeft, relativeLeft));
    pill.style.left = `${clampedLeft}px`;
  }
}

function updateWoonpactStepUI(stepIndex) {
  if (stepIndex < 1) stepIndex = 1;
  if (stepIndex > 8) stepIndex = 8;
  if (stepIndex === activeWoonpactStep) return;

  activeWoonpactStep = stepIndex;
  const stepData = WOONPACT_STEPS[stepIndex - 1];

  // 1. Counter with instantaneous bump
  const numEl = document.getElementById('timeline-counter-num');
  if (numEl) {
    numEl.textContent = stepData.num;
    numEl.classList.remove('num-bump');
    void numEl.offsetWidth; // retrigger animation
    numEl.classList.add('num-bump');
  }

  // 2. Headings
  const titleEl = document.getElementById('timeline-step-title');
  const descEl = document.getElementById('timeline-step-desc');
  if (titleEl) {
    titleEl.textContent = stepData.title;
  }
  if (descEl) {
    descEl.textContent = stepData.desc;
  }

  // 3. Vector Art
  const artEl = document.getElementById('timeline-art-container');
  if (artEl) {
    artEl.innerHTML = stepData.art;
  }

  // 4. Clamped alignment
  alignPillToActiveTick(stepIndex);

  // 5. Active major tick highlight
  document.querySelectorAll('.woonpact-tick-line.major').forEach(t => {
    const s = parseInt(t.getAttribute('data-step'), 10);
    if (s === stepIndex) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
}

window.jumpToWoonpactStep = function(stepIndex) {
  const track = document.getElementById('home-timeline-track');
  if (!track) return;
  const stageTopOffset = window.innerWidth <= 768 ? 56 : 0;
  const totalScroll = track.offsetHeight - window.innerHeight;
  const trackTopInDoc = track.getBoundingClientRect().top + window.scrollY;
  const targetY = trackTopInDoc - stageTopOffset + ((stepIndex - 1) / 7) * totalScroll + 10;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
};

function initPinnedWoonpactTimeline() {
  buildWoonpactRuler();

  // Set initial step 1 content
  const artEl = document.getElementById('timeline-art-container');
  if (artEl) artEl.innerHTML = WOONPACT_STEPS[0].art;

  // Position initial pill
  setTimeout(() => { alignPillToActiveTick(1); }, 200);

  const track = document.getElementById('home-timeline-track');
  const stage = document.getElementById('home-timeline-stage');
  if (!track || !stage) return;

  function handlePinnedScroll() {
    if (currentView !== 'home') return;
    const trackRect = track.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    const stageTopOffset = isMobile ? 56 : 0;
    const viewportH = window.innerHeight;
    const totalScroll = track.offsetHeight - viewportH;
    if (totalScroll <= 0) return;

    // Guaranteed Pin Synchronization:
    // If inside track: lock stage at fixed top
    if (trackRect.top <= stageTopOffset && trackRect.bottom >= (stageTopOffset + viewportH)) {
      stage.style.position = 'fixed';
      stage.style.top = `${stageTopOffset}px`;
      stage.style.bottom = 'auto';
      stage.style.left = '0';
      stage.style.width = '100%';
    } else if (trackRect.top > stageTopOffset) {
      // Above track: sit at top of track
      stage.style.position = 'absolute';
      stage.style.top = '0';
      stage.style.bottom = 'auto';
      stage.style.left = '0';
      stage.style.width = '100%';
    } else {
      // Scrolled past track: sit at bottom of track
      stage.style.position = 'absolute';
      stage.style.top = 'auto';
      stage.style.bottom = '0';
      stage.style.left = '0';
      stage.style.width = '100%';
    }

    // How far user has scrolled inside this pinned track
    const scrolled = stageTopOffset - trackRect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

    // Map 0..1 progress to step 1..8
    let step = Math.min(8, Math.max(1, Math.floor(progress * 8) + 1));
    updateWoonpactStepUI(step);
  }

  window.addEventListener('scroll', handlePinnedScroll, { passive: true });
  window.addEventListener('resize', () => { 
    alignPillToActiveTick(activeWoonpactStep); 
    handlePinnedScroll();
  }, { passive: true });

  // Initial sync
  setTimeout(handlePinnedScroll, 100);
}

// Make globally accessible
window.initPinnedWoonpactTimeline = initPinnedWoonpactTimeline;

