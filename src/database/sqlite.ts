import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("rickmorty.db");

/*
Para SELECT , Array de objetos (cada fila del resultado)
*/
export const runSql = async (sql: string, params: any[] = []) => {
  try {
    return await db.runAsync(sql, params);
  } catch (error) {
    console.error("❌ Error ejecutando SQL:", error);
    throw error;
  }
};

/*
Para consultas tipo INSERT, UPDATE, DELETE, CREATE TABLE, Resultado simple sin filas
*/
export const querySql = async (sql: string, params: any[] = []) => {
  try {
    return await db.getAllAsync(sql, params);
  } catch (error) {
    console.error("❌ Error ejecutando query:", error);
    throw error;
  }
};

//VErsion dos

export const runInTransaction = async (
  callback: (tx: SQLite.SQLiteDatabase) => Promise<void>
) => {
  await db.withTransactionAsync(async () => {
    await callback(db);
  });
};

export const executeSql = async (sql: string, params: any[] = []) => {
  return db.runAsync(sql, params);
};
