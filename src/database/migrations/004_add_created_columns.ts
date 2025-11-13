import { executeSql, querySql } from "../sqlite";

export const up = async () => {
  const locCols = await querySql("PRAGMA table_info(locations)");
  const hasLocCreated = (locCols as any[]).some((c: any) => c.name === "created");
  if (!hasLocCreated) {
    await executeSql("ALTER TABLE locations ADD COLUMN created TEXT");
  }

  const epCols = await querySql("PRAGMA table_info(episodes)");
  const hasEpCreated = (epCols as any[]).some((c: any) => c.name === "created");
  if (!hasEpCreated) {
    await executeSql("ALTER TABLE episodes ADD COLUMN created TEXT");
  }
};

export const down = async () => {
  
};