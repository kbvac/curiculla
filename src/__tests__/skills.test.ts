import { describe, it, expect } from "vitest";
import { computeSkillStatus, type SkillNode } from "../lib/skills";

type UserSkillEntry = { status: string; mastery: number; selfDeclared: boolean };

function makeSkill(slug: string, prerequisites: string[] = []): SkillNode {
  return { slug, name: slug, difficulty: 1, prerequisites };
}

function makeUserSkill(
  status: string,
  mastery: number,
  selfDeclared = false,
): UserSkillEntry {
  return { status, mastery, selfDeclared };
}

describe("computeSkillStatus", () => {
  it("returns AVAILABLE when no user record and no prerequisites", () => {
    const skill = makeSkill("python-basics");
    const result = computeSkillStatus(skill, new Map());
    expect(result.status).toBe("AVAILABLE");
    expect(result.mastery).toBe(0);
    expect(result.missingPrerequisites).toEqual([]);
  });

  it("returns LOCKED when prerequisites are missing", () => {
    const skill = makeSkill("algorithms", ["data-structures"]);
    const userSkills = new Map<string, UserSkillEntry>();
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("LOCKED");
    expect(result.missingPrerequisites).toEqual(["data-structures"]);
  });

  it("returns AVAILABLE when all prerequisites are completed", () => {
    const skill = makeSkill("algorithms", ["data-structures", "python-basics"]);
    const userSkills = new Map<string, UserSkillEntry>([
      ["data-structures", makeUserSkill("COMPLETED", 85)],
      ["python-basics", makeUserSkill("MASTERED", 100)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("AVAILABLE");
    expect(result.missingPrerequisites).toEqual([]);
  });

  it("returns IN_PROGRESS when mastery is > 0 and < 80", () => {
    const skill = makeSkill("python-basics");
    const userSkills = new Map<string, UserSkillEntry>([
      ["python-basics", makeUserSkill("IN_PROGRESS", 50)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("IN_PROGRESS");
    expect(result.mastery).toBe(50);
  });

  it("returns COMPLETED when mastery >= 80", () => {
    const skill = makeSkill("python-basics");
    const userSkills = new Map<string, UserSkillEntry>([
      ["python-basics", makeUserSkill("COMPLETED", 85)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("COMPLETED");
  });

  it("returns MASTERED when mastery >= 90", () => {
    const skill = makeSkill("python-basics");
    const userSkills = new Map<string, UserSkillEntry>([
      ["python-basics", makeUserSkill("MASTERED", 95)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("MASTERED");
  });

  it("treats self-declared prerequisites as met", () => {
    const skill = makeSkill("algorithms", ["data-structures"]);
    const userSkills = new Map<string, UserSkillEntry>([
      ["data-structures", makeUserSkill("MASTERED", 100, true)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("AVAILABLE");
    expect(result.missingPrerequisites).toEqual([]);
  });

  it("returns LOCKED when some prerequisites are not completed", () => {
    const skill = makeSkill("algorithms", ["data-structures", "python-basics"]);
    const userSkills = new Map<string, UserSkillEntry>([
      ["data-structures", makeUserSkill("IN_PROGRESS", 40)],
      ["python-basics", makeUserSkill("COMPLETED", 85)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("LOCKED");
    expect(result.missingPrerequisites).toEqual(["data-structures"]);
  });

  it("handles circular prerequisites gracefully", () => {
    const skill = makeSkill("a", ["b"]);
    const userSkills = new Map<string, UserSkillEntry>([
      ["b", makeUserSkill("COMPLETED", 80)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("AVAILABLE");
  });

  it("returns AVAILABLE with zero mastery when self-declared", () => {
    const skill = makeSkill("python-basics");
    const userSkills = new Map<string, UserSkillEntry>([
      ["python-basics", makeUserSkill("AVAILABLE", 0, false)],
    ]);
    const result = computeSkillStatus(skill, userSkills);
    expect(result.status).toBe("AVAILABLE");
    expect(result.mastery).toBe(0);
  });
});
