import { migrations } from "./migrations";
import { executeSql, runInTransaction } from "./sqlite";

export const runMigrations = async () => {
  await executeSql(`
    CREATE TABLE IF NOT EXISTS _migrations (
      version INTEGER PRIMARY KEY,
      applied_at INTEGER
    );
    `);

  const result = await executeSql(
    "SELECT version FROM _migrations ORDER BY version DESC LIMIT 1"
  );
  const currentVersion = (result as any)?.rows?._array?.[0]?.version || 0;

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      console.log(`Running migration v${migration.version}...`);

      await runInTransaction(async () => {
        await migration.up();
        await executeSql(
          "INSERT INTO _migrations (version,applied_at) VALUES (?,?)",
          [migration.version, Date.now()]
        );
      });
      console.log(`Migration ${migration.version} applied`);
    }
  }
};

export const revertLastMigration = async () => {
  const result = await executeSql(
    "SELECT version FROM _migrations ORDER BY version DESC LIMIT 1"
  );

  const lastVersion = (result as any)?.rows?._array?.[0]?.version || 0;
  if (!lastVersion) {
    console.log("No migrations to revert");
    return;
  }

  const migration = migrations.find((m) => m.version === lastVersion);
  if (!migration) {
    console.log(`No migration found for version ${lastVersion}`);
    return;
  }

  console.log(`Reverting migration v${lastVersion}...`);
  await runInTransaction(async () => {
    await migration.down();
    await executeSql("DELETE FROM _migrations WHERE version=?", [lastVersion]);
  });
  console.log(`Migration ${lastVersion} reverted`);
};
