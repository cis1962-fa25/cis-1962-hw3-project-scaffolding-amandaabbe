import { z, type ZodIssue } from "zod";

/**
 * Pizza schema per assignment:
 * - size: number (diameter in inches)
 * - crust: "stuffed" | "normal"
 * - isDeepDish?: boolean (defaults to false)
 * - toppings?: string[] (allowed list only; banned list never allowed)
 */
const allowedToppings = [
  "cheese",
  "pepperoni",
  "mushroom",
  "onion",
  "sausage",
  "basil",
  "olive",
  "tomato",
  "chicken",
  "ham",
] as const;

// toppings that should NEVER be on pizza
const banned = new Set(["glass", "detergent", "battery", "nail"]);

export const PizzaSchema = z.object({
  size: z.number().int().positive(),
  crust: z.enum(["stuffed", "normal"]),
  isDeepDish: z.boolean().optional().default(false),
  toppings: z
    .array(z.string())
    .optional()
    .transform((arr) => arr ?? [])
    .refine((arr) => arr.every((t) => !banned.has(t)), {
      message: "Contains banned topping(s).",
    })
    .refine((arr) => arr.every((t) => allowedToppings.includes(t as any)), {
      message: "Contains unknown topping(s).",
    }),
});

export type Pizza = z.infer<typeof PizzaSchema>;

export type PizzaValidationResult =
  | { isPizza: true; pizza: Pizza }
  | { isPizza: false; errors: string[] };

/** Validate unknown input as Pizza using Zod and return a discriminated union. */
export function validatePizza(input: unknown): PizzaValidationResult {
  const parsed = PizzaSchema.safeParse(input);
  if (parsed.success) {
    return { isPizza: true, pizza: parsed.data };
  }
  // Zod v4: use .issues (not .errors) and type the callback
  const errors = parsed.error.issues.map((issue: ZodIssue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
  return { isPizza: false, errors };
}
