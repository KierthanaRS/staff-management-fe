import { parseTimeValue, formatTime } from "../../src/utils/timeUtils";

describe("timeUtils", () => {
  describe("parseTimeValue", () => {
    it("should parse a valid HH:MM string", () => {
      const date = parseTimeValue("14:30");
      expect(date.getHours()).toBe(14);
      expect(date.getMinutes()).toBe(30);
    });

    it("should return a new Date when undefined is passed", () => {
      const date = parseTimeValue(undefined);
      expect(date instanceof Date).toBe(true);
    });

    it("should handle midnight correctly", () => {
      const date = parseTimeValue("00:00");
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
    });

    it("should handle single-digit hours and minutes", () => {
      const date = parseTimeValue("7:5"); 
      expect(date.getHours()).toBe(7);
      expect(date.getMinutes()).toBe(5);
    });
  });

  describe("formatTime", () => {
    it("should format a valid Date into HH:MM", () => {
      const d = new Date();
      d.setHours(16);
      d.setMinutes(20);
      expect(formatTime(d)).toBe("16:20");
    });

    it("should pad single-digit hours and minutes", () => {
      const d = new Date();
      d.setHours(6);
      d.setMinutes(4);
      expect(formatTime(d)).toBe("06:04");
    });

  });
});
