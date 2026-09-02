export interface UniversitySeed {
  slug: string;
  name: string;
  country: string;
  website: string;
  reputation: number;
}

export const universities: UniversitySeed[] = [
  {
    slug: "mit",
    name: "Massachusetts Institute of Technology",
    country: "United States",
    website: "https://www.mit.edu",
    reputation: 98,
  },
  {
    slug: "stanford",
    name: "Stanford University",
    country: "United States",
    website: "https://www.stanford.edu",
    reputation: 97,
  },
  {
    slug: "harvard",
    name: "Harvard University",
    country: "United States",
    website: "https://www.harvard.edu",
    reputation: 97,
  },
  {
    slug: "berkeley",
    name: "University of California, Berkeley",
    country: "United States",
    website: "https://www.berkeley.edu",
    reputation: 94,
  },
  {
    slug: "cmu",
    name: "Carnegie Mellon University",
    country: "United States",
    website: "https://www.cmu.edu",
    reputation: 93,
  },
  {
    slug: "yale",
    name: "Yale University",
    country: "United States",
    website: "https://www.yale.edu",
    reputation: 95,
  },
  {
    slug: "oxford",
    name: "University of Oxford",
    country: "United Kingdom",
    website: "https://www.ox.ac.uk",
    reputation: 96,
  },
  {
    slug: "eth-zurich",
    name: "ETH Zurich",
    country: "Switzerland",
    website: "https://ethz.ch",
    reputation: 94,
  },
  {
    slug: "caltech",
    name: "California Institute of Technology",
    country: "United States",
    website: "https://www.caltech.edu",
    reputation: 93,
  },
  {
    slug: "princeton",
    name: "Princeton University",
    country: "United States",
    website: "https://www.princeton.edu",
    reputation: 95,
  },
  {
    slug: "duke",
    name: "Duke University",
    country: "United States",
    website: "https://www.duke.edu",
    reputation: 92,
  },
  {
    slug: "columbia",
    name: "Columbia University",
    country: "United States",
    website: "https://www.columbia.edu",
    reputation: 94,
  },
  {
    slug: "michigan",
    name: "University of Michigan",
    country: "United States",
    website: "https://www.umich.edu",
    reputation: 91,
  },
  {
    slug: "uc-davis",
    name: "University of California, Davis",
    country: "United States",
    website: "https://www.ucdavis.edu",
    reputation: 88,
  },
];
