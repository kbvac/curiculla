import type { DomainSeed } from "../types.js";

export const computerScience: DomainSeed = {
  slug: "computer-science",
  name: "Computer Science",
  description:
    "Fundamental and advanced concepts in computing, from programming basics to distributed systems.",
  subjects: [
    {
      slug: "programming",
      name: "Programming",
      description: "Core programming concepts and language proficiency",
      topics: [
        {
          slug: "python-basics-topic",
          name: "Python Basics",
          description: "Introduction to Python programming",
          skills: [
            {
              slug: "python-basics",
              name: "Python Basics",
              description:
                "Variables, control flow, functions, and basic data types in Python",
              difficulty: 1,
              resources: [
                {
                  slug: "mit-6-0001",
                  title: "Introduction to CS and Programming in Python",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
                  universitySlug: "mit",
                  instructor: "John Guttag",
                  description:
                    "An introduction to computer science and programming using Python, covering basic algorithms and data structures.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 60,
                  year: 2016,
                  certificate: false,
                  quality: {
                    score: 95,
                    reasons: [
                      "Comprehensive MIT curriculum",
                      "Includes problem sets and exams",
                      "Well-paced for self-learners",
                    ],
                  },
                },
                {
                  slug: "cs61a-fall-2024",
                  title: "CS 61A: Structure and Interpretation of Computer Programs",
                  type: "COURSE",
                  url: "https://cs61a.org/",
                  universitySlug: "berkeley",
                  description:
                    "Berkeley's introductory CS course using Python, covering abstraction, recursion, and higher-order functions.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 65,
                  year: 2024,
                  quality: {
                    score: 92,
                    reasons: [
                      "World-class Berkeley course",
                      "Project-based learning",
                      "Excellent online materials and autograders",
                    ],
                  },
                },
                {
                  slug: "python-docs",
                  title: "The Python Tutorial",
                  type: "DOCUMENTATION",
                  url: "https://docs.python.org/3/tutorial/",
                  universitySlug: "",
                  description:
                    "Official Python documentation covering syntax, data structures, modules, and more.",
                  language: "en",
                  level: "BEGINNER",
                  quality: {
                    score: 85,
                    reasons: [
                      "Official and authoritative",
                      "Well-organized with examples",
                      "Always up to date",
                    ],
                  },
                },
              ],
            },
            {
              slug: "python-oop",
              name: "Python OOP",
              description:
                "Object-oriented programming concepts applied in Python",
              difficulty: 2,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "mit-6-0001-oop",
                  title: "Introduction to CS and Programming in Python – OOP Modules",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/unit-2/",
                  universitySlug: "mit",
                  instructor: "John Guttag",
                  description:
                    "MIT OCW unit covering object-oriented programming, classes, inheritance, and polymorphism in Python.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2016,
                  quality: {
                    score: 90,
                    reasons: [
                      "Part of MIT 6.0001 curriculum",
                      "Clear explanation of OOP concepts",
                      "Includes practice problems",
                    ],
                  },
                },
                {
                  slug: "real-python-oop",
                  title: "Python OOP: A Step-by-Step Tutorial",
                  type: "VIDEO",
                  url: "https://realpython.com/python3-object-oriented-programming/",
                  universitySlug: "",
                  description:
                    "Practical tutorial on implementing classes, inheritance, and composition in Python.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 85,
                    reasons: [
                      "Hands-on practical examples",
                      "Well-structured progressive lessons",
                      "Great visual explanations",
                    ],
                  },
                },
              ],
            },
            {
              slug: "python-advanced",
              name: "Python Advanced",
              description:
                "Decorators, generators, context managers, metaclasses, and async programming in Python",
              difficulty: 3,
              prerequisites: ["python-oop"],
              resources: [
                {
                  slug: "fluent-python",
                  title: "Fluent Python (2nd Edition)",
                  type: "BOOK",
                  url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/",
                  universitySlug: "",
                  instructor: "Luciano Ramalho",
                  description:
                    "Deep dive into Python's language features and standard library, covering data model, decorators, generators, and concurrency.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 80,
                  quality: {
                    score: 96,
                    reasons: [
                      "Considered the definitive advanced Python book",
                      "Covers Python internals and idioms",
                      "Excellent code examples and exercises",
                    ],
                  },
                },
                {
                  slug: "mit-6-0001-advanced",
                  title: "MIT 6.0001 – Advanced Topics",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/lecture-slides/",
                  universitySlug: "mit",
                  instructor: "John Guttag",
                  description:
                    "Lecture slides covering advanced Python topics including complexity, optimization, and debugging.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 20,
                  year: 2016,
                  quality: {
                    score: 88,
                    reasons: [
                      "From MIT's well-structured curriculum",
                      "Concise and clear slides",
                      "Pairs well with lecture videos",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "data-structures-topic",
          name: "Data Structures",
          description:
            "Fundamental data structures for organizing and managing data efficiently",
          skills: [
            {
              slug: "data-structures",
              name: "Data Structures",
              description:
                "Arrays, linked lists, trees, graphs, hash tables, stacks, and queues",
              difficulty: 3,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "mit-6-006",
                  title: "Introduction to Algorithms (MIT 6.006)",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
                  universitySlug: "mit",
                  instructor: "Erik Demaine",
                  description:
                    "MIT's introduction to algorithms covering fundamental data structures, sorting, searching, graph algorithms, and dynamic programming.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 55,
                  year: 2020,
                  quality: {
                    score: 97,
                    reasons: [
                      "Legendary MIT algorithms course",
                      "Rigorous with proofs and analysis",
                      "Free video lectures and problem sets",
                    ],
                  },
                },
                {
                  slug: "stanford-algorithms",
                  title: "Algorithms Specialization (Stanford)",
                  type: "COURSE",
                  url: "https://online.stanford.edu/courses/soe-yaalgorithms-i-divide-and-conquer-sorting-searching-randomization",
                  universitySlug: "stanford",
                  instructor: "Tim Roughgarden",
                  description:
                    "Four-course specialization covering divide-and-conquer, graph algorithms, greedy algorithms, and dynamic programming.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 120,
                  quality: {
                    score: 94,
                    reasons: [
                      "Stanford's renowned algorithms sequence",
                      "Excellent teaching style",
                      "Coursera specialization with certificates",
                    ],
                  },
                },
                {
                  slug: "openstax-cs",
                  title: "OpenStax Computing",
                  type: "BOOK",
                  url: "https://openstax.org/subjects/computing",
                  universitySlug: "",
                  description:
                    "Free, peer-reviewed textbook covering foundational CS topics including data structures.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 78,
                    reasons: [
                      "Free and open textbook",
                      "Peer-reviewed content",
                      "Good supplementary material",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "algorithms-topic",
          name: "Algorithms",
          description:
            "Algorithm design, analysis, and computational complexity",
          skills: [
            {
              slug: "algorithms",
              name: "Algorithms",
              description:
                "Sorting, searching, graph algorithms, dynamic programming, and greedy algorithms",
              difficulty: 4,
              prerequisites: ["data-structures", "complexity-analysis"],
              resources: [
                {
                  slug: "mit-6-006-algorithms",
                  title: "Introduction to Algorithms (MIT 6.006)",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
                  universitySlug: "mit",
                  instructor: "Erik Demaine",
                  description:
                    "MIT's flagship algorithms course covering divide-and-conquer, graph algorithms, dynamic programming, and network flow.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 55,
                  year: 2020,
                  quality: {
                    score: 97,
                    reasons: [
                      "Gold standard for algorithms education",
                      "Rigorous proofs and runtime analysis",
                      "Extensive problem sets with autograding",
                    ],
                  },
                },
                {
                  slug: "clrs-book",
                  title: "Introduction to Algorithms (CLRS)",
                  type: "BOOK",
                  url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
                  universitySlug: "",
                  instructor: "Cormen, Leiserson, Rivest, Stein",
                  description:
                    "The definitive textbook on algorithms, covering a comprehensive range of topics with rigorous analysis.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 100,
                  quality: {
                    score: 98,
                    reasons: [
                      "The standard algorithms textbook worldwide",
                      "Comprehensive coverage with proofs",
                      "Excellent reference and study resource",
                    ],
                  },
                },
              ],
            },
            {
              slug: "complexity-analysis",
              name: "Complexity Analysis",
              description:
                "Big-O notation, amortized analysis, space complexity, and computational complexity classes",
              difficulty: 3,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "mit-6-006-complexity",
                  title: "Introduction to Algorithms – Complexity Module",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/lecture-1/",
                  universitySlug: "mit",
                  instructor: "Erik Demaine",
                  description:
                    "First lectures of MIT 6.006 covering asymptotic analysis, Big-O, Big-Theta, and complexity fundamentals.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2020,
                  quality: {
                    score: 93,
                    reasons: [
                      "Excellent introduction to complexity",
                      "Rigorous mathematical treatment",
                      "Problem sets to practice analysis",
                    ],
                  },
                },
                {
                  slug: "algorithm-design-book",
                  title: "Algorithm Design: Foundations and Analysis",
                  type: "BOOK",
                  url: "https://www.amazon.com/Algorithm-Design-Foundations-Analysis-Jon/dp/0471458321",
                  universitySlug: "",
                  instructor: "Kleinberg and Tardos",
                  description:
                    "Comprehensive treatment of algorithm design paradigms with strong emphasis on complexity analysis.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 70,
                  quality: {
                    score: 91,
                    reasons: [
                      "Clear explanations of analysis techniques",
                      "Excellent problem sets",
                      "Balances theory and practice",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "software-design-topic",
          name: "Software Design",
          description:
            "Design patterns and principles for building maintainable software",
          skills: [
            {
              slug: "design-patterns",
              name: "Design Patterns",
              description:
                "Gang of Four patterns, architectural patterns, and modern design patterns",
              difficulty: 3,
              resources: [
                {
                  slug: "gof-book",
                  title: "Design Patterns: Elements of Reusable Object-Oriented Software",
                  type: "BOOK",
                  url: "https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612",
                  universitySlug: "",
                  instructor: "Gamma, Helm, Johnson, Vlissides",
                  description:
                    "The classic GoF book cataloging 23 fundamental software design patterns.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 50,
                  quality: {
                    score: 92,
                    reasons: [
                      "Foundational text on design patterns",
                      "Covers 23 essential patterns",
                      "Industry standard reference",
                    ],
                  },
                },
                {
                  slug: "head-first-patterns",
                  title: "Head First Design Patterns",
                  type: "BOOK",
                  url: "https://www.oreilly.com/library/view/head-first-design/9781492077992/",
                  universitySlug: "",
                  instructor: "Eric Freeman, Elisabeth Robson",
                  description:
                    "An accessible, visual introduction to design patterns using a brain-friendly learning approach.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  quality: {
                    score: 88,
                    reasons: [
                      "Highly accessible introduction",
                      "Visual and engaging format",
                      "Great for first-time pattern learners",
                    ],
                  },
                },
                {
                  slug: "refactoring-guru",
                  title: "Refactoring.Guru – Design Patterns",
                  type: "DOCUMENTATION",
                  url: "https://refactoring.guru/design-patterns",
                  universitySlug: "",
                  description:
                    "Interactive guide to design patterns with UML diagrams, real-world examples, and code samples.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 87,
                    reasons: [
                      "Excellent visual diagrams and examples",
                      "Free and well-organized",
                      "Covers both patterns and anti-patterns",
                    ],
                  },
                },
              ],
            },
            {
              slug: "solid-principles",
              name: "SOLID Principles",
              description:
                "Single responsibility, open-closed, Liskov substitution, interface segregation, and dependency inversion",
              difficulty: 3,
              resources: [
                {
                  slug: "clean-code-book",
                  title: "Clean Code: A Handbook of Agile Software Craftsmanship",
                  type: "BOOK",
                  url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
                  universitySlug: "",
                  instructor: "Robert C. Martin",
                  description:
                    "A handbook on writing clean, readable, and maintainable code including SOLID principles and code smells.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 35,
                  quality: {
                    score: 91,
                    reasons: [
                      "Industry standard for clean code",
                      "Practical real-world examples",
                      "Covers SOLID principles thoroughly",
                    ],
                  },
                },
                {
                  slug: "solid-principles-video",
                  title: "SOLID Principles – Uncle Bob",
                  type: "VIDEO",
                  url: "https://www.youtube.com/watch?v=Qvu2EeUi65Y",
                  universitySlug: "",
                  instructor: "Robert C. Martin",
                  description:
                    "Video lectures by Robert C. Martin explaining each SOLID principle with examples.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 86,
                    reasons: [
                      "Directly from the author of Clean Code",
                      "Engaging and clear explanations",
                      "Good supplementary material",
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "systems",
      name: "Systems",
      description:
        "Computer systems, infrastructure, and operations",
      topics: [
        {
          slug: "computer-architecture-topic",
          name: "Computer Architecture",
          description:
            "CPU design, memory hierarchy, pipelining, and instruction sets",
          skills: [
            {
              slug: "computer-architecture",
              name: "Computer Architecture",
              description:
                "ISA, CPU microarchitecture, memory hierarchy, caching, and performance optimization",
              difficulty: 3,
              resources: [
                {
                  slug: "cmu-15-213",
                  title: "Introduction to Computer Systems (CMU 15-213)",
                  type: "COURSE",
                  url: "https://www.cs.cmu.edu/~213/",
                  universitySlug: "cmu",
                  instructor: "Randal Bryant, David O'Hallaron",
                  description:
                    "CMU's renowned course on computer systems covering data representation, assembly, memory hierarchy, caching, and virtual memory.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 70,
                  year: 2023,
                  quality: {
                    score: 96,
                    reasons: [
                      "Considered one of the best systems courses",
                      "Comprehensive coverage of CS:APP topics",
                      "Excellent labs and assignments",
                    ],
                  },
                },
                {
                  slug: "csapp-book",
                  title: "Computer Systems: A Programmer's Perspective (3rd Ed)",
                  type: "BOOK",
                  url: "https://www.oreilly.com/library/view/computer-systems/9780134092669/",
                  universitySlug: "",
                  instructor: "Bryant and O'Hallaron",
                  description:
                    "The textbook accompanying CMU 15-213, covering systems from a programmer's perspective.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 80,
                  quality: {
                    score: 95,
                    reasons: [
                      "The standard systems textbook",
                      "Excellent blend of theory and practice",
                      "Comprehensive with clear explanations",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "operating-systems-topic",
          name: "Operating Systems",
          description:
            "Process management, memory management, file systems, and concurrency",
          skills: [
            {
              slug: "operating-systems",
              name: "Operating Systems",
              description:
                "Processes, threads, virtual memory, scheduling, synchronization, and file systems",
              difficulty: 4,
              prerequisites: ["computer-architecture"],
              resources: [
                {
                  slug: "mit-6-s081",
                  title: "Operating System Engineering (MIT 6.S081)",
                  type: "COURSE",
                  url: "https://pdos.csail.mit.edu/6.828/2021/",
                  universitySlug: "mit",
                  instructor: "Robert Morris",
                  description:
                    "MIT's operating systems course based on xv6, covering processes, memory management, concurrency, and file systems through hands-on labs.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 65,
                  year: 2021,
                  quality: {
                    score: 95,
                    reasons: [
                      "Excellent hands-on xv6 labs",
                      "MIT-quality instruction",
                      "Deep understanding of OS internals",
                    ],
                  },
                },
                {
                  slug: "ostep-book",
                  title: "Operating Systems: Three Easy Pieces",
                  type: "BOOK",
                  url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
                  universitySlug: "",
                  instructor: "Remzi Arpaci-Dusseau, Andrea Arpaci-Dusseau",
                  description:
                    "Free online textbook covering virtualization, concurrency, and persistence in operating systems.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 70,
                  quality: {
                    score: 94,
                    reasons: [
                      "Free and widely recommended",
                      "Clear writing with great explanations",
                      "Excellent exercises and xv6 references",
                    ],
                  },
                },
                {
                  slug: "berkeley-os",
                  title: "CS 162: Operating Systems (Berkeley)",
                  type: "COURSE",
                  url: "https://cs162.org/",
                  universitySlug: "berkeley",
                  description:
                    "Berkeley's OS course covering threads, synchronization, scheduling, memory management, and distributed systems.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 65,
                  year: 2024,
                  quality: {
                    score: 92,
                    reasons: [
                      "Comprehensive Berkeley OS course",
                      "Excellent project-based learning",
                      "Covers modern OS topics",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "networking-topic",
          name: "Networking",
          description: "Network fundamentals and protocol design",
          skills: [
            {
              slug: "networking-basics",
              name: "Networking Basics",
              description:
                "OSI model, TCP/IP, HTTP, DNS, routing, and basic network configuration",
              difficulty: 3,
              resources: [
                {
                  slug: "stanford-cn-course",
                  title: "Computer Networking (Stanford)",
                  type: "COURSE",
                  url: "https://www.scs.stanford.edu/10au-cs144/",
                  universitySlug: "stanford",
                  instructor: "Philip Levis, Nick McKeown",
                  description:
                    "Stanford's computer networking course covering internet architecture, TCP/IP, routing, and network applications.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 55,
                  year: 2024,
                  quality: {
                    score: 93,
                    reasons: [
                      "Stanford-quality networking instruction",
                      "Comprehensive protocol coverage",
                      "Hands-on programming assignments",
                    ],
                  },
                },
                {
                  slug: "kurose-book",
                  title: "Computer Networking: A Top-Down Approach (8th Ed)",
                  type: "BOOK",
                  url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000003309",
                  universitySlug: "",
                  instructor: "Kurose and Ross",
                  description:
                    "The standard networking textbook using a top-down approach from applications to link layer.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 60,
                  quality: {
                    score: 92,
                    reasons: [
                      "Industry standard networking textbook",
                      "Clear top-down approach",
                      "Excellent pedagogy and exercises",
                    ],
                  },
                },
                {
                  slug: "mdn-networking",
                  title: "MDN Web Docs – HTTP Overview",
                  type: "DOCUMENTATION",
                  url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
                  universitySlug: "",
                  description:
                    "Comprehensive overview of HTTP protocol for web developers, covering request/response, status codes, and headers.",
                  language: "en",
                  level: "BEGINNER",
                  quality: {
                    score: 85,
                    reasons: [
                      "Excellent web-focused networking content",
                      "Practical for web developers",
                      "Well-maintained and current",
                    ],
                  },
                },
              ],
            },
            {
              slug: "network-protocols",
              name: "Network Protocols",
              description:
                "TCP/UDP, HTTP/2, QUIC, TLS, BGP, and protocol design principles",
              difficulty: 4,
              prerequisites: ["networking-basics"],
              resources: [
                {
                  slug: "rfc-editor",
                  title: "RFC Editor",
                  type: "DOCUMENTATION",
                  url: "https://www.rfc-editor.org/",
                  universitySlug: "",
                  description:
                    "The official repository of Internet protocol standards and specifications (RFCs).",
                  language: "en",
                  level: "ADVANCED",
                  quality: {
                    score: 88,
                    reasons: [
                      "Authoritative source for protocol specs",
                      "Definitive reference for standards",
                      "Essential for protocol-level understanding",
                    ],
                  },
                },
                {
                  slug: "tcp-ip-illustrated",
                  title: "TCP/IP Illustrated, Volume 1: The Protocols",
                  type: "BOOK",
                  url: "https://www.oreilly.com/library/view/tcpip-illustrated-volume/9780132808187/",
                  universitySlug: "",
                  instructor: "W. Richard Stevens",
                  description:
                    "Comprehensive visual guide to the TCP/IP protocol suite with packet-level analysis.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 70,
                  quality: {
                    score: 94,
                    reasons: [
                      "Definitive reference for TCP/IP",
                      "Packet-level analysis approach",
                      "Timeless and authoritative content",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "databases-topic",
          name: "Databases",
          description:
            "Database design, SQL, optimization, and distributed systems",
          skills: [
            {
              slug: "databases-sql",
              name: "Databases & SQL",
              description:
                "Relational database fundamentals, SQL queries, joins, indexes, and transactions",
              difficulty: 2,
              resources: [
                {
                  slug: "cmu-15-445",
                  title: "Database Systems (CMU 15-445)",
                  type: "COURSE",
                  url: "https://15445.courses.cs.cmu.edu/",
                  universitySlug: "cmu",
                  instructor: "Andy Pavlo",
                  description:
                    "CMU's database systems course covering relational algebra, SQL, storage, indexes, and query execution.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 60,
                  year: 2023,
                  quality: {
                    score: 96,
                    reasons: [
                      "Widely regarded as the best DB course",
                      "Andy Pavlo's engaging teaching style",
                      "Excellent BusTub project",
                    ],
                  },
                },
                {
                  slug: "cs50-sql",
                  title: "CS50's Introduction to Databases with SQL",
                  type: "COURSE",
                  url: "https://cs50.harvard.edu/sql/",
                  universitySlug: "harvard",
                  instructor: "David Malan",
                  description:
                    "Harvard's intro to SQL covering queries, joins, indexes, transactions, and SQL design patterns.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 25,
                  year: 2024,
                  quality: {
                    score: 89,
                    reasons: [
                      "Great beginner-friendly introduction",
                      "CS50 production quality",
                      "Practical hands-on exercises",
                    ],
                  },
                },
              ],
            },
            {
              slug: "database-design",
              name: "Database Design",
              description:
                "ER modeling, normalization, schema design, and data modeling patterns",
              difficulty: 3,
              prerequisites: ["databases-sql"],
              resources: [
                {
                  slug: "database-system-concepts",
                  title: "Database System Concepts (7th Ed)",
                  type: "BOOK",
                  url: "https://www.mheducation.com/highered/product/database-system-concepts-silberschatz-korth/M9781260084993.html",
                  universitySlug: "",
                  instructor: "Silberschatz, Korth, Sudarshan",
                  description:
                    "Comprehensive textbook covering relational design, normalization, and advanced database concepts.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 65,
                  quality: {
                    score: 90,
                    reasons: [
                      "Standard university textbook",
                      "Thorough coverage of design theory",
                      "Excellent normalization examples",
                    ],
                  },
                },
                {
                  slug: "cmu-15-445-design",
                  title: "CMU 15-445 – Schema Design Lectures",
                  type: "LECTURE",
                  url: "https://15445.courses.cs.cmu.edu/fall2022/",
                  universitySlug: "cmu",
                  instructor: "Andy Pavlo",
                  description:
                    "Schema design and normalization lectures from CMU's database systems course.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2022,
                  quality: {
                    score: 91,
                    reasons: [
                      "Top-tier database instruction",
                      "Focus on practical design patterns",
                      "Pairs well with BusTub project",
                    ],
                  },
                },
              ],
            },
            {
              slug: "distributed-databases",
              name: "Distributed Databases",
              description:
                "CAP theorem, replication, sharding, consistency models, and distributed transactions",
              difficulty: 5,
              prerequisites: ["databases-sql"],
              resources: [
                {
                  slug: "mit-6-830",
                  title: "Database Systems (MIT 6.830)",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
                  universitySlug: "mit",
                  instructor: "Sam Madden",
                  description:
                    "MIT's advanced database course covering query execution, concurrency control, recovery, and distributed databases.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 50,
                  year: 2010,
                  quality: {
                    score: 92,
                    reasons: [
                      "MIT's rigorous approach",
                      "Covers distributed database internals",
                      "Excellent paper reading component",
                    ],
                  },
                },
                {
                  slug: "ddia-book",
                  title: "Designing Data-Intensive Applications",
                  type: "BOOK",
                  url: "https://dataintensive.net/",
                  universitySlug: "",
                  instructor: "Martin Kleppmann",
                  description:
                    "Comprehensive guide to distributed data systems, covering replication, partitioning, transactions, consistency, and batch/stream processing.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 70,
                  quality: {
                    score: 98,
                    reasons: [
                      "The definitive book on distributed data",
                      "Excellent depth and breadth",
                      "Highly recommended by industry leaders",
                    ],
                  },
                },
                {
                  slug: "spanner-paper",
                  title: "Google Spanner Paper",
                  type: "DOCUMENTATION",
                  url: "https://research.google/pubs/pub39966/",
                  universitySlug: "",
                  description:
                    "The Spanner paper describing Google's globally distributed database with external consistency.",
                  language: "en",
                  level: "ADVANCED",
                  quality: {
                    score: 89,
                    reasons: [
                      "Landmark distributed systems paper",
                      "Real-world production system",
                      "Essential reading for distributed DB",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "devops-topic",
          name: "DevOps",
          description:
            "Version control, containerization, CI/CD, and system administration",
          skills: [
            {
              slug: "git-version-control",
              name: "Git & Version Control",
              description:
                "Git workflows, branching, merging, rebasing, and collaborative development practices",
              difficulty: 1,
              resources: [
                {
                  slug: "git-scm-docs",
                  title: "Pro Git Book",
                  type: "BOOK",
                  url: "https://git-scm.com/book/en/v2",
                  universitySlug: "",
                  instructor: "Scott Chacon, Ben Straub",
                  description:
                    "The official Git book covering everything from basics to advanced Git internals.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 15,
                  quality: {
                    score: 93,
                    reasons: [
                      "Official Git documentation",
                      "Comprehensive and well-written",
                      "Free and always up to date",
                    ],
                  },
                },
                {
                  slug: "github-learning-lab",
                  title: "GitHub Skills",
                  type: "EXERCISE",
                  url: "https://skills.github.com/",
                  universitySlug: "",
                  description:
                    "Interactive GitHub exercises for learning Git workflows, branching, and collaboration.",
                  language: "en",
                  level: "BEGINNER",
                  quality: {
                    score: 86,
                    reasons: [
                      "Interactive hands-on learning",
                      "GitHub official resource",
                      "Progressive skill building",
                    ],
                  },
                },
              ],
            },
            {
              slug: "docker-containers",
              name: "Docker & Containers",
              description:
                "Containerization, Docker, Docker Compose, and container orchestration basics",
              difficulty: 3,
              resources: [
                {
                  slug: "docker-docs",
                  title: "Docker Documentation",
                  type: "DOCUMENTATION",
                  url: "https://docs.docker.com/get-started/",
                  universitySlug: "",
                  description:
                    "Official Docker getting started guide covering containers, images, networking, and volumes.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 90,
                    reasons: [
                      "Official Docker documentation",
                      "Well-structured learning path",
                      "Practical with real examples",
                    ],
                  },
                },
                {
                  slug: "ucd-cs166-container",
                  title: "Docker Workshop – Learn Docker",
                  type: "COURSE",
                  url: "https://www.docker.com/101-tutorial/",
                  universitySlug: "",
                  description:
                    "Docker's official 101 tutorial covering containerization fundamentals and hands-on exercises.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  quality: {
                    score: 87,
                    reasons: [
                      "Docker's official getting started",
                      "Hands-on and practical",
                      "Quick but comprehensive",
                    ],
                  },
                },
              ],
            },
            {
              slug: "ci-cd",
              name: "CI/CD",
              description:
                "Continuous integration, deployment pipelines, automated testing, and DevOps practices",
              difficulty: 3,
              resources: [
                {
                  slug: "github-actions-docs",
                  title: "GitHub Actions Documentation",
                  type: "DOCUMENTATION",
                  url: "https://docs.github.com/en/actions",
                  universitySlug: "",
                  description:
                    "Official guide to GitHub Actions for automating build, test, and deployment workflows.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 89,
                    reasons: [
                      "Comprehensive CI/CD guide",
                      "Practical workflow examples",
                      "Directly applicable to projects",
                    ],
                  },
                },
                {
                  slug: "dora-research",
                  title: "DORA State of DevOps Research",
                  type: "DOCUMENTATION",
                  url: "https://dora.dev/",
                  universitySlug: "",
                  description:
                    "Google's research on DevOps practices, CI/CD maturity, and software delivery performance.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 85,
                    reasons: [
                      "Evidence-based DevOps practices",
                      "Industry benchmark research",
                      "Highly influential findings",
                    ],
                  },
                },
              ],
            },
            {
              slug: "linux-basics",
              name: "Linux Basics",
              description:
                "Linux command line, file system, shell scripting, and system administration fundamentals",
              difficulty: 2,
              resources: [
                {
                  slug: "linux-foundation-training",
                  title: "Linux Foundation – Introduction to Linux",
                  type: "COURSE",
                  url: "https://training.linuxfoundation.org/training/introduction-to-linux/",
                  universitySlug: "",
                  description:
                    "Free Linux Foundation course covering Linux installation, command line, file systems, and basic administration.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 25,
                  quality: {
                    score: 88,
                    reasons: [
                      "Linux Foundation official course",
                      "Free and comprehensive",
                      "Certificate of completion available",
                    ],
                  },
                },
                {
                  slug: "linux-command-line",
                  title: "The Linux Command Line (2nd Ed)",
                  type: "BOOK",
                  url: "https://linuxcommand.org/tlcl.php",
                  universitySlug: "",
                  instructor: "William Shotts",
                  description:
                    "A complete introduction to the Linux command line, from basics to shell scripting.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 30,
                  quality: {
                    score: 87,
                    reasons: [
                      "Free and thorough",
                      "Excellent for beginners",
                      "Practical shell scripting coverage",
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "theory",
      name: "Theory",
      description: "Mathematical and theoretical foundations of computer science",
      topics: [
        {
          slug: "discrete-mathematics-topic",
          name: "Discrete Mathematics",
          description: "Sets, relations, functions, combinatorics, and graph theory",
          skills: [
            {
              slug: "discrete-mathematics",
              name: "Discrete Mathematics",
              description:
                "Set theory, logic, proofs, combinatorics, graph theory, and number theory",
              difficulty: 2,
              resources: [
                {
                  slug: "mit-6-042",
                  title: "Mathematics for Computer Science (MIT 6.042J)",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
                  universitySlug: "mit",
                  instructor: "Tom Leighton, Marten van Dijk",
                  description:
                    "MIT's discrete mathematics course covering proofs, induction, graph theory, probability, and number theory for CS.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 55,
                  year: 2010,
                  quality: {
                    score: 94,
                    reasons: [
                      "MIT-quality math for CS",
                      "Comprehensive with problem sets",
                      "Excellent foundation for theory courses",
                    ],
                  },
                },
                {
                  slug: "book-of-proof",
                  title: "Book of Proof",
                  type: "BOOK",
                  url: "https://www.people.vcu.edu/~rhammack/BookOfProof/",
                  universitySlug: "",
                  instructor: "Richard Hammack",
                  description:
                    "Free, comprehensive introduction to mathematical proof techniques and discrete math foundations.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 35,
                  quality: {
                    score: 87,
                    reasons: [
                      "Free and accessible",
                      "Great for learning proof techniques",
                      "Well-structured progression",
                    ],
                  },
                },
                {
                  slug: "openstax-discrete",
                  title: "Discrete Mathematics (OpenStax)",
                  type: "BOOK",
                  url: "https://openstax.org/details/books/discrete-mathematics",
                  universitySlug: "",
                  description:
                    "Free, peer-reviewed textbook covering logic, sets, functions, sequences, and graph theory.",
                  language: "en",
                  level: "BEGINNER",
                  quality: {
                    score: 80,
                    reasons: [
                      "Free and peer-reviewed",
                      "Good introductory coverage",
                      "Accessible to beginners",
                    ],
                  },
                },
              ],
            },
            {
              slug: "formal-logic",
              name: "Formal Logic",
              description:
                "Propositional and predicate logic, formal proofs, model theory, and resolution",
              difficulty: 3,
              prerequisites: ["discrete-mathematics"],
              resources: [
                {
                  slug: "stanford-logic",
                  title: "Introduction to Logic (Stanford)",
                  type: "COURSE",
                  url: "https://online.stanford.edu/courses",
                  universitySlug: "stanford",
                  instructor: "Michael Genesereth",
                  description:
                    "Stanford's introduction to symbolic logic covering propositional logic, predicate logic, and proof methods.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  quality: {
                    score: 91,
                    reasons: [
                      "Stanford-quality logic instruction",
                      "Clear and systematic approach",
                      "Includes interactive exercises",
                    ],
                  },
                },
                {
                  slug: "logic-book",
                  title: "forall x: An Introduction to Formal Logic",
                  type: "BOOK",
                  url: "https://forallx.openlogicproject.org/",
                  universitySlug: "",
                  instructor: "P.D. Magnus",
                  description:
                    "Free open-source textbook covering propositional and predicate logic with natural deduction and truth trees.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 30,
                  quality: {
                    score: 86,
                    reasons: [
                      "Free and open source",
                      "Well-organized content",
                      "Good coverage of proof systems",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "automata-topic",
          name: "Automata & Computability",
          description:
            "Formal languages, automata theory, and the limits of computation",
          skills: [
            {
              slug: "automata-theory",
              name: "Automata Theory",
              description:
                "Finite automata, context-free grammars, Turing machines, and formal language theory",
              difficulty: 4,
              prerequisites: ["discrete-mathematics"],
              resources: [
                {
                  slug: "mit-18-404",
                  title: "Automata, Computability, and Complexity (MIT)",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2006/",
                  universitySlug: "mit",
                  instructor: "Scott Aaronson",
                  description:
                    "MIT's theory of computation course covering automata, context-free languages, decidable languages, and P vs NP.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 50,
                  year: 2006,
                  quality: {
                    score: 92,
                    reasons: [
                      "MIT theory of computation",
                      "Covers automata through complexity",
                      "Excellent lecture notes available",
                    ],
                  },
                },
                {
                  slug: "sipser-book",
                  title: "Introduction to the Theory of Computation (3rd Ed)",
                  type: "BOOK",
                  url: "https://www.cengage.com/c/introduction-to-the-theory-of-computation-3e-sipser/9781133187790/",
                  universitySlug: "",
                  instructor: "Michael Sipser",
                  description:
                    "The standard textbook for automata theory, covering finite automata, context-free languages, and complexity theory.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 60,
                  quality: {
                    score: 94,
                    reasons: [
                      "The standard automata textbook",
                      "Clear and rigorous treatment",
                      "Excellent problem sets",
                    ],
                  },
                },
              ],
            },
            {
              slug: "computability",
              name: "Computability Theory",
              description:
                "Recursive functions, Church-Turing thesis, halting problem, and undecidability",
              difficulty: 5,
              prerequisites: ["automata-theory"],
              resources: [
                {
                  slug: "computability-book",
                  title: "Computability and Complexity (Neil Jones)",
                  type: "BOOK",
                  url: "https://www.cambridge.org/core/books/computability-and-complexity/00C210B1518873E5B4E8D67481C4E37B",
                  universitySlug: "",
                  instructor: "Neil Jones",
                  description:
                    "A comprehensive introduction to computability theory and complexity, covering recursive functions and the theory of NP-completeness.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 55,
                  quality: {
                    score: 88,
                    reasons: [
                      "Rigorous computability treatment",
                      "Covers both theory and complexity",
                      "Good for self-study",
                    ],
                  },
                },
                {
                  slug: "computability-lecture",
                  title: "MIT OCW – Computability Lectures",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2006/pages/lecture-notes/",
                  universitySlug: "mit",
                  instructor: "Scott Aaronson",
                  description:
                    "MIT lecture notes covering the halting problem, recursion theory, and computability fundamentals.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 20,
                  year: 2006,
                  quality: {
                    score: 90,
                    reasons: [
                      "MIT-quality lecture notes",
                      "Clear explanations of difficult concepts",
                      "Pairs well with Sipser textbook",
                    ],
                  },
                },
              ],
            },
            {
              slug: "information-theory",
              name: "Information Theory",
              description:
                "Entropy, mutual information, coding theory, channel capacity, and data compression",
              difficulty: 4,
              prerequisites: ["discrete-mathematics"],
              resources: [
                {
                  slug: "stanford-info-theory",
                  title: "Information Theory (Stanford EE376A)",
                  type: "COURSE",
                  url: "https://web.stanford.edu/class/ee376a/",
                  universitySlug: "stanford",
                  instructor: "Tsachy Weissman",
                  description:
                    "Stanford's information theory course covering entropy, rate-distortion, channel capacity, and network information theory.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 45,
                  year: 2023,
                  quality: {
                    score: 93,
                    reasons: [
                      "Stanford's information theory course",
                      "Excellent lecture notes and problem sets",
                      "Covers modern applications",
                    ],
                  },
                },
                {
                  slug: "cover-thomas-book",
                  title: "Elements of Information Theory (2nd Ed)",
                  type: "BOOK",
                  url: "https://www.wiley.com/en-us/Elements+of+Information+Theory%2C+2nd+Edition-p-9780471748823",
                  universitySlug: "",
                  instructor: "Cover and Thomas",
                  description:
                    "The definitive textbook on information theory, covering entropy, source coding, channel coding, and rate-distortion.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 60,
                  quality: {
                    score: 95,
                    reasons: [
                      "The standard information theory text",
                      "Comprehensive and rigorous",
                      "Excellent exercises and proofs",
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "software-engineering",
      name: "Software Engineering",
      description:
        "Web development, testing, and software architecture practices",
      topics: [
        {
          slug: "web-development-topic",
          name: "Web Development",
          description:
            "Frontend and backend web technologies and frameworks",
          skills: [
            {
              slug: "html-css-basics",
              name: "HTML & CSS Basics",
              description:
                "Semantic HTML, CSS layout, responsive design, and modern CSS features",
              difficulty: 1,
              resources: [
                {
                  slug: "mdn-html-css",
                  title: "MDN Web Docs – Learn Web Development",
                  type: "DOCUMENTATION",
                  url: "https://developer.mozilla.org/en-US/docs/Learn",
                  universitySlug: "",
                  description:
                    "Comprehensive guide to HTML, CSS, and web development fundamentals from Mozilla.",
                  language: "en",
                  level: "BEGINNER",
                  quality: {
                    score: 94,
                    reasons: [
                      "The definitive web development reference",
                      "Comprehensive and always current",
                      "Interactive examples and exercises",
                    ],
                  },
                },
                {
                  slug: "cs50-web",
                  title: "CS50 Web Programming with Python and JavaScript",
                  type: "COURSE",
                  url: "https://cs50.harvard.edu/web/",
                  universitySlug: "harvard",
                  instructor: "Brian Yu",
                  description:
                    "Harvard's web development course covering HTML, CSS, JavaScript, Django, and React.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 45,
                  year: 2024,
                  quality: {
                    score: 91,
                    reasons: [
                      "Harvard CS50 quality",
                      "Comprehensive full-stack coverage",
                      "Project-based learning",
                    ],
                  },
                },
              ],
            },
            {
              slug: "javascript-basics",
              name: "JavaScript Basics",
              description:
                "Core JavaScript: variables, functions, DOM, async/await, and ES6+ features",
              difficulty: 2,
              resources: [
                {
                  slug: "javascript-info",
                  title: "The Modern JavaScript Tutorial",
                  type: "DOCUMENTATION",
                  url: "https://javascript.info/",
                  universitySlug: "",
                  description:
                    "Comprehensive, modern JavaScript tutorial covering basics through advanced topics with practical examples.",
                  language: "en",
                  level: "BEGINNER",
                  quality: {
                    score: 93,
                    reasons: [
                      "Modern and comprehensive",
                      "Clear explanations with examples",
                      "Well-structured learning path",
                    ],
                  },
                },
                {
                  slug: "mdn-js",
                  title: "MDN JavaScript Guide",
                  type: "DOCUMENTATION",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                  universitySlug: "",
                  description:
                    "Mozilla's authoritative JavaScript reference and guide for web developers.",
                  language: "en",
                  level: "BEGINNER",
                  quality: {
                    score: 92,
                    reasons: [
                      "Authoritative JavaScript reference",
                      "Comprehensive coverage",
                      "Always up to date",
                    ],
                  },
                },
              ],
            },
            {
              slug: "typescript-basics",
              name: "TypeScript Basics",
              description:
                "Static typing, interfaces, generics, utility types, and TypeScript configuration",
              difficulty: 2,
              prerequisites: ["javascript-basics"],
              resources: [
                {
                  slug: "ts-handbook",
                  title: "TypeScript Handbook",
                  type: "DOCUMENTATION",
                  url: "https://www.typescriptlang.org/docs/handbook/",
                  universitySlug: "",
                  description:
                    "Official TypeScript handbook covering type system, interfaces, generics, and advanced types.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 94,
                    reasons: [
                      "Official TypeScript documentation",
                      "Comprehensive and well-organized",
                      "Excellent for learning type system",
                    ],
                  },
                },
                {
                  slug: "typescript-deep-dive",
                  title: "TypeScript Deep Dive",
                  type: "BOOK",
                  url: "https://basarat.gitbook.io/typescript/",
                  universitySlug: "",
                  instructor: "Basarat Ali Syed",
                  description:
                    "Free, community-driven TypeScript book with best practices, patterns, and comprehensive type system coverage.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 25,
                  quality: {
                    score: 88,
                    reasons: [
                      "Free and comprehensive",
                      "Practical best practices",
                      "Excellent type system coverage",
                    ],
                  },
                },
              ],
            },
            {
              slug: "react-basics",
              name: "React Basics",
              description:
                "Components, JSX, hooks, state management, and React ecosystem",
              difficulty: 3,
              prerequisites: ["javascript-basics"],
              resources: [
                {
                  slug: "react-docs",
                  title: "React Documentation",
                  type: "DOCUMENTATION",
                  url: "https://react.dev/",
                  universitySlug: "",
                  description:
                    "Official React documentation with interactive examples, hooks reference, and learning resources.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 95,
                    reasons: [
                      "Official React documentation",
                      "Excellent interactive examples",
                      "Well-structured learning path",
                    ],
                  },
                },
                {
                  slug: "cs50-react",
                  title: "CS50 Web – React Module",
                  type: "COURSE",
                  url: "https://cs50.harvard.edu/web/2020/weeks/7/",
                  universitySlug: "harvard",
                  instructor: "Brian Yu",
                  description:
                    "Harvard's React module covering components, state, props, and single-page application development.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  year: 2024,
                  quality: {
                    score: 89,
                    reasons: [
                      "Harvard CS50 quality",
                      "Practical React project",
                      "Clear and structured teaching",
                    ],
                  },
                },
              ],
            },
            {
              slug: "nextjs-basics",
              name: "Next.js Basics",
              description:
                "Server components, routing, API routes, and full-stack React framework",
              difficulty: 3,
              prerequisites: ["react-basics"],
              resources: [
                {
                  slug: "nextjs-docs",
                  title: "Next.js Documentation",
                  type: "DOCUMENTATION",
                  url: "https://nextjs.org/docs",
                  universitySlug: "",
                  description:
                    "Official Next.js documentation covering app router, server components, data fetching, and deployment.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 94,
                    reasons: [
                      "Official Next.js documentation",
                      "Comprehensive with examples",
                      "Always current with latest features",
                    ],
                  },
                },
                {
                  slug: "nextjs-learn",
                  title: "Next.js Learn Course",
                  type: "COURSE",
                  url: "https://nextjs.org/learn",
                  universitySlug: "",
                  description:
                    "Interactive Next.js tutorial covering fundamentals, layouts, routing, and data fetching.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  quality: {
                    score: 91,
                    reasons: [
                      "Official interactive tutorial",
                      "Progressive and hands-on",
                      "Covers modern App Router patterns",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "testing-topic",
          name: "Software Testing",
          description:
            "Testing strategies, unit testing, and integration testing",
          skills: [
            {
              slug: "unit-testing",
              name: "Unit Testing",
              description:
                "Test design, mocking, test doubles, test-driven development, and code coverage",
              difficulty: 2,
              resources: [
                {
                  slug: "testing-python-book",
                  title: "Python Testing with pytest",
                  type: "BOOK",
                  url: "https://pragprog.com/titles/bopytest/python-testing-with-pytest-second-edition/",
                  universitySlug: "",
                  instructor: "Brian Okken",
                  description:
                    "Comprehensive guide to pytest covering fixtures, parametrize, markers, and advanced testing patterns.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 20,
                  quality: {
                    score: 89,
                    reasons: [
                      "Excellent pytest coverage",
                      "Practical and hands-on",
                      "Covers advanced testing patterns",
                    ],
                  },
                },
                {
                  slug: "xunit-patterns",
                  title: "xUnit Test Patterns",
                  type: "BOOK",
                  url: "https://martinfowler.com/books/xUnit.html",
                  universitySlug: "",
                  instructor: "Gerard Meszaros",
                  description:
                    "Comprehensive catalog of test patterns including test doubles, fixture setup, and test organization.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  quality: {
                    score: 92,
                    reasons: [
                      "Definitive testing patterns book",
                      "Covers all test smells and refactors",
                      "Language-agnostic principles",
                    ],
                  },
                },
              ],
            },
            {
              slug: "integration-testing",
              name: "Integration Testing",
              description:
                "End-to-end testing, API testing, test architecture, and testing microservices",
              difficulty: 3,
              prerequisites: ["unit-testing"],
              resources: [
                {
                  slug: "testing-nodejs-book",
                  title: "Testing Node.js Applications",
                  type: "BOOK",
                  url: "https://pragprog.com/titles/jwdd2/testing-node-js-applications/",
                  universitySlug: "",
                  instructor: "Valentin Krasnichuk",
                  description:
                    "Guide to testing Node.js applications covering integration tests, E2E testing, and test architecture.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 25,
                  quality: {
                    score: 87,
                    reasons: [
                      "Practical integration testing guide",
                      "Node.js focused",
                      "Covers modern testing tools",
                    ],
                  },
                },
                {
                  slug: "playwright-docs",
                  title: "Playwright Documentation",
                  type: "DOCUMENTATION",
                  url: "https://playwright.dev/docs/intro",
                  universitySlug: "",
                  description:
                    "Microsoft's Playwright framework for end-to-end testing with cross-browser support.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 90,
                    reasons: [
                      "Excellent E2E testing framework",
                      "Official documentation with examples",
                      "Cross-browser testing support",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "architecture-topic",
          name: "Software Architecture",
          description:
            "Distributed systems, API design, and architectural patterns",
          skills: [
            {
              slug: "microservices",
              name: "Microservices",
              description:
                "Microservice architecture, service decomposition, communication patterns, and deployment",
              difficulty: 4,
              prerequisites: ["api-design", "docker-containers"],
              resources: [
                {
                  slug: "microservices-book",
                  title: "Building Microservices (2nd Ed)",
                  type: "BOOK",
                  url: "https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/",
                  universitySlug: "",
                  instructor: "Sam Newman",
                  description:
                    "Comprehensive guide to designing, building, and deploying microservice architectures.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 35,
                  quality: {
                    score: 92,
                    reasons: [
                      "The definitive microservices book",
                      "Practical real-world guidance",
                      "Covers decomposition through deployment",
                    ],
                  },
                },
                {
                  slug: "netflix-architecture",
                  title: "Netflix Tech Blog – Architecture",
                  type: "DOCUMENTATION",
                  url: "https://netflixtechblog.com/",
                  universitySlug: "",
                  description:
                    "Netflix's engineering blog detailing their microservices architecture and infrastructure decisions.",
                  language: "en",
                  level: "ADVANCED",
                  quality: {
                    score: 88,
                    reasons: [
                      "Real-world production architecture",
                      "Insights from industry leader",
                      "Practical patterns and lessons",
                    ],
                  },
                },
              ],
            },
            {
              slug: "api-design",
              name: "API Design",
              description:
                "RESTful API design, GraphQL, gRPC, API versioning, and documentation",
              difficulty: 3,
              resources: [
                {
                  slug: "restful-api-book",
                  title: "RESTful Web APIs",
                  type: "BOOK",
                  url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/",
                  universitySlug: "",
                  instructor: "Leonard Richardson, Mike Amundsen",
                  description:
                    "Comprehensive guide to REST API design covering resource modeling, HTTP methods, and API evolution.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 30,
                  quality: {
                    score: 89,
                    reasons: [
                      "Thorough API design guidance",
                      "Practical REST patterns",
                      "Covers real-world challenges",
                    ],
                  },
                },
                {
                  slug: "openapi-spec",
                  title: "OpenAPI Specification",
                  type: "DOCUMENTATION",
                  url: "https://spec.openapis.org/oas/latest.html",
                  universitySlug: "",
                  description:
                    "The OpenAPI specification for designing, building, and documenting RESTful APIs.",
                  language: "en",
                  level: "INTERMEDIATE",
                  quality: {
                    score: 87,
                    reasons: [
                      "Industry standard API specification",
                      "Essential for API documentation",
                      "Well-documented and maintained",
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  paths: [
    {
      slug: "software-engineering",
      name: "Software Engineer",
      tagline: "Build production software from scratch",
      description:
        "A comprehensive path covering programming, data structures, systems, and software engineering practices.",
      level: "BEGINNER",
      estimatedMonths: 12,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: [
            "python-basics",
            "git-version-control",
            "html-css-basics",
          ],
        },
        {
          name: "CORE",
          skillSlugs: [
            "python-oop",
            "data-structures",
            "algorithms",
            "databases-sql",
            "javascript-basics",
          ],
        },
        {
          name: "SYSTEMS",
          skillSlugs: [
            "computer-architecture",
            "operating-systems",
            "networking-basics",
            "docker-containers",
          ],
        },
        {
          name: "PRACTICE",
          skillSlugs: [
            "design-patterns",
            "solid-principles",
            "unit-testing",
            "api-design",
            "react-basics",
          ],
        },
        {
          name: "ADVANCED",
          skillSlugs: [
            "microservices",
            "ci-cd",
            "distributed-databases",
            "operating-systems",
          ],
        },
      ],
    },
    {
      slug: "cs-fundamentals",
      name: "Computer Science Fundamentals",
      tagline: "Deep theoretical foundations of computing",
      description:
        "Master the mathematical and theoretical foundations of computer science.",
      level: "INTERMEDIATE",
      estimatedMonths: 18,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: [
            "discrete-mathematics",
            "formal-logic",
            "python-basics",
          ],
        },
        {
          name: "CORE",
          skillSlugs: [
            "data-structures",
            "algorithms",
            "complexity-analysis",
            "computer-architecture",
          ],
        },
        {
          name: "THEORY",
          skillSlugs: [
            "automata-theory",
            "computability",
            "information-theory",
          ],
        },
        {
          name: "ADVANCED",
          skillSlugs: [
            "distributed-databases",
            "microservices",
            "design-patterns",
          ],
        },
      ],
    },
    {
      slug: "fullstack-web",
      name: "Full-Stack Web Developer",
      tagline: "Modern web applications end-to-end",
      description:
        "Learn to build and deploy full-stack web applications with modern frameworks.",
      level: "BEGINNER",
      estimatedMonths: 10,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: [
            "html-css-basics",
            "javascript-basics",
            "git-version-control",
            "python-basics",
          ],
        },
        {
          name: "CORE",
          skillSlugs: [
            "typescript-basics",
            "react-basics",
            "databases-sql",
            "api-design",
            "database-design",
          ],
        },
        {
          name: "ADVANCED",
          skillSlugs: [
            "nextjs-basics",
            "docker-containers",
            "ci-cd",
            "unit-testing",
            "integration-testing",
          ],
        },
      ],
    },
  ],
  courses: [
    {
      code: "6.0001",
      slug: "mit-6-0001",
      title: "Introduction to CS and Programming in Python",
      universitySlug: "mit",
      subjectSlug: "programming",
      level: "BEGINNER",
      description:
        "An introduction to computer science and programming using Python, covering basic algorithms and data structures.",
      url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
      skillSlugs: ["python-basics"],
    },
    {
      code: "6.0001-OOP",
      slug: "mit-6-0001-oop",
      title: "Introduction to CS and Programming in Python – OOP Unit",
      universitySlug: "mit",
      subjectSlug: "programming",
      level: "INTERMEDIATE",
      description:
        "Object-oriented programming concepts and techniques applied in Python.",
      url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/pages/unit-2/",
      skillSlugs: ["python-oop"],
    },
    {
      code: "6.006",
      slug: "mit-6-006",
      title: "Introduction to Algorithms",
      universitySlug: "mit",
      subjectSlug: "programming",
      level: "INTERMEDIATE",
      description:
        "Fundamental data structures and algorithms including sorting, searching, graph algorithms, and dynamic programming.",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      skillSlugs: ["data-structures", "algorithms", "complexity-analysis"],
    },
    {
      code: "6.042J",
      slug: "mit-6-042j",
      title: "Mathematics for Computer Science",
      universitySlug: "mit",
      subjectSlug: "theory",
      level: "INTERMEDIATE",
      description:
        "Discrete mathematics for computer science covering proofs, induction, graph theory, probability, and number theory.",
      url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
      skillSlugs: ["discrete-mathematics", "formal-logic"],
    },
    {
      code: "6.S081",
      slug: "mit-6-s081",
      title: "Operating System Engineering",
      universitySlug: "mit",
      subjectSlug: "systems",
      level: "ADVANCED",
      description:
        "Operating systems based on xv6 covering processes, memory management, concurrency, and file systems.",
      url: "https://pdos.csail.mit.edu/6.828/2021/",
      skillSlugs: ["operating-systems"],
    },
    {
      code: "6.830",
      slug: "mit-6-830",
      title: "Database Systems",
      universitySlug: "mit",
      subjectSlug: "systems",
      level: "ADVANCED",
      description:
        "Advanced database systems covering query execution, concurrency control, recovery, and distributed databases.",
      url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/",
      skillSlugs: ["distributed-databases"],
    },
    {
      code: "18.404J",
      slug: "mit-18-404j",
      title: "Theory of Computation",
      universitySlug: "mit",
      subjectSlug: "theory",
      level: "ADVANCED",
      description:
        "Automata theory, computability, and complexity theory including P vs NP and the Church-Turing thesis.",
      url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2006/",
      skillSlugs: ["automata-theory", "computability"],
    },
    {
      code: "CS50",
      slug: "harvard-cs50",
      title: "CS50: Introduction to Computer Science",
      universitySlug: "harvard",
      subjectSlug: "programming",
      level: "BEGINNER",
      description:
        "Harvard's introduction to intellectual enterprises of computer science and art of programming.",
      url: "https://cs50.harvard.edu/",
      skillSlugs: ["python-basics", "html-css-basics"],
    },
    {
      code: "CS50-WEB",
      slug: "harvard-cs50-web",
      title: "CS50 Web Programming with Python and JavaScript",
      universitySlug: "harvard",
      subjectSlug: "software-engineering",
      level: "INTERMEDIATE",
      description:
        "Web programming with Python, JavaScript, Django, and React.",
      url: "https://cs50.harvard.edu/web/",
      skillSlugs: ["python-basics", "javascript-basics", "html-css-basics"],
    },
    {
      code: "CS50-SQL",
      slug: "harvard-cs50-sql",
      title: "CS50's Introduction to Databases with SQL",
      universitySlug: "harvard",
      subjectSlug: "systems",
      level: "BEGINNER",
      description:
        "Introduction to SQL covering queries, joins, indexes, transactions, and database design.",
      url: "https://cs50.harvard.edu/sql/",
      skillSlugs: ["databases-sql"],
    },
    {
      code: "CS61A",
      slug: "berkeley-cs61a",
      title: "CS 61A: Structure and Interpretation of Computer Programs",
      universitySlug: "berkeley",
      subjectSlug: "programming",
      level: "BEGINNER",
      description:
        "Introduction to CS and programming using abstraction, recursion, and higher-order functions in Python.",
      url: "https://cs61a.org/",
      skillSlugs: ["python-basics", "python-oop"],
    },
    {
      code: "CS162",
      slug: "berkeley-cs162",
      title: "CS 162: Operating Systems and Systems Programming",
      universitySlug: "berkeley",
      subjectSlug: "systems",
      level: "ADVANCED",
      description:
        "Operating systems covering threads, synchronization, scheduling, memory management, and networking.",
      url: "https://cs162.org/",
      skillSlugs: ["operating-systems"],
    },
    {
      code: "15-213",
      slug: "cmu-15-213",
      title: "Introduction to Computer Systems",
      universitySlug: "cmu",
      subjectSlug: "systems",
      level: "INTERMEDIATE",
      description:
        "Computer systems from a programmer's perspective: data representation, assembly, memory hierarchy, caching, and virtual memory.",
      url: "https://www.cs.cmu.edu/~213/",
      skillSlugs: ["computer-architecture"],
    },
    {
      code: "15-445",
      slug: "cmu-15-445",
      title: "Database Systems",
      universitySlug: "cmu",
      subjectSlug: "systems",
      level: "INTERMEDIATE",
      description:
        "Database systems covering relational algebra, SQL, storage, indexes, query execution, and concurrency control.",
      url: "https://15445.courses.cs.cmu.edu/",
      skillSlugs: ["databases-sql", "database-design"],
    },
    {
      code: "EE376A",
      slug: "stanford-ee376a",
      title: "Information Theory",
      universitySlug: "stanford",
      subjectSlug: "theory",
      level: "ADVANCED",
      description:
        "Information theory covering entropy, mutual information, channel capacity, rate-distortion, and network information theory.",
      url: "https://web.stanford.edu/class/ee376a/",
      skillSlugs: ["information-theory"],
    },
    {
      code: "CS144",
      slug: "stanford-cs144",
      title: "Computer Networking",
      universitySlug: "stanford",
      subjectSlug: "systems",
      level: "INTERMEDIATE",
      description:
        "Computer networking covering internet architecture, TCP/IP, routing, and network applications.",
      url: "https://www.scs.stanford.edu/10au-cs144/",
      skillSlugs: ["networking-basics", "network-protocols"],
    },
  ],
  curricula: [
    {
      degreeSlug: "mit-cs-bachelor",
      degreeName: "Computer Science and Engineering",
      degreeLevel: "BACHELOR",
      universitySlug: "mit",
      name: "MIT 6-3 Computer Science and Engineering",
      sourceUrl: "https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/6-3-computer-science-and-engineering/",
      courses: [
        { courseSlug: "harvard-cs50", year: 1, semester: 1, order: 1 },
        { courseSlug: "mit-6-0001", year: 1, semester: 1, order: 2 },
        { courseSlug: "mit-6-042j", year: 1, semester: 2, order: 3 },
        { courseSlug: "berkeley-cs61a", year: 1, semester: 2, order: 4 },
        { courseSlug: "mit-6-006", year: 2, semester: 1, order: 5 },
        { courseSlug: "cmu-15-213", year: 2, semester: 1, order: 6 },
        { courseSlug: "harvard-cs50-sql", year: 2, semester: 2, order: 7 },
        { courseSlug: "cmu-15-445", year: 2, semester: 2, order: 8 },
        { courseSlug: "mit-6-s081", year: 3, semester: 1, order: 9 },
        { courseSlug: "stanford-cs144", year: 3, semester: 1, order: 10 },
        { courseSlug: "mit-18-404j", year: 3, semester: 2, order: 11 },
        { courseSlug: "stanford-ee376a", year: 3, semester: 2, order: 12 },
        { courseSlug: "mit-6-830", year: 3, semester: 2, order: 13 },
      ],
    },
    {
      degreeSlug: "stanford-cs-bachelor",
      degreeName: "Computer Science",
      degreeLevel: "BACHELOR",
      universitySlug: "stanford",
      name: "Stanford Computer Science Core",
      sourceUrl: "https://cs.stanford.edu/",
      courses: [
        { courseSlug: "cs50-web", year: 1, semester: 1, order: 1 },
        { courseSlug: "berkeley-cs61a", year: 1, semester: 1, order: 2 },
        { courseSlug: "harvard-cs50-sql", year: 1, semester: 2, order: 3 },
        { courseSlug: "mit-6-042j", year: 1, semester: 2, order: 4 },
        { courseSlug: "mit-6-006", year: 2, semester: 1, order: 5 },
        { courseSlug: "cmu-15-213", year: 2, semester: 1, order: 6 },
        { courseSlug: "stanford-cs144", year: 2, semester: 2, order: 7 },
        { courseSlug: "cmu-15-445", year: 2, semester: 2, order: 8 },
        { courseSlug: "berkeley-cs162", year: 3, semester: 1, order: 9 },
        { courseSlug: "mit-18-404j", year: 3, semester: 1, order: 10 },
        { courseSlug: "stanford-ee376a", year: 3, semester: 2, order: 11 },
        { courseSlug: "mit-6-830", year: 3, semester: 2, order: 12 },
      ],
    },
    {
      degreeSlug: "harvard-cs-bachelor",
      degreeName: "Computer Science",
      degreeLevel: "BACHELOR",
      universitySlug: "harvard",
      name: "Harvard Computer Science Core",
      sourceUrl: "https://cs.harvard.edu/",
      courses: [
        { courseSlug: "harvard-cs50", year: 1, semester: 1, order: 1 },
        { courseSlug: "mit-6-0001", year: 1, semester: 1, order: 2 },
        { courseSlug: "harvard-cs50-sql", year: 1, semester: 2, order: 3 },
        { courseSlug: "mit-6-042j", year: 1, semester: 2, order: 4 },
        { courseSlug: "mit-6-006", year: 2, semester: 1, order: 5 },
        { courseSlug: "cmu-15-213", year: 2, semester: 1, order: 6 },
        { courseSlug: "cs50-web", year: 2, semester: 2, order: 7 },
        { courseSlug: "stanford-cs144", year: 2, semester: 2, order: 8 },
        { courseSlug: "mit-6-s081", year: 3, semester: 1, order: 9 },
        { courseSlug: "berkeley-cs162", year: 3, semester: 1, order: 10 },
        { courseSlug: "mit-18-404j", year: 3, semester: 2, order: 11 },
        { courseSlug: "cmu-15-445", year: 3, semester: 2, order: 12 },
        { courseSlug: "stanford-ee376a", year: 3, semester: 2, order: 13 },
      ],
    },
  ],
};
