#!/usr/bin/env node
import { readFileSync } from "fs";
import { parseArgs } from "node:util";
import { validatePizza } from "./validatePizza";

function main(): void {
  const { values, positionals } = parseArgs({
    options: { file: { type: "string", short: "f" } },
    allowPositionals: true,
  });

  const filePath = values.file ?? positionals[0];
  if (!filePath) {
    console.error("Usage: pizza-validate --file <path/to/pizza.json>");
    process.exit(1);
  }

  let raw = "";
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch (e: any) {
    console.error(`Error: cannot read file "${filePath}" (${e?.code || "UNKNOWN"})`);
    process.exit(1);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    console.error("Error: file is not valid JSON.");
    process.exit(1);
  }

  const result = validatePizza(data);
  if (result.isPizza) {
    console.log("✅ Valid pizza!");
    console.log(JSON.stringify(result.pizza, null, 2));
    process.exit(0);
  } else {
    console.error("❌ Not a valid pizza.");
    for (const err of result.errors) console.error("- " + err);
    process.exit(2);
  }
}

main();
