import { validatePizza } from "../src/validatePizza";

describe("validatePizza", () => {
  test("valid pizza (happy path)", () => {
    const result = validatePizza({
      size: 12,
      crust: "normal",
      toppings: ["cheese", "basil", "onion"],
      isDeepDish: false,
    });
    expect(result.isPizza).toBe(true);
  });

  test("invalid pizza - banned topping", () => {
    const result = validatePizza({
      size: 12,
      crust: "stuffed",
      toppings: ["cheese", "battery"],
    });
    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.some((e: string) => e.toLowerCase().includes("banned"))).toBe(
        true,
      );
    }
  });

  test("invalid pizza - missing crust", () => {
    const result = validatePizza({
      size: 10,
      toppings: ["cheese"],
    });
    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.some((e: string) => e.toLowerCase().includes("crust"))).toBe(
        true,
      );
    }
  });
});
