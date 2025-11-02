import { executeSql } from "../sqlite";

export const up = async () => {
  await executeSql(`
        CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY,
      name TEXT,
      air_date TEXT,
      episode TEXT,
      created TEXT
    );`);
};

export const down = async () => {
  await executeSql(`
        DROP TABLE IF EXISTS episodes;
    `);
};
