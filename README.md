[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/x6X7wJcH)
TODO: Fill this out with details about how to run your app!

# cis-1962-hw3-project-scaffolding-amandaabbe

Validate pizza objects using TypeScript and Zod, with both a function and a CLI.

## Using the validator in code

```ts
import { validatePizza } from "cis-1962-hw3-project-scaffolding-amandaabbe";

const result = validatePizza({
  size: 12,
  crust: "normal",
  toppings: ["cheese"],
});

if (result.isPizza) {
  console.log(result.pizza.crust);
} else {
  console.error(result.errors);
}
