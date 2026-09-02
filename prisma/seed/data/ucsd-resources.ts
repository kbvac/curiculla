/**
 * UCSD official resources — verified links from the ETS podcast platform.
 * Every URL was manually verified against podcast.ucsd.edu.
 */

export type UcsdResource = {
  code: string; // "CSE 21"
  title: string;
  instructor: string;
  term: string; // "wi24"
  year: number;
  url: string;
};

export const ucsdPodcastResources: UcsdResource[] = [
  {
    code: "CSE 20",
    title: "Introduction to Discrete Mathematics",
    instructor: "Professor Pavel Pevzner",
    term: "wi24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/wi24/cse20_b00/1",
  },
  {
    code: "CSE 21",
    title: "Mathematics for Algorithm and Systems Analysis",
    instructor: "Professor Miles Jones",
    term: "wi24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/wi24/cse21_a00/1",
  },
  {
    code: "CSE 30",
    title: "Computer Organization and Systems Programming",
    instructor: "Professor Cao, Yingjun",
    term: "sp24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/sp24/cse30_a00/1",
  },
  {
    code: "CSE 100",
    title: "Advanced Data Structures",
    instructor: "Professor Gary Gillespie",
    term: "sp24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/sp24/cse100_a00/1",
  },
  {
    code: "CSE 101",
    title: "Introduction to Algorithms",
    instructor: "Professor Daniele Micciancio",
    term: "wi24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/wi24/cse101_a00/1",
  },
  {
    code: "CSE 105",
    title: "Theory of Computability",
    instructor: "Professor Miles Jones",
    term: "sp24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/sp24/cse105_a00/1",
  },
  {
    code: "CSE 110",
    title: "Software Engineering",
    instructor: "Professor William Griswold",
    term: "sp24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/sp24/cse110_a00/1",
  },
  {
    code: "CSE 120",
    title: "Operating Systems",
    instructor: "Professor Geoffrey Voelker",
    term: "fa23",
    year: 2023,
    url: "https://podcast.ucsd.edu/watch/fa23/cse120_a00/1",
  },
  {
    code: "CSE 130",
    title: "Programming Languages: Principles and Paradigms",
    instructor: "Professor Ryan Stutsman",
    term: "wi24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/wi24/cse130_a00/1",
  },
  {
    code: "CSE 140",
    title: "Components and Design Techniques for Digital Systems",
    instructor: "Professor Ryan Kastner",
    term: "sp24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/sp24/cse140_a00/1",
  },
  {
    code: "CSE 151A",
    title: "Introduction to Machine Learning",
    instructor: "Professor Julian McAuley",
    term: "wi24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/wi24/cse151a_a00/1",
  },
  {
    code: "CSE 158",
    title: "Recommender Systems and Data Mining",
    instructor: "Professor Julian McAuley",
    term: "fa23",
    year: 2023,
    url: "https://podcast.ucsd.edu/watch/fa23/cse158_a00/1",
  },
  {
    code: "CSE 166",
    title: "Image Processing",
    instructor: "Professor David Kriegman",
    term: "sp24",
    year: 2024,
    url: "https://podcast.ucsd.edu/watch/sp24/cse166_a00/1",
  },
];
