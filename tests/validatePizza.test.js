"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validatePizza_1 = require("../src/validatePizza");
describe("validatePizza", () => {
    test("valid pizza (happy path)", () => {
        const result = (0, validatePizza_1.validatePizza)({
            size: 12,
            crust: "normal",
            toppings: ["cheese", "basil", "onion"],
            isDeepDish: false,
        });
        expect(result.isPizza).toBe(true);
    });
    test("invalid pizza - banned topping", () => {
        const result = (0, validatePizza_1.validatePizza)({
            size: 12,
            crust: "stuffed",
            toppings: ["cheese", "battery"],
        });
        expect(result.isPizza).toBe(false);
        if (!result.isPizza) {
            expect(result.errors.some((e) => e.toLowerCase().includes("banned"))).toBe(true);
        }
    });
    test("invalid pizza - missing crust", () => {
        const result = (0, validatePizza_1.validatePizza)({
            size: 10,
            toppings: ["cheese"],
        });
        expect(result.isPizza).toBe(false);
        if (!result.isPizza) {
            expect(result.errors.some((e) => e.toLowerCase().includes("crust"))).toBe(true);
        }
    });
});
