import { describe, expect, it } from "vitest";
import {
  EVENTS, eventMonthLabel, groupEventsByMonth, isPastEvent,
} from "../client/src/data/events";

const now = new Date("2026-11-13T15:00:00Z");

describe("Événements Club ADM", () => {
  it("présente les quatre annonces demandées dans l’ordre chronologique", () => {
    const upcoming = EVENTS.filter(event => !isPastEvent(event, now));
    expect(upcoming.map(event => event.date)).toEqual(["2026-12-12", "2027-08", "2027-09", "2027-10"]);
    expect(upcoming.map(event => event.title)).toEqual([
      "Party de Noël ADM", "Classic ADM — Tournoi de golf", "Marathon Club ADM", "WOD en rose",
    ]);
    expect(groupEventsByMonth(upcoming).map(([month]) => month)).toEqual([
      "décembre 2026", "août 2027", "septembre 2027", "octobre 2027",
    ]);
  });

  it("n’invente ni jour, ni heure, ni lieu, ni inscription pour les dates mensuelles", () => {
    for (const id of ["classic-adm-golf-2027", "marathon-club-adm-2027", "wod-en-rose-2027"]) {
      const event = EVENTS.find(event => event.id === id)!;
      expect(event.date).toMatch(/^2027-\d{2}$/);
      expect(event.href).toBeUndefined();
      expect(event.time).toBeUndefined();
      expect(event.location).toBeUndefined();
    }
  });

  it("garde le 12 décembre stable quel que soit le fuseau du navigateur", () => {
    const christmas = EVENTS.find(event => event.id === "party-noel-adm-2026")!;
    expect(eventMonthLabel(christmas)).toBe("décembre 2026");
    expect(isPastEvent(christmas, new Date("2026-12-13T04:59:59Z"))).toBe(false);
    expect(isPastEvent(christmas, new Date("2026-12-13T05:00:00Z"))).toBe(true);
  });

  it("ne classe un mois sans jour comme passé qu’une fois le mois terminé à Montréal", () => {
    const golf = EVENTS.find(event => event.id === "classic-adm-golf-2027")!;
    expect(isPastEvent(golf, new Date("2027-09-01T03:59:59Z"))).toBe(false);
    expect(isPastEvent(golf, new Date("2027-09-01T04:00:00Z"))).toBe(true);
  });

  it("préserve la fiche historique et son URL, sans la présenter comme une édition 2027", () => {
    const course = EVENTS.find(event => event.id === "course-19-sept")!;
    expect(course.href).toBe("/evenements/course-19-septembre");
    expect(course.date).toBe("2025-09-19");
    expect(isPastEvent(course, now)).toBe(true);
    expect(EVENTS.find(event => event.id === "marathon-club-adm-2027")!.href).toBeUndefined();
  });
});
