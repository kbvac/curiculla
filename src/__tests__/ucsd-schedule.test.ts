import { describe, expect, it } from "vitest";
import { parsePodcastSchedule } from "@/lib/catalog/adapters/ucsd";

// Real structure from https://podcast.ucsd.edu/watch/sp24/cse30_a00/1 (HTML form)
const SCHEDULE_SNIPPET = `
<div>CSE 30 - Computer Organiz&Systms Progrm - LE [A00] - Course Podcasts - UC San Diego</div>
<div>Professor Cao, Yingjun</div>
<div>Spring 2024</div>

<h3>Week 1</h3>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/1">Mon 4/1</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/2">Wed 4/3</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/30">Wed 4/3 [A01]</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/3">Fri 4/5</a>

<h3>Week 2</h3>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/4">Mon 4/8</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/5">Wed 4/10</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/31">Wed 4/10 [A01]</a>

<h3>Week 10</h3>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/27">Mon 6/3</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/28">Wed 6/5</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/39">Wed 6/5 [A01]</a>
<a href="https://podcast.ucsd.edu/watch/sp24/cse30_a00/29">Fri 6/7</a>

<a href="../../../Podcasts/Schedule.aspx?podcastID=16012">Schedule</a>
`;

describe("UCSD adapter — podcast schedule parser", () => {
  const result = parsePodcastSchedule(
    SCHEDULE_SNIPPET,
    "https://podcast.ucsd.edu/watch/sp24/cse30_a00/1",
  );

  it("extracts course header", () => {
    expect(result.courseTitle).toContain("CSE 30");
    expect(result.instructor).toBe("Professor Cao, Yingjun");
    expect(result.termLabel).toBe("Spring 2024");
  });

  it("groups sessions into weeks", () => {
    expect(result.weeks.map((w) => w.weekNumber)).toEqual([1, 2, 10]);
    expect(result.weeks[0].sessions).toHaveLength(4);
    expect(result.weeks[1].sessions).toHaveLength(3);
  });

  it("separates lectures from discussion sections", () => {
    const week1 = result.weeks[0].sessions;
    const lectures = week1.filter((s) => s.sessionKind === "LECTURE");
    const discussions = week1.filter((s) => s.sessionKind === "DISCUSSION");
    expect(lectures.map((s) => s.lectureNumber)).toEqual([1, 2, 3]);
    expect(discussions.map((s) => s.lectureNumber)).toEqual([30]);
    expect(discussions[0].section).toBe("a01");
  });

  it("keeps date labels and absolute URLs", () => {
    const first = result.weeks[0].sessions[0];
    expect(first.dateLabel).toBe("Mon 4/1");
    expect(first.url).toBe("https://podcast.ucsd.edu/watch/sp24/cse30_a00/1");
  });

  it("does not treat the Schedule link as a session", () => {
    const all = result.weeks.flatMap((w) => w.sessions);
    expect(all.some((s) => s.url.includes("Schedule"))).toBe(false);
  });
});
