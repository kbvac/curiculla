import { describe, expect, it } from "vitest";
import {
  courseCatalogUrl,
  ugCurriculumUrl,
  grCurriculumUrl,
  watchUrl,
  termCodes,
  podcastCourseId,
  normalizeText,
  parseCourseCatalog,
  parseCurriculum,
} from "@/lib/catalog/adapters/ucsd";

// Real text from https://catalog.ucsd.edu/archive/2022-23/courses/CSE.html
const CATALOG_SNIPPET = `
Lower Division

CSE 3. Fluency in Information Technology (4)

Introduces the concepts and skills necessary to effectively use information technology. Prerequisites: none.

CSE 8A. Introduction to Programming and Computational Problem-Solving I (4)

Introductory course for students interested in computer science and programming. Basics of programming including variables, conditionals, loops, functions/methods. Prerequisites: restricted to undergraduates.

CSE 8B. Introduction to Programming and Computational Problem-Solving II (4)

Introductory programming using an object-oriented approach with the Java programming language. Prerequisites: CSE 8A; restricted to undergraduates.

CSE 12. Basic Data Structures and Object-Oriented Design (4)

Use and implementation of basic data structures including linked lists, stacks, and queues. Prerequisites: CSE 8B or CSE 11, and concurrent enrollment with CSE 15L; restricted to undergraduates.

CSE 21. Mathematics for Algorithms and Systems (4)

This course will cover mathematical concepts used to model and analyze algorithms and computer systems. Prerequisites: CSE 20 or MATH 15A or MATH 31CH; restricted to undergraduates.

Upper Division

CSE 100. Advanced Data Structures (4)

High-performance data structures and supporting algorithms. Uses C++ and STL. Recommended preparation: background in C or C++ programming. Prerequisites: CSE 21 or MATH 154 or MATH 184 and CSE 12 and CSE 15L and CSE 30 or ECE 15; restricted to undergraduates.

CSE 120. Principles of Computer Operating Systems (4)

Basic functions of operating systems; basic kernel structure, concurrency, memory management. Prerequisites: CSE 30 and CSE 101 and CSE 110; restricted to students within the CS25, CS26, CS27, and EC26 majors.

CSE 191. Seminar in CSE (1–4)

A seminar course on topics of current interest.
`;

// Real structure from https://catalog.ucsd.edu/archive/2022-23/curric/CSE-ug.html
const CURRICULUM_SNIPPET = `
Computer Science and Engineering (CSE)

The Department of Computer Science and Engineering (CSE) offers three degree programs.

### BS Computer Science Program

The BS computer science requires a total of 124 units for the BS computer science program.

#### 1. Lower-Division Requirements

1. Computer Science and Engineering: CSE 8B or CSE 11, CSE 12, CSE 15L, CSE 20 (or MATH 15A or MATH 31CH or MATH 109), CSE 21 (or MATH 154 or MATH 184), and CSE 30 (twenty-two units)

3. Mathematics: MATH 20A, MATH 20B, MATH 20C (or MATH 31BH), and MATH 18 (or MATH 31AH) (sixteen units)

#### 2. Upper-Division Requirements

Students must complete seventy-two upper-division units: forty-four units of core courses and twenty-eight units of elective courses.

1. Core Courses

- Data structures and programming: CSE 100
- Algorithms/theory: CSE 101 and CSE 105
- Software engineering: CSE 110
- Hardware: CSE 140 and CSE 140L
- Architecture: (CSE 141 and CSE 141L) or (CSE 142 and CSE 142L)
- Systems/networks: CSE 120 or CSE 123 or CSE 124
- Programming languages/databases: CSE 130 or CSE 132A
- Security/cryptography: CSE 107 or CSE 127
- Learning/vision/graphics: CSE 150A or CSE 150B or CSE 151A or CSE 151B or CSE 152A or CSE 158 or CSE 158R or CSE 167

2. Electives: Seven courses (twenty-eight units) subject to the following constraints:

Students are expected to complete the majority of these courses by the end of their junior year.
`;

describe("UCSD adapter — URL builders", () => {
  it("builds catalog URLs for archive years and the current catalog", () => {
    expect(courseCatalogUrl("cse", "2022-23")).toBe(
      "https://catalog.ucsd.edu/archive/2022-23/courses/CSE.html",
    );
    expect(courseCatalogUrl("CSE")).toBe("https://catalog.ucsd.edu/courses/CSE.html");
  });

  it("builds curriculum URLs", () => {
    expect(ugCurriculumUrl("cse", "2022-23")).toBe(
      "https://catalog.ucsd.edu/archive/2022-23/curric/CSE-ug.html",
    );
    expect(grCurriculumUrl("CSE", "2022-23")).toBe(
      "https://catalog.ucsd.edu/archive/2022-23/curric/CSE-gr.html",
    );
  });

  it("builds podcast watch URLs following the ETS logic", () => {
    expect(watchUrl("wi24", "CSE 21", "a00", 1)).toBe(
      "https://podcast.ucsd.edu/watch/wi24/cse21_a00/1",
    );
    expect(watchUrl("s122", "CSE 3")).toBe(
      "https://podcast.ucsd.edu/watch/s122/cse3_a00",
    );
    expect(podcastCourseId("CSE 151A")).toBe("cse151a");
  });

  it("generates the quarter term codes", () => {
    expect(termCodes(2024)).toEqual(["fa24", "wi25", "sp25", "s125", "s225"]);
  });
});

describe("UCSD adapter — course catalog parser", () => {
  const result = parseCourseCatalog(CATALOG_SNIPPET);

  it("parses every course with code, title and units", () => {
    expect(result.courses.map((c) => c.code)).toEqual([
      "CSE 3",
      "CSE 8A",
      "CSE 8B",
      "CSE 12",
      "CSE 21",
      "CSE 100",
      "CSE 120",
      "CSE 191",
    ]);
    expect(result.courses.find((c) => c.code === "CSE 3")?.title).toBe(
      "Fluency in Information Technology",
    );
    expect(result.courses.find((c) => c.code === "CSE 3")?.units).toBe(4);
  });

  it("tracks lower/upper division sections", () => {
    expect(result.courses.find((c) => c.code === "CSE 21")?.catalogLevel).toBe("LOWER_DIVISION");
    expect(result.courses.find((c) => c.code === "CSE 100")?.catalogLevel).toBe("UPPER_DIVISION");
  });

  it("extracts prerequisite codes, including alternatives", () => {
    expect(result.courses.find((c) => c.code === "CSE 8B")?.prerequisites).toEqual(["CSE 8A"]);
    // "concurrent enrollment with CSE 15L" is a corequisite — excluded
    expect(result.courses.find((c) => c.code === "CSE 12")?.prerequisites).toEqual([
      "CSE 8B",
      "CSE 11",
    ]);
    expect(result.courses.find((c) => c.code === "CSE 100")?.prerequisites).toEqual([
      "CSE 21",
      "MATH 154",
      "MATH 184",
      "CSE 12",
      "CSE 15L",
      "CSE 30",
      "ECE 15",
    ]);
  });

  it("flags variable-unit courses and stores units as null", () => {
    const cse191 = result.courses.find((c) => c.code === "CSE 191");
    expect(cse191?.units).toBeNull();
    expect(result.warnings.some((w) => w.startsWith("CSE 191"))).toBe(true);
  });
});

describe("UCSD adapter — curriculum parser", () => {
  const programs = parseCurriculum(CURRICULUM_SNIPPET, "https://catalog.ucsd.edu/archive/2022-23/curric/CSE-ug.html");
  const bsCs = programs.find((p) => p.degreeName === "BS Computer Science");

  it("finds degree programs", () => {
    expect(programs.map((p) => p.degreeName)).toEqual(["BS Computer Science"]);
  });

  it("extracts total units", () => {
    expect(bsCs?.totalUnits).toBe(124);
  });

  it("extracts lower-division course codes", () => {
    expect(bsCs?.lowerDivisionCodes).toContain("CSE 8B");
    expect(bsCs?.lowerDivisionCodes).toContain("CSE 11");
    expect(bsCs?.lowerDivisionCodes).toContain("MATH 20A");
  });

  it("extracts core requirement areas → learning path phases", () => {
    const names = bsCs?.coreAreas.map((a) => a.name) ?? [];
    expect(names).toEqual([
      "Data structures and programming",
      "Algorithms/theory",
      "Software engineering",
      "Hardware",
      "Architecture",
      "Systems/networks",
      "Programming languages/databases",
      "Security/cryptography",
      "Learning/vision/graphics",
    ]);
  });

  it("marks alternative areas ('or' groups)", () => {
    const areas = bsCs?.coreAreas ?? [];
    expect(areas.find((a) => a.name === "Algorithms/theory")?.isAlternative).toBe(false);
    expect(areas.find((a) => a.name === "Architecture")?.isAlternative).toBe(true);
    expect(areas.find((a) => a.name === "Architecture")?.codes).toEqual([
      "CSE 141",
      "CSE 141L",
      "CSE 142",
      "CSE 142L",
    ]);
    expect(areas.find((a) => a.name === "Learning/vision/graphics")?.codes).toEqual([
      "CSE 150A",
      "CSE 150B",
      "CSE 151A",
      "CSE 151B",
      "CSE 152A",
      "CSE 158",
      "CSE 158R",
      "CSE 167",
    ]);
  });
});

describe("UCSD adapter — text normalization", () => {
  it("strips HTML tags and markdown emphasis", () => {
    const html = "<p>CSE 3. <em>Fluency</em> (4)</p><p>***Prerequisites:*** none.</p>";
    const text = normalizeText(html);
    expect(text).toContain("CSE 3. Fluency (4)");
    expect(text).toContain("Prerequisites: none.");
  });
});
