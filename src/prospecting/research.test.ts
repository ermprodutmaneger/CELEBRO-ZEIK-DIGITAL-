import { describe, it, expect } from "vitest";
import { prospects, cleanName, researchId, researchedAt } from "./research";
describe("pesquisa pontual", () => {
  it("tem identificadores únicos e fontes públicas HTTPS", () => {
    expect(prospects.length).toBe(50);
    expect(new Set(prospects.map((p) => cleanName(p.name))).size).toBe(prospects.length);
    expect(new Set(prospects.map((p) => researchId(p.id))).size).toBe(
      prospects.length,
    );
    expect(
      prospects.every(
        (p) => new URL(p.source).protocol === "https:" && p.fact && p.idea,
      ),
    ).toBe(true);
  });
  it("normaliza nomes e preserva a data da pesquisa", () => {
    expect(cleanName("  Barbearia  Berríni ")).toBe(
      cleanName("barbearia berrini"),
    );
    expect(researchedAt).toBe("2026-11-21");
  });
});
