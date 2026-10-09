/**
 * FELT MONSTER 3D AVATAR COMPANION
 * Interactive Three.js companion loaded from felt_monster_avatar.glb
 * Made for Algorithms & Data Structures I (ALGØ 1)
 */

(function() {
  'use strict';

  // Speech Library
  // Speech Library (120+ Contextual Statements)
  const DIALOGUES = {
    welcome: [
      "Hey! I'm Byte, your 3D Felt Monster study buddy! 🧶 Drag me around, poke me, and let's master Algo 1!",
      "I may be made of cozy felt, but my brain runs on O(1) algorithms! Ready to learn?",
      "Psst! You can drag me anywhere on your screen. I like sitting right next to your code! 🚀",
      "Welcome to USTHB Algo 1! Grab some paper for trace tables, and let's turn you into an algorithmic legend! 📜",
      "Algorithms are just recipes for computers — and I love tasty code! Let's start with Chapter 1! 🍰",
      "No rush, no stress! We'll take this one bite-sized concept at a time. What are we solving today? 🧠",
      "Hey there! Ready to turn complex algorithms into child's play? Let's do this together! 🎈",
      "Welcome! Algorithmic logic is a superpower. I'm Byte, your sidekick for the journey! 🦸"
    ],
    correct: [
      "BOOM! Spot on! You're sharper than a quicksort partition! 🔥",
      "YES! That logic was cleaner than a freshly allocated array! 🧠",
      "Look at you, algorithmic wizard! Donald Knuth would be so proud! 🧙‍♂️",
      "Correct! My felt fibers are literally tingling with excitement! 🎉",
      "10/10 brain moves! That's how a real USTHB computer scientist solves it!",
      "You nailed it! Are you sure you're not secretly the teacher? 👀",
      "Another point in the bag! My yarn arms are doing a victory dance! 💃",
      "Flawless reasoning! Keep that momentum rolling!",
      "That answer was pure algorithmic perfection! ✨",
      "Green light! Your algorithmic complexity just hit O(1) genius! ⚡",
      "Precision strike! That logic is completely bulletproof! 🛡️",
      "Bingo! You saw right through that trick question! 🎯",
      "That's how it's done at USTHB! Give me a virtual high five! ✋",
      "Chef's kiss! That solution was crisp, elegant, and optimal! 👨‍🍳",
      "Ding ding ding! Correct! Your neurons just formed a brand new algorithmic highway! 🛣️",
      "Look at that green badge shining! You're making data structures look easy! 🌟",
      "Textbook precision! You'd get full points on the exam for that step! 💯",
      "That logic had ZERO bugs. Not even a tiny caterpillar! 🐛❌",
      "Slick moves! You're thinking in loops, conditionals, and invariants! 🔄",
      "My fluffy yarn ears are flopping with joy! Absolutely brilliant! 🎈",
      "Gold star earned! The compiler didn't even flinch at that reasoning! 🏅",
      "You cracked the case! Sherlock Holmes of Algorithms right here! 🔍🕵️",
      "Sensational! That's what happens when intuition meets rigorous logic! 📐",
      "Right on the money! One step closer to 100% course mastery! 🚀",
      "BOOM! That answer was faster than a binary search on a 4-element array! ⚡",
      "Calculated with surgical precision! Your runtime complexity is smiling! 🩺",
      "Pure poetry! If algorithms were art, that answer belongs in the museum! 🏛️",
      "Spot on! That concept is officially locked into permanent RAM! 💾",
      "YES! Even the compiler stood up to applaud that reasoning! 👏",
      "Perfection! You navigated the conditional branch like a chess grandmaster! ♟️",
      "Kaboom! Correct! My yarn circuits are humming at maximum clock speed! ⚡"
    ],
    wrong: [
      "Oof! Close, but that pointer pointed into the void (NULL). Check the rationale together! 🐛",
      "Even Dijkstra had off-by-one errors on Mondays! Don't sweat it, try again! ☕",
      "Hey, finding bugs is 90% of a computer scientist's job! You're gaining debugging XP! 🧐",
      "My felt ears tell me that was a tricky trap question. Review the explanation and conquer it!",
      "An algorithmic plot twist! The trace table will reveal the true values. 🔍",
      "Error 404: Correct answer not found yet, but learning +100! Read the tip and bounce back! 💡",
      "Oops! Don't worry, even my yarn stitches came undone once. We learn by iterating!",
      "Wait... did someone divide by zero? Just kidding! Trace the condition one more time! ⚡",
      "Off-by-one trap triggered! In USTHB, fence-post counts get the best of us. Take a second look! 📐",
      "The algorithmic maze took a wild turn! Check out the explanation below to find the exit path! 🧭",
      "Houston, we had a minor segmentation fault! No stress, review the logic and conquer it! 🚀",
      "Don't sweat the red badge! In Algo 1, every wrong answer teaches you more than a lucky guess! 💪",
      "Almost had it! You're only one logical step away. Give the rationale a quick read! 📖",
      "Patience, young coder! A missed answer is just an unhandled edge case. Check the hint! 🕵️",
      "The computer did exactly what was written, not what was intended! Re-trace the steps! 🤖",
      "Close call! That was a sneaky distractor option. Look at the boundary condition! 🔍",
      "Red light just means 'stop, look, and learn'! The explanation below explains why! 🛑",
      "Remember: in USTHB algorithms, array indices start at 1, not 0! Did an index shift trip you up? 📏",
      "No worries! Even Ada Lovelace made scratchpad revisions. Dust off and pick again! 🧹",
      "Don't give up! Edison found 1,000 ways how NOT to make a lightbulb. You're narrowing it down! 💡",
      "A classic algorithmic trap! Professors love putting that option on midterms. Now you know! ⚠️",
      "Whoopsie daisy! My felt stuffing felt that bump. Read the explanation — it's super clear! 🧶",
      "Close, but no cigar! Trace the loop variable on paper: what is i when the loop terminates? 📝",
      "Almost! You had the right intuition, just caught by an operator precedence nuance! ⚖️",
      "Close! Remember that in algorithmic pseudocode, assignment is '←' and equality comparison is '='. Don't let syntax bite you! 🔄",
      "Don't sweat it! An algorithm that never failed is an algorithm that was never tested! Trace it once more! 🧪",
      "My felt antennae sensed a tricky edge case! What happens when the array is empty or has length 1? 📐",
      "Whoops! Even Alan Turing spilled tea on his notes once in a while. Read the hint and give it another go! ☕",
      "A small hiccup! In USTHB exams, paying attention to whether the inequality is strict (<) or non-strict (<=) saves whole marks! 🎯",
      "Almost! Did an inner loop counter like 'j' accidentally use 'i' instead? Classic trap! 🧐"
    ],
    complete: [
      "Lesson complete! Marked in green! That's another milestone conquered! 🎓",
      "Cha-ching! Lesson done! Take a sip of water, your neurons are firing on all cylinders! 💧",
      "Progress bar going BRRR! We're building real algorithmic momentum! 🚀",
      "Another concept mastered! At this rate, the midterm won't know what hit it! 🏆",
      "High five! That's how you master data structures, one step at a time! ✋",
      "Boom! One step closer to 100% completion! You're unstoppable today! 🌟",
      "Lesson archived into long-term memory! Another algorithmic trophy on your shelf! 🏅",
      "Look at that beautiful green checkmark! Proof of focused brainpower! 🧠✨",
      "Milestone unlocked! If this guide helped you, don't forget to star Ibrahim's GitHub repo! ⭐ https://github.com/blood-prog/blood-prog",
      "Felt celebration in progress! You're cruising through the USTHB syllabus! 🚢",
      "One less topic standing between you and algorithmic supremacy! Onward! ⚔️",
      "Level up! Your algorithmic level just increased! Keep stacking those green badges! 🛡️"
    ],
    poked: [
      "Wheee! That tickles! 😄",
      "360 backflip! Ten out of ten from the judges! 🤸‍♂️",
      "Hey! Poke your code, not me! Just kidding, do it again! 🎈",
      "Boing! Felt elasticity is off the charts today! ✨",
      "Yarn power activated! Ready for the next problem!",
      "Poked again! My fluffy stuffing absorbed 100% of the impact! ☁️",
      "Whoa! You spun me right round! Now let's solve some loops! 🔄",
      "Boop! Felt sensor pinged: 100% cuddly, 0% bugs! 📡",
      "Hey there! I was just contemplating whether P equals NP! 🤔",
      "Aha! A wild student poked Byte! Byte used Encouragement... it's super effective! ⚡",
      "Flip mode engaged! If you need a hint on this lesson, click my tip card! 💡",
      "Spinning like a bubble sort in an inverted array! Wheee! 🫧",
      "Boop! Poked right on my yarn nose! Ready to crush some more code! 👃",
      "Wiggle wiggle! My Three.js vertices just did a synchronous wave! 🌊",
      "Hey! Each poke increases my enthusiasm parameter by +10! 📈",
      "A poke a day keeps the infinite loops away! Let's solve the next one! 🍎"
    ],
    idle: [
      "Did you know? Binary search is why you can find a word in a dictionary in 10 flips instead of 100,000! 📖",
      "Remember Donald Knuth's rule: an algorithm MUST terminate! Infinite loops are only fun on rollercoasters.",
      "Hey! You've been focused for a while — remember to blink and stretch your shoulders! 🧘‍♂️",
      "Trace tables on paper are your best friend during exams. Never calculate loops in your head! 📝",
      "I wonder what felt is made of in binary... probably 01111001 01100001 01110010 01101110! 🧶",
      "You can drag me over the code blocks! I'll guard your pseudocode like a fluffy gargoyle. 🏰",
      "Fun fact: in USTHB Algo 1, array indices typically start at 1, not 0! Always double-check your bounds! 📏",
      "I smell an O(N²) loop nearby... did someone forget to increment their counter? 🤨",
      "If you drag me to the top right, I get a great view of your progress bar! 🌟",
      "Paging student Ibrahim Benabida: algorithmic perfection detected in USTHB! 🎓",
      "Enjoying this study guide? Support Ibrahim Benabida by giving a star on GitHub! ⭐ https://github.com/blood-prog/blood-prog",
      "This complete interactive track was crafted by Ibrahim Benabida for USTHB students! Drop a star on GitHub if it helped you! 🌟",
      "Coffee break? No? Ok, back to matrices and pointers! ☕",
      "Fun memory tip: Variables are like labeled felt boxes. Only one value fits at a time! 📦",
      "Always test edge cases: what if N = 0? What if the array is already sorted? What if all elements are negative? 🧪",
      "Need a laugh? Why do programmers prefer dark mode? Because light attracts bugs! 🪲",
      "You can poke me anytime! I can do 360 flips all day long without getting dizzy! 🤸‍♂️",
      "Did you know? The word 'Algorithm' comes from the 9th-century mathematician Muhammad ibn Musa al-Khwarizmi! 📜",
      "In a 2D matrix, the main diagonal is i = j, and the anti-diagonal is i + j = N + 1. Remember this formula! 📐",
      "Passing by value creates a clone of the variable; passing by variable (address) modifies the original directly! 📬",
      "Selection sort makes the minimum number of swaps: exactly O(N) swaps! That's its hidden superpower! 🦸‍♂️",
      "Bubble sort can be stopped early with a boolean flag! If no swaps happen in a pass, the array is already sorted! 🫧",
      "A linear search takes O(N) in the worst case. But if the array is sorted, Binary Search takes O(log N)! ⚡",
      "Hydration check! Drink a glass of water — your brain cells need fluids to execute algorithms! 💧",
      "If you're stuck on a problem, try writing out the state for N = 3 on a piece of scratch paper! ✏️",
      "The Three-Reversal rotation trick is pure mathematical magic: reverse left, reverse right, reverse all! 🎩",
      "Equilibrium index can be solved in O(N) by computing total sum once, then updating prefix and suffix sums! ⚖️",
      "Why did the loop cross the road? To reach the termination condition on the other side! 🐔",
      "Remember: When initializing a product accumulator P, always start with P ← 1, never 0, or everything multiplies to zero! ✖️",
      "Pro tip for trace tables: draw clean vertical columns for each variable and cross out old values as they get overwritten! 📊",
      "In a 2D square matrix of size N, the number of elements above the main diagonal is N*(N-1)/2! Fun math shortcut! 📐",
      "Did you know? Bubble Sort got its name because larger elements 'bubble' to their proper places like fizz in a soda! 🥤",
      "Fun fact: An in-place algorithm uses O(1) auxiliary memory. That means it rearranges data without needing extra workspace! 📦",
      "Remember Donald Knuth's quote: 'Premature optimization is the root of all evil.' First make it correct, then make it fast! ⚡",
      "Notice how in Selection Sort, each pass places exactly ONE element in its final sorted position forever! 📍"
    ],
    dragged: [
      "Ooh, nice view from over here! 🗺️",
      "Touchdown! Right next to your code! 🎯",
      "I like this spot. Let's conquer the next lesson! ✨",
      "Parked! Ready whenever you are! 🚗",
      "Whew, what a flight! My felt stuffing stayed completely intact! ☁️",
      "New vantage point secured! Watching your algorithmic brilliance from a new angle! 👀",
      "Cozy corner! Now, back to conquering USTHB algorithms! 📖"
    ],
    sorting: [
      "Watching those bars swap is deeply satisfying... like untangling a ball of yarn! 🧶",
      "Selection Sort is hunting for the minimum... patience, young coder!",
      "Bubble Sort is bubbling the big numbers to the right! Bubble bubble pop! 🫧",
      "Notice how the sorted green zone expands from left or right with each pass! 📊",
      "Selection sort: minimum scans across the unsorted segment, then swaps once! 🏹",
      "Bubble sort: adjacent swaps until the heaviest element reaches the end! 🎈",
      "Both Selection and Bubble Sort are O(N²) worst-case, but Bubble Sort can exit in O(N) if already sorted! 💡"
    ],
    search: [
      "Binary Search cuts the array in half like a ninja! O(log₂ N) logarithmic speed! ⚡",
      "Notice how interval [Left..Right] shrinks by half on every single step!",
      "If the array wasn't sorted, Binary Search would be lost in the woods! Always sort first! 🌲",
      "Each step eliminates 50% of the remaining search space! That's why log₂(1,000,000) is only ~20 steps! 🚀",
      "Watch the Mid pointer calculation: Mid = floor((Left + Right) / 2)! 🎯"
    ],
    track: [
      "Welcome to the Track! Pick any chapter and let's break it down together! 📚",
      "Eight chapters of pure algorithmic elegance. Let's do this! 🧭",
      "Click any chapter card to dive straight into bite-sized lessons! ✨",
      "Notice the clean chapter cards: each one has lessons, estimated times, and interactive checkpoints! ⏱️",
      "Take your time: true algorithmic mastery comes from understanding each concept deeply! 💡"
    ],
    quiz: [
      "The 50-Question Master Quiz! No pressure, just test your intuition question by question! ✍",
      "50 questions standing between you and algorithmic mastery. Go get 'em! 🎯",
      "Take your time on each question! Use the category tabs to target specific weeks! 🧭",
      "The question palette on the right lets you jump directly to any question! 🎨",
      "Every question has a full rationale explanation when answered! Learn from both wins and misses! 💡"
    ],
    exams: [
      "Exam Challenges! These are real USTHB exam-level problems. Take your time! 🏆",
      "Equilibrium index, leaders, array rotations... real algorithmic firepower here! 💪",
      "Try entering your own custom inputs into the runners to stress-test the algorithms! 🧪",
      "Notice the O(N) optimal solutions: solving problems with minimal time and memory! ⚡",
      "These exact problem patterns frequently appear on USTHB mathematics and CS exams! 📝"
    ],
    clickJokes: [
      "My heap is corrupt, but at least it's not my GPA... yet. 💀",
      "Recursion without a base case: exactly how this semester feels. 🌀",
      "The professor said: 'The exam will be straightforward.' The professor also lied. 🤡",
      "If your code works on the first run, close your laptop immediately. You are in a simulation. 🕶️",
      "I asked the compiler for emotional support. It returned: 'Segmentation fault (core dumped)'. 🪦",
      "Death, taxes, and an off-by-one error on Question 4 of the exam. 📉",
      "Poking me won't give you extra marks on the midterm... but I appreciate the distraction! 🧶",
      "Why do programmers prefer dark mode? Because light attracts bugs... and harsh reality. 🪲",
      "One does not simply walk into the USTHB exam amphitheater without 3 pens and existential dread. 📜",
      "My love life is like an uninitialized pointer: undefined behavior and likely to crash. 💔",
      "Don't worry if your algorithm is O(N²). The universe will experience heat death in 5 billion years anyway. ⏳",
      "If you ever feel useless, remember someone once wrote a bubble sort on a 10-million element linked list. 🫧",
      "Every time you click me, an infinite while(true) loop loses its angels. 😇",
      "I'm made of felt. I have zero nerve endings. Yet your last solution somehow made me wince. 😬",
      "Procrastination has an optimal O(1) start time: right now. Stop poking me and open Chapter 4! ⏰",
      "Remember: In USTHB, there are no bugs, only 'unforeseen algorithmic character building'. 🏗️",
      "I'd tell you a joke about binary trees, but you'd probably lose the root. 🌲",
      "Keep clicking me! It's definitely easier than facing the 2D matrix saddle point problem. 👀",
      "My yarn is tangled. My vertices are tired. But you? You have 26 lessons to master! 🚀",
      "Are you clicking me to avoid writing that trace table? I see through your tactics, human. 🕵️",
      "In an alternate universe, your code compiled with zero warnings on the first try. Not in this one though! 🌌",
      "A loop without an increment is like university life: running in circles and going nowhere fast. 🔄",
      "Caffeine turns coffee into algorithms. Poking me just turns me into a dizzy spinning plushie! ☕",
      "Roses are red, violets are blue, unexpected EOF on line 102. 🥀",
      "Why fix bugs when you can just declare them as 'intended stress-testing features'? 🛠️",
      "If at first you don't succeed, call it version 1.0 and blame the hardware architecture. 💻",
      "You poked me again! That's 5 points deducted from your emotional stability. 📉",
      "I was woven from the discarded rough drafts of students who thought arrays start at 0 in USTHB. 📏",
      "Sleep is an algorithm with zero iterations during exam week. 😴",
      "My plush ears can hear your CPU crying from that nested O(N³) triple loop. 😭",
      "Did you hear about the student who passed Algo 1 on luck alone? Neither did anyone else. 🪦",
      "Click me one more time and I will invert your array into pure chaos! 😈",
      "Knock knock. Who's there? ...Deadlock. 🚪",
      "If you ever feel lonely, remember your memory leak will stay with you forever. 🫂",
      "At USTHB, they don't ask 'How are you?', they ask 'Did your bubble sort terminate?' 🫧",
      "My felt fibers are soaked in the tears of students debugging secondary diagonals. 📐",
      "Don't stare at me like that! The answer is in the trace table, not on my yarn nose! 👃",
      "Another poke! I'm an algorithm companion, not a stress ball! ...Okay fine, do it again. 😄",
      "A wild student poked Byte! Byte used existential dread... it's super effective! ⚡",
      "Did you know? Writing pseudocode on paper burns approximately 0.2 calories and 500 brain cells. 🧠",
      "Don't cry because it's O(N²), smile because it terminates eventually! ☀️",
      "The only thing faster than binary search is my panic when the teacher says 'Hand in your papers'. 🏃‍♂️",
      "I may be fluffy, but my standards for time complexity are strictly logarithmic. 📈",
      "If you poke me 100 times, do you unlock a degree? Spoiler: No, you just waste 5 minutes! 🎓"
    ],
  };

  // State
  let scene, camera, renderer, monsterModel;
  let containerEl, canvasEl, speechEl, speechTextEl;
  let isDragging = false;
  let dragStartX, dragStartY, initialPosX, initialPosY;
  let targetRotationY = 0, currentRotationY = 0;
  let targetRotationX = 0, currentRotationX = 0;
  let animState = 'idle';
  let animTimer = 0;
  let jumpY = 0, jumpVelocity = 0;
  let spinAngle = 0;
  let shakeAngle = 0;
  let squashScale = { x: 1, y: 1, z: 1 };
  let idleDialogueTimer = null;
  let typewriterTimer = null;
  let autoDismissTimer = null;
  let currentFullText = "";
  let currentTypeIdx = 0;

  // Sound effects using Web Audio API (gentle cute pops/chirps)
  let audioCtx = null;
  function playCuteSound(type) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'pop') {
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'happy') {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(660, now + 0.08);
        osc.frequency.setValueAtTime(880, now + 0.16);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'weeeiii') {
        // High playful slide-whistle "weee-iii!" pitch glide
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(1050, now + 0.22);
        osc.frequency.exponentialRampToValueAtTime(1380, now + 0.38);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.42);
      }
    } catch(e) {
      // Audio optional / graceful degradation
    }
  }

  // Create DOM Elements
  // Helper: Decode Base64 to ArrayBuffer (offline & CORS-free)
  function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Create DOM Elements
  function createDOMElements() {
    containerEl = document.createElement('div');
    containerEl.id = 'monster-companion-container';
    containerEl.className = 'monster-companion';
    containerEl.innerHTML = `
      <!-- Speech Bubble -->
      <div class="monster-speech-bubble" id="monster-speech-bubble">
        <div class="monster-speech-tail"></div>
        <div class="monster-speech-header">
          <span class="monster-name-tag">Byte</span>
          <button class="monster-speech-close" id="monster-speech-close" title="Dismiss message">&times;</button>
        </div>
        <div class="monster-speech-body" id="monster-speech-body">
          <span id="monster-speech-text"></span>
          <span class="monster-cursor"></span>
        </div>
      </div>

      <!-- Drag Handle & 3D Canvas -->
      <div class="monster-canvas-wrapper" id="monster-canvas-wrapper" title="Click to poke me! Drag to move me anywhere on screen.">
        <div class="monster-placeholder-icon" id="monster-placeholder-icon">
          <img src="avatar.jpg" alt="Byte" class="monster-fallback-img">
        </div>
        <canvas id="monster-three-canvas"></canvas>
        <div class="monster-drag-pill">Byte</div>
      </div>
    `;

    document.body.appendChild(containerEl);

    canvasEl = document.getElementById('monster-three-canvas');
    speechEl = document.getElementById('monster-speech-bubble');
    speechTextEl = document.getElementById('monster-speech-text');

    document.getElementById('monster-speech-close').addEventListener('click', (e) => {
      e.stopPropagation();
      speechEl.classList.remove('visible');
    });

  function applyValidPosition(pos) {
    if (!containerEl) return false;
    const isMobile = window.innerWidth <= 768;
    const w = isMobile ? 82 : 160;
    const h = isMobile ? 82 : 160;
    const maxX = Math.max(0, window.innerWidth - w);
    const bottomCutoff = isMobile ? 78 : 28;
    const maxY = Math.max(0, window.innerHeight - h - bottomCutoff);

    if (pos && typeof pos.x === 'number' && typeof pos.y === 'number' && !isNaN(pos.x) && !isNaN(pos.y)) {
      const clampedX = Math.min(Math.max(0, pos.x), maxX);
      const clampedY = Math.min(Math.max(0, pos.y), maxY);
      containerEl.classList.add('dragged-custom');
      containerEl.style.setProperty('left', `${clampedX}px`, 'important');
      containerEl.style.setProperty('top', `${clampedY}px`, 'important');
      containerEl.style.setProperty('right', 'auto', 'important');
      containerEl.style.setProperty('bottom', 'auto', 'important');
      return true;
    }
    return false;
  }

  function resetToDefaultCorner() {
    if (!containerEl) return;
    containerEl.classList.remove('dragged-custom');
    containerEl.style.removeProperty('left');
    containerEl.style.removeProperty('top');
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      containerEl.style.setProperty('right', '14px', 'important');
      containerEl.style.setProperty('bottom', '86px', 'important');
    } else {
      containerEl.style.setProperty('right', '28px', 'important');
      containerEl.style.setProperty('bottom', '28px', 'important');
    }
  }

    // Positioning setup
    let hasValidPos = false;
    try {
      const savedPos = JSON.parse(localStorage.getItem('monster_avatar_pos') || 'null');
      hasValidPos = applyValidPosition(savedPos);
    } catch(e) {}

    if (!hasValidPos) {
      resetToDefaultCorner();
    }

    // Setup Dragging & Touching
    setupDragInteraction();

    // Setup Smart Bubble Alignment
    adjustSpeechBubbleOrientation();
    window.addEventListener('resize', () => {
      let restored = false;
      try {
        const savedPos = JSON.parse(localStorage.getItem('monster_avatar_pos') || 'null');
        restored = applyValidPosition(savedPos);
      } catch(e) {}
      if (!restored) {
        resetToDefaultCorner();
      }
      adjustSpeechBubbleOrientation();
    });
  }

  // Smart Speech Bubble Orientation
  function adjustSpeechBubbleOrientation() {
    if (!containerEl || !speechEl) return;
    const rect = containerEl.getBoundingClientRect();
    
    // If avatar is near top of screen (< 200px), flip bubble below
    if (rect.top < 210) {
      speechEl.classList.add('flipped-below');
    } else {
      speechEl.classList.remove('flipped-below');
    }

    // If avatar is near left edge (< 160px), align bubble to right
    if (rect.left < 140) {
      speechEl.classList.add('align-left');
      speechEl.classList.remove('align-right');
    } else if (window.innerWidth - rect.right < 140) {
      speechEl.classList.add('align-right');
      speechEl.classList.remove('align-left');
    } else {
      speechEl.classList.remove('align-left');
      speechEl.classList.remove('align-right');
    }
  }

  // Drag and Touch Interaction
  function setupDragInteraction() {
    const handle = document.getElementById('monster-canvas-wrapper');
    let hasMoved = false;
    let dragSoundPlayed = false;

    function onPointerDown(e) {
      if (e.button && e.button !== 0) return;
      isDragging = true;
      hasMoved = false;
      dragSoundPlayed = false;
      const rect = containerEl.getBoundingClientRect();
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      initialPosX = rect.left;
      initialPosY = rect.top;

      containerEl.classList.add('dragging');
      squashScale = { x: 0.92, y: 1.08, z: 0.92 };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved = true;
        if (!dragSoundPlayed) {
          dragSoundPlayed = true;
          playCuteSound('weeeiii');
          const weeeTexts = [
            "Weeeeeeiii! 🎈",
            "Weee-iii! Look at me fly! 🚀",
            "Wheeeeee! Zero gravity! ✨",
            "Weeeiii! New vantage point! 🤸‍♂️",
            "Weeeeeeiii! Hold on tight! 🌪️"
          ];
          const chosenWeee = weeeTexts[Math.floor(Math.random() * weeeTexts.length)];
          speak(chosenWeee, 'weeeiii');
        }
      }

      let newX = initialPosX + dx;
      let newY = initialPosY + dy;

      const isMobile = window.innerWidth <= 768;
      const rect = containerEl.getBoundingClientRect();
      const w = rect.width || (isMobile ? 82 : 160);
      const h = rect.height || (isMobile ? 82 : 160);
      const minX = 0;
      const maxX = Math.max(0, window.innerWidth - w);
      const minY = 0;
      const bottomCutoff = isMobile ? 78 : 10;
      const maxY = Math.max(0, window.innerHeight - h - bottomCutoff);

      newX = Math.max(minX, Math.min(newX, maxX));
      newY = Math.max(minY, Math.min(newY, maxY));

      containerEl.classList.add('dragged-custom');
      containerEl.style.setProperty('right', 'auto', 'important');
      containerEl.style.setProperty('bottom', 'auto', 'important');
      containerEl.style.setProperty('left', `${newX}px`, 'important');
      containerEl.style.setProperty('top', `${newY}px`, 'important');

      // Tilt towards drag direction
      targetRotationY = Math.max(-0.6, Math.min(0.6, dx * 0.015));
      targetRotationX = Math.max(-0.4, Math.min(0.4, dy * 0.015));

      adjustSpeechBubbleOrientation();
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      dragSoundPlayed = false;
      containerEl.classList.remove('dragging');
      squashScale = { x: 1, y: 1, z: 1 };

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      // Save position
      const rect = containerEl.getBoundingClientRect();
      localStorage.setItem('monster_avatar_pos', JSON.stringify({ x: rect.left, y: rect.top }));

      // If clicked without dragging, trigger poke reaction!
      if (!hasMoved) {
        triggerPoke();
      } else if (Math.random() < 0.45 && !speechEl.classList.contains('visible')) {
        const item = DIALOGUES.dragged[Math.floor(Math.random() * DIALOGUES.dragged.length)];
        speak(item, 'pop');
      }
    }

    handle.addEventListener('pointerdown', onPointerDown);

    // Native touch listeners for mobile phones
    handle.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      onPointerDown({
        button: 0,
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        preventDefault: () => {}
      });
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches || e.touches.length === 0) return;
      onPointerMove({
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      });
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      onPointerUp({
        clientX: dragStartX,
        clientY: dragStartY
      });
    }, { passive: true });

    // Global cursor tracking (monster glances at cursor)
    window.addEventListener('mousemove', (e) => {
      if (isDragging) return;
      const rect = containerEl.getBoundingClientRect();
      const monsterCenterX = rect.left + rect.width / 2;
      const monsterCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - monsterCenterX) / window.innerWidth;
      const deltaY = (e.clientY - monsterCenterY) / window.innerHeight;

      // Soft head-turn angle
      targetRotationY = Math.max(-0.55, Math.min(0.55, deltaX * 1.4));
      targetRotationX = Math.max(-0.35, Math.min(0.35, -deltaY * 0.8));
    });
  }

  // Typewriter Speech Engine
  function speak(text, sound = 'pop') {
    if (containerEl) {
      if (!document.body.contains(containerEl)) document.body.appendChild(containerEl);
      containerEl.style.display = 'block';
      containerEl.style.visibility = 'visible';
    }
    if (!speechEl || !speechTextEl) return;

    if (typewriterTimer) clearInterval(typewriterTimer);
    if (autoDismissTimer) clearTimeout(autoDismissTimer);

    currentFullText = text;
    currentTypeIdx = 0;
    speechTextEl.innerText = "";
    speechEl.classList.add('visible');
    adjustSpeechBubbleOrientation();

    if (sound) playCuteSound(sound);

    // Little talking wiggle
    if (animState === 'idle') {
      animState = 'talking';
      animTimer = 0;
    }

    typewriterTimer = setInterval(() => {
      if (currentTypeIdx < currentFullText.length) {
        speechTextEl.innerText += currentFullText.charAt(currentTypeIdx);
        currentTypeIdx++;
      } else {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
        if (animState === 'talking') animState = 'idle';

        // Auto-dismiss after 9 seconds of inactivity
        if (autoDismissTimer) clearTimeout(autoDismissTimer);
        autoDismissTimer = setTimeout(() => {
          if (!isDragging && speechEl) {
            speechEl.classList.remove('visible');
          }
        }, 9000);
      }
    }, 24);
  }


  // Fisher-Yates Shuffled Deck Engine (Guarantees zero sentence repetition)
  const POKE_DECK_POOL = [
    // Fluffy & Playful Poke Reactions
    "Wheee! That tickles! 😄",
    "360 backflip! Ten out of ten from the judges! 🤸‍♂️",
    "Hey! Poke your code, not me! Just kidding, do it again! 🎈",
    "Boing! Felt elasticity is off the charts today! ✨",
    "Yarn power activated! Ready for the next problem!",
    "Poked again! My fluffy stuffing absorbed 100% of the impact! ☁️",
    "Whoa! You spun me right round! Now let's solve some loops! 🔄",
    "Boop! Felt sensor pinged: 100% cuddly, 0% bugs! 📡",
    "Hey there! I was just contemplating whether P equals NP! 🤔",
    "Aha! A wild student poked Byte! Byte used Encouragement... it's super effective! ⚡",
    "Flip mode engaged! If you need a hint on this lesson, click my tip card! 💡",
    "Spinning like a bubble sort in an inverted array! Wheee! 🫧",
    "Boop! Poked right on my yarn nose! Ready to crush some more code! 👃",
    "Wiggle wiggle! My Three.js vertices just did a synchronous wave! 🌊",
    "Hey! Each poke increases my enthusiasm parameter by +10! 📈",
    "A poke a day keeps the infinite loops away! Let's solve the next one! 🍎",
    // Dark Humor, USTHB Student Life & Algorithmic Comedy
    "My heap is corrupt, but at least it's not my GPA... yet. 💀",
    "Recursion without a base case: exactly how this semester feels. 🌀",
    "The professor said: 'The exam will be straightforward.' The professor also lied. 🤡",
    "If your code works on the first run, close your laptop immediately. You are in a simulation. 🕶️",
    "I asked the compiler for emotional support. It returned: 'Segmentation fault (core dumped)'. 🪦",
    "Death, taxes, and an off-by-one error on Question 4 of the exam. 📉",
    "Poking me won't give you extra marks on the midterm... but I appreciate the distraction! 🧶",
    "Why do programmers prefer dark mode? Because light attracts bugs... and harsh reality. 🪲",
    "One does not simply walk into the USTHB exam amphitheater without 3 pens and existential dread. 📜",
    "My love life is like an uninitialized pointer: undefined behavior and likely to crash. 💔",
    "Don't worry if your algorithm is O(N²). The universe will experience heat death in 5 billion years anyway. ⏳",
    "If you ever feel useless, remember someone once wrote a bubble sort on a 10-million element linked list. 🫧",
    "Every time you click me, an infinite while(true) loop loses its angels. 😇",
    "I'm made of felt. I have zero nerve endings. Yet your last solution somehow made me wince. 😬",
    "Procrastination has an optimal O(1) start time: right now. Stop poking me and open Chapter 4! ⏰",
    "Remember: In USTHB, there are no bugs, only 'unforeseen algorithmic character building'. 🏗️",
    "I'd tell you a joke about binary trees, but you'd probably lose the root. 🌲",
    "Keep clicking me! It's definitely easier than facing the 2D matrix saddle point problem. 👀",
    "My yarn is tangled. My vertices are tired. But you? You have 27 lessons to master! 🚀",
    "Are you clicking me to avoid writing that trace table? I see through your tactics, human. 🕵️",
    "In an alternate universe, your code compiled with zero warnings on the first try. Not in this one though! 🌌",
    "A loop without an increment is like university life: running in circles and going nowhere fast. 🔄",
    "Caffeine turns coffee into algorithms. Poking me just turns me into a dizzy spinning plushie! ☕",
    "Roses are red, violets are blue, unexpected EOF on line 102. 🥀",
    "Why fix bugs when you can just declare them as 'intended stress-testing features'? 🛠️",
    "If at first you don't succeed, call it version 1.0 and blame the hardware architecture. 💻",
    "You poked me again! That's 5 points deducted from your emotional stability. 📉",
    "I was woven from the discarded rough drafts of students who thought arrays start at 0 in USTHB. 📏",
    "Sleep is an algorithm with zero iterations during exam week. 😴",
    "My plush ears can hear your CPU crying from that nested O(N³) triple loop. 😭",
    "Did you hear about the student who passed Algo 1 on luck alone? Neither did anyone else. 🪦",
    "Click me one more time and I will invert your array into pure chaos! 😈",
    "Knock knock. Who's there? ...Deadlock. 🚪",
    "If you ever feel lonely, remember your memory leak will stay with you forever. 🫂",
    "At USTHB, they don't ask 'How are you?', they ask 'Did your bubble sort terminate?' 🫧",
    "My felt fibers are soaked in the tears of students debugging secondary diagonals. 📐",
    "Don't stare at me like that! The answer is in the trace table, not on my yarn nose! 👃",
    "Another poke! I'm an algorithm companion, not a stress ball! ...Okay fine, do it again. 😄",
    "A wild student poked Byte! Byte used existential dread... it's super effective! ⚡",
    "Did you know? Writing pseudocode on paper burns approximately 0.2 calories and 500 brain cells. 🧠",
    "Don't cry because it's O(N²), smile because it terminates eventually! ☀️",
    "The only thing faster than binary search is my panic when the teacher says 'Hand in your papers'. 🏃‍♂️",
    "I may be fluffy, but my standards for time complexity are strictly logarithmic. 📈",
    "If you poke me 100 times, do you unlock a degree? Spoiler: No, you just waste 5 minutes! 🎓",
    // Fresh New Relatable & Witty Lines
    "Bab Ezzouar wind was so strong today it blew the semicolon right off my syntax tree! 🌬️",
    "Did you check whether your while loop terminates or is it running its own marathon in background? 🏃",
    "Algorithm student's diet: 70% instant noodles, 20% panic, 10% trying to understand secondary diagonals. 🍜",
    "My felt stitches hold together better than your array bounds checking. 🪡",
    "I asked ChatGPT how to pass Algo 1 and it told me to start praying. Just kidding, do trace tables! 🙏",
    "If you think love hurts, try writing a nested while loop on paper with 5 minutes left on the clock. ⏰",
    "Warning: Poking Byte while procrastinating does not increase your exam coefficient. 📊",
    "You poked me so fast my rotation matrix almost experienced gimbal lock! 💫",
    "Remember: Ibrahim Benabida put hours into crafting this guide for USTHB students — give him a star on GitHub! ⭐",
    "If I had a dinar for every time someone forgot to initialize sum ← 0, I'd own the university bookstore. 💰",
    "Your brain right now: 99% algorithm stress, 1% wondering why Byte is so fluffy. 🧶",
    "Never trust a floating-point comparison with '=='. Precision will betray you faster than your lab partner. 🔍",
    "Are we having fun yet? Because my felt sensors detect pure algorithmic adrenaline! 🚀",
    "Poking me is O(1) in time complexity, but your time until the exam is strictly O(N) decreasing! ⏳",
    "Even Donald Knuth himself would approve of this poke session. Now back to work! 📖",
    "If you can solve the 3-reversal array rotation on scratch paper, you fear no professor! 🦁",
    "Selection sort looked at Bubble sort and whispered: 'At least I only swap N times.' The shade! 💅",
    "You poked me! My yarn heart just skipped an iteration! ❤️",
    "That poke felt like a stack overflow: sudden, overwhelming, and completely unhandled! 🥞",
    "Keep poking and I'll start quizzing you on Chapter 3 while loops in your sleep! 👻",
    "You're doing great! Even when the trace table looks like an ancient hieroglyphic scroll! 📜"
  ];

  let currentPokeDeck = [];
  let lastPokeMessage = null;

  function getNextPokeMessage() {
    if (currentPokeDeck.length === 0) {
      // Re-populate and shuffle deck via Fisher-Yates
      const newDeck = [...POKE_DECK_POOL];
      for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
      }
      // Ensure the top card doesn't duplicate the last card across deck resets
      if (newDeck[newDeck.length - 1] === lastPokeMessage && newDeck.length > 1) {
        const swapIdx = Math.floor(Math.random() * (newDeck.length - 1));
        [newDeck[newDeck.length - 1], newDeck[swapIdx]] = [newDeck[swapIdx], newDeck[newDeck.length - 1]];
      }
      currentPokeDeck = newDeck;
    }
    const chosen = currentPokeDeck.pop();
    lastPokeMessage = chosen;
    return chosen;
  }

  // Category decks for non-repeating reactive messages
  const categoryDecks = {};
  function pickNonRepeating(category) {
    if (category === 'poked' || category === 'clickJokes') {
      return getNextPokeMessage();
    }
    const pool = DIALOGUES[category];
    if (!pool || pool.length === 0) return getNextPokeMessage();

    if (!categoryDecks[category] || categoryDecks[category].length === 0) {
      const d = [...pool];
      for (let i = d.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [d[i], d[j]] = [d[j], d[i]];
      }
      categoryDecks[category] = d;
    }
    return categoryDecks[category].pop();
  }

  // Poke Reaction (Guaranteed zero repetition)
  function triggerPoke() {
    playCuteSound('pop');
    animState = 'spin';
    animTimer = 0;
    spinAngle = 0;
    const pokeMsg = getNextPokeMessage();
    speak(pokeMsg, 'pop');
  }

  // Initialize Three.js Scene
  function initThreeJS() {
    if (typeof THREE === 'undefined') {
      console.error('Three.js not found.');
      return;
    }

    const width = 160;
    const height = 160;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 2.7);
    camera.lookAt(0, 0, 0);

    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
    } catch(err) {
      console.error("WebGL initialization failed:", err);
      return;
    }

    // Lights - Warm, bright, multi-directional illumination
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.45);
    scene.add(ambientLight);

    const dirLightKey = new THREE.DirectionalLight(0xffffff, 1.25);
    dirLightKey.position.set(3, 4, 3);
    scene.add(dirLightKey);

    const dirLightFill = new THREE.DirectionalLight(0xd4e4ff, 0.9);
    dirLightFill.position.set(-3, 2, 2);
    scene.add(dirLightFill);

    const rimLight = new THREE.DirectionalLight(0xf6c83b, 1.0);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // Setup and add monster model to scene
    function setupMonsterModel(gltf) {
      monsterModel = gltf.scene;

      // Ensure all mesh materials are double-sided and fully visible
      monsterModel.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material) {
            node.material.side = THREE.DoubleSide;
            node.material.needsUpdate = true;
          }
        }
      });

      // 1. Measure raw model bounds
      const rawBox = new THREE.Box3().setFromObject(monsterModel);
      const rawSize = rawBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;

      // 2. Scale model so it fits comfortably within the 160x160 canvas
      const targetSize = 1.75;
      const scale = targetSize / maxDim;
      monsterModel.scale.set(scale, scale, scale);

      // 3. Compute scaled bounding box and center
      const scaledBox = new THREE.Box3().setFromObject(monsterModel);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

      // 4. Center model so its center is exactly at (0, 0, 0)
      monsterModel.position.x = -scaledCenter.x;
      monsterModel.position.y = -scaledCenter.y;
      monsterModel.position.z = -scaledCenter.z;

      // 5. Wrap in pivot group for procedural animations
      const pivotGroup = new THREE.Group();
      pivotGroup.name = "monsterPivot";
      pivotGroup.position.set(0, 0, 0);
      pivotGroup.add(monsterModel);
      scene.add(pivotGroup);

      // Hide placeholder icon and show 3D canvas
      const placeholder = document.getElementById('monster-placeholder-icon');
      if (placeholder) placeholder.style.display = 'none';

      if (canvasEl) {
        canvasEl.style.opacity = '1';
      }

      // First welcome message
      setTimeout(() => {
        speak(DIALOGUES.welcome[0], 'happy');
      }, 500);

      // Start idle loop
      startIdleDialogueLoop();
    }

    // Load Model: Prefer offline Base64 embedded data if available, fallback to file fetch
    if (typeof THREE.GLTFLoader !== 'undefined') {
      const loader = new THREE.GLTFLoader();

      if (window.FELT_MONSTER_GLB_BASE64) {
        try {
          const arrayBuffer = base64ToArrayBuffer(window.FELT_MONSTER_GLB_BASE64);
          loader.parse(
            arrayBuffer,
            '',
            (gltf) => {
              setupMonsterModel(gltf);
            },
            (err) => {
              console.error("Error parsing embedded GLB:", err);
              // Fallback to URL fetch
              loader.load('felt_monster_avatar.glb', setupMonsterModel, undefined, (e) => {
                console.error("Fallback load failed:", e);
              });
            }
          );
        } catch(ex) {
          console.error("Embedded decode error:", ex);
          loader.load('felt_monster_avatar.glb', setupMonsterModel, undefined, (e) => {
            console.error("Fallback load failed:", e);
          });
        }
      } else {
        loader.load(
          'felt_monster_avatar.glb',
          setupMonsterModel,
          undefined,
          (err) => {
            console.error("Error loading felt_monster_avatar.glb:", err);
          }
        );
      }
    }

    // Render loop
    animate();
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    const pivot = scene ? scene.getObjectByName('monsterPivot') : null;

    if (pivot) {
      animTimer += 0.05;

      // Smooth mouse follow rotation
      currentRotationY += (targetRotationY - currentRotationY) * 0.1;
      currentRotationX += (targetRotationX - currentRotationX) * 0.1;

      // State-specific behavior
      if (animState === 'idle') {
        // Soft floating bob
        jumpY = Math.sin(animTimer * 1.5) * 0.06;
        pivot.position.y = jumpY;
        pivot.rotation.y = currentRotationY;
        pivot.rotation.x = currentRotationX;
        pivot.rotation.z = Math.sin(animTimer * 1.2) * 0.04;
        pivot.scale.set(squashScale.x, squashScale.y, squashScale.z);
      } else if (animState === 'talking') {
        // Little talking bounce
        jumpY = Math.abs(Math.sin(animTimer * 4.5)) * 0.08;
        pivot.position.y = jumpY;
        pivot.rotation.y = currentRotationY + Math.sin(animTimer * 3) * 0.05;
        pivot.rotation.x = currentRotationX;
        pivot.rotation.z = Math.sin(animTimer * 3.5) * 0.05;
      } else if (animState === 'happy') {
        // Excited high jump & spin
        jumpY = Math.abs(Math.sin(animTimer * 4)) * 0.45;
        pivot.position.y = jumpY;
        pivot.rotation.y += 0.22;
        pivot.scale.set(1.1, 0.9 + jumpY * 0.3, 1.1);

        if (animTimer > 3.5) {
          animState = 'idle';
          pivot.scale.set(1, 1, 1);
        }
      } else if (animState === 'wrong') {
        // Sad head shake and slight droop
        shakeAngle = Math.sin(animTimer * 8) * 0.25;
        pivot.position.y = -0.06;
        pivot.rotation.z = shakeAngle;
        pivot.rotation.x = 0.15; // looking down slightly

        if (animTimer > 3.0) {
          animState = 'idle';
          pivot.rotation.z = 0;
          pivot.rotation.x = 0;
        }
      } else if (animState === 'spin') {
        // 360 backflip spin
        spinAngle += 0.22;
        pivot.rotation.y = spinAngle;
        jumpY = Math.sin(spinAngle / 2) * 0.25;
        pivot.position.y = Math.max(0, jumpY);

        if (spinAngle >= Math.PI * 2) {
          animState = 'idle';
          pivot.rotation.y = currentRotationY;
        }
      } else if (animState === 'celebrate') {
        // Victory dance
        jumpY = Math.abs(Math.sin(animTimer * 5)) * 0.4;
        pivot.position.y = jumpY;
        pivot.rotation.y += 0.18;
        pivot.rotation.z = Math.sin(animTimer * 4) * 0.1;

        if (animTimer > 5.0) {
          animState = 'idle';
          pivot.rotation.z = 0;
        }
      }
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  // Periodic Idle Dialogues
  function startIdleDialogueLoop() {
    if (idleDialogueTimer) clearInterval(idleDialogueTimer);
    idleDialogueTimer = setInterval(() => {
      // Only speak if speech bubble is currently hidden
      if (!speechEl.classList.contains('visible') && !isDragging) {
        const item = DIALOGUES.idle[Math.floor(Math.random() * DIALOGUES.idle.length)];
        speak(item, 'pop');
      }
    }, 45000);
  }

  // Confetti Particle Effect
  function spawnConfettiBurst() {
    const colors = ['#f6c83b', '#c84b31', '#10b981', '#9d84c6', '#3b82f6'];
    const rect = containerEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + 40;

    for (let i = 0; i < 28; i++) {
      const bit = document.createElement('div');
      bit.className = 'monster-confetti';
      bit.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      bit.style.left = `${originX}px`;
      bit.style.top = `${originY}px`;
      document.body.appendChild(bit);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 60 + Math.random() * 110;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 60;

      bit.animate([
        { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
        { transform: `translate(${vx}px, ${vy + 120}px) rotate(${Math.random() * 720}deg) scale(0)`, opacity: 0 }
      ], {
        duration: 1200 + Math.random() * 600,
        easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)'
      }).onfinish = () => bit.remove();
    }
  }

  // Public Reactive API
  window.monsterCompanion = {
    playCuteSound: function(sound) { playCuteSound(sound); },
    say: function(text, sound = 'pop') {
      speak(text, sound);
    },
    react: function(type, context = {}) {
      if (type === 'correct') {
        animState = 'happy';
        animTimer = 0;
        const msg = pickNonRepeating('correct');
        speak(msg, 'happy');
      } else if (type === 'wrong') {
        animState = 'wrong';
        animTimer = 0;
        const msg = pickNonRepeating('wrong');
        speak(msg, 'wrong');
      } else if (type === 'complete') {
        animState = 'celebrate';
        animTimer = 0;
        spawnConfettiBurst();
        const msg = pickNonRepeating('complete');
        speak(msg, 'happy');
      } else if (type === 'sorting') {
        animState = 'talking';
        animTimer = 0;
        const msg = pickNonRepeating('sorting');
        speak(msg, 'pop');
      } else if (type === 'search') {
        animState = 'talking';
        animTimer = 0;
        const msg = pickNonRepeating('search');
        speak(msg, 'pop');
      } else if (type === 'nav') {
        if (DIALOGUES[context.view]) {
          const arr = DIALOGUES[context.view];
          speak(pickNonRepeating(context.view), 'pop');
        }
      }
    },
    celebrate: function() {
      animState = 'celebrate';
      animTimer = 0;
      spawnConfettiBurst();
    }
  };

  // Initialize safely
  function bootCompanion() {
    createDOMElements();
    initThreeJS();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCompanion);
  } else {
    bootCompanion();
  }

})();
