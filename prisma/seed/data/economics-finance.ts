import type { DomainSeed } from "../types.js";

export const economicsFinance: DomainSeed = {
  slug: "economics-finance",
  name: "Economics & Finance",
  description:
    "Understand markets, policy, and financial systems through quantitative analysis.",
  subjects: [
    {
      slug: "microeconomics",
      name: "Microeconomics",
      description:
        "Study of individual agents and markets, including consumer and producer behavior.",
      topics: [
        {
          slug: "micro-fundamentals",
          name: "Microeconomic Fundamentals",
          description:
            "Core concepts of supply, demand, and market equilibrium.",
          skills: [
            {
              slug: "supply-and-demand",
              name: "Supply & Demand",
              description:
                "Understand how price is determined by the interaction of supply and demand.",
              difficulty: 1,
              resources: [
                {
                  slug: "mit-14-01",
                  title: "Principles of Microeconomics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/",
                  universitySlug: "mit",
                  instructor: "Jonathan Gruber",
                  description:
                    "MIT OpenCourseWare covering supply, demand, and market mechanisms.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 48,
                  year: 2018,
                  quality: {
                    score: 92,
                    reasons: [
                      "Comprehensive lectures",
                      "Problem sets with solutions",
                      "Trusted MIT source",
                    ],
                  },
                },
                {
                  slug: "khan-supply-demand",
                  title: "Supply and Demand",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/economics-finance-domain/microeconomics/supply-demand-equilibrium",
                  universitySlug: "mit",
                  description:
                    "Khan Academy interactive lessons on supply and demand fundamentals.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 6,
                  quality: {
                    score: 85,
                    reasons: [
                      "Interactive exercises",
                      "Beginner-friendly",
                      "Well-structured progression",
                    ],
                  },
                },
              ],
            },
            {
              slug: "market-equilibrium",
              name: "Market Equilibrium",
              description:
                "Analyze how markets reach equilibrium and respond to changes.",
              difficulty: 2,
              prerequisites: ["supply-and-demand"],
              resources: [
                {
                  slug: "mit-14-01-equilibrium",
                  title: "Market Equilibrium Analysis",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Lecture notes on equilibrium analysis from MIT OCW.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 8,
                  year: 2018,
                  quality: {
                    score: 88,
                    reasons: [
                      "Authoritative source",
                      "Detailed mathematical treatment",
                      "Practice problems included",
                    ],
                  },
                },
              ],
            },
            {
              slug: "elasticity",
              name: "Elasticity",
              description:
                "Measure responsiveness of quantity demanded or supplied to price changes.",
              difficulty: 2,
              resources: [
                {
                  slug: "khan-elasticity",
                  title: "Elasticity",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/economics-finance-domain/microeconomics/supply-demand-equilibrium/elasticity-tutorial/v/price-elasticity-of-demand",
                  universitySlug: "mit",
                  description:
                    "Khan Academy lessons on price, income, and cross-price elasticity.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 5,
                  quality: {
                    score: 84,
                    reasons: [
                      "Clear explanations",
                      "Practice problems",
                      "Visual diagrams",
                    ],
                  },
                },
                {
                  slug: "harvard-elasticity",
                  title: "Elasticity and Its Applications",
                  type: "LECTURE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard Extension lecture on elasticity concepts and real-world applications.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 3,
                  quality: {
                    score: 80,
                    reasons: [
                      "Real-world case studies",
                      "University-level instruction",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "micro-theory",
          name: "Microeconomic Theory",
          description:
            "Advanced theories of consumer and producer behavior and strategic interaction.",
          skills: [
            {
              slug: "consumer-theory",
              name: "Consumer Theory",
              description:
                "Model consumer preferences, utility maximization, and demand derivation.",
              difficulty: 3,
              prerequisites: ["market-equilibrium"],
              resources: [
                {
                  slug: "mit-14-04",
                  title: "Microeconomic Theory",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-04-intermediate-microeconomic-theory-fall-2020/",
                  universitySlug: "mit",
                  instructor: "Dirt Nievergelt",
                  description:
                    "MIT course covering consumer theory, production, and market structures.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 60,
                  year: 2020,
                  quality: {
                    score: 90,
                    reasons: [
                      "Rigorous mathematical approach",
                      "Problem sets with solutions",
                      "Comprehensive coverage",
                    ],
                  },
                },
              ],
            },
            {
              slug: "producer-theory",
              name: "Producer Theory",
              description:
                "Analyze firm behavior, cost minimization, and profit maximization.",
              difficulty: 3,
              prerequisites: ["consumer-theory"],
              resources: [
                {
                  slug: "mit-14-04-production",
                  title: "Production and Cost Theory",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-04-intermediate-microeconomic-theory-fall-2020/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Detailed notes on production functions, cost curves, and firm optimization.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 12,
                  year: 2020,
                  quality: {
                    score: 87,
                    reasons: [
                      "Mathematically rigorous",
                      "Clear derivations",
                      "Includes examples",
                    ],
                  },
                },
              ],
            },
            {
              slug: "game-theory",
              name: "Game Theory",
              description:
                "Study strategic interaction between rational decision-makers.",
              difficulty: 4,
              prerequisites: ["consumer-theory"],
              resources: [
                {
                  slug: "yale-game-theory",
                  title: "Game Theory (ECON 159)",
                  type: "VIDEO",
                  url: "https://oyc.yale.edu/economics/econ-159",
                  universitySlug: "yale",
                  instructor: "Ben Polak",
                  description:
                    "Yale Open Course on game theory with complete video lectures.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 36,
                  year: 2007,
                  quality: {
                    score: 94,
                    reasons: [
                      "Excellent instructor",
                      "Complete course available",
                      "Highly rated by students",
                    ],
                  },
                },
                {
                  slug: "mit-game-theory",
                  title: "Game Theory for Strategists",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-025-game-theory-for-strategists-fall-2012/",
                  universitySlug: "mit",
                  description:
                    "Applied game theory course focusing on strategic decision-making.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 30,
                  year: 2012,
                  quality: {
                    score: 88,
                    reasons: [
                      "Practical applications",
                      "Strategy-focused",
                      "Well-structured curriculum",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "market-structures",
          name: "Market Structures",
          description:
            "Analyze different competitive environments and their efficiency implications.",
          skills: [
            {
              slug: "perfect-competition",
              name: "Perfect Competition",
              description:
                "Study markets with many small firms, homogeneous products, and free entry.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-perfect-comp",
                  title: "Perfect Competition",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Lecture notes on perfectly competitive markets and long-run equilibrium.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 8,
                  year: 2018,
                  quality: {
                    score: 86,
                    reasons: [
                      "Clear graphical analysis",
                      "Mathematical rigor",
                      "Includes welfare implications",
                    ],
                  },
                },
              ],
            },
            {
              slug: "monopoly",
              name: "Monopoly",
              description:
                "Analyze single-firm markets, pricing power, and welfare effects.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-monopoly",
                  title: "Monopoly and Market Power",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-04-intermediate-microeconomic-theory-fall-2020/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on monopoly pricing, deadweight loss, and regulation.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  year: 2020,
                  quality: {
                    score: 87,
                    reasons: [
                      "Comprehensive treatment",
                      "Graphical and algebraic analysis",
                      "Real-world examples",
                    ],
                  },
                },
                {
                  slug: "harvard-monopoly",
                  title: "Industrial Organization",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on market structures including monopoly and oligopoly.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 45,
                  quality: {
                    score: 83,
                    reasons: [
                      "Research-led teaching",
                      "Empirical applications",
                    ],
                  },
                },
              ],
            },
            {
              slug: "oligopoly",
              name: "Oligopoly",
              description:
                "Study markets with a few large firms and strategic interdependence.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-oligopoly",
                  title: "Oligopoly and Strategic Behavior",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-04-intermediate-microeconomic-theory-fall-2020/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Lecture notes on Cournot, Bertrand, and Stackelberg models.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 12,
                  year: 2020,
                  quality: {
                    score: 89,
                    reasons: [
                      "Multiple oligopoly models",
                      "Strategic analysis",
                      "Game theory applications",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "welfare-economics",
          name: "Welfare Economics",
          description:
            "Evaluate market outcomes in terms of efficiency and social welfare.",
          skills: [
            {
              slug: "welfare-economics",
              name: "Welfare Economics",
              description:
                "Assess economic efficiency and the role of government intervention.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-welfare",
                  title: "Welfare Economics and Market Failures",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2018/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on Pareto efficiency, social welfare functions, and policy.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  year: 2018,
                  quality: {
                    score: 85,
                    reasons: [
                      "Rigorous welfare analysis",
                      "Policy applications",
                      "Clear definitions",
                    ],
                  },
                },
              ],
            },
            {
              slug: "market-failure",
              name: "Market Failure",
              description:
                "Analyze externalities, public goods, and information asymmetries.",
              difficulty: 3,
              resources: [
                {
                  slug: "khan-market-failure",
                  title: "Market Failure and Government Intervention",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/economics-finance-domain/microeconomics",
                  universitySlug: "mit",
                  description:
                    "Khan Academy lessons on externalities, public goods, and market failure.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 8,
                  quality: {
                    score: 82,
                    reasons: [
                      "Accessible explanations",
                      "Visual examples",
                      "Practice exercises",
                    ],
                  },
                },
                {
                  slug: "mit-market-failure",
                  title: "Public Economics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-471-public-economics-i-fall-2012/",
                  universitySlug: "mit",
                  description:
                    "MIT course on public economics covering market failures and taxation.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 48,
                  year: 2012,
                  quality: {
                    score: 90,
                    reasons: [
                      "In-depth treatment",
                      "Empirical evidence",
                      "Policy focus",
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
      slug: "macroeconomics",
      name: "Macroeconomics",
      description:
        "Study economy-wide phenomena including growth, inflation, and policy.",
      topics: [
        {
          slug: "macro-fundamentals",
          name: "Macroeconomic Fundamentals",
          description:
            "Core measures of economic activity and their relationships.",
          skills: [
            {
              slug: "gdp-growth",
              name: "GDP & Growth",
              description:
                "Understand gross domestic product, economic growth, and measurement.",
              difficulty: 1,
              resources: [
                {
                  slug: "mit-14-02",
                  title: "Principles of Macroeconomics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-fall-2023/",
                  universitySlug: "mit",
                  instructor: "Jonathan Gruber",
                  description:
                    "MIT OpenCourseWare covering GDP, growth, and macroeconomic fundamentals.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 48,
                  year: 2023,
                  quality: {
                    score: 91,
                    reasons: [
                      "Updated content",
                      "Comprehensive coverage",
                      "Trusted MIT source",
                    ],
                  },
                },
                {
                  slug: "khan-macro-fundamentals",
                  title: "GDP and Economic Growth",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/economics-finance-domain/macroeconomics/gdp-topic",
                  universitySlug: "mit",
                  description:
                    "Khan Academy lessons on GDP calculation and economic growth.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 6,
                  quality: {
                    score: 84,
                    reasons: [
                      "Beginner-friendly",
                      "Interactive exercises",
                      "Clear visualizations",
                    ],
                  },
                },
              ],
            },
            {
              slug: "inflation",
              name: "Inflation",
              description:
                "Study price level changes, measurement, and their economic effects.",
              difficulty: 2,
              resources: [
                {
                  slug: "mit-inflation",
                  title: "Inflation and Price Levels",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-02-principles-of-macroeconomics-fall-2023/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Lecture notes on CPI, inflation measurement, and consequences.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 8,
                  year: 2023,
                  quality: {
                    score: 87,
                    reasons: [
                      "Clear measurement methods",
                      "Historical examples",
                      "Policy implications",
                    ],
                  },
                },
              ],
            },
            {
              slug: "unemployment",
              name: "Unemployment",
              description:
                "Analyze labor market dynamics, types of unemployment, and policies.",
              difficulty: 2,
              resources: [
                {
                  slug: "khan-unemployment",
                  title: "Unemployment",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/economics-finance-domain/macroeconomics",
                  universitySlug: "mit",
                  description:
                    "Khan Academy lessons on unemployment types and labor market indicators.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 5,
                  quality: {
                    score: 83,
                    reasons: [
                      "Comprehensive overview",
                      "Real-world data",
                      "Engaging presentation",
                    ],
                  },
                },
                {
                  slug: "harvard-unemployment",
                  title: "Labor Economics",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on labor markets, unemployment, and wage determination.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  quality: {
                    score: 86,
                    reasons: [
                      "Research-based",
                      "Empirical methods",
                      "Policy applications",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "macro-theory",
          name: "Macroeconomic Theory",
          description:
            "Theoretical frameworks for understanding aggregate economic behavior.",
          skills: [
            {
              slug: "keynesian-economics",
              name: "Keynesian Economics",
              description:
                "Understand aggregate demand, multiplier effects, and stabilization policy.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-keynesian",
                  title: "Intermediate Macroeconomics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-05-intermediate-macroeconomics-spring-2013/",
                  universitySlug: "mit",
                  instructor: "Daron Acemoglu",
                  description:
                    "MIT course covering Keynesian and neoclassical models of the macroeconomy.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 60,
                  year: 2013,
                  quality: {
                    score: 93,
                    reasons: [
                      "Top instructor",
                      "Rigorous treatment",
                      "Both theoretical and empirical",
                    ],
                  },
                },
                {
                  slug: "yale-macro",
                  title: "Financial Markets (ECON 252)",
                  type: "VIDEO",
                  url: "https://oyc.yale.edu/economics/econ-252",
                  universitySlug: "yale",
                  instructor: "Robert Shiller",
                  description:
                    "Yale course on financial markets and macroeconomic perspective.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 36,
                  year: 2008,
                  quality: {
                    score: 95,
                    reasons: [
                      "Nobel laureate instructor",
                      "Comprehensive market coverage",
                      "Highly engaging",
                    ],
                  },
                },
              ],
            },
            {
              slug: "monetary-policy",
              name: "Monetary Policy",
              description:
                "Study central banking, interest rates, and money supply management.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-monetary",
                  title: "Monetary and Financial Policy",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-432-financial-economics-spring-2003/",
                  universitySlug: "mit",
                  description:
                    "MIT course on monetary policy transmission and central banking.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 45,
                  year: 2003,
                  quality: {
                    score: 85,
                    reasons: [
                      "Policy-focused",
                      "Institutional details",
                      "Theoretical foundations",
                    ],
                  },
                },
              ],
            },
            {
              slug: "fiscal-policy",
              name: "Fiscal Policy",
              description:
                "Analyze government spending, taxation, and their macroeconomic effects.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-fiscal",
                  title: "Public Economics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-471-public-economics-i-fall-2012/",
                  universitySlug: "mit",
                  description:
                    "MIT course covering fiscal policy, taxation, and government spending.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 48,
                  year: 2012,
                  quality: {
                    score: 88,
                    reasons: [
                      "Comprehensive fiscal analysis",
                      "Empirical evidence",
                      "Policy evaluation",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "macro-advanced",
          name: "Advanced Macroeconomics",
          description:
            "Sophisticated models of economic fluctuations and long-run growth.",
          skills: [
            {
              slug: "dynamic-stochastic-models",
              name: "Dynamic Stochastic Models",
              description:
                "Build and solve DSGE models for business cycle analysis.",
              difficulty: 5,
              resources: [
                {
                  slug: "mit-dsge",
                  title: "Advanced Macroeconomics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-452-economic-growth-spring-2009/",
                  universitySlug: "mit",
                  description:
                    "MIT course on dynamic macroeconomic models and growth theory.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 60,
                  year: 2009,
                  quality: {
                    score: 89,
                    reasons: [
                      "PhD-level rigor",
                      "Mathematical foundations",
                      "Computational methods",
                    ],
                  },
                },
              ],
            },
            {
              slug: "business-cycles",
              name: "Business Cycles",
              description:
                "Analyze economic fluctuations, recessions, and recovery patterns.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-business-cycles",
                  title: "Business Cycles and Fluctuations",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-05-intermediate-macroeconomics-spring-2013/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on real business cycle theory and Keynesian approaches.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2013,
                  quality: {
                    score: 86,
                    reasons: [
                      "Multiple theoretical perspectives",
                      "Empirical evidence",
                      "Clear presentation",
                    ],
                  },
                },
                {
                  slug: "harvard-business-cycles",
                  title: "Advanced Macroeconomics",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on business cycle theories and empirical methods.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 50,
                  quality: {
                    score: 87,
                    reasons: [
                      "Research frontier topics",
                      "Rigorous methodology",
                      "Expert instruction",
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
      slug: "econometrics",
      name: "Econometrics",
      description:
        "Apply statistical methods to economic data for empirical analysis.",
      topics: [
        {
          slug: "regression-methods",
          name: "Regression Methods",
          description:
            "Foundational techniques for estimating economic relationships.",
          skills: [
            {
              slug: "linear-regression",
              name: "Linear Regression",
              description:
                "Estimate and interpret linear relationships between variables.",
              difficulty: 2,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "mit-econometrics",
                  title: "Introduction to Econometrics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-32-econometrics-spring-2007/",
                  universitySlug: "mit",
                  instructor: "Whitney Newey",
                  description:
                    "MIT course covering regression analysis and its applications.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 60,
                  year: 2007,
                  quality: {
                    score: 91,
                    reasons: [
                      "World-class instructor",
                      "Rigorous treatment",
                      "Practical applications",
                    ],
                  },
                },
                {
                  slug: "khan-regression",
                  title: "Regression Analysis",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/math/statistics-probability",
                  universitySlug: "mit",
                  description:
                    "Khan Academy lessons on regression fundamentals and interpretation.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 10,
                  quality: {
                    score: 80,
                    reasons: [
                      "Accessible introduction",
                      "Visual explanations",
                      "Practice problems",
                    ],
                  },
                },
              ],
            },
            {
              slug: "multiple-regression",
              name: "Multiple Regression",
              description:
                "Extend regression to multiple explanatory variables and interpret coefficients.",
              difficulty: 3,
              prerequisites: ["linear-regression"],
              resources: [
                {
                  slug: "mit-multiple-regression",
                  title: "Multiple Regression Analysis",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-32-econometrics-spring-2007/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Lecture notes on multiple regression, omitted variable bias, and specification.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2007,
                  quality: {
                    score: 88,
                    reasons: [
                      "Thorough treatment",
                      "Mathematical derivations",
                      "Applied examples",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "causal-methods",
          name: "Causal Inference",
          description:
            "Methods for establishing cause-and-effect relationships from observational data.",
          skills: [
            {
              slug: "causal-inference",
              name: "Causal Inference",
              description:
                "Apply experimental and quasi-experimental methods to identify causal effects.",
              difficulty: 4,
              prerequisites: ["multiple-regression"],
              resources: [
                {
                  slug: "mit-causal",
                  title: "Causal Inference",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/14-382-econometrics-spring-2007/",
                  universitySlug: "mit",
                  description:
                    "MIT course on methods for causal inference including IV and difference-in-differences.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 55,
                  year: 2007,
                  quality: {
                    score: 90,
                    reasons: [
                      "Modern methods",
                      "Empirical applications",
                      "Rigorous treatment",
                    ],
                  },
                },
                {
                  slug: "harvard-causal",
                  title: "Causal Inference and Program Evaluation",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on causal inference methods for policy evaluation.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 50,
                  quality: {
                    score: 88,
                    reasons: [
                      "Policy applications",
                      "Modern techniques",
                      "Expert instruction",
                    ],
                  },
                },
              ],
            },
            {
              slug: "instrumental-variables",
              name: "Instrumental Variables",
              description:
                "Use instrumental variables to address endogeneity in regression models.",
              difficulty: 5,
              resources: [
                {
                  slug: "mit-iv",
                  title: "Instrumental Variables Methods",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-382-econometrics-spring-2007/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Detailed notes on IV estimation, identification, and testing.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  year: 2007,
                  quality: {
                    score: 89,
                    reasons: [
                      "Mathematical rigor",
                      "Practical guidance",
                      "Testing procedures",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "time-series",
          name: "Time Series Analysis",
          description:
            "Analyze data collected over time including trends and seasonality.",
          skills: [
            {
              slug: "time-series-analysis",
              name: "Time Series Analysis",
              description:
                "Model temporal data with trends, seasonality, and autocorrelation.",
              difficulty: 4,
              prerequisites: ["multiple-regression"],
              resources: [
                {
                  slug: "mit-time-series",
                  title: "Time Series Analysis",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-450-analytics-of-finance-fall-2010/",
                  universitySlug: "mit",
                  description:
                    "MIT course on time series methods for financial and economic data.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 50,
                  year: 2010,
                  quality: {
                    score: 87,
                    reasons: [
                      "Finance applications",
                      "R methods",
                      "Practical focus",
                    ],
                  },
                },
                {
                  slug: "coursera-time-series",
                  title: "Time Series Analysis",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/time-series-analysis",
                  universitySlug: "yale",
                  description:
                    "Coursera course on time series forecasting and analysis.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  quality: {
                    score: 82,
                    reasons: [
                      "Structured curriculum",
                      "Hands-on projects",
                      "Peer review",
                    ],
                  },
                },
              ],
            },
            {
              slug: "panel-data",
              name: "Panel Data",
              description:
                "Analyze data with both cross-sectional and time-series dimensions.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-panel",
                  title: "Panel Data Methods",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-382-econometrics-spring-2007/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on fixed effects, random effects, and dynamic panel models.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 12,
                  year: 2007,
                  quality: {
                    score: 86,
                    reasons: [
                      "Comprehensive methods",
                      "Application examples",
                      "Statistical theory",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "econometric-methods",
          name: "Econometric Methods",
          description:
            "Foundational statistical methods for empirical economic research.",
          skills: [
            {
              slug: "hypothesis-testing",
              name: "Hypothesis Testing",
              description:
                "Apply statistical tests to evaluate economic hypotheses.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-hypothesis",
                  title: "Statistical Inference for Economists",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-32-econometrics-spring-2007/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on hypothesis testing, confidence intervals, and p-values.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  year: 2007,
                  quality: {
                    score: 85,
                    reasons: [
                      "Clear explanations",
                      "Economic examples",
                      "Practical guidance",
                    ],
                  },
                },
                {
                  slug: "khan-hypothesis",
                  title: "Hypothesis Testing",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample",
                  universitySlug: "mit",
                  description:
                    "Khan Academy introduction to hypothesis testing concepts.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 8,
                  quality: {
                    score: 81,
                    reasons: [
                      "Intuitive explanations",
                      "Visual approach",
                      "Practice exercises",
                    ],
                  },
                },
              ],
            },
            {
              slug: "endogeneity",
              name: "Endogeneity",
              description:
                "Understand and address endogeneity problems in empirical models.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-endogeneity",
                  title: "Endogeneity and Identification",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/14-382-econometrics-spring-2007/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on sources of endogeneity and identification strategies.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 12,
                  year: 2007,
                  quality: {
                    score: 88,
                    reasons: [
                      "Thorough treatment",
                      "Identification strategies",
                      "Practical examples",
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
      slug: "corporate-finance",
      name: "Corporate Finance",
      description:
        "Study financial decision-making by corporations and financial management.",
      topics: [
        {
          slug: "finance-fundamentals",
          name: "Finance Fundamentals",
          description:
            "Core concepts of corporate financial management.",
          skills: [
            {
              slug: "time-value-of-money",
              name: "Time Value of Money",
              description:
                "Calculate present and future values of cash flows and investment decisions.",
              difficulty: 2,
              resources: [
                {
                  slug: "mit-tvm",
                  title: "Finance Theory I",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/",
                  universitySlug: "mit",
                  instructor: "Andrew Lo",
                  description:
                    "MIT course covering present value, interest rates, and investment decisions.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 50,
                  year: 2008,
                  quality: {
                    score: 92,
                    reasons: [
                      "Excellent instructor",
                      "Comprehensive foundations",
                      "Practical applications",
                    ],
                  },
                },
                {
                  slug: "khan-tvm",
                  title: "Interest and the Time Value of Money",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/economics-finance-domain/core-finance",
                  universitySlug: "mit",
                  description:
                    "Khan Academy lessons on present value, future value, and compound interest.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 8,
                  quality: {
                    score: 83,
                    reasons: [
                      "Clear visual explanations",
                      "Practice problems",
                      "Progressive difficulty",
                    ],
                  },
                },
              ],
            },
            {
              slug: "capital-budgeting",
              name: "Capital Budgeting",
              description:
                "Evaluate investment projects using NPV, IRR, and payback methods.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-capital-budgeting",
                  title: "Capital Budgeting and Investment Decisions",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on NPV, IRR, and capital budgeting techniques.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 12,
                  year: 2008,
                  quality: {
                    score: 87,
                    reasons: [
                      "Practical techniques",
                      "Real-world examples",
                      "Clear methodology",
                    ],
                  },
                },
              ],
            },
            {
              slug: "financial-statements",
              name: "Financial Statements",
              description:
                "Read and analyze balance sheets, income statements, and cash flows.",
              difficulty: 2,
              resources: [
                {
                  slug: "harvard-financial-statements",
                  title: "Financial Accounting",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on reading and interpreting financial statements.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 40,
                  quality: {
                    score: 85,
                    reasons: [
                      "Practical skills",
                      "Case-based learning",
                      "Industry relevance",
                    ],
                  },
                },
                {
                  slug: "coursera-financial-accounting",
                  title: "Financial Accounting Fundamentals",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/financial-accounting",
                  universitySlug: "harvard",
                  description:
                    "Coursera course on financial accounting basics for decision-making.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 35,
                  quality: {
                    score: 82,
                    reasons: [
                      "Structured learning",
                      "Hands-on practice",
                      "Peer interaction",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "corporate-advanced",
          name: "Advanced Corporate Finance",
          description:
            "Capital structure, dividend policy, and corporate governance.",
          skills: [
            {
              slug: "cost-of-capital",
              name: "Cost of Capital",
              description:
                "Estimate WACC and the cost of equity for investment decisions.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-wacc",
                  title: "Corporate Finance",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-414-finance-theory-ii-spring-2003/",
                  universitySlug: "mit",
                  description:
                    "MIT course covering cost of capital, WACC, and corporate valuation.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 50,
                  year: 2003,
                  quality: {
                    score: 89,
                    reasons: [
                      "Rigorous treatment",
                      "Valuation methods",
                      "Practical examples",
                    ],
                  },
                },
              ],
            },
            {
              slug: "capital-structure",
              name: "Capital Structure",
              description:
                "Analyze debt-equity decisions and their impact on firm value.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-capital-structure",
                  title: "Capital Structure Theory",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/15-414-finance-theory-ii-spring-2003/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on Modigliani-Miller, trade-off theory, and pecking order.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 12,
                  year: 2003,
                  quality: {
                    score: 86,
                    reasons: [
                      "Classic theory",
                      "Empirical evidence",
                      "Corporate applications",
                    ],
                  },
                },
              ],
            },
            {
              slug: "dividend-policy",
              name: "Dividend Policy",
              description:
                "Study corporate dividend decisions and share repurchases.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-dividend",
                  title: "Dividend Policy and Share Repurchases",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/15-414-finance-theory-ii-spring-2003/pages/lecture-notes/",
                  universitySlug: "mit",
                  description:
                    "Notes on dividend irrelevance, clientele effects, and repurchase analysis.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  year: 2003,
                  quality: {
                    score: 85,
                    reasons: [
                      "Theoretical foundations",
                      "Empirical patterns",
                      "Corporate practice",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "risk-derivatives",
          name: "Risk Management & Derivatives",
          description:
            "Manage financial risk using derivatives and hedging strategies.",
          skills: [
            {
              slug: "financial-risk-management",
              name: "Financial Risk Management",
              description:
                "Identify, measure, and manage financial risks in portfolios and firms.",
              difficulty: 4,
              resources: [
                {
                  slug: "mit-risk",
                  title: "Financial Risk Management",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-433-investments-spring-2003/",
                  universitySlug: "mit",
                  description:
                    "MIT course on risk measurement, VaR, and risk management frameworks.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 55,
                  year: 2003,
                  quality: {
                    score: 88,
                    reasons: [
                      "Comprehensive coverage",
                      "Industry practices",
                      "Quantitative methods",
                    ],
                  },
                },
                {
                  slug: "cfainstitute-risk",
                  title: "Risk Management",
                  type: "DOCUMENTATION",
                  url: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/risk-management",
                  universitySlug: "harvard",
                  description:
                    "CFA Institute reading on risk management principles and practices.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 20,
                  quality: {
                    score: 84,
                    reasons: [
                      "Professional standard",
                      "Industry recognized",
                      "Comprehensive framework",
                    ],
                  },
                },
              ],
            },
            {
              slug: "derivatives-basics",
              name: "Derivatives Basics",
              description:
                "Understand options, futures, swaps, and their pricing fundamentals.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-derivatives",
                  title: "Derivatives and Risk Management",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-433-investments-spring-2003/",
                  universitySlug: "mit",
                  description:
                    "MIT course on derivatives markets, pricing, and trading strategies.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 50,
                  year: 2003,
                  quality: {
                    score: 89,
                    reasons: [
                      "Practical focus",
                      "Pricing models",
                      "Trading applications",
                    ],
                  },
                },
                {
                  slug: "coursera-derivatives",
                  title: "Financial Engineering and Risk Management",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/financial-engineering-1",
                  universitySlug: "yale",
                  description:
                    "Coursera course from Columbia on derivatives and risk management.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 45,
                  quality: {
                    score: 86,
                    reasons: [
                      "Quantitative approach",
                      "Programming exercises",
                      "Expert instruction",
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
      slug: "investments",
      name: "Investments",
      description:
        "Study asset pricing, portfolio management, and financial markets.",
      topics: [
        {
          slug: "investment-markets",
          name: "Financial Markets",
          description:
            "Understand the structure and function of financial markets.",
          skills: [
            {
              slug: "financial-markets",
              name: "Financial Markets",
              description:
                "Survey equity, bond, and money markets and their instruments.",
              difficulty: 2,
              resources: [
                {
                  slug: "yale-financial-markets",
                  title: "Financial Markets (ECON 252)",
                  type: "VIDEO",
                  url: "https://oyc.yale.edu/economics/econ-252",
                  universitySlug: "yale",
                  instructor: "Robert Shiller",
                  description:
                    "Yale course covering all major financial markets and institutions.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 36,
                  year: 2008,
                  quality: {
                    score: 95,
                    reasons: [
                      "Nobel laureate instructor",
                      "Comprehensive coverage",
                      "Engaging lectures",
                    ],
                  },
                },
                {
                  slug: "khan-markets",
                  title: "Stocks and Bonds",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/economics-finance-domain/core-finance",
                  universitySlug: "mit",
                  description:
                    "Khan Academy introduction to financial markets and instruments.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 10,
                  quality: {
                    score: 82,
                    reasons: [
                      "Beginner-friendly",
                      "Clear explanations",
                      "Interactive format",
                    ],
                  },
                },
              ],
            },
            {
              slug: "portfolio-theory",
              name: "Portfolio Theory",
              description:
                "Apply Modern Portfolio Theory to optimize risk and return.",
              difficulty: 3,
              prerequisites: ["linear-regression"],
              resources: [
                {
                  slug: "mit-portfolio",
                  title: "Investments",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-433-investments-spring-2003/",
                  universitySlug: "mit",
                  instructor: "Andrew Lo",
                  description:
                    "MIT course covering portfolio theory, CAPM, and asset pricing.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 55,
                  year: 2003,
                  quality: {
                    score: 91,
                    reasons: [
                      "Rigorous treatment",
                      "Empirical evidence",
                      "Practical applications",
                    ],
                  },
                },
                {
                  slug: "cfainstitute-portfolio",
                  title: "Portfolio Management",
                  type: "DOCUMENTATION",
                  url: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/portfolio-management-process",
                  universitySlug: "harvard",
                  description:
                    "CFA Institute reading on portfolio construction and management.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 25,
                  quality: {
                    score: 85,
                    reasons: [
                      "Professional standard",
                      "Industry practice",
                      "Comprehensive framework",
                    ],
                  },
                },
              ],
            },
            {
              slug: "asset-pricing",
              name: "Asset Pricing",
              description:
                "Understand models for pricing equities, bonds, and derivatives.",
              difficulty: 4,
              prerequisites: ["portfolio-theory"],
              resources: [
                {
                  slug: "mit-asset-pricing",
                  title: "Asset Pricing Theory",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-433-investments-spring-2003/",
                  universitySlug: "mit",
                  description:
                    "MIT course on CAPM, APT, and continuous-time asset pricing.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 50,
                  year: 2003,
                  quality: {
                    score: 90,
                    reasons: [
                      "Theoretical depth",
                      "Empirical methods",
                      "Modern approaches",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "investment-analysis",
          name: "Investment Analysis",
          description:
            "Techniques for analyzing and valuing financial assets.",
          skills: [
            {
              slug: "equity-valuation",
              name: "Equity Valuation",
              description:
                "Value stocks using DCF, multiples, and fundamental analysis.",
              difficulty: 3,
              resources: [
                {
                  slug: "harvard-equity",
                  title: "Equity Valuation and Analysis",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on stock valuation methods and fundamental analysis.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  quality: {
                    score: 87,
                    reasons: [
                      "Practical methods",
                      "Real company analysis",
                      "Case studies",
                    ],
                  },
                },
                {
                  slug: "cfainstitute-equity",
                  title: "Equity Investments",
                  type: "DOCUMENTATION",
                  url: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/equity-valuation",
                  universitySlug: "harvard",
                  description:
                    "CFA Institute reading on equity valuation models and techniques.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 20,
                  quality: {
                    score: 84,
                    reasons: [
                      "Professional standard",
                      "Industry practice",
                      "Comprehensive coverage",
                    ],
                  },
                },
              ],
            },
            {
              slug: "fixed-income",
              name: "Fixed Income",
              description:
                "Analyze bonds, interest rates, and fixed-income portfolios.",
              difficulty: 3,
              resources: [
                {
                  slug: "mit-fixed-income",
                  title: "Fixed Income Securities",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-433-investments-spring-2003/",
                  universitySlug: "mit",
                  description:
                    "MIT course on bond pricing, duration, and fixed-income analysis.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 50,
                  year: 2003,
                  quality: {
                    score: 88,
                    reasons: [
                      "Comprehensive treatment",
                      "Quantitative methods",
                      "Market applications",
                    ],
                  },
                },
                {
                  slug: "cfainstitute-fixed-income",
                  title: "Fixed Income",
                  type: "DOCUMENTATION",
                  url: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/fixed-income",
                  universitySlug: "harvard",
                  description:
                    "CFA Institute reading on fixed-income analysis and portfolio management.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 25,
                  quality: {
                    score: 85,
                    reasons: [
                      "Professional standard",
                      "Industry practice",
                      "Valuation methods",
                    ],
                  },
                },
              ],
            },
            {
              slug: "technical-analysis",
              name: "Technical Analysis",
              description:
                "Study chart patterns, indicators, and trading strategies.",
              difficulty: 3,
              resources: [
                {
                  slug: "coursera-technical",
                  title: "Financial Markets and Investment Strategy",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/financial-markets-investment-strategy",
                  universitySlug: "yale",
                  description:
                    "Coursera course covering technical analysis and market indicators.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 35,
                  quality: {
                    score: 80,
                    reasons: [
                      "Practical techniques",
                      "Chart analysis",
                      "Trading applications",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "investment-advanced",
          name: "Advanced Investments",
          description:
            "Specialized topics in investment management and quantitative methods.",
          skills: [
            {
              slug: "behavioral-finance",
              name: "Behavioral Finance",
              description:
                "Understand how psychological biases affect financial decisions.",
              difficulty: 3,
              resources: [
                {
                  slug: "yale-behavioral",
                  title: "Financial Markets (ECON 252)",
                  type: "VIDEO",
                  url: "https://oyc.yale.edu/economics/econ-252",
                  universitySlug: "yale",
                  instructor: "Robert Shiller",
                  description:
                    "Yale course sections on behavioral finance and market anomalies.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 36,
                  year: 2008,
                  quality: {
                    score: 95,
                    reasons: [
                      "Nobel laureate insight",
                      "Groundbreaking research",
                      "Empirical evidence",
                    ],
                  },
                },
                {
                  slug: "coursera-behavioral",
                  title: "Behavioral Finance",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/behavioral-finance",
                  universitySlug: "duke",
                  description:
                    "Coursera course on behavioral finance theories and applications.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 30,
                  quality: {
                    score: 83,
                    reasons: [
                      "Structured curriculum",
                      "Real-world examples",
                      "Accessible format",
                    ],
                  },
                },
              ],
            },
            {
              slug: "alternative-investments",
              name: "Alternative Investments",
              description:
                "Study hedge funds, private equity, real estate, and commodities.",
              difficulty: 4,
              resources: [
                {
                  slug: "cfainstitute-alternatives",
                  title: "Alternative Investments",
                  type: "DOCUMENTATION",
                  url: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/alternative-investments",
                  universitySlug: "harvard",
                  description:
                    "CFA Institute reading on alternative investment analysis and portfolio allocation.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 20,
                  quality: {
                    score: 86,
                    reasons: [
                      "Professional standard",
                      "Comprehensive coverage",
                      "Industry practice",
                    ],
                  },
                },
                {
                  slug: "harvard-alternatives",
                  title: "Alternative Investments",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on hedge funds, private equity, and real assets.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 40,
                  quality: {
                    score: 84,
                    reasons: [
                      "Expert instruction",
                      "Industry connections",
                      "Case studies",
                    ],
                  },
                },
              ],
            },
            {
              slug: "quantitative-finance",
              name: "Quantitative Finance",
              description:
                "Apply mathematical and computational methods to financial problems.",
              difficulty: 5,
              resources: [
                {
                  slug: "mit-quant",
                  title: "Analytics of Finance",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/15-450-analytics-of-finance-fall-2010/",
                  universitySlug: "mit",
                  description:
                    "MIT course on quantitative methods for financial analysis.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 55,
                  year: 2010,
                  quality: {
                    score: 90,
                    reasons: [
                      "Mathematical rigor",
                      "Computational methods",
                      "Practical applications",
                    ],
                  },
                },
                {
                  slug: "coursera-quant",
                  title: "Machine Learning for Trading",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/algorithmic-trading-ml",
                  universitySlug: "columbia",
                  description:
                    "Coursera course on quantitative trading strategies and machine learning.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 40,
                  quality: {
                    score: 85,
                    reasons: [
                      "Modern techniques",
                      "Programming focus",
                      "Practical strategies",
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
      slug: "data-skills-finance",
      name: "Data Skills for Finance",
      description:
        "Programming and data analysis skills essential for modern finance.",
      topics: [
        {
          slug: "programming",
          name: "Programming for Finance",
          description:
            "Languages and tools for financial data analysis.",
          skills: [
            {
              slug: "python-basics",
              name: "Python Basics",
              description:
                "Learn Python programming fundamentals for data analysis.",
              difficulty: 1,
              resources: [
                {
                  slug: "coursera-python",
                  title: "Python for Everybody",
                  type: "COURSE",
                  url: "https://www.coursera.org/specializations/python",
                  universitySlug: "michigan",
                  description:
                    "Coursera specialization on Python programming for beginners.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 60,
                  quality: {
                    score: 88,
                    reasons: [
                      "Beginner-friendly",
                      "Comprehensive curriculum",
                      "Hands-on projects",
                    ],
                  },
                },
                {
                  slug: "khan-python",
                  title: "Intro to JS: Drawing & Animation",
                  type: "VIDEO",
                  url: "https://www.khanacademy.org/computing/computer-programming",
                  universitySlug: "mit",
                  description:
                    "Khan Academy introduction to programming concepts.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 30,
                  quality: {
                    score: 80,
                    reasons: [
                      "Visual approach",
                      "Interactive exercises",
                      "Beginner-friendly",
                    ],
                  },
                },
              ],
            },
            {
              slug: "r-basics",
              name: "R Basics",
              description:
                "Learn R programming for statistical analysis and visualization.",
              difficulty: 2,
              resources: [
                {
                  slug: "coursera-r",
                  title: "R Programming",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/r-programming",
                  universitySlug: "harvard",
                  description:
                    "Coursera course on R programming fundamentals for data analysis.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 40,
                  quality: {
                    score: 85,
                    reasons: [
                      "Structured curriculum",
                      "Hands-on exercises",
                      "Statistical focus",
                    ],
                  },
                },
                {
                  slug: "mit-r",
                  title: "Statistical Computing with R",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/",
                  universitySlug: "mit",
                  description:
                    "MIT course using R for statistical computing and data analysis.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 50,
                  year: 2016,
                  quality: {
                    score: 87,
                    reasons: [
                      "Academic rigor",
                      "Practical applications",
                      "Statistical methods",
                    ],
                  },
                },
              ],
            },
            {
              slug: "excel-advanced",
              name: "Advanced Excel",
              description:
                "Master advanced Excel functions, pivot tables, and financial modeling.",
              difficulty: 2,
              resources: [
                {
                  slug: "coursera-excel",
                  title: "Business and Financial Modeling",
                  type: "COURSE",
                  url: "https://www.coursera.org/specializations/business-financial-modeling",
                  universitySlug: "harvard",
                  description:
                    "Coursera specialization on Excel-based financial modeling.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 50,
                  quality: {
                    score: 83,
                    reasons: [
                      "Practical skills",
                      "Financial applications",
                      "Hands-on projects",
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          slug: "data-analysis",
          name: "Data Analysis",
          description:
            "Database and visualization skills for financial data.",
          skills: [
            {
              slug: "databases-sql",
              name: "Databases & SQL",
              description:
                "Query and manage financial databases using SQL.",
              difficulty: 2,
              resources: [
                {
                  slug: "coursera-sql",
                  title: "SQL for Data Science",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/sql-for-data-science",
                  universitySlug: "uc-davis",
                  description:
                    "Coursera course on SQL fundamentals for data analysis.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 30,
                  quality: {
                    score: 82,
                    reasons: [
                      "Practical focus",
                      "Real databases",
                      "Beginner-friendly",
                    ],
                  },
                },
              ],
            },
            {
              slug: "financial-modeling",
              name: "Financial Modeling",
              description:
                "Build financial models for valuation and forecasting.",
              difficulty: 3,
              resources: [
                {
                  slug: "harvard-financial-modeling",
                  title: "Financial Modeling for Valuation",
                  type: "COURSE",
                  url: "https://www.extension.harvard.edu/",
                  universitySlug: "harvard",
                  description:
                    "Harvard course on building financial models for corporate valuation.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  quality: {
                    score: 86,
                    reasons: [
                      "Industry standard methods",
                      "Excel-based",
                      "Practical exercises",
                    ],
                  },
                },
                {
                  slug: "cfainstitute-modeling",
                  title: "Financial Modeling",
                  type: "DOCUMENTATION",
                  url: "https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/financial-reporting-analysis",
                  universitySlug: "harvard",
                  description:
                    "CFA Institute reading on financial modeling and analysis techniques.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 20,
                  quality: {
                    score: 84,
                    reasons: [
                      "Professional standard",
                      "Comprehensive framework",
                      "Valuation methods",
                    ],
                  },
                },
              ],
            },
            {
              slug: "data-visualization",
              name: "Data Visualization",
              description:
                "Create effective visualizations for financial data presentation.",
              difficulty: 2,
              resources: [
                {
                  slug: "coursera-dataviz",
                  title: "Data Visualization with Excel",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/excel-data-visualization",
                  universitySlug: "pwc",
                  description:
                    "Coursera course on creating financial dashboards and visualizations.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 25,
                  quality: {
                    score: 81,
                    reasons: [
                      "Practical skills",
                      "Tool-focused",
                      "Career-oriented",
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
  paths: [],
};
