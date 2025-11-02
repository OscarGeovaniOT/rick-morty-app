import { executeSql } from "../sqlite";

export const up = async () => {
  await executeSql(`
        CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY,
      name TEXT,
      status TEXT,
      species TEXT,
      type TEXT,
      gender TEXT,
      origin TEXT,
      location TEXT,
      image TEXT
    );`);
};

export const down = async () => {
  await executeSql(`
        DROP TABLE IF EXISTS characters;
    `);
};
