#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import { revertLastMigration, runMigrations } from "./migrate";

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const MIGRATIONS_DIR = path.join(__dirname, "migrations");
const INDEX_FILE = path.join(MIGRATIONS_DIR, "index.ts");

const args = process.argv.slice(2);
const command = args[0];
const migrationName = args[1];

async function askConfirm(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().startsWith("y"));
    });
  });
}

async function createMigration() {
  if (!migrationName) {
    console.error("Migration name is required");
    process.exit(1);
  }

  if (!fs.existsSync(MIGRATIONS_DIR)) {
    fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
  }

  //Determinar el siguiente numero
  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => /^\d+_/.test(f));
  const lastNumber = files.length
    ? Math.max(...files.map((f) => parseInt(f.split("_")[0], 10)))
    : 0;
  const nextNumber = String(lastNumber + 1).padStart(3, "0");

  const fileName = `${nextNumber}_${migrationName}.ts`;
  const filePath = path.join(MIGRATIONS_DIR, fileName);

  const template = `
    import { executeSql } from "../sqlite";

    export const up = async () => {
    // TODO: Add migration code here
    };

    export const down = async () => {
    // TODO: Add rollback code here
    };

  `;

  fs.writeFileSync(filePath, template);

  //Actualizar index.ts
  const importName = `migration${nextNumber};`;
  const relativePath = `./${fileName.replace(".ts", "")}`;

  let indexContent = "";
  if (fs.existsSync(INDEX_FILE)) {
    indexContent = fs.readFileSync(INDEX_FILE, "utf-8");
  } else {
    indexContent = `export const migrations=[];\n`;
  }

  const newEntry = `import * as ${importName} from "${relativePath}"; \n`;
  const newMigration = `{version:${parseInt(nextNumber)},up:${importName}.up, down:${importName}.down},`;

  if (!indexContent.includes(importName)) {
    const updated = indexContent.replace(
      /export const migrations= \[/,
      `${newEntry}\nexport const migrations=[\n ${newMigration}`
    );
    fs.writeFileSync(INDEX_FILE, updated, "utf-8");
  }

  console.log(`Created migration: ${fileName}`);
}

(async () => {
  switch (command) {
    case "new":
      await createMigration();
      break;
    case "up":
      await runMigrations();
      break;
    case "down":
      const confirm = await askConfirm(
        "Esta seguro de deshacer la ultima migración?"
      );
      if (confirm) {
        await revertLastMigration();
      } else {
        console.log("Operación cancelada");
      }
      break;
    default:
      console.log("Usage:");
      console.log("  npx tsx src/database/migrate-cli.ts new nombre_migracion");
      console.log("  npx tsx src/database/migrate-cli.ts up");
      console.log("  npx tsx src/database/migrate-cli.ts down");
      process.exit(1);
  }
})();
