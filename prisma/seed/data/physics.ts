import type { DomainSeed } from "../types.js";

export const physics: DomainSeed = {
  slug: "physics",
  name: "Physics",
  description: "Understand the fundamental laws governing matter, energy, and the universe.",
  subjects: [
    {
      slug: "classical-mechanics",
      name: "Classical Mechanics",
      description: "Study of motion, forces, and energy in macroscopic systems.",
      topics: [
        {
          slug: "newtonian-mechanics",
          name: "Newtonian Mechanics",
          description: "Laws of motion and universal gravitation.",
          skills: [
            {
              slug: "newtonian-mechanics",
              name: "Newtonian Mechanics",
              description: "Newton's laws of motion and gravitational force.",
              difficulty: 2,
              prerequisites: ["kinematics", "dynamics"],
              resources: [
                {
                  slug: "mit-8-01sc",
                  title: "Classical Mechanics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "MIT OpenCourseWare classical mechanics with problem sets and exams.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 60,
                  year: 2016,
                  certificate: false,
                  quality: { score: 95, reasons: ["Comprehensive MIT course", "Excellent problem sets", "Video lectures included"] }
                },
                {
                  slug: "feynman-mechanics",
                  title: "The Feynman Lectures on Physics, Vol. I: Mechanics",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/I_toc.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Legendary physics lectures covering fundamental mechanics concepts.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 40,
                  quality: { score: 98, reasons: ["Iconic physics text", "Deep conceptual insights", "Free online access"] }
                }
              ]
            }
          ]
        },
        {
          slug: "kinematics",
          name: "Kinematics",
          description: "Description of motion without reference to forces.",
          skills: [
            {
              slug: "kinematics",
              name: "Kinematics",
              description: "Position, velocity, acceleration, and motion graphs.",
              difficulty: 1,
              resources: [
                {
                  slug: "mit-8-01-kinematics",
                  title: "Classical Mechanics: Kinematics",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/kinematics/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "Kinematics unit from MIT's classical mechanics course.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 15,
                  year: 2016,
                  quality: { score: 90, reasons: ["MIT quality content", "Well-structured lessons", "Includes practice problems"] }
                },
                {
                  slug: "openstax-physics-kinematics",
                  title: "OpenStax University Physics Vol. 1: Mechanics",
                  type: "BOOK",
                  url: "https://openstax.org/details/books/university-physics-volume-1",
                  universitySlug: "mit",
                  description: "Free textbook covering kinematics and introductory mechanics.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 30,
                  quality: { score: 85, reasons: ["Free and open", "Peer-reviewed content", "Comprehensive coverage"] }
                }
              ]
            }
          ]
        },
        {
          slug: "dynamics",
          name: "Dynamics",
          description: "Study of forces and their effects on motion.",
          skills: [
            {
              slug: "dynamics",
              name: "Dynamics",
              description: "Forces, Newton's laws, and applications to real systems.",
              difficulty: 2,
              prerequisites: ["kinematics", "newtonian-mechanics"],
              resources: [
                {
                  slug: "mit-8-01-dynamics",
                  title: "Classical Mechanics: Dynamics",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/dynamics/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "Dynamics unit covering forces, friction, and circular motion.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 20,
                  year: 2016,
                  quality: { score: 92, reasons: ["MIT quality", "Clear explanations", "Practical examples"] }
                },
                {
                  slug: "feynman-dynamics",
                  title: "The Feynman Lectures on Physics, Vol. I: Dynamics",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/I_09.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's treatment of dynamics and Newtonian mechanics.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 15,
                  quality: { score: 95, reasons: ["Deep conceptual approach", "Iconic lecturer", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "lagrangian-mechanics",
          name: "Lagrangian Mechanics",
          description: "Analytical mechanics using generalized coordinates and the principle of least action.",
          skills: [
            {
              slug: "lagrangian-mechanics",
              name: "Lagrangian Mechanics",
              description: "Euler-Lagrange equations, generalized coordinates, and variational principles.",
              difficulty: 4,
              prerequisites: ["newtonian-mechanics", "calculus-2"],
              resources: [
                {
                  slug: "mit-8-01-lagrangian",
                  title: "Classical Mechanics: Lagrangian Methods",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/lagrangian-mechanics/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "Lagrangian mechanics unit from MIT's classical mechanics course.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 20,
                  year: 2016,
                  quality: { score: 90, reasons: ["Rigorous MIT treatment", "Builds on Newtonian foundation", "Problem sets included"] }
                },
                {
                  slug: "feynman-lagrangian",
                  title: "The Feynman Lectures on Physics, Vol. II: Least Action",
                  type: "LECTURE",
                  url: "https://www.feynmanlectures.caltech.edu/II_19.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's exposition of the principle of least action.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 10,
                  quality: { score: 96, reasons: ["Unique perspective", "Deep understanding", "Free access"] }
                }
              ]
            }
          ]
        },
        {
          slug: "hamiltonian-mechanics",
          name: "Hamiltonian Mechanics",
          description: "Phase space formulation of classical mechanics.",
          skills: [
            {
              slug: "hamiltonian-mechanics",
              name: "Hamiltonian Mechanics",
              description: "Hamilton's equations, canonical transformations, and phase space.",
              difficulty: 5,
              prerequisites: ["lagrangian-mechanics"],
              resources: [
                {
                  slug: "mit-8-01-hamiltonian",
                  title: "Classical Mechanics: Hamiltonian Methods",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/hamiltonian-mechanics/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "Advanced Hamiltonian mechanics from MIT.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  year: 2016,
                  quality: { score: 88, reasons: ["Advanced MIT content", "Connects to quantum mechanics", "Rigorous treatment"] }
                }
              ]
            }
          ]
        },
        {
          slug: "orbital-mechanics",
          name: "Orbital Mechanics",
          description: "Motion of bodies under gravitational influence.",
          skills: [
            {
              slug: "orbital-mechanics",
              name: "Orbital Mechanics",
              description: "Kepler's laws, orbits, and spacecraft trajectories.",
              difficulty: 4,
              prerequisites: ["newtonian-mechanics", "calculus-2"],
              resources: [
                {
                  slug: "mit-8-01-orbital",
                  title: "Classical Mechanics: Central Forces and Orbits",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/orbital-mechanics/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "Orbital mechanics unit covering Kepler's problem and orbital dynamics.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  year: 2016,
                  quality: { score: 90, reasons: ["Practical applications", "Clear mathematical treatment", "MIT quality"] }
                }
              ]
            }
          ]
        },
        {
          slug: "wave-mechanics",
          name: "Wave Mechanics",
          description: "Physics of mechanical and matter waves.",
          skills: [
            {
              slug: "wave-mechanics",
              name: "Wave Mechanics",
              description: "Wave equation, superposition, standing waves, and interference.",
              difficulty: 3,
              prerequisites: ["dynamics"],
              resources: [
                {
                  slug: "mit-8-01-waves",
                  title: "Classical Mechanics: Waves",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/waves/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "Waves and oscillations from MIT's classical mechanics.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2016,
                  quality: { score: 90, reasons: ["Comprehensive coverage", "Foundation for quantum", "Includes animations"] }
                },
                {
                  slug: "feynman-waves",
                  title: "The Feynman Lectures on Physics, Vol. I: Waves",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/I_47.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's treatment of wave phenomena.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  quality: { score: 95, reasons: ["Deep physical intuition", "Classic text", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "acoustics",
          name: "Acoustics",
          description: "Physics of sound waves and their applications.",
          skills: [
            {
              slug: "acoustics",
              name: "Acoustics",
              description: "Sound propagation, resonance, and acoustic phenomena.",
              difficulty: 3,
              prerequisites: ["wave-mechanics"],
              resources: [
                {
                  slug: "stanford-acoustics",
                  title: "Introduction to Acoustics",
                  type: "COURSE",
                  url: "https://online.stanford.edu/courses",
                  universitySlug: "stanford",
                  description: "Stanford course on the physics of sound.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 20,
                  quality: { score: 85, reasons: ["Stanford quality", "Practical applications", "Engineering focus"] }
                },
                {
                  slug: "feynman-acoustics",
                  title: "The Feynman Lectures on Physics: Sound",
                  type: "LECTURE",
                  url: "https://www.feynmanlectures.caltech.edu/I_46.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's discussion of sound and acoustics.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 8,
                  quality: { score: 92, reasons: ["Intuitive explanations", "Free access", "Classic treatment"] }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      slug: "electromagnetism",
      name: "Electromagnetism",
      description: "Study of electric and magnetic fields and their interactions.",
      topics: [
        {
          slug: "electrostatics",
          name: "Electrostatics",
          description: "Electric charges at rest and the fields they produce.",
          skills: [
            {
              slug: "electrostatics",
              name: "Electrostatics",
              description: "Electric fields, potential, Gauss's law, and conductors.",
              difficulty: 2,
              prerequisites: ["calculus-1"],
              resources: [
                {
                  slug: "mit-8-02-electrostatics",
                  title: "Physics II: Electricity and Magnetism",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Dr. Darryl Seligman",
                  description: "MIT's complete E&M course covering electrostatics through Maxwell's equations.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 60,
                  year: 2019,
                  quality: { score: 94, reasons: ["Comprehensive MIT course", "Excellent problem sets", "Modern pedagogy"] }
                },
                {
                  slug: "feynman-electrostatics",
                  title: "The Feynman Lectures on Physics, Vol. II: Electrostatics",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/II_01.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's treatment of electrostatic phenomena.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 20,
                  quality: { score: 96, reasons: ["Deep conceptual insight", "Iconic text", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "coulombs-law",
          name: "Coulomb's Law",
          description: "Force between electric charges.",
          skills: [
            {
              slug: "coulombs-law",
              name: "Coulomb's Law",
              description: "Mathematical formulation of electrostatic force.",
              difficulty: 2,
              prerequisites: ["calculus-1"],
              resources: [
                {
                  slug: "mit-8-02-coulomb",
                  title: "Physics II: Coulomb's Law",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Dr. Darryl Seligman",
                  description: "Coulomb's law and electric field concepts.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 10,
                  year: 2019,
                  quality: { score: 90, reasons: ["MIT quality", "Clear derivations", "Problem sets"] }
                },
                {
                  slug: "openstax-coulomb",
                  title: "OpenStax University Physics Vol. 2: Electric Fields",
                  type: "BOOK",
                  url: "https://openstax.org/details/books/university-physics-volume-2",
                  universitySlug: "mit",
                  description: "Free textbook covering Coulomb's law and electrostatics.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 15,
                  quality: { score: 82, reasons: ["Free and open", "Comprehensive", "Good examples"] }
                }
              ]
            }
          ]
        },
        {
          slug: "magnetism",
          name: "Magnetism",
          description: "Magnetic fields and their sources.",
          skills: [
            {
              slug: "magnetism",
              name: "Magnetism",
              description: "Magnetic fields, forces on moving charges, and materials.",
              difficulty: 3,
              prerequisites: ["electrostatics"],
              resources: [
                {
                  slug: "mit-8-02-magnetism",
                  title: "Physics II: Magnetism",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Dr. Darryl Seligman",
                  description: "Magnetic fields, forces, and magnetic materials.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2019,
                  quality: { score: 92, reasons: ["Rigorous treatment", "Experimental demonstrations", "MIT quality"] }
                },
                {
                  slug: "feynman-magnetism",
                  title: "The Feynman Lectures on Physics, Vol. II: Magnetism",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/II_13.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's exposition on magnetism and magnetic materials.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 12,
                  quality: { score: 95, reasons: ["Physical insight", "Classic treatment", "Free access"] }
                }
              ]
            }
          ]
        },
        {
          slug: "electromagnetic-induction",
          name: "Electromagnetic Induction",
          description: "Generation of electric fields from changing magnetic fields.",
          skills: [
            {
              slug: "electromagnetic-induction",
              name: "Electromagnetic Induction",
              description: "Faraday's law, Lenz's law, and induced EMF.",
              difficulty: 3,
              prerequisites: ["electrostatics", "magnetism"],
              resources: [
                {
                  slug: "mit-8-02-induction",
                  title: "Physics II: Electromagnetic Induction",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Dr. Darryl Seligman",
                  description: "Faraday's law and electromagnetic induction.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2019,
                  quality: { score: 91, reasons: ["Clear explanations", "Practical applications", "MIT quality"] }
                }
              ]
            }
          ]
        },
        {
          slug: "maxwells-equations",
          name: "Maxwell's Equations",
          description: "Unification of electricity and magnetism.",
          skills: [
            {
              slug: "maxwells-equations",
              name: "Maxwell's Equations",
              description: "Gauss's laws, Faraday's law, and Ampère-Maxwell law.",
              difficulty: 4,
              prerequisites: ["electrostatics", "magnetism"],
              resources: [
                {
                  slug: "mit-8-02-maxwell",
                  title: "Physics II: Maxwell's Equations",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Dr. Darryl Seligman",
                  description: "Complete treatment of Maxwell's equations.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 20,
                  year: 2019,
                  quality: { score: 95, reasons: ["Rigorous and complete", "Historical context", "Foundational physics"] }
                },
                {
                  slug: "feynman-maxwell",
                  title: "The Feynman Lectures on Physics, Vol. II: Maxwell's Equations",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/II_18.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's unification of electromagnetism.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  quality: { score: 97, reasons: ["Legendary unification", "Deep insight", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "electromagnetic-waves",
          name: "Electromagnetic Waves",
          description: "Light as an electromagnetic wave.",
          skills: [
            {
              slug: "electromagnetic-waves",
              name: "Electromagnetic Waves",
              description: "Wave equation from Maxwell's equations, EM spectrum, and radiation.",
              difficulty: 4,
              prerequisites: ["maxwells-equations"],
              resources: [
                {
                  slug: "mit-8-02-em-waves",
                  title: "Physics II: Electromagnetic Waves",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Dr. Darryl Seligman",
                  description: "Electromagnetic waves and their properties.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  year: 2019,
                  quality: { score: 92, reasons: ["Foundational topic", "Clear derivations", "MIT quality"] }
                }
              ]
            }
          ]
        },
        {
          slug: "electric-circuits",
          name: "Electric Circuits",
          description: "Circuit elements and basic circuit theory.",
          skills: [
            {
              slug: "electric-circuits",
              name: "Electric Circuits",
              description: "Voltage, current, resistance, and Ohm's law.",
              difficulty: 2,
              prerequisites: ["electrostatics"],
              resources: [
                {
                  slug: "mit-8-01-circuits",
                  title: "Classical Mechanics: Electric Circuits",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/electric-circuits/",
                  universitySlug: "mit",
                  instructor: "Dr. Peter Dourmashkin",
                  description: "Introduction to electric circuits from MIT.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 10,
                  year: 2016,
                  quality: { score: 88, reasons: ["Practical introduction", "Clear explanations", "MIT quality"] }
                },
                {
                  slug: "openstax-circuits",
                  title: "OpenStax University Physics Vol. 2: Circuits",
                  type: "BOOK",
                  url: "https://openstax.org/details/books/university-physics-volume-2",
                  universitySlug: "mit",
                  description: "Free textbook covering DC and AC circuits.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 15,
                  quality: { score: 82, reasons: ["Free and open", "Comprehensive", "Good examples"] }
                }
              ]
            }
          ]
        },
        {
          slug: "circuit-analysis",
          name: "Circuit Analysis",
          description: "Advanced methods for analyzing complex circuits.",
          skills: [
            {
              slug: "circuit-analysis",
              name: "Circuit Analysis",
              description: "Kirchhoff's laws, mesh analysis, and transient circuits.",
              difficulty: 3,
              prerequisites: ["electric-circuits"],
              resources: [
                {
                  slug: "mit-8-02-circuit-analysis",
                  title: "Physics II: Circuit Analysis",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Dr. Darryl Seligman",
                  description: "Advanced circuit analysis techniques.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2019,
                  quality: { score: 89, reasons: ["Rigorous methods", "Practical applications", "MIT quality"] }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      slug: "thermo-stat-mech",
      name: "Thermodynamics & Statistical Mechanics",
      description: "Heat, energy, entropy, and the statistical behavior of many-body systems.",
      topics: [
        {
          slug: "thermodynamics",
          name: "Thermodynamics",
          description: "Laws of thermodynamics and their applications.",
          skills: [
            {
              slug: "thermodynamics",
              name: "Thermodynamics",
              description: "Zeroth, first, second, and third laws of thermodynamics.",
              difficulty: 3,
              prerequisites: ["calculus-2"],
              resources: [
                {
                  slug: "mit-8-044-thermo",
                  title: "Thermodynamics & Kinetic Theory",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-044-statistical-physics-ii-spring-2015/",
                  universitySlug: "mit",
                  instructor: "Prof. Mehran Kardar",
                  description: "MIT's statistical physics course covering thermodynamics foundations.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 45,
                  year: 2015,
                  quality: { score: 94, reasons: ["Excellent MIT course", "Rigorous approach", "Kardar's expertise"] }
                },
                {
                  slug: "feynman-thermo",
                  title: "The Feynman Lectures on Physics, Vol. I: Thermodynamics",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/I_44.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's treatment of thermodynamics.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  quality: { score: 95, reasons: ["Physical insight", "Classic text", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "heat-transfer",
          name: "Heat Transfer",
          description: "Mechanisms of thermal energy transfer.",
          skills: [
            {
              slug: "heat-transfer",
              name: "Heat Transfer",
              description: "Conduction, convection, and radiation.",
              difficulty: 3,
              prerequisites: ["thermodynamics"],
              resources: [
                {
                  slug: "feynman-heat",
                  title: "The Feynman Lectures on Physics: Heat Transfer",
                  type: "LECTURE",
                  url: "https://www.feynmanlectures.caltech.edu/I_43.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's discussion of heat and thermal processes.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  quality: { score: 92, reasons: ["Clear explanations", "Free access", "Foundational concepts"] }
                },
                {
                  slug: "mit-8-044-heat",
                  title: "Thermodynamics: Heat Transfer",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-044-statistical-physics-ii-spring-2015/",
                  universitySlug: "mit",
                  instructor: "Prof. Mehran Kardar",
                  description: "Heat transfer from MIT's thermodynamics course.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  year: 2015,
                  quality: { score: 88, reasons: ["MIT quality", "Rigorous treatment", "Practical applications"] }
                }
              ]
            }
          ]
        },
        {
          slug: "entropy",
          name: "Entropy",
          description: "Measure of disorder and irreversibility.",
          skills: [
            {
              slug: "entropy",
              name: "Entropy",
              description: "Statistical definition of entropy and the second law.",
              difficulty: 3,
              prerequisites: ["thermodynamics"],
              resources: [
                {
                  slug: "mit-8-044-entropy",
                  title: "Thermodynamics: Entropy",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-044-statistical-physics-ii-spring-2015/",
                  universitySlug: "mit",
                  instructor: "Prof. Mehran Kardar",
                  description: "Entropy and the second law from MIT.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2015,
                  quality: { score: 93, reasons: ["Deep treatment", "Statistical mechanics connection", "MIT quality"] }
                },
                {
                  slug: "feynman-entropy",
                  title: "The Feynman Lectures on Physics: Entropy",
                  type: "LECTURE",
                  url: "https://www.feynmanlectures.caltech.edu/I_46.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's intuitive approach to entropy.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  quality: { score: 96, reasons: ["Iconic explanation", "Physical intuition", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "statistical-mechanics",
          name: "Statistical Mechanics",
          description: "Microscopic foundations of thermodynamics.",
          skills: [
            {
              slug: "statistical-mechanics",
              name: "Statistical Mechanics",
              description: "Ensembles, partition functions, and phase transitions.",
              difficulty: 4,
              prerequisites: ["thermodynamics", "probability"],
              resources: [
                {
                  slug: "mit-8-044-stat-mech",
                  title: "Statistical Physics II",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-044-statistical-physics-ii-spring-2015/",
                  universitySlug: "mit",
                  instructor: "Prof. Mehran Kardar",
                  description: "MIT's graduate statistical mechanics course.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 60,
                  year: 2015,
                  quality: { score: 96, reasons: ["World-class course", "Kardar's expertise", "Rigorous and complete"] }
                },
                {
                  slug: "feynman-stat-mech",
                  title: "The Feynman Lectures on Physics: Kinetics",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/I_46.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's statistical mechanics foundations.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 20,
                  quality: { score: 95, reasons: ["Deep understanding", "Classic treatment", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "boltzmann-distribution",
          name: "Boltzmann Distribution",
          description: "Statistical distribution of particles in thermal equilibrium.",
          skills: [
            {
              slug: "boltzmann-distribution",
              name: "Boltzmann Distribution",
              description: "Maxwell-Boltzmann statistics and applications.",
              difficulty: 4,
              prerequisites: ["statistical-mechanics"],
              resources: [
                {
                  slug: "mit-8-044-boltzmann",
                  title: "Statistical Physics: Boltzmann Distribution",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-044-statistical-physics-ii-spring-2015/",
                  universitySlug: "mit",
                  instructor: "Prof. Mehran Kardar",
                  description: "Boltzmann distribution and statistical physics.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 10,
                  year: 2015,
                  quality: { score: 92, reasons: ["Rigorous derivation", "Applications to gases", "MIT quality"] }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      slug: "quantum-mechanics",
      name: "Quantum Mechanics",
      description: "Physics of the microscopic world at atomic and subatomic scales.",
      topics: [
        {
          slug: "foundations",
          name: "Foundations",
          description: "Core principles of quantum mechanics.",
          skills: [
            {
              slug: "quantum-mechanics",
              name: "Quantum Mechanics",
              description: "Postulates, Hilbert space, and measurement theory.",
              difficulty: 4,
              prerequisites: ["linear-algebra", "wave-mechanics"],
              resources: [
                {
                  slug: "mit-8-04-qm",
                  title: "Quantum Physics I",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Allan Adams",
                  description: "MIT's foundational quantum mechanics course.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 60,
                  year: 2016,
                  quality: { score: 97, reasons: ["Legendary course", "Allan Adams' teaching", "Comprehensive problem sets"] }
                },
                {
                  slug: "feynman-qm",
                  title: "The Feynman Lectures on Physics, Vol. III: Quantum Mechanics",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/III_toc.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "The definitive introduction to quantum mechanics.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 40,
                  quality: { score: 99, reasons: ["Iconic quantum text", "Unique perspective", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "wave-functions",
          name: "Wave Functions",
          description: "Mathematical description of quantum states.",
          skills: [
            {
              slug: "wave-functions",
              name: "Wave Functions",
              description: "Probability amplitudes, normalization, and wave packets.",
              difficulty: 4,
              prerequisites: ["calculus-2", "linear-algebra"],
              resources: [
                {
                  slug: "mit-8-04-wave-functions",
                  title: "Quantum Physics I: Wave Functions",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Allan Adams",
                  description: "Wave functions and probability in quantum mechanics.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  year: 2016,
                  quality: { score: 95, reasons: ["Clear exposition", "MIT quality", "Problem sets included"] }
                }
              ]
            }
          ]
        },
        {
          slug: "schrodinger-equation",
          name: "Schrödinger Equation",
          description: "Time-dependent and time-independent forms.",
          skills: [
            {
              slug: "schrodinger-equation",
              name: "Schrödinger Equation",
              description: "Solving the Schrödinger equation for various potentials.",
              difficulty: 4,
              prerequisites: ["calculus-2", "linear-algebra", "wave-mechanics"],
              resources: [
                {
                  slug: "mit-8-04-schrodinger",
                  title: "Quantum Physics I: Schrödinger Equation",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Allan Adams",
                  description: "Complete treatment of the Schrödinger equation.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 20,
                  year: 2016,
                  quality: { score: 96, reasons: ["Rigorous and clear", "Excellent examples", "Foundational course"] }
                },
                {
                  slug: "feynman-schrodinger",
                  title: "The Feynman Lectures on Physics, Vol. III: The Schrödinger Equation",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/III_16.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's treatment of the Schrödinger equation.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  quality: { score: 97, reasons: ["Unique insight", "Deep understanding", "Free online"] }
                }
              ]
            }
          ]
        },
        {
          slug: "advanced",
          name: "Advanced Quantum Mechanics",
          description: "Formal and advanced topics in quantum theory.",
          skills: [
            {
              slug: "quantum-states",
              name: "Quantum States",
              description: "State vectors, density matrices, and quantum ensembles.",
              difficulty: 4,
              prerequisites: ["quantum-mechanics", "linear-algebra"],
              resources: [
                {
                  slug: "mit-8-04-states",
                  title: "Quantum Physics I: Quantum States",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Allan Adams",
                  description: "Quantum states and their representations.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  year: 2016,
                  quality: { score: 94, reasons: ["Formal treatment", "MIT quality", "Essential foundations"] }
                }
              ]
            },
            {
              slug: "quantum-operators",
              name: "Quantum Operators",
              description: "Observables, commutators, and operator algebra.",
              difficulty: 5,
              prerequisites: ["quantum-mechanics", "quantum-states", "linear-algebra"],
              resources: [
                {
                  slug: "mit-8-04-operators",
                  title: "Quantum Physics I: Operators",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Allan Adams",
                  description: "Operator formalism in quantum mechanics.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 15,
                  year: 2016,
                  quality: { score: 93, reasons: ["Rigorous treatment", "Mathematical foundations", "MIT quality"] }
                }
              ]
            },
            {
              slug: "quantum-entanglement",
              name: "Quantum Entanglement",
              description: "Non-local correlations and Bell's theorem.",
              difficulty: 5,
              prerequisites: ["quantum-states", "quantum-mechanics"],
              resources: [
                {
                  slug: "mit-8-04-entanglement",
                  title: "Quantum Physics I: Entanglement",
                  type: "LECTURE",
                  url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Allan Adams",
                  description: "Quantum entanglement and non-locality.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 10,
                  year: 2016,
                  quality: { score: 95, reasons: ["Cutting-edge topic", "Clear exposition", "MIT quality"] }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      slug: "modern-physics",
      name: "Modern Physics",
      description: "Relativity, particle physics, and cosmology.",
      topics: [
        {
          slug: "relativity",
          name: "Relativity",
          description: "Einstein's theories of special and general relativity.",
          skills: [
            {
              slug: "special-relativity",
              name: "Special Relativity",
              description: "Spacetime, Lorentz transformations, and time dilation.",
              difficulty: 3,
              prerequisites: ["calculus-2"],
              resources: [
                {
                  slug: "mit-8-03-special-rel",
                  title: "Physics III: Special Relativity",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-03-physics-iii-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Scott Hughes",
                  description: "MIT's special relativity and modern physics course.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  year: 2016,
                  quality: { score: 94, reasons: ["Excellent MIT course", "Historical development", "Rigorous approach"] }
                },
                {
                  slug: "feynman-special-rel",
                  title: "The Feynman Lectures on Physics, Vol. I: Special Relativity",
                  type: "BOOK",
                  url: "https://www.feynmanlectures.caltech.edu/I_15.html",
                  universitySlug: "caltech",
                  instructor: "Richard Feynman",
                  description: "Feynman's treatment of special relativity.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  quality: { score: 95, reasons: ["Physical insight", "Classic treatment", "Free online"] }
                }
              ]
            },
            {
              slug: "general-relativity",
              name: "General Relativity",
              description: "Gravity as spacetime curvature.",
              difficulty: 5,
              prerequisites: ["special-relativity"],
              resources: [
                {
                  slug: "mit-8-03-general-rel",
                  title: "Physics III: General Relativity",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-03-physics-iii-spring-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Scott Hughes",
                  description: "Introduction to general relativity.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 30,
                  year: 2016,
                  quality: { score: 93, reasons: ["Rigorous introduction", "MIT quality", "Modern applications"] }
                }
              ]
            }
          ]
        },
        {
          slug: "particle",
          name: "Particle Physics",
          description: "The fundamental constituents of matter.",
          skills: [
            {
              slug: "particle-physics",
              name: "Particle Physics",
              description: "Quarks, leptons, and fundamental interactions.",
              difficulty: 4,
              prerequisites: ["quantum-mechanics", "special-relativity"],
              resources: [
                {
                  slug: "mit-particle-physics",
                  title: "Introduction to Particle Physics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-701-introduction-to-nuclear-and-particle-physics-fall-2015/",
                  universitySlug: "mit",
                  instructor: "Prof. Markus Klute",
                  description: "MIT's particle physics course.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 45,
                  year: 2015,
                  quality: { score: 92, reasons: ["Comprehensive coverage", "Modern treatment", "MIT quality"] }
                }
              ]
            },
            {
              slug: "standard-model",
              name: "Standard Model",
              description: "The quantum field theory of fundamental particles.",
              difficulty: 5,
              prerequisites: ["particle-physics", "quantum-mechanics"],
              resources: [
                {
                  slug: "stanford-standard-model",
                  title: "The Standard Model",
                  type: "COURSE",
                  url: "https://online.stanford.edu/courses",
                  universitySlug: "stanford",
                  description: "Stanford course on the Standard Model of particle physics.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 40,
                  quality: { score: 91, reasons: ["Stanford quality", "Complete treatment", "Modern perspective"] }
                }
              ]
            }
          ]
        },
        {
          slug: "cosmology",
          name: "Cosmology",
          description: "Physics of the universe as a whole.",
          skills: [
            {
              slug: "cosmology",
              name: "Cosmology",
              description: "Big bang, cosmic expansion, and dark energy.",
              difficulty: 4,
              prerequisites: ["general-relativity", "statistical-mechanics"],
              resources: [
                {
                  slug: "mit-cosmology",
                  title: "Introduction to Cosmology",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-282j-introduction-to-astronomy-fall-2006/",
                  universitySlug: "mit",
                  instructor: "Prof. Scott Hughes",
                  description: "MIT cosmology and astrophysics course.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 35,
                  year: 2006,
                  quality: { score: 90, reasons: ["Comprehensive coverage", "Observational focus", "MIT quality"] }
                }
              ]
            },
            {
              slug: "astrophysics",
              name: "Astrophysics",
              description: "Physics of stars, galaxies, and cosmic phenomena.",
              difficulty: 4,
              prerequisites: ["quantum-mechanics", "thermodynamics", "special-relativity"],
              resources: [
                {
                  slug: "mit-astrophysics",
                  title: "Introduction to Astrophysics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/8-282j-introduction-to-astronomy-fall-2006/",
                  universitySlug: "mit",
                  instructor: "Prof. Scott Hughes",
                  description: "MIT astrophysics fundamentals.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 40,
                  year: 2006,
                  quality: { score: 91, reasons: ["Strong physical foundations", "Observational applications", "MIT quality"] }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      slug: "computational-physics",
      name: "Computational Physics",
      description: "Numerical methods and programming for physics simulations.",
      topics: [
        {
          slug: "numerical",
          name: "Numerical Methods",
          description: "Algorithms for solving physics problems computationally.",
          skills: [
            {
              slug: "numerical-methods",
              name: "Numerical Methods",
              description: "Integration, differentiation, ODE solving, and error analysis.",
              difficulty: 3,
              prerequisites: ["python-basics", "calculus-2"],
              resources: [
                {
                  slug: "mit-numerical-methods",
                  title: "Numerical Methods for Physics",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/18-336-numerical-methods-for-partial-differential-equations-spring-2019/",
                  universitySlug: "mit",
                  instructor: "Prof. Laurent Demanet",
                  description: "MIT's numerical methods course for physics.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  year: 2019,
                  quality: { score: 92, reasons: ["Practical algorithms", "MATLAB/Python examples", "MIT quality"] }
                }
              ]
            },
            {
              slug: "monte-carlo",
              name: "Monte Carlo Methods",
              description: "Statistical simulation techniques.",
              difficulty: 4,
              prerequisites: ["numerical-methods", "probability"],
              resources: [
                {
                  slug: "stanford-monte-carlo",
                  title: "Monte Carlo Methods in Physics",
                  type: "COURSE",
                  url: "https://online.stanford.edu/courses",
                  universitySlug: "stanford",
                  description: "Monte Carlo simulation techniques for physics.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 30,
                  quality: { score: 88, reasons: ["Practical applications", "Stanford quality", "Statistical foundations"] }
                }
              ]
            }
          ]
        },
        {
          slug: "programming",
          name: "Programming",
          description: "Computational tools for physics research.",
          skills: [
            {
              slug: "python-basics",
              name: "Python Basics",
              description: "Fundamental Python programming for scientists.",
              difficulty: 1,
              resources: [
                {
                  slug: "mit-python-basics",
                  title: "Introduction to Computer Science and Programming Using Python",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
                  universitySlug: "mit",
                  instructor: "Prof. Eric Grimson",
                  description: "MIT's introductory Python course for scientists.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 50,
                  year: 2016,
                  quality: { score: 94, reasons: ["Excellent for beginners", "MIT quality", "Practical focus"] }
                }
              ]
            },
            {
              slug: "scientific-computing",
              name: "Scientific Computing",
              description: "NumPy, SciPy, and scientific Python ecosystem.",
              difficulty: 3,
              prerequisites: ["python-basics", "linear-algebra"],
              resources: [
                {
                  slug: "mit-scientific-computing",
                  title: "Computational Science and Engineering",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/",
                  universitySlug: "mit",
                  instructor: "Prof. Gilbert Strang",
                  description: "Computational methods for science and engineering.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 45,
                  year: 2018,
                  quality: { score: 93, reasons: ["Comprehensive coverage", "Practical applications", "Strang's teaching"] }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  paths: [
    {
      slug: "classical-physics",
      name: "Classical Physics",
      tagline: "Newton to Maxwell: the foundations",
      description: "Master classical mechanics, thermodynamics, and electromagnetism.",
      level: "BEGINNER",
      estimatedMonths: 14,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: ["python-basics", "kinematics", "dynamics", "newtonian-mechanics", "calculus-1"]
        },
        {
          name: "CORE",
          skillSlugs: ["wave-mechanics", "electrostatics", "magnetism", "electric-circuits", "thermodynamics", "heat-transfer", "entropy"]
        },
        {
          name: "ADVANCED",
          skillSlugs: ["lagrangian-mechanics", "electromagnetic-induction", "maxwells-equations", "electromagnetic-waves", "circuit-analysis"]
        },
        {
          name: "MASTERY",
          skillSlugs: ["hamiltonian-mechanics", "orbital-mechanics", "statistical-mechanics"]
        }
      ]
    },
    {
      slug: "modern-physics",
      name: "Modern Physics",
      tagline: "From quarks to the cosmos",
      description: "Explore quantum mechanics, relativity, and the frontiers of physics.",
      level: "INTERMEDIATE",
      estimatedMonths: 18,
      phases: [
        {
          name: "PRE-REQUISITES",
          skillSlugs: ["newtonian-mechanics", "calculus-1", "calculus-2", "linear-algebra"]
        },
        {
          name: "QUANTUM",
          skillSlugs: ["wave-functions", "schrodinger-equation", "quantum-mechanics", "quantum-states", "quantum-operators"]
        },
        {
          name: "RELATIVITY",
          skillSlugs: ["special-relativity", "general-relativity"]
        },
        {
          name: "ADVANCED",
          skillSlugs: ["particle-physics", "standard-model", "cosmology", "astrophysics"]
        },
        {
          name: "COMPUTATIONAL",
          skillSlugs: ["numerical-methods", "monte-carlo", "scientific-computing"]
        }
      ]
    },
    {
      slug: "astrophysics",
      name: "Astrophysics",
      tagline: "Physics of the universe",
      description: "Apply physics to understand stars, galaxies, and cosmic phenomena.",
      level: "INTERMEDIATE",
      estimatedMonths: 16,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: ["newtonian-mechanics", "calculus-1", "calculus-2", "linear-algebra"]
        },
        {
          name: "CORE",
          skillSlugs: ["orbital-mechanics", "wave-mechanics", "thermodynamics", "statistical-mechanics"]
        },
        {
          name: "ASTRO",
          skillSlugs: ["astrophysics", "cosmology", "special-relativity"]
        },
        {
          name: "ADVANCED",
          skillSlugs: ["general-relativity", "particle-physics", "standard-model"]
        },
        {
          name: "COMPUTATIONAL",
          skillSlugs: ["numerical-methods", "monte-carlo", "scientific-computing"]
        }
      ]
    }
  ],
  courses: [
    {
      code: "8.01",
      slug: "mit-8-01-classical-mechanics",
      title: "Classical Mechanics",
      universitySlug: "mit",
      subjectSlug: "classical-mechanics",
      level: "BEGINNER",
      description: "Introduction to Newtonian mechanics, conservation laws, and oscillations.",
      url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
      skillSlugs: ["kinematics", "dynamics", "newtonian-mechanics"]
    },
    {
      code: "8.02",
      slug: "mit-8-02-electricity-magnetism",
      title: "Physics II: Electricity and Magnetism",
      universitySlug: "mit",
      subjectSlug: "electromagnetism",
      level: "BEGINNER",
      description: "Electrostatics, magnetism, circuits, and Maxwell's equations.",
      url: "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
      skillSlugs: ["electrostatics", "coulombs-law", "magnetism", "electric-circuits"]
    },
    {
      code: "8.03",
      slug: "mit-8-03-physics-iii",
      title: "Physics III: Vibrations and Waves",
      universitySlug: "mit",
      subjectSlug: "classical-mechanics",
      level: "INTERMEDIATE",
      description: "Mechanical vibrations, waves, and introduction to special relativity.",
      url: "https://ocw.mit.edu/courses/8-03-physics-iii-spring-2016/",
      skillSlugs: ["wave-mechanics", "special-relativity"]
    },
    {
      code: "8.04",
      slug: "mit-8-04-quantum-physics-i",
      title: "Quantum Physics I",
      universitySlug: "mit",
      subjectSlug: "quantum-mechanics",
      level: "ADVANCED",
      description: "Foundations of quantum mechanics, Schrödinger equation, and quantum states.",
      url: "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
      skillSlugs: ["quantum-mechanics", "wave-functions", "schrodinger-equation", "quantum-states"]
    },
    {
      code: "8.05",
      slug: "mit-8-05-quantum-physics-ii",
      title: "Quantum Physics II",
      universitySlug: "mit",
      subjectSlug: "quantum-mechanics",
      level: "ADVANCED",
      description: "Quantum operators, angular momentum, and perturbation theory.",
      url: "https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/",
      skillSlugs: ["quantum-operators", "quantum-entanglement"]
    },
    {
      code: "8.333",
      slug: "mit-8-333-statistical-mechanics",
      title: "Statistical Mechanics",
      universitySlug: "mit",
      subjectSlug: "thermo-stat-mech",
      level: "ADVANCED",
      description: "Ensembles, phase transitions, and critical phenomena.",
      url: "https://ocw.mit.edu/courses/8-333-statistical-mechanics-i-statistical-mechanics-of-particles-fall-2013/",
      skillSlugs: ["statistical-mechanics", "boltzmann-distribution"]
    },
    {
      code: "8.044",
      slug: "mit-8-044-statistical-physics-ii",
      title: "Statistical Physics II",
      universitySlug: "mit",
      subjectSlug: "thermo-stat-mech",
      level: "INTERMEDIATE",
      description: "Thermodynamics, kinetic theory, and statistical mechanics.",
      url: "https://ocw.mit.edu/courses/8-044-statistical-physics-ii-spring-2015/",
      skillSlugs: ["thermodynamics", "entropy", "heat-transfer"]
    },
    {
      code: "8.282J",
      slug: "mit-8-282j-introduction-astronomy",
      title: "Introduction to Astronomy",
      universitySlug: "mit",
      subjectSlug: "modern-physics",
      level: "ADVANCED",
      description: "Astrophysics, cosmology, and observational astronomy.",
      url: "https://ocw.mit.edu/courses/8-282j-introduction-to-astronomy-fall-2006/",
      skillSlugs: ["astrophysics", "cosmology"]
    },
    {
      code: "8.701",
      slug: "mit-8-701-nuclear-particle-physics",
      title: "Introduction to Nuclear and Particle Physics",
      universitySlug: "mit",
      subjectSlug: "modern-physics",
      level: "ADVANCED",
      description: "Nuclear structure, particle interactions, and the Standard Model.",
      url: "https://ocw.mit.edu/courses/8-701-introduction-to-nuclear-and-particle-physics-fall-2015/",
      skillSlugs: ["particle-physics", "standard-model"]
    },
    {
      code: "6.0001",
      slug: "mit-6-0001-python",
      title: "Introduction to Computer Science and Programming Using Python",
      universitySlug: "mit",
      subjectSlug: "computational-physics",
      level: "BEGINNER",
      description: "Fundamentals of programming in Python for science and engineering.",
      url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
      skillSlugs: ["python-basics"]
    },
    {
      code: "18.065",
      slug: "mit-18-065-computational-science",
      title: "Computational Science and Engineering",
      universitySlug: "mit",
      subjectSlug: "computational-physics",
      level: "INTERMEDIATE",
      description: "Matrix methods and computational techniques for science and engineering.",
      url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/",
      skillSlugs: ["scientific-computing", "numerical-methods"]
    }
  ],
  curricula: [
    {
      degreeSlug: "mit-physics-sb",
      degreeName: "Bachelor of Science in Physics",
      degreeLevel: "BACHELOR",
      universitySlug: "mit",
      name: "MIT Physics SB (8-Phy)",
      sourceUrl: "https://physics.mit.edu/academic-programs/undergraduate-studies/degree-requirements/",
      courses: [
        {
          courseSlug: "mit-8-01-classical-mechanics",
          year: 1,
          semester: 1,
          order: 1
        },
        {
          courseSlug: "mit-8-02-electricity-magnetism",
          year: 1,
          semester: 2,
          order: 2
        },
        {
          courseSlug: "mit-6-0001-python",
          year: 1,
          semester: 1,
          order: 3
        },
        {
          courseSlug: "mit-8-03-physics-iii",
          year: 2,
          semester: 1,
          order: 4
        },
        {
          courseSlug: "mit-8-044-statistical-physics-ii",
          year: 2,
          semester: 2,
          order: 5
        },
        {
          courseSlug: "mit-8-04-quantum-physics-i",
          year: 3,
          semester: 1,
          order: 6
        },
        {
          courseSlug: "mit-8-05-quantum-physics-ii",
          year: 3,
          semester: 2,
          order: 7
        },
        {
          courseSlug: "mit-8-333-statistical-mechanics",
          year: 3,
          semester: 2,
          order: 8
        },
        {
          courseSlug: "mit-18-065-computational-science",
          year: 3,
          semester: 1,
          order: 9
        },
        {
          courseSlug: "mit-8-701-nuclear-particle-physics",
          year: 4,
          semester: 1,
          order: 10
        },
        {
          courseSlug: "mit-8-282j-introduction-astronomy",
          year: 4,
          semester: 1,
          order: 11
        }
      ]
    }
  ]
};
