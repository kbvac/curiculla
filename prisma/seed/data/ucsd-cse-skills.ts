/**
 * UCSD CSE — course → skill mapping (NOT a catalog).
 * The authoritative course data (titles, units, descriptions, prerequisites)
 * comes from the UCSD adapter import; this file only maps each course code
 * to the internal skill slugs, and is used to link sessions and paths.
 * Previously named ucsd-cse-catalog.ts (misleading — see fix log).
 * Source: https://catalog.ucsd.edu/archive/2022-23/courses/CSE.html
 *
 * Manually curated for coherence: real codes, titles, units, prerequisites.
 * skillSlugs map each course to the internal skill graph.
 */

export type CatalogCourse = {
  code: string; // "CSE 100"
  title: string;
  description: string;
  units: number;
  catalogLevel: "LOWER_DIVISION" | "UPPER_DIVISION";
  prerequisites: string[]; // course codes, e.g. ["CSE 21", "CSE 12"]
  skillSlugs: string[];
  catalogUrl: string;
};

const CATALOG_BASE = "https://catalog.ucsd.edu/archive/2022-23/courses/CSE.html";

export const ucsdCseCatalog: CatalogCourse[] = [
  // ─── Lower Division ─────────────────────────────────────────────────────────
  {
    code: "CSE 6R",
    title: "Introduction to Computer Science and Object-Oriented Programming: Python",
    description:
      "An introduction to computer science and programming using the Python language: basic data types, loops and iteration, basic data structures (list, set, dictionary), memory models, conditional statements, recursion, basic algorithm time complexity analysis, class design, and inheritance.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: [],
    skillSlugs: ["python-basics", "python-oop"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 8A",
    title: "Introduction to Programming and Computational Problem-Solving I",
    description:
      "Basics of programming including variables, conditionals, loops, functions/methods. Structured data storage such as arrays/lists and dictionaries, including data mutation. Hands-on experience designing, writing, testing, and debugging programs.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: [],
    skillSlugs: ["python-basics"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 8B",
    title: "Introduction to Programming and Computational Problem-Solving II",
    description:
      "Introductory programming using an object-oriented approach with Java. Builds on CSE 8A to introduce class design and use, interfaces, basic class hierarchies, recursion, event-based programming, error reporting with exceptions, and file I/O.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: ["CSE 8A"],
    skillSlugs: ["python-oop"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 11",
    title: "Introduction to Programming and Computational Problem-Solving: Accelerated Pace",
    description:
      "Accelerated introductory programming including an object-oriented approach. Covers variables, conditionals, loops, functions, structured data storage, class design, interfaces, class hierarchies, recursion, event-based programming, and file I/O. Equivalent to the CSE 8A-B sequence.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: [],
    skillSlugs: ["python-basics", "python-oop"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 12",
    title: "Basic Data Structures and Object-Oriented Design",
    description:
      "Use and implementation of basic data structures including linked lists, stacks, and queues. Advanced structures such as binary trees and hash tables. Object-oriented design including interfaces, polymorphism, encapsulation, abstract data types, pre-/post-conditions. Recursion. Uses Java and Java Collections.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: ["CSE 8B", "CSE 11"],
    skillSlugs: ["data-structures", "python-oop", "complexity-analysis"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 15L",
    title: "Software Tools and Techniques Laboratory",
    description:
      "Hands-on exploration of software development tools and techniques. Investigation of the scientific process as applied to software development and debugging. Emphasis on weekly hands-on laboratory experiences and laboratory notebooking techniques.",
    units: 2,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: ["CSE 8B", "CSE 11"],
    skillSlugs: ["git-version-control", "unit-testing", "linux-basics"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 20",
    title: "Discrete Mathematics",
    description:
      "How logic is used in computer science: for reasoning, as a language for specifications, and as operations in computation. Sets, relations, functions, equivalence relations, partial orders, number systems, proof methods (induction and recursion). Propositional and predicate logic applied to circuit design, databases, cryptography, and program correctness.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: ["CSE 11", "CSE 6R", "CSE 8A", "CSE 8B"],
    skillSlugs: ["discrete-mathematics", "formal-logic", "set-theory"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 21",
    title: "Mathematics for Algorithms and Systems",
    description:
      "Mathematical concepts used to model and analyze algorithms and computer systems: counting techniques (inclusion-exclusion, permutations and combinations), data representations, analysis of algorithms (order notation, time complexities, loop invariants), recurrence relations, graphs and trees, and basic probability.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: ["CSE 20"],
    skillSlugs: ["discrete-mathematics", "combinatorics", "graph-theory", "complexity-analysis"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 30",
    title: "Computer Organization and Systems Programming",
    description:
      "Introduction to organization of modern digital computers—understanding the various components of a computer and their interrelationships. Study of a specific architecture/machine with emphasis on systems programming in C and Assembly languages in a UNIX environment.",
    units: 4,
    catalogLevel: "LOWER_DIVISION",
    prerequisites: ["CSE 12", "CSE 15L"],
    skillSlugs: ["computer-architecture", "linux-basics"],
    catalogUrl: CATALOG_BASE,
  },

  // ─── Upper Division — Core ──────────────────────────────────────────────────
  {
    code: "CSE 100",
    title: "Advanced Data Structures",
    description:
      "High-performance data structures and supporting algorithms. Use and implementation of (un)balanced trees, graphs, priority queues, and hash tables. Memory management, pointers, recursion. Theoretical and practical performance analysis, both average case and amortized. Uses C++ and STL.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 21", "CSE 12", "CSE 15L", "CSE 30"],
    skillSlugs: ["data-structures", "algorithms", "complexity-analysis"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 101",
    title: "Design and Analysis of Algorithms",
    description:
      "Design and analysis of efficient algorithms with emphasis on nonnumerical algorithms such as sorting, searching, pattern matching, and graph and network algorithms. Measuring complexity of algorithms, time and storage. NP-complete problems.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 100"],
    skillSlugs: ["algorithms", "complexity-analysis", "graph-theory"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 103",
    title: "A Practical Introduction to Probability and Statistics",
    description:
      "Distributions over the real line. Independence, expectation, conditional expectation, mean, variance. Hypothesis testing. Learning classifiers. Distributions over R^n, covariance matrix. Binomial, Poisson distributions. Chernoff bound. Entropy, compression, estimation.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 21"],
    skillSlugs: ["probability", "conditional-probability", "hypothesis-testing", "statistics"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 105",
    title: "Theory of Computability",
    description:
      "An introduction to the mathematical theory of computability. Formal languages. Finite automata and regular expressions. Push-down automata and context-free languages. Computable or recursive functions: Turing machines, the halting problem. Undecidability.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 12", "CSE 15L", "CSE 20", "CSE 21"],
    skillSlugs: ["automata-theory", "computability", "formal-logic"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 110",
    title: "Software Engineering",
    description:
      "Introduction to software development and engineering methods, including specification, design, implementation, testing, and process. Emphasis on team development, agile methods, and use of tools such as IDEs, version control, and test harnesses.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 100"],
    skillSlugs: ["design-patterns", "unit-testing", "git-version-control", "solid-principles"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 120",
    title: "Principles of Computer Operating Systems",
    description:
      "Basic functions of operating systems; basic kernel structure, concurrency, memory management, virtual memory, file systems, process scheduling, security and protection.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 30", "CSE 101", "CSE 110"],
    skillSlugs: ["operating-systems"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 123",
    title: "Computer Networks",
    description:
      "Concepts, principles, and practice of computer communication networks with examples from existing architectures, protocols, and standards, with special emphasis on internet protocols. Layering and the OSI model; routing and congestion control; internetworking; transport protocols.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 30", "CSE 101", "CSE 110"],
    skillSlugs: ["networking-basics", "network-protocols"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 127",
    title: "Introduction to Computer Security",
    description:
      "Basic cryptography, security/threat analysis, access control, auditing, security models, distributed systems security, and theory behind common attack and defense techniques. Formal models as well as the bits and bytes of security exploits.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 21", "CSE 120"],
    skillSlugs: ["cryptography-basics", "operating-systems", "networking-basics"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 130",
    title: "Programming Languages: Principles and Paradigms",
    description:
      "Introduction to programming languages and paradigms, the components that comprise them, and the principles of language design, through the analysis and comparison of a variety of languages. Involves programming in most languages studied.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 12", "CSE 100", "CSE 105"],
    skillSlugs: ["formal-logic", "python-advanced"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 131",
    title: "Compiler Construction",
    description:
      "Introduction to the compilation of programming languages: lexical and syntactic analysis, symbol tables, syntax-directed translation, type checking, code generation, optimization, interpretation, and compiler structure.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 100", "CSE 105", "CSE 130"],
    skillSlugs: ["automata-theory", "algorithms"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 132A",
    title: "Database System Principles",
    description:
      "Basic concepts of databases, including data modeling, relational databases, query languages, optimization, dependencies, schema design, and concurrency control. Exposure to one or several commercial database systems.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 100"],
    skillSlugs: ["databases-sql", "database-design"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 132C",
    title: "Database System Implementation",
    description:
      "Systems-focused course on the internals of a relational database management system: data storage, buffer management, indexing, sorting, relational operator implementations, query processing and optimization, parallel RDBMSs, and Big Data systems.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 132A"],
    skillSlugs: ["distributed-databases", "database-design", "algorithms"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 140",
    title: "Components and Design Techniques for Digital Systems",
    description:
      "Design of Boolean logic and finite state machines; two-level, multilevel combinational logic design, combinational modules and modular networks, Mealy and Moore machines, analysis and synthesis of canonical forms, sequential modules.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 20", "CSE 30"],
    skillSlugs: ["computer-architecture", "formal-logic"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 141",
    title: "Introduction to Computer Architecture",
    description:
      "Introduction to computer architecture. Computer system design. Processor design. Control design. Memory systems.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 30", "CSE 140"],
    skillSlugs: ["computer-architecture"],
    catalogUrl: CATALOG_BASE,
  },

  // ─── Upper Division — AI / ML / Data ────────────────────────────────────────
  {
    code: "CSE 150A",
    title: "Introduction to Artificial Intelligence: Probabilistic Reasoning and Decision-Making",
    description:
      "Probabilistic models at the heart of modern artificial intelligence: reasoning and decision-making under uncertainty, inference and learning in Bayesian networks, prediction and planning in Markov decision processes, applications to speech, NLP, information retrieval, and robotics.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 12", "CSE 15L", "CSE 103", "CSE 21"],
    skillSlugs: ["ml-fundamentals", "probability", "bayesian-statistics"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 150B",
    title: "Introduction to Artificial Intelligence: Search and Reasoning",
    description:
      "Important ideas and algorithms in search and reasoning and how they are used in practical AI applications: A* search, adversarial search, Monte Carlo tree search, reinforcement learning, constraint solving and optimization, propositional and first-order reasoning.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 12", "CSE 15L", "CSE 103", "CSE 100"],
    skillSlugs: ["algorithms", "ml-fundamentals", "optimization"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 151A",
    title: "Introduction to Machine Learning",
    description:
      "Broad introduction to machine learning: supervised learning (k-nearest neighbor, decision trees, boosting, perceptrons) and unsupervised learning (k-means, hierarchical clustering). Focus on the principles behind the algorithms.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 12", "CSE 15L", "CSE 103", "CSE 21"],
    skillSlugs: [
      "ml-fundamentals",
      "regression-analysis",
      "clustering",
      "decision-trees",
      "model-evaluation",
    ],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 151B",
    title: "Deep Learning",
    description:
      "Fundamentals of neural networks: linear regression, logistic regression, perceptrons, multilayer networks and back-propagation, convolutional neural networks, recurrent networks, and deep networks trained by reinforcement learning.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 103", "CSE 151A"],
    skillSlugs: ["neural-networks", "cnn", "linear-regression", "logistic-regression"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 152A",
    title: "Introduction to Computer Vision I",
    description:
      "Foundations, algorithms, and applications of computer vision, from image formation models to deep learning: filtering, feature detection, stereo vision, structure from motion, motion estimation, and recognition. Programming assignments in Python.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 12", "CSE 15L"],
    skillSlugs: ["cnn", "ml-fundamentals", "linear-algebra"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 156",
    title: "Statistical Natural Language Processing",
    description:
      "Statistical techniques for the automatic analysis of natural language data: probabilistic language models, text classification, sequence models, parsing sentences into syntactic representations, and machine translation.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 151A"],
    skillSlugs: ["transformers", "ml-fundamentals"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 158",
    title: "Recommender Systems and Web Mining",
    description:
      "Current methods for data mining and predictive analytics. Emphasis on studying real-world data sets, building working systems, and putting current ideas from machine learning research into practice.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 12", "CSE 15L", "CSE 103"],
    skillSlugs: ["feature-engineering", "decision-trees", "regression-analysis"],
    catalogUrl: CATALOG_BASE,
  },
  {
    code: "CSE 160",
    title: "Introduction to Parallel Computing",
    description:
      "High performance parallel computing: parallel architecture, algorithms, software, and problem-solving techniques. Flynn's taxonomy, shared and nonshared memory models, message passing and multithreading, data parallelism, speedup and Amdahl's law, communication and synchronization.",
    units: 4,
    catalogLevel: "UPPER_DIVISION",
    prerequisites: ["CSE 100"],
    skillSlugs: ["algorithms", "computer-architecture"],
    catalogUrl: CATALOG_BASE,
  },
];

/**
 * UCSD BS Computer Science — official 4-year sample plan (quarter system).
 * Source: https://catalog.ucsd.edu/archive/2022-23/curric/CSE-ug.html
 * Simplified to CSE/math core (GE courses excluded).
 */
export type CurriculumQuarter = {
  year: number; // 1-4
  quarter: "FALL" | "WINTER" | "SPRING";
  courseCodes: string[];
};

export const ucsdBsCsCurriculum: CurriculumQuarter[] = [
  // Year 1
  { year: 1, quarter: "FALL", courseCodes: ["CSE 11", "CSE 6R"] },
  { year: 1, quarter: "WINTER", courseCodes: ["CSE 12", "CSE 15L", "CSE 8A"] },
  { year: 1, quarter: "SPRING", courseCodes: ["CSE 20", "CSE 30"] },
  // Year 2
  { year: 2, quarter: "FALL", courseCodes: ["CSE 21", "CSE 100"] },
  { year: 2, quarter: "WINTER", courseCodes: ["CSE 101", "CSE 105", "CSE 103"] },
  { year: 2, quarter: "SPRING", courseCodes: ["CSE 110", "CSE 140"] },
  // Year 3
  { year: 3, quarter: "FALL", courseCodes: ["CSE 120", "CSE 132A", "CSE 141"] },
  { year: 3, quarter: "WINTER", courseCodes: ["CSE 123", "CSE 130", "CSE 150A"] },
  { year: 3, quarter: "SPRING", courseCodes: ["CSE 127", "CSE 131", "CSE 151A"] },
  // Year 4
  { year: 4, quarter: "FALL", courseCodes: ["CSE 151B", "CSE 160"] },
  { year: 4, quarter: "WINTER", courseCodes: ["CSE 156", "CSE 158", "CSE 132C"] },
  { year: 4, quarter: "SPRING", courseCodes: ["CSE 152A"] },
];
