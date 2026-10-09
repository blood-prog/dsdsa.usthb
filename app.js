

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

      <!-- Mobile Fast Jump Chips (Touch-friendly section quick links) -->

      <div class="mobile-jump-chips">

        <button class="mobile-jump-chip" onclick="document.querySelector('.lesson-body-prose')?.scrollIntoView({behavior:'smooth'});">💡 Concept</button>

        <button class="mobile-jump-chip" onclick="document.querySelector('.terminal-code-window')?.scrollIntoView({behavior:'smooth'});">💻 Code</button>

        <button class="mobile-jump-chip" onclick="document.querySelector('.pedagogical-bridge-card')?.scrollIntoView({behavior:'smooth'});">🌉 Bridge</button>

        <button class="mobile-jump-chip" onclick="document.querySelector('.lesson-checkpoints-section')?.scrollIntoView({behavior:'smooth'});">✍ 3 Exercises</button>

      </div>

      <!-- Byte's Mascot Insight Card (21st.dev Callout Style) -->

      <div class="mascot-tip-box" onclick="if(window.monsterCompanion) window.monsterCompanion.say('Insight: ' + ${JSON.stringify(getLessonTip(targetLesson.id))}, 'happy')" style="cursor:pointer;" title="Click to have Byte read this tip aloud!">

        <div class="mascot-avatar-wrap">

          <div class="companion-felt-badge" style="width:42px; height:42px; font-size:1.3rem;">🧶</div>

        </div>

        <div class="mascot-tip-content">

          <div class="mascot-tip-kicker">Companion Insight &bull; Byte</div>

          <div class="mascot-tip-text">${getLessonTip(targetLesson.id)}</div>

        </div>

      </div>

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

  // Greet student upon opening lesson

  if (window.monsterCompanion) {

    window.monsterCompanion.say(`Lesson: "${targetLesson.title}". Let's master this concept! 🚀`, 'pop');

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

// Challenge 1: Dual-Pivot Equilibrium & Prefix-Suffix Balance

window.loadEqPreset = function(arrStr) {

  document.getElementById('ex-eq-input').value = arrStr;

  window.solveEquilibrium();

};

window.solveEquilibrium = function() {

  const raw = document.getElementById('ex-eq-input').value;

  const arr = raw.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));

  const res = document.getElementById('ex-eq-res');

  if (!arr.length) {

    res.innerHTML = '<span style="color:#c84b31;">Please enter a valid comma-separated array.</span>';

    return;

  }

  

  const total = arr.reduce((a, b) => a + b, 0);

  let left = 0;

  const equilibria = [];

  const traceRows = [];

  for (let i = 0; i < arr.length; i++) {

    const right = total - left - arr[i];

    const isMatch = left === right;

    if (isMatch) {

      equilibria.push({ index1: i + 1, val: arr[i], leftSum: left, rightSum: right });

    }

    traceRows.push(`<tr><td>${i + 1}</td><td><strong>${arr[i]}</strong></td><td>${left}</td><td>${right}</td><td>${isMatch ? '<span style="color:#059669; font-weight:800;">✓ MATCH</span>' : '—'}</td></tr>`);

    left += arr[i];

  }

  let html = '';

  if (equilibria.length > 0) {

    html += `<div style="color:#059669; font-weight:850; font-size:1.05rem; margin-bottom:0.75rem;">

      🎉 Detected ${equilibria.length} Equilibrium Pivot${equilibria.length > 1 ? 's' : ''}:

      ${equilibria.map(e => `[Index <code>T[${e.index1}] = ${e.val}</code> with Sum = ${e.leftSum}]`).join(', ')}

    </div>`;

  } else {

    html += `<div style="color:#c84b31; font-weight:850; font-size:1.05rem; margin-bottom:0.75rem;">

      ❌ No Equilibrium Index exists (-1). Total array sum = ${total}, but no pivot balanced the prefix and suffix sums.

    </div>`;

  }

  html += `<details style="margin-top:0.6rem; cursor:pointer;"><summary style="font-weight:750; font-size:0.85rem; color:var(--text-muted);">View Step-by-Step O(N) Trace Table (Total Sum = ${total})</summary>

    <table class="trace-table" style="margin-top:0.6rem;">

      <thead><tr><th>Index i</th><th>T[i]</th><th>Prefix Left Sum</th><th>Suffix Right Sum</th><th>Equilibrium?</th></tr></thead>

      <tbody>${traceRows.join('')}</tbody>

    </table>

  </details>`;

  res.innerHTML = html;

  if (window.monsterCompanion) {

    if (equilibria.length > 0) {

      window.monsterCompanion.react('correct');

    } else {

      window.monsterCompanion.say('Evaluated! No equilibrium pivot found. The prefix and suffix sums never balanced! ⚖️', 'pop');

    }

  }

};

// Challenge 2: Multi-Leader Extraction & Strict Suffix Monotonic Dominance

window.loadLeadPreset = function(arrStr) {

  document.getElementById('ex-lead-input').value = arrStr;

  window.solveLeaders();

};

window.solveLeaders = function() {

  const raw = document.getElementById('ex-lead-input').value;

  const arr = raw.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));

  const res = document.getElementById('ex-lead-res');

  if (!arr.length) {

    res.innerHTML = '<span style="color:#c84b31;">Please enter a valid array.</span>';

    return;

  }

  const n = arr.length;

  const leaders = [];

  const suffixMax = new Array(n);

  let currentMax = -Infinity;

  // Backward scan

  for (let i = n - 1; i >= 0; i--) {

    suffixMax[i] = currentMax;

    if (arr[i] > currentMax) {

      leaders.push({ index1: i + 1, val: arr[i] });

      currentMax = arr[i];

    }

  }

  leaders.reverse();

  let html = `<div style="color:#059669; font-weight:850; font-size:1.05rem; margin-bottom:0.75rem;">

    👑 Found ${leaders.length} Dominant Leader${leaders.length > 1 ? 's' : ''}: 

    [ ${leaders.map(l => `<code>T[${l.index1}] = ${l.val}</code>`).join(', ')} ]

  </div>

  <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.6rem;">

    Strict Dominance Rule: An element is a leader if and only if <code>T[i] &gt; max(T[i+1..N])</code>. The rightmost element <code>T[${n}] = ${arr[n-1]}</code> is unconditionally a leader.

  </p>`;

  const traceRows = [];

  for (let i = 0; i < n; i++) {

    const isLead = leaders.some(l => l.index1 === i + 1);

    const sMax = suffixMax[i] === -Infinity ? '∅ (End)' : suffixMax[i];

    traceRows.push(`<tr><td>${i+1}</td><td><strong>${arr[i]}</strong></td><td>${sMax}</td><td>${isLead ? '<span style="color:#059669; font-weight:800;">👑 LEADER</span>' : 'No (Dominated)'}</td></tr>`);

  }

  html += `<details style="margin-top:0.4rem; cursor:pointer;"><summary style="font-weight:750; font-size:0.85rem; color:var(--text-muted);">View O(N) Suffix Dominance Trace</summary>

    <table class="trace-table" style="margin-top:0.6rem;">

      <thead><tr><th>Index i</th><th>T[i]</th><th>Max to the Right</th><th>Status</th></tr></thead>

      <tbody>${traceRows.join('')}</tbody>

    </table>

  </details>`;

  res.innerHTML = html;

  if (window.monsterCompanion) {

    window.monsterCompanion.react('correct');

  }

};

// Challenge 3: Cyclic Array Rotation by Arbitrary k (Three-Reversal Algorithm)

window.loadRotPreset = function(arrStr, k, dir) {

  document.getElementById('ex-rot-input').value = arrStr;

  document.getElementById('ex-rot-k').value = k;

  if (dir) document.getElementById('ex-rot-dir').value = dir;

  window.solveRotation();

};

window.solveRotation = function() {

  const raw = document.getElementById('ex-rot-input').value;

  const kVal = parseInt(document.getElementById('ex-rot-k').value || 0);

  const dir = document.getElementById('ex-rot-dir') ? document.getElementById('ex-rot-dir').value : 'left';

  const res = document.getElementById('ex-rot-res');

  let arr = raw.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));

  if (!arr.length) {

    res.innerHTML = '<span style="color:#c84b31;">Please enter a valid array.</span>';

    return;

  }

  const n = arr.length;

  let effectiveK = dir === 'left' ? kVal : -kVal;

  effectiveK = ((effectiveK % n) + n) % n;

  function rev(a, s, e) {

    while (s < e) {

      const t = a[s]; a[s] = a[e]; a[e] = t;

      s++; e--;

    }

  }

  const orig = [...arr];

  const step1 = [...arr];

  rev(step1, 0, effectiveK - 1);

  const step2 = [...step1];

  rev(step2, effectiveK, n - 1);

  const step3 = [...step2];

  rev(step3, 0, n - 1);

  let html = `<div style="color:#059669; font-weight:850; font-size:1.05rem; margin-bottom:0.75rem;">

    🔄 Result after ${dir.toUpperCase()} Rotation by ${kVal} (Effective Shift = ${effectiveK} mod ${n}):<br>

    [ <strong style="color:var(--tile-crimson);">${step3.join(', ')}</strong> ]

  </div>

  <div style="font-size:0.85rem; line-height:1.6; background:var(--bg-card); padding:1rem; border-radius:6px; border:1px solid var(--border-subtle);">

    <strong>Three-Reversal Theorem Execution Steps (O(N) time, O(1) space):</strong><br>

    • <strong>Original:</strong> <code>[ ${orig.join(', ')} ]</code><br>

    • <strong>Step 1:</strong> Reverse prefix <code>T[1..${effectiveK}]</code> &rarr; <code>[ ${step1.join(', ')} ]</code><br>

    • <strong>Step 2:</strong> Reverse suffix <code>T[${effectiveK + 1}..${n}]</code> &rarr; <code>[ ${step2.join(', ')} ]</code><br>

    • <strong>Step 3:</strong> Reverse entire array <code>T[1..${n}]</code> &rarr; <code>[ <strong style="color:#059669;">${step3.join(', ')}</strong> ]</code>

  </div>`;

  res.innerHTML = html;

  if (window.monsterCompanion) {

    window.monsterCompanion.react('correct');

  }

};

// Challenge 4: Complete University Quadratic Equation Analyzer

window.loadQuadPreset = function(a, b, c) {

  document.getElementById('ex-quad-a').value = a;

  document.getElementById('ex-quad-b').value = b;

  document.getElementById('ex-quad-c').value = c;

  window.solveQuadratic();

};

window.solveQuadratic = function() {

  const a = parseFloat(document.getElementById('ex-quad-a').value);

  const b = parseFloat(document.getElementById('ex-quad-b').value);

  const c = parseFloat(document.getElementById('ex-quad-c').value);

  const res = document.getElementById('ex-quad-res');

  if (isNaN(a) || isNaN(b) || isNaN(c)) {

    res.innerHTML = '<span style="color:#c84b31;">Please enter numerical values for a, b, and c.</span>';

    return;

  }

  let html = '';

  if (a === 0) {

    if (b === 0) {

      if (c === 0) {

        html = `<div style="color:#059669; font-weight:850; font-size:1.05rem;">

          ♾️ Indeterminate Equation (0 · x = 0)<br>

          <span style="font-size:0.9rem; font-weight:600; color:var(--text-muted);">Every real number is a solution: <code>S = ℝ</code></span>

        </div>`;

      } else {

        html = `<div style="color:#c84b31; font-weight:850; font-size:1.05rem;">

          ❌ Contradiction / Impossible Equation (${c} = 0)<br>

          <span style="font-size:0.9rem; font-weight:600; color:var(--text-muted);">No values satisfy this statement: <code>S = ∅</code></span>

        </div>`;

      }

    } else {

      const root = -c / b;

      html = `<div style="color:#059669; font-weight:850; font-size:1.05rem;">

        📏 Degenerate Linear Equation (Degree 1): <code>${b}x + ${c} = 0</code><br>

        <span style="font-size:0.95rem; font-weight:700;">Unique Root: <code>x = ${root.toFixed(4)}</code> (exact: <code>${-c}/${b}</code>)</span>

      </div>`;

    }

  } else {

    const delta = b * b - 4 * a * c;

    if (delta > 0) {

      const sq = Math.sqrt(delta);

      const x1 = (-b - sq) / (2 * a);

      const x2 = (-b + sq) / (2 * a);

      html = `<div style="color:#059669; font-weight:850; font-size:1.05rem;">

        ✓ Δ = ${delta} &gt; 0: Two Distinct Real Roots in ℝ<br>

        <span style="font-size:0.95rem; font-weight:700;">x₁ = ${x1.toFixed(4)}</span> &bull; 

        <span style="font-size:0.95rem; font-weight:700;">x₂ = ${x2.toFixed(4)}</span>

      </div>

      <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;">

        Formula: <code>x₁,₂ = (-(${b}) ± √${delta}) / (2 · ${a})</code>

      </div>`;

    } else if (delta === 0) {

      const x0 = -b / (2 * a);

      html = `<div style="color:#059669; font-weight:850; font-size:1.05rem;">

        ✓ Δ = 0: Single Real Double Root (Racine Double)<br>

        <span style="font-size:0.95rem; font-weight:700;">x₀ = ${x0.toFixed(4)}</span>

      </div>

      <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;">

        Formula: <code>x₀ = -b / (2a) = -(${b}) / (2 · ${a})</code>

      </div>`;

    } else {

      const realPart = (-b / (2 * a)).toFixed(4);

      const imagPart = (Math.sqrt(Math.abs(delta)) / (2 * Math.abs(a))).toFixed(4);

      html = `<div style="color:#8a70b5; font-weight:850; font-size:1.05rem;">

        ⚛️ Δ = ${delta} &lt; 0: No Real Roots in ℝ, Two Conjugate Complex Roots in ℂ<br>

        <span style="font-size:0.95rem; font-weight:700;">z₁ = ${realPart} - ${imagPart}i</span> &bull; 

        <span style="font-size:0.95rem; font-weight:700;">z₂ = ${realPart} + ${imagPart}i</span>

      </div>

      <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;">

        Formula: <code>z₁,₂ = (-b ± i√|Δ|) / (2a)</code>

      </div>`;

    }

  }

  res.innerHTML = html;

  if (window.monsterCompanion) {

    window.monsterCompanion.say('Quadratic case tree completely mapped and calculated! 📐', 'happy');

  }

};

// Challenge 5: Arbitrary Matrix Saddle Point Inspector with Minimax Bound

window.loadSaddlePreset = function(r1, r2, r3) {

  document.getElementById('ex-mat-1').value = r1;

  document.getElementById('ex-mat-2').value = r2;

  document.getElementById('ex-mat-3').value = r3;

  window.solveSaddle();

};

window.solveSaddle = function() {

  const r1 = document.getElementById('ex-mat-1').value.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));

  const r2 = document.getElementById('ex-mat-2').value.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));

  const r3 = document.getElementById('ex-mat-3').value.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));

  const res = document.getElementById('ex-mat-res');

  

  if (!r1.length || !r2.length || !r3.length || r1.length !== r2.length || r2.length !== r3.length) {

    res.innerHTML = '<span style="color:#c84b31;">All 3 rows must have the same number of comma-separated integers.</span>';

    return;

  }

  const mat = [r1, r2, r3];

  const R = 3;

  const C = r1.length;

  const rowMins = [];

  for (let i = 0; i < R; i++) {

    rowMins.push(Math.min(...mat[i]));

  }

  const colMaxs = [];

  for (let j = 0; j < C; j++) {

    let mx = -Infinity;

    for (let i = 0; i < R; i++) {

      if (mat[i][j] > mx) mx = mat[i][j];

    }

    colMaxs.push(mx);

  }

  const saddles = [];

  for (let i = 0; i < R; i++) {

    for (let j = 0; j < C; j++) {

      if (mat[i][j] === rowMins[i] && mat[i][j] === colMaxs[j]) {

        saddles.push({ r: i + 1, c: j + 1, val: mat[i][j] });

      }

    }

  }

  let html = '';

  if (saddles.length > 0) {

    html += `<div style="color:#059669; font-weight:850; font-size:1.05rem; margin-bottom:0.75rem;">

      🎯 Detected ${saddles.length} Saddle Point${saddles.length > 1 ? 's' : ''} (Point-Selle):<br>

      ${saddles.map(s => `<code>M[${s.r}, ${s.c}] = ${s.val}</code> (Min in Row ${s.r}, Max in Col ${s.c})`).join('<br>')}

    </div>`;

  } else {

    html += `<div style="color:#c84b31; font-weight:850; font-size:1.05rem; margin-bottom:0.75rem;">

      ❌ No Saddle Point exists in this matrix configuration.<br>

      <span style="font-size:0.85rem; font-weight:600; color:var(--text-muted);">

        Max of Row Minimums = ${Math.max(...rowMins)} &bull; Min of Column Maximums = ${Math.min(...colMaxs)}.

      </span>

    </div>`;

  }

  html += `<details style="margin-top:0.4rem; cursor:pointer;" open><summary style="font-weight:750; font-size:0.85rem; color:var(--text-muted);">Matrix Grid & Extrema Vectors</summary>

    <div style="font-size:0.85rem; margin-top:0.6rem; font-family:var(--font-mono); line-height:1.6;">

      Row Mins: [ ${rowMins.join(', ')} ]<br>

      Col Maxs: [ ${colMaxs.join(', ')} ]

    </div>

  </details>`;

  res.innerHTML = html;

  if (window.monsterCompanion) {

    if (saddles.length > 0) {

      window.monsterCompanion.react('correct');

    } else {

      window.monsterCompanion.say('Matrix scanned! No saddle point found across row minima and column maxima! 🔍', 'pop');

    }

  }

};

window.openDrawer = function() {

  document.getElementById('drawer-overlay').classList.add('open');

  document.getElementById('drawer-content').classList.add('open');

};

window.closeDrawer = function() {

  document.getElementById('drawer-overlay').classList.remove('open');

  document.getElementById('drawer-content').classList.remove('open');

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

    title: 'Begin 2026 : Fondations & Knuth',

    desc: "Les 5 propriétés de Donald Knuth, typage strict des identificateurs et exécution séquentielle sur table de trace mémoire.",

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

    title: 'Conditionnels & Logique Booléenne',

    desc: "Arbres de décision exhaustifs, opérateurs logiques courts-circuits et résolution rigoureuse des cas dégénérés du 2nd degré.",

    art: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

      <rect width="100" height="100" rx="16" fill="#c84b31"/>

      <polygon points="50,15 82,45 50,75 18,45" fill="#ffffff" stroke="#181716" stroke-width="2.5"/>

      <text x="50" y="42" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="850" fill="#181716">x &gt; 0 ?</text>

      <path d="M 18 45 L 8 45 L 8 72 L 20 72" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>

      <text x="14" y="66" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="800" fill="#f6c83b">NON</text>

      <path d="M 82 45 L 92 45 L 92 72 L 80 72" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>

      <text x="86" y="66" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="800" fill="#f6c83b">OUI</text>

    </svg>`

  },

  {

    num: '03',

    title: 'Boucles & Itérations',

    desc: "Contrôle de répétition déterministe avec Pour, et itérations dynamiques conditionnelles TantQue et Répéter-Jusqu'à.",

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

    title: 'Tableaux 1D & Chaînes ASCII',

    desc: "Vecteurs statiques contigus en mémoire, inversion in-place par pointeurs et manipulation de caractères ASCII.",

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

    title: 'Matrices 2D & Diagonales',

    desc: "Tableaux bidimensionnels, équations de diagonales principale (i=j) et secondaire (i+j=N+1), et points-selle minimax.",

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

    title: 'Tri & Recherche Dicho',

    desc: "Tri par Sélection O(N²), Tri à Bulles avec drapeau d'arrêt O(N), et Recherche Dichotomique logarithmique O(log N).",

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

    title: 'Fonctions & Pile d’Exécution',

    desc: "Modularité procédurale, passage par valeur vs variable (pointeur), et gestion des contextes locaux dans le Call Stack.",

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

    title: 'Coffre Final & Défis d’Examen',

    desc: "Théorie des nombres, équilibres préfixes-suffixes, extraction de leaders et rotation par les 3 renversements.",

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

  // 1. Counter

  const numEl = document.getElementById('timeline-counter-num');

  if (numEl) {

    numEl.style.transform = 'scale(0.9)';

    numEl.style.opacity = '0.4';

    setTimeout(() => {

      numEl.textContent = stepData.num;

      numEl.style.transform = 'scale(1)';

      numEl.style.opacity = '1';

    }, 80);

  }

  // 2. Headings

  const titleEl = document.getElementById('timeline-step-title');

  const descEl = document.getElementById('timeline-step-desc');

  if (titleEl) {

    titleEl.style.opacity = '0';

    setTimeout(() => {

      titleEl.textContent = stepData.title;

      titleEl.style.opacity = '1';

    }, 100);

  }

  if (descEl) {

    descEl.style.opacity = '0';

    setTimeout(() => {

      descEl.textContent = stepData.desc;

      descEl.style.opacity = '1';

    }, 100);

  }

  // 3. Vector Art

  const artEl = document.getElementById('timeline-art-container');

  if (artEl) {

    artEl.style.opacity = '0';

    artEl.style.transform = 'scale(0.9)';

    setTimeout(() => {

      artEl.innerHTML = stepData.art;

      artEl.style.opacity = '1';

      artEl.style.transform = 'scale(1)';

    }, 100);

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

  const totalScroll = track.offsetHeight - window.innerHeight;

  const targetY = track.offsetTop + ((stepIndex - 1) / 7) * totalScroll;

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

  if (!track) return;

  function handlePinnedScroll() {

    if (currentView !== 'home') return;

    const trackRect = track.getBoundingClientRect();

    const totalScroll = track.offsetHeight - window.innerHeight;

    if (totalScroll <= 0) return;

    // How far user has scrolled inside this pinned track

    const scrolled = -trackRect.top;

    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

    // Map 0..1 progress to step 1..8

    let step = Math.min(8, Math.max(1, Math.floor(progress * 8) + 1));

    updateWoonpactStepUI(step);

  }

  window.addEventListener('scroll', handlePinnedScroll, { passive: true });

  window.addEventListener('resize', () => { alignPillToActiveTick(activeWoonpactStep); }, { passive: true });

  // Initial sync

  setTimeout(handlePinnedScroll, 100);

}

// Make globally accessible

window.initPinnedWoonpactTimeline = initPinnedWoonpactTimeline;

