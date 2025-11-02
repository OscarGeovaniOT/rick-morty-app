import { executeSql } from "../sqlite";

export const up = async () => {
  await executeSql(`
        CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY,
      name TEXT,
      type TEXT,
      dimension TEXT,
      created TEXT
    );`);
};

export const down = async () => {
  await executeSql(`
        DROP TABLE IF EXISTS locations;
    `);
};
