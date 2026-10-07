const CURRICULUM_DATA = {
  "chapters": [
    {
      "id": "ch1",
      "num": 1,
      "week": "Week 01",
      "title": "Algorithmic Blueprint & Data Types",
      "desc": "Foundational logic, Donald Knuth's 5 properties, variables, elementary types, arithmetic operators, and trace tables.",
      "badgeColor": "#dfbe88",
      "lessons": [
        {
          "id": "l1-1",
          "title": "What is an Algorithm? (5 Properties)",
          "duration": "4 min read",
          "content": "<p>An algorithm is a finite, unambiguous, deterministic sequence of instructions that transforms inputs into valid outputs.</p><ul><li><strong>Finiteness:</strong> Must always terminate after a finite number of steps.</li><li><strong>Definiteness:</strong> Every instruction is clear, precise, and unambiguous.</li><li><strong>Input:</strong> Accepts zero or more inputs.</li><li><strong>Output:</strong> Produces one or more defined results.</li><li><strong>Effectiveness:</strong> Operations must be basic enough to execute on paper.</li></ul>",
          "code": "Algorithm Hello_World;\nBegin\n  Write(\"Algorithms make thinking precise.\");\nEnd;",
          "exercise": {
            "question": "Which property states that an algorithm must always terminate after a finite number of steps?",
            "options": [
              "Definiteness",
              "Finiteness",
              "Effectiveness",
              "Input"
            ],
            "ans": 1,
            "exp": "Finiteness guarantees execution terminates and never loops infinitely."
          },
          "bridge": "Now that you know what an algorithm is (a deterministic sequence with inputs and outputs), how do we label and store values in memory during execution? In Lesson 1.2, you will learn Variable Identifiers and Naming Rules.",
          "exercises": [
            {
              "question": "Which property states that an algorithm must always terminate after a finite number of steps?",
              "options": [
                "Definiteness",
                "Finiteness",
                "Effectiveness",
                "Input"
              ],
              "ans": 1,
              "exp": "Finiteness guarantees execution terminates and never loops infinitely."
            },
            {
              "question": "Bridge Check: Why does an algorithm need variables to satisfy Knuth's Input and Output properties?",
              "options": [
                "Variables are required to name loops",
                "Variables hold the input values in memory and store computed results before outputting them",
                "Variables prevent the program from stopping",
                "Variables are only used to print colors"
              ],
              "ans": 1,
              "exp": "Without variables (storage cells in RAM), an algorithm has nowhere to hold incoming inputs or intermediate results."
            },
            {
              "question": "Dry-Run Check: Which of the following instructions violates Knuth's Definiteness property?",
              "options": [
                "x <- x + 1",
                "Compute a number close to 10",
                "Write('Result: ', x)",
                "If (x > 0) Then y <- 1"
              ],
              "ans": 1,
              "exp": "Definiteness requires every step to be rigorously unambiguous. 'A number close to 10' is vague and undefined."
            }
          ]
        },
        {
          "id": "l1-2",
          "title": "Variables, Constants & Identifier Rules",
          "duration": "5 min read",
          "content": "<p>A variable is a labeled storage cell in RAM. A constant is fixed prior to execution.</p><ul><li>Must start with a letter (<code>a-z</code>, <code>A-Z</code>) or underscore.</li><li>Cannot start with a digit (<code>2ndScore</code> is invalid).</li><li>Cannot contain spaces or hyphens.</li><li>Cannot be a reserved keyword (such as <code>Begin</code>, <code>Var</code>, <code>For</code>).</li></ul>",
          "code": "Algorithm Naming_Rules;\nConst\n  Pi = 3.14159;\nVar\n  studentGrade: float;   // Valid\n  counter_1: integer;    // Valid\nBegin\n  // Program body\nEnd;",
          "exercise": {
            "question": "Which of these is a syntactically valid identifier in algorithms?",
            "options": [
              "1stPlace",
              "first-name",
              "total_score_2",
              "While"
            ],
            "ans": 2,
            "exp": "total_score_2 starts with a letter and uses only letters, digits, and underscores."
          },
          "bridge": "We can name our storage cells using valid identifiers, but what kinds of data can actually fit inside those cells? In Lesson 1.3, you will discover Elementary Data Types.",
          "exercises": [
            {
              "question": "Which of these is a syntactically valid identifier in algorithms?",
              "options": [
                "1stPlace",
                "first-name",
                "total_score_2",
                "While"
              ],
              "ans": 2,
              "exp": "total_score_2 starts with a letter and uses only letters, digits, and underscores."
            },
            {
              "question": "Bridge Check: If you declare a variable called studentGrade, why must you also specify its data type before using it?",
              "options": [
                "Because the CPU needs to know how many bytes to allocate and what operations are valid",
                "To make the code longer",
                "Because variable names cannot have vowels",
                "Only for printing purposes"
              ],
              "ans": 0,
              "exp": "Data types tell the system how much memory to allocate (e.g. 4 bytes for integer) and which operations (arithmetic, boolean) are valid."
            },
            {
              "question": "Dry-Run Check: If an algorithm executes `x <- 10; y <- x; x <- 25;`, what are the values of x and y in memory?",
              "options": [
                "x = 25, y = 25",
                "x = 10, y = 25",
                "x = 25, y = 10",
                "x = 10, y = 10"
              ],
              "ans": 2,
              "exp": "y receives a copy of x (10). Later modifying x to 25 does NOT affect y in memory."
            }
          ]
        },
        {
          "id": "l1-3",
          "title": "Elementary Data Types",
          "duration": "4 min read",
          "content": "<p>Standard types in the USTHB syllabus:</p><ul><li><code>integer</code>: Whole numbers in Z (e.g. <code>-5</code>, <code>0</code>, <code>14</code>).</li><li><code>float</code> / <code>real</code>: Real decimal approximations in R (e.g. <code>3.14</code>, <code>-0.5</code>).</li><li><code>char</code>: Single ASCII character (e.g. <code>'A'</code>, <code>'9'</code>).</li><li><code>boolean</code>: Logical truth value (<code>True</code>, <code>False</code>).</li><li><code>string</code>: Ordered character array (e.g. <code>\"USTHB\"</code>).</li></ul>",
          "code": "Var\n  age: integer;\n  average: float;\n  gender: char;\n  isPassed: boolean;\n  name: string;",
          "exercise": {
            "question": "Which data type should store whether a user is logged in or out?",
            "options": [
              "integer",
              "char",
              "boolean",
              "float"
            ],
            "ans": 2,
            "exp": "A boolean holds binary truth values: True or False."
          },
          "bridge": "Now that we understand integers, floats, booleans, and characters, how do we perform calculations on them? In Lesson 1.4, you will learn the vital distinction between real division, integer quotient (DIV), and remainder (MOD).",
          "exercises": [
            {
              "question": "Which data type should store whether a user is logged in or out?",
              "options": [
                "integer",
                "char",
                "boolean",
                "float"
              ],
              "ans": 2,
              "exp": "A boolean holds binary truth values: True or False."
            },
            {
              "question": "Bridge Check: If N is an integer and you compute N / 2 versus N DIV 2, what is the critical difference in their types?",
              "options": [
                "Both always produce an integer",
                "N / 2 produces a float (real), while N DIV 2 produces an integer",
                "DIV is only for negative numbers",
                "Both cause a compile-time error"
              ],
              "ans": 1,
              "exp": "Real division (/) produces a real approximation (3.5), whereas DIV strictly discards the fraction to return an integer quotient (3)."
            },
            {
              "question": "Type Check: In algorithmic typing, what is the resulting data type of expression `14 / 2` versus `14 DIV 2`?",
              "options": [
                "Both are integer",
                "14 / 2 is float (real 7.0), while 14 DIV 2 is integer (7)",
                "14 / 2 is integer, while 14 DIV 2 is float",
                "Both are float"
              ],
              "ans": 1,
              "exp": "Standard division / always yields a float/real, whereas DIV strictly computes an integer quotient."
            }
          ]
        },
        {
          "id": "l1-4",
          "title": "Arithmetic Operators: DIV, MOD & Division",
          "duration": "6 min read",
          "content": "<p>Distinguish integer operations from real division:</p><ul><li><code>/</code> : Real division (<code>7 / 2 = 3.5</code>).</li><li><code>DIV</code> : Integer quotient (<code>19 DIV 4 = 4</code> since 19 = 4 * 4 + 3).</li><li><code>MOD</code> : Remainder of integer division (<code>19 MOD 4 = 3</code>).</li></ul><p><strong>Digit Extraction Rule:</strong> The last digit of <code>N</code> is <code>N MOD 10</code>. Removing the last digit of <code>N</code> is <code>N DIV 10</code>.</p>",
          "code": "Algorithm Division_Demo;\nVar a, b, q, r: integer;\nBegin\n  a <- 23;\n  b <- 5;\n  q <- a DIV b;  // q = 4\n  r <- a MOD b;  // r = 3\nEnd;",
          "exercise": {
            "question": "What is the result of 17 DIV 5 and 17 MOD 5?",
            "options": [
              "3 and 2",
              "3.4 and 2",
              "2 and 3",
              "3 and 0.4"
            ],
            "ans": 0,
            "exp": "17 = 5 * 3 + 2. The integer quotient is 3, and the remainder is 2."
          },
          "bridge": "With arithmetic operators like DIV and MOD in hand, how do we track memory step-by-step and safely swap two numbers? In Lesson 1.5, you will master the Trace Table.",
          "exercises": [
            {
              "question": "What is the result of 17 DIV 5 and 17 MOD 5?",
              "options": [
                "3 and 2",
                "3.4 and 2",
                "2 and 3",
                "3 and 0.4"
              ],
              "ans": 0,
              "exp": "17 = 5 * 3 + 2. The integer quotient is 3, and the remainder is 2."
            },
            {
              "question": "Bridge Check: How can you use DIV and MOD to isolate the hundreds digit of a 3-digit number N = 482?",
              "options": [
                "N MOD 10",
                "N DIV 100",
                "N MOD 100",
                "(N DIV 10) MOD 10"
              ],
              "ans": 1,
              "exp": "482 DIV 100 gives 4, which is exactly the hundreds digit."
            },
            {
              "question": "Dry-Run Check: What is the exact value of the integer expression `(19 MOD 4) * 3 + (25 DIV 6)`?",
              "options": [
                "13",
                "11",
                "17",
                "15"
              ],
              "ans": 0,
              "exp": "19 MOD 4 = 3 (since 19 = 4*4 + 3). 3 * 3 = 9. 25 DIV 6 = 4. 9 + 4 = 13."
            }
          ]
        },
        {
          "id": "l1-5",
          "title": "I/O Primitives & The Trace Table (Dry-Run)",
          "duration": "6 min read",
          "content": "<p>A trace table tracks the exact state of variables instruction by instruction. Below is the classic two-variable swap without losing values (Sheet 1 Ex 2):</p><table class='trace-table'><thead><tr><th>Step</th><th>x</th><th>y</th><th>temp</th></tr></thead><tbody><tr><td>Initial</td><td>7</td><td>12</td><td>?</td></tr><tr><td>temp &lt;- x;</td><td>7</td><td>12</td><td><strong>7</strong></td></tr><tr><td>x &lt;- y;</td><td><strong>12</strong></td><td>12</td><td>7</td></tr><tr><td>y &lt;- temp;</td><td>12</td><td><strong>7</strong></td><td>7</td></tr></tbody></table>",
          "code": "Algorithm Swap_Two_Values;\nVar x, y, temp: integer;\nBegin\n  Read(x); Read(y);\n  temp <- x;\n  x <- y;\n  y <- temp;\n  Write(\"Swapped: \", x, \" and \", y);\nEnd;",
          "exercise": {
            "question": "What happens if we execute x <- y before saving x in temp?",
            "options": [
              "Both variables swap normally",
              "The original value of x is permanently lost",
              "y is deleted",
              "Compilation error"
            ],
            "ans": 1,
            "exp": "x is overwritten with y, so the original value of x is lost."
          },
          "bridge": "Congratulations on completing Chapter 1! So far, our programs execute sequentially from top to bottom. But what if we need to make decisions and execute instructions ONLY when certain conditions are true? In Chapter 2 (Lesson 2.1), you will unlock Conditional Branching (If-Then-Else).",
          "exercises": [
            {
              "question": "What happens if we execute x <- y before saving x in temp?",
              "options": [
                "Both variables swap normally",
                "The original value of x is permanently lost",
                "y is deleted",
                "Compilation error"
              ],
              "ans": 1,
              "exp": "x is overwritten with y, so the original value of x is lost."
            },
            {
              "question": "Bridge Check: In a trace table, if an instruction x <- x + 5 executes, what is the new value of x if its previous value was 12?",
              "options": [
                "5",
                "12",
                "17",
                "7"
              ],
              "ans": 2,
              "exp": "The expression x + 5 evaluates to 12 + 5 = 17, which overwrites x in memory."
            },
            {
              "question": "Trace Table Check: In the arithmetic swap without a third variable `x <- x + y; y <- x - y; x <- x - y;`, if initially x = 8 and y = 3, what are the step values?",
              "options": [
                "Step 1: x=11; Step 2: y=8; Step 3: x=3 (Swapped!)",
                "Step 1: x=5; Step 2: y=8; Step 3: x=11",
                "Both variables become 0",
                "x = 8, y = 8"
              ],
              "ans": 0,
              "exp": "x becomes 8+3=11; y becomes 11-3=8; x becomes 11-8=3. Values swap cleanly without extra memory!"
            }
          ]
        }
      ]
    },
    {
      "id": "ch2",
      "num": 2,
      "week": "Week 02",
      "title": "Decisions & Conditional Branching",
      "desc": "Boolean expressions, If-Then-Else alternatives, nested decision trees, and Switch/Case structures.",
      "badgeColor": "#c84b31",
      "lessons": [
        {
          "id": "l2-1",
          "title": "Single & Double Alternative (If-Then-Else)",
          "duration": "5 min read",
          "content": "<p>Branching executes different instruction sequences based on boolean condition evaluations.</p><ul><li><strong>If-Then:</strong> Executes branch only when condition is True.</li><li><strong>If-Then-Else:</strong> Executes branch 1 if True; branch 2 if False.</li></ul>",
          "code": "If (score >= 10) Then\n  Write(\"Student Passed\");\nElse\n  Write(\"Student Failed\");\nEnd If;",
          "exercise": {
            "question": "When is the Else branch executed in an If-Then-Else statement?",
            "options": [
              "Always",
              "Only when the condition is False",
              "Only when the condition is True",
              "When an error happens"
            ],
            "ans": 1,
            "exp": "The Else branch executes if and only if the boolean test evaluates to False."
          },
          "bridge": "Single and double alternatives let us pick between two paths. But what happens when the problem has multiple sub-cases with secondary conditions? In Lesson 2.2, you will learn Nested Conditionals and solve the complete Quadratic Equation tree.",
          "exercises": [
            {
              "question": "When is the Else branch executed in an If-Then-Else statement?",
              "options": [
                "Always",
                "Only when the condition is False",
                "Only when the condition is True",
                "When an error happens"
              ],
              "ans": 1,
              "exp": "The Else branch executes if and only if the boolean test evaluates to False."
            },
            {
              "question": "Bridge Check: What boolean operator connects two conditions when BOTH must be satisfied simultaneously?",
              "options": [
                "OR",
                "AND",
                "NOT",
                "XOR"
              ],
              "ans": 1,
              "exp": "AND requires both operands to be True for the compound condition to evaluate to True."
            },
            {
              "question": "Dry-Run Check: In `If (x > 5) Then If (y < 2) Then z <- 1 Else z <- 2 End If Else z <- 3 End If;`, what is z when x = 7 and y = 4?",
              "options": [
                "z = 1",
                "z = 2",
                "z = 3",
                "z is uninitialized"
              ],
              "ans": 1,
              "exp": "x > 5 (7 > 5) is True, entering outer Then. y < 2 (4 < 2) is False, executing inner Else which assigns z <- 2."
            }
          ]
        },
        {
          "id": "l2-2",
          "title": "Nested Conditionals & The Complete Quadratic Case Tree",
          "duration": "7 min read",
          "content": "<p>In Sheet 1 Ex 10, solving <code>ax² + bx + c = 0</code> requires exhaustive branching:</p><ul><li>If <code>a = 0</code>: Degenerate linear equation <code>bx + c = 0</code>:<ul><li>If <code>b = 0, c = 0 ⇒ ℝ</code> (infinite roots).</li><li>If <code>b = 0, c ≠ 0 ⇒ ∅</code> (impossible).</li><li>If <code>b ≠ 0 ⇒ x = -c/b</code>.</li></ul></li><li>If <code>a ≠ 0</code>: Compute discriminant <code>Δ = b² - 4ac</code>:<ul><li><code>Δ > 0 ⇒</code> 2 real roots <code>x₁,₂ = (-b ± √Δ) / 2a</code>.</li><li><code>Δ = 0 ⇒</code> 1 double root <code>x₀ = -b / 2a</code>.</li><li><code>Δ < 0 ⇒</code> No real roots in <code>ℝ</code>.</li></ul></li></ul>",
          "code": "If (a = 0) Then\n  If (b = 0) Then\n    If (c = 0) Then Write(\"S = R\"); Else Write(\"S = Empty\"); End If;\n  Else\n    Write(\"Linear: \", -c/b);\n  End If;\nElse\n  delta <- b*b - 4*a*c;\n  // Check delta > 0, = 0, < 0\nEnd If;",
          "exercise": {
            "question": "In ax^2 + bx + c = 0, what happens if a = 0 and b != 0?",
            "options": [
              "Equation is quadratic with double root",
              "Degenerates into a linear equation x = -c/b",
              "No solution exists",
              "Infinite solutions"
            ],
            "ans": 1,
            "exp": "With a = 0, the x^2 term vanishes, leaving a linear equation bx + c = 0."
          },
          "bridge": "Nested If-Else structures handle complex continuous ranges, but when matching a single discrete integer or char against multiple values, they become verbose. In Lesson 2.3, you will learn the streamlined Switch/Case structure.",
          "exercises": [
            {
              "question": "In ax^2 + bx + c = 0, what happens if a = 0 and b != 0?",
              "options": [
                "Equation is quadratic with double root",
                "Degenerates into a linear equation x = -c/b",
                "No solution exists",
                "Infinite solutions"
              ],
              "ans": 1,
              "exp": "With a = 0, the x^2 term vanishes, leaving a linear equation bx + c = 0."
            },
            {
              "question": "Bridge Check: In the quadratic equation ax² + bx + c = 0, why is checking a = 0 first mandatory before computing Δ = b² - 4ac?",
              "options": [
                "Because the formula for roots divides by 2a, which causes a division-by-zero crash if a = 0",
                "Because delta cannot be calculated for integers",
                "To make the code run faster",
                "It is not mandatory"
              ],
              "ans": 0,
              "exp": "The quadratic formula divides by 2a. If a = 0, division by zero occurs unless the linear case is handled first."
            },
            {
              "question": "Exam Edge Case: In `ax² + bx + c = 0`, if a = 0 and b = 0 and c != 0 (e.g. 0x + 5 = 0), what is the algorithmic output?",
              "options": [
                "Infinite solutions in R",
                "Impossible equation / Empty set (No solution)",
                "x = -c",
                "x = 0"
              ],
              "ans": 1,
              "exp": "0 = c with c != 0 is a mathematical contradiction (impossible equation), meaning no real solution exists."
            }
          ]
        },
        {
          "id": "l2-3",
          "title": "Selective Choice: Switch / Case (Selon Que)",
          "duration": "4 min read",
          "content": "<p>When comparing a single discrete selector variable (integer or char) against multiple constant values, <code>Switch / Case</code> is cleaner and faster than chained <code>If-Else</code>.</p>",
          "code": "Switch (dayNumber)\n  Case 1: Write(\"Sunday\");\n  Case 2: Write(\"Monday\");\n  Case 3: Write(\"Tuesday\");\n  Otherwise: Write(\"Other Day\");\nEnd Switch;",
          "exercise": {
            "question": "When should Switch/Case be preferred over If-Else?",
            "options": [
              "Comparing complex real inequalities",
              "Testing a single discrete variable against discrete constants",
              "Executing an infinite loop",
              "Allocating memory"
            ],
            "ans": 1,
            "exp": "Switch/Case evaluates a single discrete selector against known constant cases."
          },
          "bridge": "With decision branching mastered, we can choose different paths. But what if we need to repeat an action 100 or 1,000 times? Writing 1,000 If statements is impossible. In Chapter 3 (Lesson 3.1), you will unlock the For Loop.",
          "exercises": [
            {
              "question": "When should Switch/Case be preferred over If-Else?",
              "options": [
                "Comparing complex real inequalities",
                "Testing a single discrete variable against discrete constants",
                "Executing an infinite loop",
                "Allocating memory"
              ],
              "ans": 1,
              "exp": "Switch/Case evaluates a single discrete selector against known constant cases."
            },
            {
              "question": "Bridge Check: Can Switch/Case easily test if a real variable x falls in the continuous range 10.5 <= x <= 19.8?",
              "options": [
                "Yes, Switch/Case is ideal for real ranges",
                "No, Switch/Case requires discrete integer or character constants; continuous ranges require If-Else",
                "Yes, using commas",
                "Only on Sundays"
              ],
              "ans": 1,
              "exp": "Switch/Case requires discrete ordinal constants (integers/chars). Continuous intervals must use If-Else."
            },
            {
              "question": "Syntax & Type Check: Why CANNOT Switch/Case be used to test if a real variable x falls in interval `0.0 <= x <= 1.0`?",
              "options": [
                "Switch only works on strings",
                "Switch selectors in algorithms must be discrete ordinal types (integer, char), not continuous real numbers",
                "Switch cannot have more than 2 cases",
                "Switch is slower than If"
              ],
              "ans": 1,
              "exp": "Switch/Case selectors evaluate exact discrete equality on ordinal types (integers, characters), not infinite continuous real floats."
            }
          ]
        }
      ]
    },
    {
      "id": "ch3",
      "num": 3,
      "week": "Week 02",
      "title": "Repetition & Iterative Loops",
      "desc": "The For loop, While loop, Repeat..Until loop, accumulators, counters, and sentinel value termination.",
      "badgeColor": "#e6be36",
      "lessons": [
        {
          "id": "l3-1",
          "title": "The For Loop (Known Iteration Count)",
          "duration": "5 min read",
          "content": "<p>Use the <code>For</code> loop when the exact number of repetitions is known in advance.</p><ul><li>Counter increments automatically by 1 each step.</li><li><code>For i <- 1 To N Do</code> executes exactly <code>N</code> times.</li></ul>",
          "code": "Algorithm Sum_First_N;\nVar i, n, sum: integer;\nBegin\n  Read(n);\n  sum <- 0;\n  For i <- 1 To n Do\n    sum <- sum + i;\n  End For;\n  Write(\"Sum: \", sum);\nEnd;",
          "exercise": {
            "question": "How many times does 'For i <- 1 To 10 Do' execute?",
            "options": [
              "9 times",
              "10 times",
              "11 times",
              "0 times"
            ],
            "ans": 1,
            "exp": "The counter takes values 1, 2, ..., 10 inclusive, exactly 10 iterations."
          },
          "bridge": "The For loop is perfect when the iteration count is known in advance. But what if the number of repetitions depends on user input or a condition discovered during execution? In Lesson 3.2, you will master the While Loop.",
          "exercises": [
            {
              "question": "How many times does 'For i <- 1 To 10 Do' execute?",
              "options": [
                "9 times",
                "10 times",
                "11 times",
                "0 times"
              ],
              "ans": 1,
              "exp": "The counter takes values 1, 2, ..., 10 inclusive, exactly 10 iterations."
            },
            {
              "question": "Bridge Check: In For i <- 1 To N Do, if the user inputs N = 0, how many times does the loop body execute?",
              "options": [
                "0 times",
                "1 time",
                "Infinite times",
                "Causes a syntax error"
              ],
              "ans": 0,
              "exp": "Since the initial value (1) already exceeds the upper bound (0), the loop body executes 0 times."
            },
            {
              "question": "Dry-Run Check: How many iterations are executed by loop `For i <- 10 DownTo 2 Step 2 Do`?",
              "options": [
                "10 iterations",
                "5 iterations (i = 10, 8, 6, 4, 2)",
                "4 iterations",
                "0 iterations"
              ],
              "ans": 1,
              "exp": "The loop decrements by 2 from 10 down to 2: iterations at 10, 8, 6, 4, 2 — exactly 5 iterations."
            }
          ]
        },
        {
          "id": "l3-2",
          "title": "The While Loop (Pre-tested Condition)",
          "duration": "6 min read",
          "content": "<p>A <code>While</code> loop evaluates its condition <em>before</em> entering the body.</p><ul><li>If the condition is initially False, the body executes <strong>0 times</strong>.</li><li>If the variables controlling the condition never change, an <strong>infinite loop</strong> occurs!</li></ul>",
          "code": "Algorithm While_Count;\nVar i: integer;\nBegin\n  i <- 1;\n  While (i <= 5) Do\n    Write(i);\n    i <- i + 1;\n  End While;\nEnd;",
          "exercise": {
            "question": "If the While loop condition is False upon entry, how many times does the body execute?",
            "options": [
              "0 times",
              "1 time",
              "Infinite times",
              "Compiler error"
            ],
            "ans": 0,
            "exp": "Because While is pre-tested, a False initial condition skips the loop entirely."
          },
          "bridge": "The While loop checks its condition at the entry. But what if an action must execute at least once before checking the condition (like prompting for valid input)? In Lesson 3.3, you will learn the Repeat-Until Loop.",
          "exercises": [
            {
              "question": "If the While loop condition is False upon entry, how many times does the body execute?",
              "options": [
                "0 times",
                "1 time",
                "Infinite times",
                "Compiler error"
              ],
              "ans": 0,
              "exp": "Because While is pre-tested, a False initial condition skips the loop entirely."
            },
            {
              "question": "Bridge Check: If you forget to increment the loop variable inside a While (i <= 10) Do body, what happens?",
              "options": [
                "The loop terminates immediately",
                "An infinite loop occurs because i <= 10 remains True forever",
                "The compiler automatically increments i",
                "The computer shuts down"
              ],
              "ans": 1,
              "exp": "Without updating the loop variable, the condition remains True infinitely."
            },
            {
              "question": "Edge Case Check: In loop `i <- 1; While (i != 10) Do i <- i + 2; End While;`, what will happen during execution?",
              "options": [
                "Terminates after 5 steps",
                "Infinite loop because i steps through odd numbers (1, 3, 5, 7, 9, 11...) and never equals 10!",
                "Terminates when i reaches 9",
                "Compilation error"
              ],
              "ans": 1,
              "exp": "i starts at 1 and steps by 2 (1, 3, 5, 7, 9, 11...). It skips 10 entirely, causing an infinite loop. Always use `<=` instead of `!=`!"
            }
          ]
        },
        {
          "id": "l3-3",
          "title": "The Repeat ... Until Loop (Post-tested Condition)",
          "duration": "5 min read",
          "content": "<p>A <code>Repeat ... Until</code> loop evaluates its condition at the bottom.</p><ul><li>Guarantees the body executes <strong>at least once</strong>.</li><li>Repeats as long as condition is <strong>False</strong>, stops when condition becomes <strong>True</strong>!</li></ul>",
          "code": "Algorithm Validate_Positive_Input;\nVar x: integer;\nBegin\n  Repeat\n    Write(\"Enter strictly positive integer: \");\n    Read(x);\n  Until (x > 0);\nEnd;",
          "exercise": {
            "question": "What is the minimum number of times a Repeat..Until body executes?",
            "options": [
              "0 times",
              "At least 1 time",
              "At least 2 times",
              "Depends on condition"
            ],
            "ans": 1,
            "exp": "Because condition checking happens at the end, the body runs at least once."
          },
          "bridge": "Now that you know For, While, and Repeat-Until, how do we use them to accumulate totals and stop at special sentinel values? In Lesson 3.4, you will master Accumulators and Sentinel Termination.",
          "exercises": [
            {
              "question": "What is the minimum number of times a Repeat..Until body executes?",
              "options": [
                "0 times",
                "At least 1 time",
                "At least 2 times",
                "Depends on condition"
              ],
              "ans": 1,
              "exp": "Because condition checking happens at the end, the body runs at least once."
            },
            {
              "question": "Bridge Check: What is the key semantic difference between While (condition) and Repeat..Until (condition)?",
              "options": [
                "Repeat executes at least once and stops when condition is True; While checks first and stops when condition is False",
                "They are completely identical",
                "While is only for multiplication",
                "Repeat cannot use integer variables"
              ],
              "ans": 0,
              "exp": "Repeat..Until evaluates at exit and terminates when True. While evaluates at entry and terminates when False."
            },
            {
              "question": "Dry-Run Check: In `x <- 5; Repeat x <- x - 1; Until (x <= 5);`, what is the final value of x?",
              "options": [
                "5",
                "4",
                "0",
                "Infinite loop"
              ],
              "ans": 1,
              "exp": "Repeat executes the body at least once: x becomes 5 - 1 = 4. The condition 4 <= 5 is True, so it terminates immediately with x = 4."
            }
          ]
        },
        {
          "id": "l3-4",
          "title": "Accumulators, Counters & Sentinel Inputs",
          "duration": "6 min read",
          "content": "<p><strong>Accumulator:</strong> Aggregates values (e.g. <code>sum <- sum + x</code> initialized to 0; <code>prod <- prod * x</code> initialized to 1).</p><p><strong>Sentinel Value:</strong> A dummy flag (e.g. <code>-1</code>) that signals the end of input without being counted as actual data.</p>",
          "code": "Algorithm Sentinel_Average;\nVar val, count, sum: integer;\nBegin\n  sum <- 0; count <- 0;\n  Read(val);\n  While (val != -1) Do\n    sum <- sum + val;\n    count <- count + 1;\n    Read(val);\n  End While;\n  If (count > 0) Then Write(\"Avg: \", sum / count); End If;\nEnd;",
          "exercise": {
            "question": "Why initialize sum <- 0 before an accumulation loop?",
            "options": [
              "0 is the additive identity element",
              "Arrays start at 0",
              "To make the loop run faster",
              "Required by compiler"
            ],
            "ans": 0,
            "exp": "Zero added to any number equals that number (x + 0 = x), preventing garbage values from corrupting the sum."
          },
          "bridge": "Loops allow processing sequences of data, but where do we store 100 values simultaneously in memory instead of overwriting a single variable? In Chapter 4 (Lesson 4.1), you will unlock 1D Arrays.",
          "exercises": [
            {
              "question": "Why initialize sum <- 0 before an accumulation loop?",
              "options": [
                "0 is the additive identity element",
                "Arrays start at 0",
                "To make the loop run faster",
                "Required by compiler"
              ],
              "ans": 0,
              "exp": "Zero added to any number equals that number (x + 0 = x), preventing garbage values from corrupting the sum."
            },
            {
              "question": "Bridge Check: When calculating a product P = x1 * x2 * ... * xN using a loop, what must P be initialized to before the loop starts?",
              "options": [
                "0",
                "1",
                "-1",
                "N"
              ],
              "ans": 1,
              "exp": "The multiplicative neutral element is 1. If initialized to 0, 0 * anything remains 0 forever."
            },
            {
              "question": "Exam Application: If a sentinel loop reads positive grades until -1, and inputs are `12, 14, 16, -1`, what are final count and average?",
              "options": [
                "count = 4, avg = 10.25",
                "count = 3, avg = 14.0",
                "count = 3, avg = 42.0",
                "count = 0, avg = 0"
              ],
              "ans": 1,
              "exp": "The sentinel -1 is NOT included in calculations. Sum = 12 + 14 + 16 = 42. Count = 3. Average = 42 / 3 = 14.0."
            }
          ]
        }
      ]
    },
    {
      "id": "ch4",
      "num": 4,
      "week": "Week 03",
      "title": "Linear Static Data: 1D Arrays & Strings",
      "desc": "Contiguous memory, 1-based indexing, in-place reversal, linear search, character arrays, ASCII arithmetic, and palindromes.",
      "badgeColor": "#9d84c6",
      "lessons": [
        {
          "id": "l4-1",
          "title": "Static Arrays & 1-Based Memory Model",
          "duration": "5 min read",
          "content": "<p>An array stores multiple items of identical data type in contiguous memory slots.</p><ul><li>Declared as: <code>Var T: Array[1..N] of Type;</code></li><li>In the USTHB curriculum, indexing starts at <strong>1</strong> (from <code>T[1]</code> to <code>T[N]</code>).</li><li>Accessing index outside <code>[1..N]</code> causes an <strong>Index Out of Bounds</strong> error.</li></ul>",
          "code": "Algorithm Array_Read_Write;\nVar i: integer;\n    T: Array[1..5] of integer;\nBegin\n  For i <- 1 To 5 Do Read(T[i]); End For;\nEnd;",
          "exercise": {
            "question": "What happens if an algorithm accesses T[11] on an Array[1..10]?",
            "options": [
              "Array resizes automatically",
              "Index Out of Bounds error",
              "Returns 0",
              "Reads T[1]"
            ],
            "ans": 1,
            "exp": "Static arrays have fixed bounds; accessing outside [1..10] triggers an index out of bounds error."
          },
          "bridge": "Now that we can store N elements in a 1D array T[1..N], how do we search through them to find the minimum, maximum, or a specific key? In Lesson 4.2, you will learn Extremum & Linear Search.",
          "exercises": [
            {
              "question": "What happens if an algorithm accesses T[11] on an Array[1..10]?",
              "options": [
                "Array resizes automatically",
                "Index Out of Bounds error",
                "Returns 0",
                "Reads T[1]"
              ],
              "ans": 1,
              "exp": "Static arrays have fixed bounds; accessing outside [1..10] triggers an index out of bounds error."
            },
            {
              "question": "Bridge Check: In USTHB algorithms, if an array has size N = 5, what are the valid index bounds?",
              "options": [
                "0 to 4",
                "1 to 5",
                "1 to 4",
                "0 to 5"
              ],
              "ans": 1,
              "exp": "Standard university Algerian algorithms are 1-indexed: indices run from 1 to N inclusive."
            },
            {
              "question": "Memory Offset Check: In array T[1..N] where each integer takes 4 bytes, if base address of T[1] is 2000, what is the address of T[4]?",
              "options": [
                "2016",
                "2012",
                "2004",
                "2008"
              ],
              "ans": 1,
              "exp": "Address = Base + (i - 1) * element_size = 2000 + (4 - 1) * 4 = 2000 + 12 = 2012."
            }
          ]
        },
        {
          "id": "l4-2",
          "title": "Global Extremum (Min / Max) with Proper Bounds",
          "duration": "5 min read",
          "content": "<p>When finding maximum in an array of size <code>N</code>, <strong>never initialize max <- 0</strong>! If all elements are negative (e.g. <code>[-15, -7, -22]</code>), 0 would falsely report as maximum.</p><p>Always initialize with the first element: <code>max <- T[1]</code>.</p>",
          "code": "Algorithm Find_Max;\nVar i, max, pos: integer;\n    T: Array[1..10] of integer;\nBegin\n  max <- T[1]; pos <- 1;\n  For i <- 2 To 10 Do\n    If (T[i] > max) Then max <- T[i]; pos <- i; End If;\n  End For;\nEnd;",
          "exercise": {
            "question": "Why initialize max <- T[1] instead of max <- 0?",
            "options": [
              "Setting max <- 0 is a syntax error",
              "If all numbers are negative, max <- 0 would return an incorrect result",
              "max <- T[1] halves loop count",
              "Both are identical"
            ],
            "ans": 1,
            "exp": "If array elements are all negative, initializing to 0 gives a false answer since 0 is greater than all elements."
          },
          "bridge": "Finding elements by scanning is fundamental, but how do we rearrange an array in-place without using extra memory? In Lesson 4.3, you will learn In-Place Array Reversal and the Two-Pointer technique.",
          "exercises": [
            {
              "question": "Why initialize max <- T[1] instead of max <- 0?",
              "options": [
                "Setting max <- 0 is a syntax error",
                "If all numbers are negative, max <- 0 would return an incorrect result",
                "max <- T[1] halves loop count",
                "Both are identical"
              ],
              "ans": 1,
              "exp": "If array elements are all negative, initializing to 0 gives a false answer since 0 is greater than all elements."
            },
            {
              "question": "Bridge Check: When finding the maximum of an array T[1..N], what should the variable maxVal initially be set to?",
              "options": [
                "0 (fails if all numbers are negative)",
                "T[1] (the first element of the array)",
                "1000",
                "N"
              ],
              "ans": 1,
              "exp": "Initializing to T[1] correctly handles arrays where all numbers are negative."
            },
            {
              "question": "Edge Case Check: If an array contains only negative integers `[-14, -8, -25, -3]`, what bug happens if you initialize `maxVal <- 0`?",
              "options": [
                "The algorithm outputs 0 as maximum, which was not even in the array!",
                "The algorithm crashes with overflow",
                "It returns -3 correctly",
                "The loop never executes"
              ],
              "ans": 0,
              "exp": "0 is greater than all negative numbers, so maxVal remains 0 forever! Always initialize maxVal <- T[1]!"
            }
          ]
        },
        {
          "id": "l4-3",
          "title": "In-Place Array Reversal",
          "duration": "6 min read",
          "content": "<p>Reversing an array <code>T</code> in-place swaps symmetric elements <code>T[i]</code> and <code>T[N - i + 1]</code>.</p><p><strong>Crucial Rule:</strong> The loop must stop at <code>N DIV 2</code>. If you loop to <code>N</code>, elements are swapped twice, restoring original order!</p>",
          "code": "Algorithm Reverse_Array;\nVar i, temp: integer;\n    T: Array[1..N] of integer;\nBegin\n  For i <- 1 To N DIV 2 Do\n    temp <- T[i];\n    T[i] <- T[N - i + 1];\n    T[N - i + 1] <- temp;\n  End For;\nEnd;",
          "exercise": {
            "question": "Why must the reversal loop run only up to N DIV 2?",
            "options": [
              "Running up to N would double-swap elements back to original order",
              "To save memory",
              "The compiler enforces it",
              "Because N is odd"
            ],
            "ans": 0,
            "exp": "Looping all the way to N swaps every pair twice, restoring the original arrangement."
          },
          "bridge": "Array manipulation techniques apply directly to strings, because a string is an ordered array of characters! In Lesson 4.4, you will learn Character Strings & ASCII Arithmetic.",
          "exercises": [
            {
              "question": "Why must the reversal loop run only up to N DIV 2?",
              "options": [
                "Running up to N would double-swap elements back to original order",
                "To save memory",
                "The compiler enforces it",
                "Because N is odd"
              ],
              "ans": 0,
              "exp": "Looping all the way to N swaps every pair twice, restoring the original arrangement."
            },
            {
              "question": "Bridge Check: When reversing an array of size N in-place, how many swaps are performed?",
              "options": [
                "N swaps",
                "N DIV 2 swaps",
                "N * 2 swaps",
                "N - 1 swaps"
              ],
              "ans": 1,
              "exp": "Two pointers move from both ends toward the center, swapping exactly N DIV 2 pairs."
            },
            {
              "question": "Dry-Run Check: When testing if an array T[1..N] is a palindrome, what is the index opposite to i that must be compared?",
              "options": [
                "T[N - i]",
                "T[N - i + 1]",
                "T[N + i]",
                "T[N / 2]"
              ],
              "ans": 1,
              "exp": "In a 1-based array of size N, the symmetric counterpart of index i is N - i + 1 (e.g. for N=5, i=1 pairs with 5-1+1=5)."
            }
          ]
        },
        {
          "id": "l4-4",
          "title": "Strings as Character Arrays & ASCII Arithmetic",
          "duration": "6 min read",
          "content": "<p>In foundational algorithms, a String is an array of characters.</p><ul><li><code>'A'</code> to <code>'Z'</code>: ASCII 65 to 90.</li><li><code>'a'</code> to <code>'z'</code>: ASCII 97 to 122.</li><li>Distance between upper and lower is exactly <strong>32</strong>: <code>ord('a') - ord('A') = 32</code>.</li><li>To lowercase: <code>char(ord(c) + 32)</code>.</li></ul><p><strong>Palindrome:</strong> A string is a palindrome if <code>S[i] = S[N - i + 1]</code> for all <code>i ∈ [1, N/2]</code>.</p>",
          "code": "Algorithm Check_Palindrome;\nVar i, n: integer; isPal: boolean;\n    S: string;\nBegin\n  n <- length(S); isPal <- True;\n  For i <- 1 To n DIV 2 Do\n    If (S[i] != S[n - i + 1]) Then isPal <- False; End If;\n  End For;\nEnd;",
          "exercise": {
            "question": "Given ord('A') = 65 and ord('a') = 97, how do we convert uppercase c to lowercase?",
            "options": [
              "char(ord(c) - 32)",
              "char(ord(c) + 32)",
              "char(ord(c) * 2)",
              "char(ord(c) + 26)"
            ],
            "ans": 1,
            "exp": "Adding 32 to an uppercase ASCII code shifts it into the lowercase range."
          },
          "bridge": "1D arrays represent linear data. But what if we need a grid, table, or game board with rows and columns? In Chapter 5 (Lesson 5.1), you will unlock 2D Matrices.",
          "exercises": [
            {
              "question": "Given ord('A') = 65 and ord('a') = 97, how do we convert uppercase c to lowercase?",
              "options": [
                "char(ord(c) - 32)",
                "char(ord(c) + 32)",
                "char(ord(c) * 2)",
                "char(ord(c) + 26)"
              ],
              "ans": 1,
              "exp": "Adding 32 to an uppercase ASCII code shifts it into the lowercase range."
            },
            {
              "question": "Bridge Check: If character c holds 'D', what is the expression to convert it into its 0-based alphabetic rank (A=0, B=1, ...)?",
              "options": [
                "c - 'A'",
                "c + 'A'",
                "c * 2",
                "c / 10"
              ],
              "ans": 0,
              "exp": "Subtracting ASCII code of 'A' yields the 0-based position: 'D' - 'A' = 68 - 65 = 3."
            },
            {
              "question": "ASCII Character Arithmetic: Given ord('A') = 65 and ord('C') = 67, what is the expression to convert any lowercase char c to uppercase?",
              "options": [
                "chr(ord(c) + 32)",
                "chr(ord(c) - 32)",
                "ord(c) - 32",
                "chr(ord(c) * 2)"
              ],
              "ans": 1,
              "exp": "In ASCII, uppercase letters are 32 positions before lowercase letters (ord('a') - 32 = ord('A'))."
            }
          ]
        }
      ]
    },
    {
      "id": "ch5",
      "num": 5,
      "week": "Week 03",
      "title": "Two-Dimensional Grids: Matrices",
      "desc": "Matrix declaration, nested row-column loops, diagonal properties (i=j, i+j=N+1), and saddle point detection.",
      "badgeColor": "#788a4e",
      "lessons": [
        {
          "id": "l5-1",
          "title": "Matrix Structure & Nested Traversals",
          "duration": "6 min read",
          "content": "<p>A 2D array models a table with <code>R</code> rows and <code>C</code> columns, containing <code>R × C</code> total elements.</p><p>Declared as: <code>M: Array[1..R, 1..C] of Type;</code>.</p><p>Row-major traversal fixes row <code>i</code> in the outer loop and iterates through columns <code>j</code> in the inner loop.</p>",
          "code": "Algorithm Matrix_Sum;\nVar i, j, sum: integer;\n    M: Array[1..3, 1..4] of integer;\nBegin\n  sum <- 0;\n  For i <- 1 To 3 Do\n    For j <- 1 To 4 Do sum <- sum + M[i, j]; End For;\n  End For;\nEnd;",
          "exercise": {
            "question": "How many total cells are in a matrix M: Array[1..4, 1..5] of integer?",
            "options": [
              "9",
              "20",
              "18",
              "40"
            ],
            "ans": 1,
            "exp": "4 rows * 5 columns = 20 total cells."
          },
          "bridge": "Now that you can traverse a matrix using nested loops (rows and columns), how do you navigate its diagonals? In Lesson 5.2, you will learn Diagonal Properties (Main vs Secondary Diagonals).",
          "exercises": [
            {
              "question": "How many total cells are in a matrix M: Array[1..4, 1..5] of integer?",
              "options": [
                "9",
                "20",
                "18",
                "40"
              ],
              "ans": 1,
              "exp": "4 rows * 5 columns = 20 total cells."
            },
            {
              "question": "Bridge Check: In a matrix M[1..R, 1..C], which loop variable typically iterates through rows and which through columns?",
              "options": [
                "i iterates through rows (1..R), j iterates through columns (1..C)",
                "Only one loop is needed for a matrix",
                "Columns must always be traversed before rows",
                "Matrices cannot be traversed"
              ],
              "ans": 0,
              "exp": "Row-major traversal uses outer loop i for rows and inner loop j for columns."
            },
            {
              "question": "Dry-Run Check: In matrix M[1..3, 1..3] filled with `M[i, j] <- i + j`, what is the sum of all elements on row 2?",
              "options": [
                "9",
                "12 (2+1 + 2+2 + 2+3 = 3 + 4 + 5)",
                "6",
                "15"
              ],
              "ans": 1,
              "exp": "Row 2 elements are M[2,1]=3, M[2,2]=4, M[2,3]=5. Sum = 3 + 4 + 5 = 12."
            }
          ]
        },
        {
          "id": "l5-2",
          "title": "Main & Secondary Diagonal Properties",
          "duration": "5 min read",
          "content": "<p>In an <code>N × N</code> square matrix:</p><ul><li><strong>Main Diagonal:</strong> Elements where row index equals column index: <code>i = j</code>.</li><li><strong>Secondary Diagonal:</strong> Elements where row and column indices sum to <code>N + 1</code>: <code>i + j = N + 1</code>.</li></ul>",
          "code": "Algorithm Diagonals;\nVar i: integer; M: Array[1..N, 1..N] of integer;\nBegin\n  For i <- 1 To N Do\n    Write(\"Main: \", M[i, i]);\n    Write(\"Secondary: \", M[i, N - i + 1]);\n  End For;\nEnd;",
          "exercise": {
            "question": "Which mathematical condition identifies cells on the secondary diagonal of an NxN matrix?",
            "options": [
              "i = j",
              "i + j = N + 1",
              "i - j = 1",
              "i * j = N"
            ],
            "ans": 1,
            "exp": "For secondary diagonal cells, the row and column index always sum to N + 1."
          },
          "bridge": "Diagonals test index relationships. Now let us solve the most prestigious matrix problem on USTHB exams: In Lesson 5.3, you will master the Saddle Point (Point-Selle).",
          "exercises": [
            {
              "question": "Which mathematical condition identifies cells on the secondary diagonal of an NxN matrix?",
              "options": [
                "i = j",
                "i + j = N + 1",
                "i - j = 1",
                "i * j = N"
              ],
              "ans": 1,
              "exp": "For secondary diagonal cells, the row and column index always sum to N + 1."
            },
            {
              "question": "Bridge Check: In a square matrix of size N, what mathematical relation identifies elements on the secondary (anti) diagonal?",
              "options": [
                "i = j",
                "i + j = N + 1",
                "i * j = N",
                "i - j = 1"
              ],
              "ans": 1,
              "exp": "On the anti-diagonal, the sum of row index i and column index j always equals N + 1."
            },
            {
              "question": "Exam Math Property: In a square matrix of size N, which elements belong to BOTH the main diagonal AND the secondary diagonal when N is odd?",
              "options": [
                "The four corner elements",
                "Exactly the single central element at ( (N+1)/2, (N+1)/2 )",
                "No element can belong to both",
                "All elements on row 1"
              ],
              "ans": 1,
              "exp": "When N is odd, the main (i=j) and anti-diagonal (i+j=N+1) intersect at the exact center ( (N+1)/2, (N+1)/2 )."
            }
          ]
        },
        {
          "id": "l5-3",
          "title": "Matrix Saddle Point (Point-Selle)",
          "duration": "7 min read",
          "content": "<p>An element <code>M[i, j]</code> is a <strong>saddle point</strong> if it is simultaneously:</p><ol><li>The <strong>minimum</strong> element in its row <code>i</code>.</li><li>The <strong>maximum</strong> element in its column <code>j</code>.</li></ol>",
          "code": "For i <- 1 To R Do\n  minCol <- 1;\n  For j <- 2 To C Do\n    If (M[i, j] < M[i, minCol]) Then minCol <- j; End If;\n  End For;\n  // Verify if M[i, minCol] is maximum in column minCol\nEnd For;",
          "exercise": {
            "question": "What is a matrix saddle point?",
            "options": [
              "The maximum element of the whole matrix",
              "Minimum in its row AND maximum in its column",
              "Element where i = j",
              "The average of all cells"
            ],
            "ans": 1,
            "exp": "By definition, a saddle point is min in its row and max in its column."
          },
          "bridge": "You have mastered both 1D arrays and 2D matrices! But when arrays contain thousands of unordered items, searching is slow. In Chapter 6 (Lesson 6.1), you will learn how to sort them using Selection Sort.",
          "exercises": [
            {
              "question": "What is a matrix saddle point?",
              "options": [
                "The maximum element of the whole matrix",
                "Minimum in its row AND maximum in its column",
                "Element where i = j",
                "The average of all cells"
              ],
              "ans": 1,
              "exp": "By definition, a saddle point is min in its row and max in its column."
            },
            {
              "question": "Bridge Check: Can a matrix have more than one saddle point with different values?",
              "options": [
                "Yes, any values",
                "No, by the Saddle Uniqueness Theorem, all saddle points in a matrix must have the exact same value",
                "Only if the matrix is 1x1",
                "Only if the matrix has complex numbers"
              ],
              "ans": 1,
              "exp": "All saddle points in any matrix must share the identical numerical value."
            },
            {
              "question": "Algorithm Complexity: What is the optimal time complexity to determine all saddle points in an R x C matrix?",
              "options": [
                "O(R * C)",
                "O((R * C)²)",
                "O(R² * C²)",
                "O(R + C)"
              ],
              "ans": 0,
              "exp": "Precomputing row minimums takes O(R*C), precomputing col maximums takes O(R*C), and matching them takes O(R*C). Total = O(R*C)."
            }
          ]
        }
      ]
    },
    {
      "id": "ch6",
      "num": 6,
      "week": "Week 04",
      "title": "Sorting Algorithms & Binary Search",
      "desc": "Selection Sort, Bubble Sort with early-stopping flag, and logarithmic Dichotomic Search.",
      "badgeColor": "#b8a5da",
      "lessons": [
        {
          "id": "l6-1",
          "title": "Selection Sort (Tri par Sélection)",
          "duration": "6 min read",
          "content": "<p><strong>Principle:</strong> Divides the array into sorted and unsorted segments. Repeatedly finds the minimum element in the unsorted portion and swaps it with the first unsorted position.</p><p>Total comparisons: <code>N(N-1)/2 = O(N²)</code> in all cases. Performs at most <code>N - 1</code> swaps (<code>O(N)</code>).</p>",
          "code": "Algorithm Selection_Sort;\nVar i, j, min, p, temp: integer;\nBegin\n  For i <- 1 To N - 1 Do\n    min <- T[i]; p <- i;\n    For j <- i + 1 To N Do\n      If (T[j] < min) Then min <- T[j]; p <- j; End If;\n    End For;\n    temp <- T[i]; T[i] <- min; T[p] <- temp;\n  End For;\nEnd;",
          "exercise": {
            "question": "How many comparisons does Selection Sort perform on an array of size N = 5 in pass 1?",
            "options": [
              "1",
              "4",
              "5",
              "10"
            ],
            "ans": 1,
            "exp": "Comparing T[1] against T[2], T[3], T[4], and T[5] requires exactly 4 comparisons (N - 1)."
          },
          "bridge": "Selection Sort guarantees at most N-1 swaps, but always takes O(N²) comparisons. Can we design a sorting algorithm that detects when an array is already sorted and finishes early? In Lesson 6.2, you will learn Bubble Sort with early exit flag.",
          "exercises": [
            {
              "question": "How many comparisons does Selection Sort perform on an array of size N = 5 in pass 1?",
              "options": [
                "1",
                "4",
                "5",
                "10"
              ],
              "ans": 1,
              "exp": "Comparing T[1] against T[2], T[3], T[4], and T[5] requires exactly 4 comparisons (N - 1)."
            },
            {
              "question": "Bridge Check: In Selection Sort on an array of N elements, how many comparisons are performed in the worst case and best case?",
              "options": [
                "O(N) best case, O(N²) worst case",
                "Always N*(N-1)/2 comparisons in all cases",
                "O(log N) comparisons",
                "Zero comparisons"
              ],
              "ans": 1,
              "exp": "Selection Sort unconditionally scans the remaining unsorted subarray for the minimum, always performing N*(N-1)/2 comparisons."
            },
            {
              "question": "Dry-Run Trace: In Selection Sort on `[64, 25, 12, 22, 11]`, what is the array state after pass 1 completes?",
              "options": [
                "[11, 25, 12, 22, 64]",
                "[11, 12, 22, 25, 64]",
                "[64, 25, 12, 22, 11]",
                "[25, 64, 12, 22, 11]"
              ],
              "ans": 0,
              "exp": "Pass 1 finds the minimum in the entire array (11 at index 5) and swaps it with index 1 (64), giving [11, 25, 12, 22, 64]."
            }
          ]
        },
        {
          "id": "l6-2",
          "title": "Bubble Sort (Tri à Bulles)",
          "duration": "6 min read",
          "content": "<p><strong>Principle:</strong> Repeatedly compares adjacent pairs <code>(T[j], T[j+1])</code> and swaps them if out of order. Each pass bubbles the largest unsorted element to its final rightmost position.</p><p><strong>Optimization:</strong> Using a boolean flag <code>swapped</code> allows early termination in <code>O(N)</code> time if the array is already sorted.</p>",
          "code": "Algorithm Bubble_Sort;\nVar i, j, temp: integer; swapped: boolean;\nBegin\n  For i <- 1 To N - 1 Do\n    swapped <- False;\n    For j <- 1 To N - i Do\n      If (T[j] > T[j+1]) Then\n        temp <- T[j]; T[j] <- T[j+1]; T[j+1] <- temp;\n        swapped <- True;\n      End If;\n    End For;\n    If (NOT swapped) Then Break; End If;\n  End For;\nEnd;",
          "exercise": {
            "question": "How does Bubble Sort achieve O(N) best-case time complexity?",
            "options": [
              "Sorting only half the array",
              "Using a boolean flag that detects zero swaps in a pass",
              "Reversing the array first",
              "Using float numbers"
            ],
            "ans": 1,
            "exp": "If no swaps occur in a full pass, the array is verified as sorted, terminating early."
          },
          "bridge": "Now that we can sort any array into ascending order, how fast can we search it? In Lesson 6.3, you will discover Binary Search: searching a sorted array in O(log₂ N) logarithmic time!",
          "exercises": [
            {
              "question": "How does Bubble Sort achieve O(N) best-case time complexity?",
              "options": [
                "Sorting only half the array",
                "Using a boolean flag that detects zero swaps in a pass",
                "Reversing the array first",
                "Using float numbers"
              ],
              "ans": 1,
              "exp": "If no swaps occur in a full pass, the array is verified as sorted, terminating early."
            },
            {
              "question": "Bridge Check: How does Bubble Sort achieve O(N) best-case time complexity on an already sorted array?",
              "options": [
                "By skipping every second element",
                "Using a boolean swapped flag that remains False after pass 1, triggering an immediate early exit",
                "By reversing the array first",
                "Using binary search"
              ],
              "ans": 1,
              "exp": "If pass 1 performs 0 swaps, the swapped flag stays False and the algorithm terminates in O(N)."
            },
            {
              "question": "Dry-Run Trace: On array `[5, 1, 4, 2, 8]`, how many adjacent swaps occur during pass 1 of Bubble Sort?",
              "options": [
                "1 swap",
                "3 swaps (5 with 1, 5 with 4, 5 with 2)",
                "4 swaps",
                "0 swaps"
              ],
              "ans": 1,
              "exp": "5 > 1 (swap -> [1,5,4,2,8]); 5 > 4 (swap -> [1,4,5,2,8]); 5 > 2 (swap -> [1,4,2,5,8]); 5 < 8 (no swap). Total = 3 swaps."
            }
          ]
        },
        {
          "id": "l6-3",
          "title": "Binary Search (Recherche Dichotomique)",
          "duration": "7 min read",
          "content": "<p><strong>Prerequisite:</strong> The array <em>must already be sorted</em>!</p><p>Divide-and-conquer: calculate <code>mid <- (left + right) DIV 2</code>. If <code>T[mid] < target</code>, eliminate left half (<code>left <- mid + 1</code>). If <code>T[mid] > target</code>, eliminate right half (<code>right <- mid - 1</code>).</p><p>Maximum comparisons: <code>⌈log₂ N⌉</code>. For <code>N = 1000</code>, takes at most 10 steps!</p>",
          "code": "Algorithm Binary_Search;\nVar left, right, mid: integer; found: boolean;\nBegin\n  left <- 1; right <- N; found <- False;\n  While (left <= right AND NOT found) Do\n    mid <- (left + right) DIV 2;\n    If (T[mid] = target) Then found <- True;\n    Else If (T[mid] < target) Then left <- mid + 1;\n    Else right <- mid - 1;\n    End If;\n  End While;\nEnd;",
          "exercise": {
            "question": "What is the mandatory prerequisite before applying Binary Search?",
            "options": [
              "All numbers must be positive",
              "The array must already be sorted",
              "Array size must be a power of 2",
              "No duplicates"
            ],
            "ans": 1,
            "exp": "Binary search relies on ordering to discard half the search space each step."
          },
          "bridge": "Sorting and searching are powerful tools. But as programs grow to hundreds of lines, how do we organize code into reusable, modular building blocks? In Chapter 7 (Lesson 7.1), you will learn Modular Programming: Functions vs Procedures.",
          "exercises": [
            {
              "question": "What is the mandatory prerequisite before applying Binary Search?",
              "options": [
                "All numbers must be positive",
                "The array must already be sorted",
                "Array size must be a power of 2",
                "No duplicates"
              ],
              "ans": 1,
              "exp": "Binary search relies on ordering to discard half the search space each step."
            },
            {
              "question": "Bridge Check: Why CANNOT Binary Search be used on an unsorted array?",
              "options": [
                "Because it will delete the elements",
                "Because the decision to discard the left or right half relies entirely on the elements being in sorted order",
                "Because it requires real numbers",
                "Because computers cannot divide by 2"
              ],
              "ans": 1,
              "exp": "Binary Search assumes that if target > T[mid], target can only exist to the right. On an unsorted array, this assumption fails."
            },
            {
              "question": "Complexity Check: On a sorted array of N = 1024 elements, what is the MAXIMUM number of comparisons Binary Search performs?",
              "options": [
                "1024",
                "10 (since 2¹⁰ = 1024, log₂(1024) = 10)",
                "512",
                "20"
              ],
              "ans": 1,
              "exp": "Binary search divides the interval by 2 each step: log₂(1024) = 10 comparisons in the worst case!"
            }
          ]
        }
      ]
    },
    {
      "id": "ch7",
      "num": 7,
      "week": "Week 05",
      "title": "Modular Functions & Variable Scope",
      "desc": "Subprograms, functions vs procedures, parameter pass-by-value, local vs global scope, and variable shadowing.",
      "badgeColor": "#e8d7b8",
      "lessons": [
        {
          "id": "l7-1",
          "title": "Functions vs. Procedures (Void)",
          "duration": "5 min read",
          "content": "<p><strong>Function:</strong> A subprogram that computes and returns a typed value via a <code>Return</code> statement.</p><p><strong>Procedure:</strong> A subprogram that performs actions (e.g. printing, updating an array) without returning a value (declared with return type <code>void</code>).</p>",
          "code": "// Function with return value\ninteger Function Max2(a: integer, b: integer)\nBegin\n  If (a > b) Then Return a; Else Return b; End If;\nEnd;\n\n// Procedure (no return)\nvoid Function PrintGreeting(name: string)\nBegin\n  Write(\"Hello, \", name);\nEnd;",
          "exercise": {
            "question": "What distinguishes a Function from a Procedure?",
            "options": [
              "A function returns a value; a procedure does not return a value",
              "A procedure only handles arrays",
              "Functions cannot have local variables",
              "Procedures run faster"
            ],
            "ans": 0,
            "exp": "A function returns a typed value to its caller; a procedure executes statements without returning a value."
          },
          "bridge": "We know Functions return a single result while Procedures perform actions. But how do parameters get communicated? In Lesson 7.2, you will learn Parameter Passing: Pass-by-Value vs Pass-by-Reference (Variable).",
          "exercises": [
            {
              "question": "What distinguishes a Function from a Procedure?",
              "options": [
                "A function returns a value; a procedure does not return a value",
                "A procedure only handles arrays",
                "Functions cannot have local variables",
                "Procedures run faster"
              ],
              "ans": 0,
              "exp": "A function returns a typed value to its caller; a procedure executes statements without returning a value."
            },
            {
              "question": "Bridge Check: If a subprogram needs to return THREE modified values back to the caller, should you use a Function or a Procedure?",
              "options": [
                "A Function with 3 return types",
                "A Procedure with 3 parameters passed by reference (VAR)",
                "It is impossible in algorithms",
                "A while loop"
              ],
              "ans": 1,
              "exp": "Functions return exactly one value. Procedures can return multiple outputs via VAR (reference) parameters."
            },
            {
              "question": "Design Principle: Can a pure mathematical Function modify external variables or perform user I/O in structured programming?",
              "options": [
                "Yes, functions should do everything",
                "No, pure functions should strictly compute and return a value without side-effects",
                "Functions cannot have parameters",
                "Functions can only return booleans"
              ],
              "ans": 1,
              "exp": "In clean software design, Functions are side-effect free: they compute and return a value. Side-effects (I/O, mutations) belong in Procedures."
            }
          ]
        },
        {
          "id": "l7-2",
          "title": "Parameter Passing by Value",
          "duration": "5 min read",
          "content": "<p>When parameters are passed by value, a copy of the argument is passed to the function. Any modifications to the parameter inside the function do <strong>NOT</strong> affect the original variable in the caller.</p>",
          "code": "void Function TryChange(x: integer)\nBegin\n  x <- x + 10;  // Modifies only the local copy!\nEnd;\n\nBegin // Main\n  a <- 5;\n  TryChange(a);\n  Write(a);     // Still outputs 5!\nEnd;",
          "exercise": {
            "question": "In pass-by-value, what happens to the caller's variable if the function modifies the parameter?",
            "options": [
              "The caller's variable is modified",
              "The caller's variable remains unchanged",
              "The variable is deleted",
              "Runtime error"
            ],
            "ans": 1,
            "exp": "Pass-by-value works on an isolated copy, protecting caller data from alteration."
          },
          "bridge": "You now have all foundational tools: types, decisions, loops, arrays, matrices, sorting, and modular routines! In Chapter 8 (Lesson 8.1), you will enter the Exam Problem Vault: Sheet 1 Number Theory (Armstrong numbers, primes, GCD).",
          "exercises": [
            {
              "question": "In pass-by-value, what happens to the caller's variable if the function modifies the parameter?",
              "options": [
                "The caller's variable is modified",
                "The caller's variable remains unchanged",
                "The variable is deleted",
                "Runtime error"
              ],
              "ans": 1,
              "exp": "Pass-by-value works on an isolated copy, protecting caller data from alteration."
            },
            {
              "question": "Bridge Check: In pass-by-value, if the subprogram changes parameter x <- 99, what happens to the argument variable in the caller?",
              "options": [
                "It changes to 99",
                "It remains completely unchanged because the subprogram only received a local copy",
                "It gets deleted from memory",
                "A compilation error occurs"
              ],
              "ans": 1,
              "exp": "Pass-by-value works on a local copy. Modifications do not affect the caller's original variable."
            },
            {
              "question": "Dry-Run Check: In procedure `Proc Demo(a: integer; Var b: integer); Begin a <- a + 10; b <- b + 10; End;`, caller passes x=5, y=5. After call, what are x and y in caller?",
              "options": [
                "x = 15, y = 15",
                "x = 5, y = 15 (a is pass-by-value, b is pass-by-reference Var)",
                "x = 15, y = 5",
                "x = 5, y = 5"
              ],
              "ans": 1,
              "exp": "a is passed by value (local copy changed to 15, x remains 5). b is passed by reference Var (modifies y directly to 15)."
            }
          ]
        },
        {
          "id": "l7-3",
          "title": "Local vs. Global Scope & Variable Shadowing",
          "duration": "6 min read",
          "content": "<p><strong>Local Variables:</strong> Declared inside a function. Exist only while the function is executing. Inaccessible from outside.</p><p><strong>Global Variables:</strong> Declared in main algorithm. Accessible everywhere.</p><p><strong>Shadowing:</strong> If a local variable has the same name as a global variable, the local variable takes precedence inside its function.</p>",
          "code": "Var g: integer; // Global\n\ninteger Function Test()\nVar g: integer; // Local with same name (shadowing)\nBegin\n  g <- 7;\n  Return g;\nEnd;",
          "exercise": {
            "question": "What happens when a local variable has the same name as a global variable?",
            "options": [
              "Compilation collision error",
              "Variable shadowing occurs: local masks the global variable inside the function",
              "Both merge into an array",
              "Global overwrites local"
            ],
            "ans": 1,
            "exp": "Variable shadowing ensures the innermost local declaration takes precedence during execution."
          },
          "exercises": [
            {
              "question": "What happens when a local variable has the same name as a global variable?",
              "options": [
                "Compilation collision error",
                "Variable shadowing occurs: local masks the global variable inside the function",
                "Both merge into an array",
                "Global overwrites local"
              ],
              "ans": 1,
              "exp": "Variable shadowing ensures the innermost local declaration takes precedence during execution."
            },
            {
              "question": "Scope Lifetime: When is memory allocated and deallocated for a local variable declared inside a subprogram?",
              "options": [
                "Allocated when program starts, freed on exit",
                "Allocated on subprogram call (on call stack), freed when subprogram returns",
                "Never deallocated",
                "Allocated on the hard drive"
              ],
              "ans": 1,
              "exp": "Local variables exist only during the execution of the subprogram on the call stack and are freed when it returns."
            },
            {
              "question": "Shadowing Check: If global variable x = 10, and function F declares local x = 5 and executes Write(x), what is printed?",
              "options": [
                "10",
                "5 (local variable shadows/hides the global one inside F)",
                "15",
                "Error: duplicate name"
              ],
              "ans": 1,
              "exp": "A local variable shadows a global variable of the same name within its scope. Inside F, x refers exclusively to the local variable (5)."
            }
          ]
        }
      ]
    },
    {
      "id": "ch8",
      "num": 8,
      "week": "Sheets 1 & 2",
      "title": "Tutorial Sheets 1 & 2 Problem Vault",
      "desc": "Hands-on problem solving from USTHB tutorial sheets: Armstrong numbers, prime checks, array leaders, and circular left-rotation.",
      "badgeColor": "#d97736",
      "lessons": [
        {
          "id": "l8-1",
          "title": "Sheet 1: Number Theory (Armstrong, GCD, Primes)",
          "duration": "7 min read",
          "content": "<p><strong>Armstrong Number (Ex 11):</strong> A number that equals the sum of its own digits each raised to the power of the number of digits. Example: <code>153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153</code>.</p><p><strong>Euclidean GCD (Ex 19):</strong> Repeatedly compute <code>r <- a MOD b; a <- b; b <- r</code> until <code>b = 0</code>. The GCD is <code>a</code>.</p>",
          "code": "Algorithm Euclidean_GCD;\nVar a, b, r: integer;\nBegin\n  Read(a, b);\n  While (b != 0) Do\n    r <- a MOD b; a <- b; b <- r;\n  End While;\n  Write(\"GCD: \", a);\nEnd;",
          "exercise": {
            "question": "Why is 153 an Armstrong number?",
            "options": [
              "It is divisible by 3",
              "1^3 + 5^3 + 3^3 = 153",
              "153 is prime",
              "Sum of its digits is 9"
            ],
            "ans": 1,
            "exp": "Each digit raised to the 3rd power (length 3) sums back to 153."
          },
          "bridge": "Mastering digit extraction (DIV/MOD) and divisibility leads directly to advanced array problem solving. In Lesson 8.2, you will tackle Sheet 2 Advanced Array Challenges (Leaders, Prefix Equilibrium, and Rotation).",
          "exercises": [
            {
              "question": "Why is 153 an Armstrong number?",
              "options": [
                "It is divisible by 3",
                "1^3 + 5^3 + 3^3 = 153",
                "153 is prime",
                "Sum of its digits is 9"
              ],
              "ans": 1,
              "exp": "Each digit raised to the 3rd power (length 3) sums back to 153."
            },
            {
              "question": "Bridge Check: Why is an Armstrong number check essentially a combination of Chapter 1 operators and Chapter 3 loops?",
              "options": [
                "Because it uses MOD 10 to extract digits, DIV 10 to shrink the number, and a While loop until N = 0",
                "Because it uses matrices",
                "Because it requires binary search",
                "It does not use loops"
              ],
              "ans": 0,
              "exp": "Armstrong number extraction repeatedly extracts the last digit with MOD 10 and strips it with DIV 10 inside a While loop."
            },
            {
              "question": "Dry-Run Check: Using the Euclidean algorithm (a MOD b), how many steps are needed to compute GCD(48, 18)?",
              "options": [
                "1 step",
                "3 steps (48 MOD 18 = 12; 18 MOD 12 = 6; 12 MOD 6 = 0 -> GCD is 6)",
                "6 steps",
                "18 steps"
              ],
              "ans": 1,
              "exp": "Step 1: 48 % 18 = 12. Step 2: 18 % 12 = 6. Step 3: 12 % 6 = 0. Remainder is 0, so GCD is 6!"
            }
          ]
        },
        {
          "id": "l8-2",
          "title": "Sheet 2: Array Leaders & Circular Left-Rotation",
          "duration": "7 min read",
          "content": "<p><strong>Leaders in an Array (Ex 7):</strong> An element is a leader if it is strictly greater than all elements to its right. Traverse from right to left in <code>O(N)</code> keeping track of <code>maxFromRight</code>.</p><p><strong>Array Left Rotation by k (Ex 4):</strong> Reversal algorithm: 1) Reverse <code>A[1..k]</code>, 2) Reverse <code>A[k+1..N]</code>, 3) Reverse whole array <code>A[1..N]</code> in <code>O(N)</code> time and <code>O(1)</code> extra space.</p>",
          "code": "Algorithm Leaders;\nVar i, n, maxFromRight: integer;\nBegin\n  maxFromRight <- A[n]; Write(maxFromRight);\n  For i <- n - 1 DownTo 1 Do\n    If (A[i] > maxFromRight) Then maxFromRight <- A[i]; Write(maxFromRight); End If;\n  End For;\nEnd;",
          "exercise": {
            "question": "In array [16, 17, 4, 3, 5, 2], which elements are leaders?",
            "options": [
              "16, 17, 4",
              "17, 5, 2",
              "17 only",
              "2 only"
            ],
            "ans": 1,
            "exp": "2 is the rightmost (leader); 5 > 2 (leader); 17 > 5 (leader). Output: 17, 5, 2."
          },
          "bridge": "You have completed the entire ALGØ 1 university track! Test your comprehensive skills with the 50-Question Master Certification Quiz and the 5 Real University Exam Labs!",
          "exercises": [
            {
              "question": "In array [16, 17, 4, 3, 5, 2], which elements are leaders?",
              "options": [
                "16, 17, 4",
                "17, 5, 2",
                "17 only",
                "2 only"
              ],
              "ans": 1,
              "exp": "2 is the rightmost (leader); 5 > 2 (leader); 17 > 5 (leader). Output: 17, 5, 2."
            },
            {
              "question": "Bridge Check: Why is calculating the Equilibrium Index in O(N) using TotalSum - LeftSum superior to the naive O(N²) approach?",
              "options": [
                "It avoids re-summing the entire right subarray on every iteration, reducing 1,000,000 steps to 1,000 steps",
                "It uses less disk space",
                "It changes the array elements",
                "There is no difference"
              ],
              "ans": 0,
              "exp": "Computing TotalSum once allows calculating RightSum in O(1) as TotalSum - LeftSum - T[i], reducing overall time from O(N²) to O(N)."
            },
            {
              "question": "Exam Edge Case: In an array of size N that is strictly sorted in descending order (e.g. `[50, 40, 30, 20, 10]`), how many leaders exist?",
              "options": [
                "Only 1 leader (the first element)",
                "All N elements are leaders (every element is greater than all elements to its right)",
                "0 leaders",
                "Only the last element"
              ],
              "ans": 1,
              "exp": "In a strictly decreasing array, every single element is greater than all elements to its right, so all N elements are leaders!"
            }
          ]
        }
      ]
    }
  ],
  "quizQuestions": [
    {
      "id": 1,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "Which of the following variable identifiers is INVALID according to standard algorithmic rules?",
      "options": [
        "student_average",
        "2nd_score",
        "first_name",
        "maxVal"
      ],
      "ans": 1,
      "exp": "Variable identifiers must begin with a letter (a-z, A-Z) or underscore, never a digit. Thus, 2nd_score is invalid because it begins with '2'."
    },
    {
      "id": 2,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "Which elementary data type is most appropriate to store a user's login status (logged in vs logged out)?",
      "options": [
        "integer",
        "char",
        "boolean",
        "float"
      ],
      "ans": 2,
      "exp": "A boolean data type stores binary truth values: True or False, which perfectly models a login state."
    },
    {
      "id": 3,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "What is the correct algorithmic sequence to swap the values of two variables x and y without data loss?",
      "options": [
        "x <- y; y <- temp; temp <- x;",
        "temp <- x; x <- y; y <- temp;",
        "temp <- y; x <- temp; y <- x;",
        "x <- temp; temp <- y; y <- x;"
      ],
      "ans": 1,
      "exp": "temp <- x preserves the initial value of x; then x <- y copies y into x; finally y <- temp places the saved value into y."
    },
    {
      "id": 4,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "What are the values of 19 DIV 4 and 19 MOD 4 in standard algorithmic arithmetic?",
      "options": [
        "19 DIV 4 = 4 and 19 MOD 4 = 3",
        "19 DIV 4 = 4.75 and 19 MOD 4 = 3",
        "19 DIV 4 = 3 and 19 MOD 4 = 4",
        "19 DIV 4 = 4 and 19 MOD 4 = 0.75"
      ],
      "ans": 0,
      "exp": "DIV computes the integer quotient (19 = 4 * 4 + 3, so quotient is 4). MOD computes the remainder of integer division (3)."
    },
    {
      "id": 5,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "What is the boolean evaluation of the expression: (5 + 3 * 2 > 10) AND NOT (4 <= 2)?",
      "options": [
        "False",
        "True",
        "Syntax Error",
        "Indeterminate"
      ],
      "ans": 1,
      "exp": "Arithmetic first: 3 * 2 = 6, 5 + 6 = 11. Relational next: 11 > 10 is True, 4 <= 2 is False. Logical: NOT False is True. Finally True AND True evaluates to True."
    },
    {
      "id": 6,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "In operator evaluation hierarchy, what is the correct order of precedence from highest to lowest?",
      "options": [
        "Logical (AND/OR) -> Relational (>, =) -> Arithmetic (*, +)",
        "Relational (>, =) -> Arithmetic (*, +) -> Logical (AND/OR)",
        "Parentheses -> Arithmetic (*, /, DIV, MOD then +, -) -> Relational (<, >, =) -> Logical (NOT then AND then OR)",
        "Arithmetic -> Logical -> Relational"
      ],
      "ans": 2,
      "exp": "Operations inside parentheses always take precedence, followed by multiplicative arithmetic, additive arithmetic, relational comparisons, NOT, AND, and finally OR."
    },
    {
      "id": 7,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "Which of the following is NOT one of Donald Knuth's five fundamental properties of an algorithm?",
      "options": [
        "Finiteness (must terminate after a finite number of steps)",
        "Definiteness (each instruction must be rigorous and unambiguous)",
        "Object-Oriented Polymorphism (must implement class hierarchies)",
        "Effectiveness (each operation must be sufficiently basic to be executable)"
      ],
      "ans": 2,
      "exp": "The 5 properties are: Input, Output, Definiteness, Finiteness, and Effectiveness. Polymorphism is an OOP language paradigm, not an algorithmic property."
    },
    {
      "id": 8,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "Consider: a <- 5; b <- 3; a <- a + b; b <- a - b; a <- a - b; What are the values of a and b at the end?",
      "options": [
        "a = 5, b = 3",
        "a = 3, b = 5",
        "a = 8, b = 8",
        "a = 0, b = 0"
      ],
      "ans": 1,
      "exp": "Step 1: a becomes 5+3=8. Step 2: b becomes 8-3=5. Step 3: a becomes 8-5=3. The values are swapped without needing a temporary variable!"
    },
    {
      "id": 9,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "What is the fundamental difference between an Algorithm and a Computer Program?",
      "options": [
        "An algorithm is written only in C; a program is written in Python.",
        "An algorithm is a conceptual, language-independent problem-solving procedure; a program is an implementation in a specific language executable by a computer.",
        "An algorithm runs on the CPU while a program runs in RAM.",
        "There is no distinction; both terms denote the exact same object."
      ],
      "ans": 1,
      "exp": "An algorithm is an abstract design and mathematical method. A program is a concrete realization written in a machine-understandable language."
    },
    {
      "id": 10,
      "cat": "w1",
      "categoryName": "Week 1: Fundamentals & Types",
      "q": "What happens during the execution of the instruction Read(n)?",
      "options": [
        "The computer prints the value of n on the monitor.",
        "The computer halts execution until the user inputs a value from the keyboard, which is then assigned to n.",
        "The value of n is initialized to 0 automatically.",
        "The computer checks if n is a prime number."
      ],
      "ans": 1,
      "exp": "Read(n) is the standard input primitive that captures an external value from the input stream and stores it into variable n."
    },
    {
      "id": 11,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "In an If-Then-Else statement: If (condition) Then S1 Else S2 EndIf; when is statement S2 executed?",
      "options": [
        "Whenever condition evaluates to True",
        "Whenever condition evaluates to False",
        "Every time the program runs, after S1 finishes",
        "Only when a runtime error occurs"
      ],
      "ans": 1,
      "exp": "The Else branch S2 is executed if and only if the boolean condition evaluates to False."
    },
    {
      "id": 12,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "When is a Switch / Case (Selon Que) structure preferred over chained If-Else statements?",
      "options": [
        "When evaluating arbitrary real inequalities (e.g. x > 3.14 AND y < 2.71)",
        "When a single discrete selector variable (integer or character) is compared against multiple constant equality values",
        "When executing an indeterminate loop",
        "When allocating dynamic memory"
      ],
      "ans": 1,
      "exp": "Switch/Case provides clean, readable branching when testing a discrete variable against known discrete constants (e.g. menu choices 1, 2, 3)."
    },
    {
      "id": 13,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "In the loop: For i <- 1 To N Do ... EndFor; (with N >= 1), how many times does the body execute?",
      "options": [
        "N - 1 times",
        "N times",
        "N + 1 times",
        "Indefinitely"
      ],
      "ans": 1,
      "exp": "The loop counter i takes the values 1, 2, ..., N inclusive. The number of iterations is N - 1 + 1 = N."
    },
    {
      "id": 14,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "If the condition of a While (condition) Do ... EndWhile; loop is False initially, how many times does the body execute?",
      "options": [
        "0 times (never executed)",
        "Exactly 1 time",
        "N times",
        "Causes an infinite loop"
      ],
      "ans": 0,
      "exp": "The While loop is a pre-tested loop. It tests the condition before entering the body. If False at the start, the body executes 0 times."
    },
    {
      "id": 15,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "What is the key structural difference between a While loop and a Repeat ... Until loop?",
      "options": [
        "Repeat ... Until never terminates",
        "Repeat ... Until is a post-tested loop, ensuring its body executes at least once before the condition is evaluated",
        "While loops only increment by 2",
        "Repeat ... Until tests the condition at the beginning"
      ],
      "ans": 1,
      "exp": "Repeat...Until executes the loop body first, then checks the termination condition at the bottom, guaranteeing at least one execution."
    },
    {
      "id": 16,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "Why must an accumulator variable used to compute a running sum (sum <- sum + x) be initialized to 0 before the loop?",
      "options": [
        "Because 0 is the additive identity element (x + 0 = x)",
        "Because algorithms crash if variables are not set to 0",
        "To ensure the loop runs at least once",
        "Because arrays start at index 0"
      ],
      "ans": 0,
      "exp": "Zero is the neutral identity element for addition. If uninitialized, garbage values corrupt the cumulative sum."
    },
    {
      "id": 17,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "What causes an infinite loop in a While structure?",
      "options": [
        "Declaring variables of type float",
        "Failing to modify the loop condition variable inside the loop body, meaning the condition never becomes False",
        "Using Write statements inside the loop",
        "Executing more than 100 iterations"
      ],
      "ans": 1,
      "exp": "If the variables in the loop condition are never updated, the condition remains persistently True, creating an infinite loop."
    },
    {
      "id": 18,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "Consider: For i <- 1 To 4 Do For j <- 1 To 3 Do Write('*'); EndFor; EndFor; How many asterisks are printed?",
      "options": [
        "7",
        "12",
        "4",
        "16"
      ],
      "ans": 1,
      "exp": "The outer loop runs 4 times. For each outer iteration, the inner loop runs 3 times. Total executions = 4 * 3 = 12."
    },
    {
      "id": 19,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "In algorithmic problem solving, what is a 'sentinel value'?",
      "options": [
        "The maximum integer capacity in 64-bit systems",
        "A special designated dummy value (e.g., -1 or 9999) used to signal the end of input sequence",
        "A pointer to the middle element",
        "The counter variable of a For loop"
      ],
      "ans": 1,
      "exp": "A sentinel value is an out-of-range flag entered by the user or data stream that indicates there is no more data to process."
    },
    {
      "id": 20,
      "cat": "w2",
      "categoryName": "Week 2: Control Structures & Loops",
      "q": "When checking whether an integer N > 1 is prime, what is the optimal upper limit for testing potential divisors?",
      "options": [
        "N - 1",
        "N / 2 or floor(sqrt(N))",
        "2 * N",
        "N * N"
      ],
      "ans": 1,
      "exp": "If N has a non-trivial divisor, at least one divisor must be <= sqrt(N). Testing up to sqrt(N) drops complexity from O(N) to O(sqrt(N))."
    },
    {
      "id": 21,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "In the USTHB algorithmic lecture convention, what is the default starting index for an array T declared as T: Array[1..N] of integer?",
      "options": [
        "0",
        "1",
        "-1",
        "Undefined"
      ],
      "ans": 1,
      "exp": "USTHB course notes use 1-based indexing: elements are addressed from T[1] to T[N]."
    },
    {
      "id": 22,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "What happens if an algorithm accesses T[15] when T is declared as Array[1..10] of integer?",
      "options": [
        "The array automatically resizes to 15 elements",
        "An Array Index Out of Bounds error occurs",
        "It reads the 5th element of T",
        "It returns 0 by default"
      ],
      "ans": 1,
      "exp": "Static arrays have fixed memory boundaries. Accessing an index outside [1..10] violates bounds and generates an index out of bounds error."
    },
    {
      "id": 23,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "To reverse an array T of size N in-place, what must the loop counter range be?",
      "options": [
        "For i <- 1 To N Do",
        "For i <- 1 To N DIV 2 Do",
        "For i <- 1 To N - 1 Do",
        "For i <- N To 1 Do"
      ],
      "ans": 1,
      "exp": "Swapping T[i] with T[N - i + 1] from 1 to N DIV 2 flips the array. If you loop up to N, the elements swap back to their original positions!"
    },
    {
      "id": 24,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "When finding the maximum in an array T of size N, why initialize max <- T[1] instead of max <- 0?",
      "options": [
        "Setting max <- 0 causes a type mismatch",
        "If all numbers in T are strictly negative (e.g. [-15, -7, -22]), max <- 0 would incorrectly return 0",
        "max <- T[1] makes the loop run in half the time",
        "There is no reason; both behave identically"
      ],
      "ans": 1,
      "exp": "If all elements are negative, 0 is greater than every element in T, producing an incorrect maximum. Initializing with T[1] ensures valid domain bounds."
    },
    {
      "id": 25,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "How is a String fundamentally represented in foundational data structures?",
      "options": [
        "As a single 64-bit integer",
        "As an indexed array of characters (Array[1..L] of char)",
        "As a floating-point exponent",
        "As a boolean matrix"
      ],
      "ans": 1,
      "exp": "In algorithmic fundamentals, a string is a contiguous one-dimensional array of characters with an accessible length."
    },
    {
      "id": 26,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "Given that ord('A') = 65 and ord('a') = 97, what expression converts an uppercase letter c into lowercase?",
      "options": [
        "char(ord(c) - 32)",
        "char(ord(c) + 32)",
        "char(ord(c) * 2)",
        "char(ord(c) + 26)"
      ],
      "ans": 1,
      "exp": "97 - 65 = 32. Adding 32 to the ASCII value of an uppercase letter yields its lowercase counterpart."
    },
    {
      "id": 27,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "Which condition confirms that a string S of length N is a palindrome?",
      "options": [
        "S[1] = S[N]",
        "S[i] = S[N - i + 1] for all i from 1 to N DIV 2",
        "All characters in S are uppercase",
        "N must be an even integer"
      ],
      "ans": 1,
      "exp": "A palindrome reads identically forwards and backwards; every character at index i must match the symmetric character at index N - i + 1."
    },
    {
      "id": 28,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "For a 2D array (matrix) M: Array[1..R, 1..C] of integer, how many total elements are in M?",
      "options": [
        "R + C",
        "R * C",
        "2 * (R + C)",
        "R^C"
      ],
      "ans": 1,
      "exp": "A matrix with R rows and C columns contains R * C individual elements."
    },
    {
      "id": 29,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "To traverse a matrix row-by-row, how should nested loops be structured?",
      "options": [
        "Outer loop i from 1 to R (rows); Inner loop j from 1 to C (columns)",
        "Outer loop j from 1 to C; Inner loop i from 1 to R",
        "A single loop from 1 to R + C",
        "A While loop without row indices"
      ],
      "ans": 0,
      "exp": "Row-by-row traversal fixes row i in the outer loop and scans across all columns j in the inner loop."
    },
    {
      "id": 30,
      "cat": "w3",
      "categoryName": "Week 3: Arrays, Strings & Matrices",
      "q": "In an N x N square matrix, which mathematical condition identifies cells on the secondary (anti-) diagonal?",
      "options": [
        "i = j",
        "i + j = N + 1",
        "i - j = 1",
        "i * j = N"
      ],
      "ans": 1,
      "exp": "The main diagonal satisfies i = j; the secondary diagonal satisfies i + j = N + 1."
    },
    {
      "id": 31,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "What is the working mechanism of the Selection Sort algorithm?",
      "options": [
        "Repeatedly swap adjacent elements that are out of order",
        "Repeatedly find the minimum element in the unsorted subarray and swap it with the element at the beginning of the unsorted subarray",
        "Split the array into two halves recursively",
        "Insert each element into a hash table"
      ],
      "ans": 1,
      "exp": "Selection sort scans the unsorted portion of the array, selects the minimum element, and places it at index i via a swap."
    },
    {
      "id": 32,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "For an array of size N = 5, how many comparisons does Selection Sort perform in its first pass (i = 1)?",
      "options": [
        "1 comparison",
        "4 comparisons",
        "5 comparisons",
        "10 comparisons"
      ],
      "ans": 1,
      "exp": "In pass 1, T[1] is compared against T[2], T[3], T[4], and T[5], which is exactly 4 comparisons (N - 1)."
    },
    {
      "id": 33,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "What is the total number of comparisons made by standard Selection Sort on an array of size N?",
      "options": [
        "N",
        "N * (N - 1) / 2",
        "N^2 + N",
        "log2(N)"
      ],
      "ans": 1,
      "exp": "The number of comparisons is (N-1) + (N-2) + ... + 1 = N(N - 1) / 2, which is O(N^2) in all cases."
    },
    {
      "id": 34,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "What is the core principle of Bubble Sort?",
      "options": [
        "Compare adjacent pairs (T[j], T[j+1]) and swap them if out of order, bubbling the largest unsorted element to the end",
        "Find the minimum element and place it at index 1",
        "Divide the array around a pivot",
        "Count element frequencies"
      ],
      "ans": 0,
      "exp": "Bubble sort compares neighboring pairs and swaps them if T[j] > T[j+1]. Each pass bubbles the largest remaining element to its final rightmost position."
    },
    {
      "id": 35,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "How can Bubble Sort be optimized to achieve O(N) best-case time complexity?",
      "options": [
        "By sorting only half the array",
        "By using a boolean flag 'swapped'; if a pass completes with 0 swaps, the array is already sorted and we terminate early",
        "By reversing the array first",
        "By replacing integer arithmetic with floats"
      ],
      "ans": 1,
      "exp": "If no swaps occur in a full pass through the array, the array is verified to be fully sorted, allowing immediate termination in O(N)."
    },
    {
      "id": 36,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "What is the mandatory prerequisite before applying Binary Search (Dichotomic Search)?",
      "options": [
        "The array elements must all be positive",
        "The array must already be sorted in ascending (or descending) order",
        "The array size must be a power of 2",
        "The array must not contain duplicate values"
      ],
      "ans": 1,
      "exp": "Binary search relies on order to discard half the search space at each step. If the array is unsorted, binary search is invalid."
    },
    {
      "id": 37,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "In Binary Search on an ascending sorted array, if T[mid] < target, how should search boundaries be updated?",
      "options": [
        "right <- mid - 1",
        "left <- mid + 1",
        "mid <- mid + 1",
        "left <- right"
      ],
      "ans": 1,
      "exp": "Since T[mid] is strictly less than target, target cannot exist in the left half or at mid. The new search range becomes [mid + 1 .. right]."
    },
    {
      "id": 38,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "What formula calculates the middle index mid between bounds left and right?",
      "options": [
        "mid <- (left + right) / 2",
        "mid <- (left + right) DIV 2",
        "mid <- (right - left) MOD 2",
        "mid <- left * right"
      ],
      "ans": 1,
      "exp": "Integer division DIV truncates any decimal part, providing an exact integer index: mid <- (left + right) DIV 2."
    },
    {
      "id": 39,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "For an array of size N = 1000, what is the maximum number of comparisons Binary Search requires in the worst case?",
      "options": [
        "1000 comparisons",
        "500 comparisons",
        "Approximately 10 comparisons",
        "1 comparison"
      ],
      "ans": 2,
      "exp": "Binary search operates in O(log2 N). ceil(log2 1000) = 10, because 2^10 = 1024 >= 1000."
    },
    {
      "id": 40,
      "cat": "w4",
      "categoryName": "Week 4: Sorting & Binary Search",
      "q": "Given array A = [7, 5, 4, 2], what are the contents of A after Pass 1 of Selection Sort?",
      "options": [
        "[5, 7, 4, 2]",
        "[2, 5, 4, 7]",
        "[2, 4, 5, 7]",
        "[7, 4, 5, 2]"
      ],
      "ans": 1,
      "exp": "The minimum in [7, 5, 4, 2] is 2 at index 4. It swaps with A[1] (7). The array becomes [2, 5, 4, 7]."
    },
    {
      "id": 41,
      "cat": "w5",
      "categoryName": "Week 5: Modular Functions & Scope",
      "q": "What is the primary difference between a Function and a Procedure (or void function)?",
      "options": [
        "A function returns a value to the caller, whereas a procedure performs actions without returning a value",
        "A procedure can only accept array parameters",
        "A function cannot have local variables",
        "A procedure executes faster than a function"
      ],
      "ans": 0,
      "exp": "A function computes and returns a typed value via a return statement. A procedure executes statements (I/O, mutations) without returning a value."
    },
    {
      "id": 42,
      "cat": "w5",
      "categoryName": "Week 5: Modular Functions & Scope",
      "q": "When parameters are passed 'by value' to a subprogram:",
      "options": [
        "Any changes made to the parameter inside the subprogram directly alter the caller's variable",
        "A copy of the argument's value is passed; changes made inside the subprogram do NOT alter the caller's original variable",
        "The variable is erased from memory",
        "The function cannot access the parameter's value"
      ],
      "ans": 1,
      "exp": "Pass-by-value protects the caller's arguments by operating strictly on local copies."
    },
    {
      "id": 43,
      "cat": "w5",
      "categoryName": "Week 5: Modular Functions & Scope",
      "q": "What is the scope and lifetime of a local variable declared inside a function?",
      "options": [
        "It is accessible anywhere across the entire program permanently",
        "It is accessible only within that function and exists only while the function is executing",
        "It is shared across all functions",
        "It can only be read by the main algorithm"
      ],
      "ans": 1,
      "exp": "Local variables are created on function invocation and destroyed on return. Their scope is strictly confined to the declaring block."
    },
    {
      "id": 44,
      "cat": "w5",
      "categoryName": "Week 5: Modular Functions & Scope",
      "q": "What happens when a local variable shares the same name as a global variable?",
      "options": [
        "A syntax error occurs immediately",
        "Variable shadowing occurs: inside the function, the local variable takes precedence and masks the global variable",
        "Both variables are combined into a list",
        "The global variable overwrites the local one"
      ],
      "ans": 1,
      "exp": "Variable shadowing means the innermost scope masks the outer scope of the same name during function execution."
    },
    {
      "id": 45,
      "cat": "w5",
      "categoryName": "Sheets & Exam Preparation",
      "q": "In Sheet 1 Exercise 10, when solving ax^2 + bx + c = 0, what happens if a = 0 and b != 0?",
      "options": [
        "The equation is quadratic with discriminant Delta = 0",
        "The equation is linear, yielding a single root x = -c / b",
        "The equation has no real solutions",
        "The equation has infinite solutions"
      ],
      "ans": 1,
      "exp": "If a = 0, the x^2 term vanishes, transforming the equation into a first-degree linear equation bx + c = 0 with solution x = -c/b."
    },
    {
      "id": 46,
      "cat": "w5",
      "categoryName": "Sheets & Exam Preparation",
      "q": "In Sheet 1 Exercise 11, which property defines an Armstrong (Narcissistic) number?",
      "options": [
        "A number that equals the sum of its digits",
        "A number that equals the sum of its own digits each raised to the power of the total number of digits (e.g. 153 = 1^3 + 5^3 + 3^3)",
        "A prime number whose reversal is also prime",
        "A number equal to the sum of its proper divisors"
      ],
      "ans": 1,
      "exp": "For an n-digit number, each digit raised to power n sums to the original number. For 153: 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153."
    },
    {
      "id": 47,
      "cat": "w5",
      "categoryName": "Sheets & Exam Preparation",
      "q": "In Sheet 2 Exercise 7, an element in an array is defined as a 'Leader' if:",
      "options": [
        "It is the maximum element in the whole array",
        "It is strictly greater than all elements located to its right side (the rightmost element is always a leader)",
        "It is equal to the average of its neighbors",
        "It occurs more than N/2 times"
      ],
      "ans": 1,
      "exp": "By definition, A[i] is a leader if A[i] > A[j] for all j > i. The last element has no elements to its right, so it is always a leader."
    },
    {
      "id": 48,
      "cat": "w5",
      "categoryName": "Sheets & Exam Preparation",
      "q": "In Sheet 2 Exercise 8, what defines the Equilibrium Index k of an array A of size N?",
      "options": [
        "A[k] = 0",
        "The sum of elements at lower indices sum(A[1..k-1]) equals the sum of elements at higher indices sum(A[k+1..N])",
        "A[k] divides the total sum evenly",
        "k is exactly N / 2"
      ],
      "ans": 1,
      "exp": "An equilibrium index balances the array: the sum of elements strictly to the left equals the sum of elements strictly to the right."
    },
    {
      "id": 49,
      "cat": "w5",
      "categoryName": "Sheets & Exam Preparation",
      "q": "What is the optimal time complexity to find an equilibrium index in an array of size N?",
      "options": [
        "O(N^3)",
        "O(N^2)",
        "O(N)",
        "O(log N)"
      ],
      "ans": 2,
      "exp": "By calculating total_sum once in O(N), then iterating while maintaining a running left_sum, right_sum = total_sum - left_sum - A[i] takes O(1) per step, achieving O(N) overall."
    },
    {
      "id": 50,
      "cat": "w5",
      "categoryName": "Sheets & Exam Preparation",
      "q": "In Sheet 2 Exercise 4, to rotate an array to the left by k positions in O(N) time and O(1) extra space, which method is optimal?",
      "options": [
        "Bubble Sort",
        "The Three-Reversal Algorithm: reverse A[1..k], reverse A[k+1..N], then reverse the whole array A[1..N]",
        "Shifting elements one position at a time k times",
        "Linear Search"
      ],
      "ans": 1,
      "exp": "Reversing the first k elements, reversing the remaining N-k elements, and then reversing the entire array achieves in-place left rotation in O(N) time and O(1) auxiliary space."
    }
  ]
};
