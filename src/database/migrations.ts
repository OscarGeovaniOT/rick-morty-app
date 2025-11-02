import { querySql } from "./sqlite";

export const createTables = async () => {
  await querySql(`
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
    );
  `);

  await querySql(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY,
      name TEXT,
      type TEXT,
      dimension TEXT,
      created TEXT
    );
  `);

  await querySql(`
    CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY,
      name TEXT,
      air_date TEXT,
      episode TEXT,
      created TEXT
    );
  `);
};
