export interface UniversitySeed {
  slug: string;
  name: string;
  country: string;
  website: string;
  reputation: number;
}

// Seule université pertinente : UCSD (catalogue CSE 2022–23 importé via
// l'adaptateur officiel). Les autres universités seront ajoutées fac par fac,
// avec leur propre adaptateur, quand leur catalogue sera validé.
export const universities: UniversitySeed[] = [
  {
    slug: "ucsd",
    name: "University of California, San Diego",
    country: "United States",
    website: "https://www.ucsd.edu",
    reputation: 95,
  },
];
