# Curricula — Le cursus officiel, dans l'ordre

Les catalogues officiels des universités transformés en parcours praticables :
cours réels, prérequis officiels, emploi du temps hebdomadaire synchronisé avec
les podcasts officiels.

## Setup (base vierge)

```bash
npm install
npm run setup   # = seed → catalog:build → seed:assessments → import:ucsd:lectures
npm run dev     # http://localhost:3000
```

Scripts :

| Commande | Effet |
|---|---|
| `npm run seed` | Données de base : universités, 5 domaines, 186 skills, 29 quiz |
| `npm run catalog:build` | **Point d'entrée unique du catalogue** : purge tout ce qui ne vient pas d'un adaptateur valide, importe UCSD CSE (73 cours, 132 prérequis), génère les degrees/curricula + le path officiel à étapes cours, rattache les 13 podcasts ETS vérifiés |
| `npm run seed:assessments` | 9 quiz (45 questions) sur les skills clés |
| `npm run import:ucsd:lectures` | Parse les pages podcasts officielles → 114 sessions hebdo (CSE 21/30/100/101) liées aux skills |
| `npm run lint` / `typecheck` / `test` / `build` | Qualité |

## Architecture données

```
University → Course ─┬─→ CoursePrerequisite (graphe officiel)
                     ├─→ Resource (podcasts ETS + sessions hebdo)
                     └─→ CurriculumCourse (programme officiel)

LearningPath → LearningPathStep → Skill | Course | custom (titre + URL)
  ownerId = null  → parcours global (officiel / bibliothèque)
  ownerId = user  → parcours personnel (builder, lecture pour tous, édition réservée)

User → UserGoal (path) · UserSkill (mastery) · UserProgress (ressources)
     → ScheduleEnrollment (cours hebdo, startDate perso) · Bookmark
```

La boucle de progression : session cochée (`/api/progress`) → `recomputeSkillMastery`
sur **toutes** les ressources liées (moyenne sur l'ensemble, non-commencées = 0).

## Règles du projet

- **Catalogue issu d'adaptateurs uniquement** (`src/lib/catalog/adapters/ucsd.ts`) :
  templates d'URL déterministes + parseurs purs testés. Pas de scraping générique.
- **Seul UCSD CSE est importé** pour l'instant ; les autres universités sont
  marquées « catalogue à venir » dans l'UI.
- **UI en français** (chrome), une seule couleur d'énergie (vert), codes de cours
  toujours en mono. Voir `src/app/globals.css` (design system « Curricula Light »).
