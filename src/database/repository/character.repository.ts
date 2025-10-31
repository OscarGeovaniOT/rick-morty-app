import { CharacterBbModel } from "../models/character.bd.model";
import { db, querySql, runSql } from "../sqlite";

// Inserta o reemplaza (para evitar duplicados)

export const insertCharacter = async (char: CharacterBbModel) => {
  await runSql(
    `
    INSERT OR REPLACE INTO characters 
    (id, name, status, species, type, gender, origin, location, image) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      char.id,
      char.name,
      char.status,
      char.species,
      char.type,
      char.gender,
      char.origin,
      char.location,
      char.image,
    ]
  );
};

export const insertManyCharacters = async (chars: CharacterBbModel[]) => {
  try {
    await db.withTransactionAsync(async () => {
      for (const char of chars) {
        await db.runAsync(
          `INSERT OR REPLACE INTO characters 
           (id, name, status, species, type, gender, origin, location, image) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            char.id,
            char.name,
            char.status,
            char.species,
            char.type,
            char.gender,
            char.origin,
            char.location,
            char.image,
          ]
        );
      }
    });

    console.log(`✅ Se insertaron ${chars.length} personajes en transacción`);
  } catch (error) {
    console.error("❌ Error al insertar personajes:", error);
  }
};

// Obtiene personajes con paginación

export const getCharacters = async (
  offset = 0,
  limit = 20
): Promise<CharacterBbModel[]> => {
  const rows = await querySql(`SELECT * FROM characters LIMIT ? OFFSET ?`, [
    limit,
    offset,
  ]);

  return rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    status: r.status,
    species: r.species,
    type: r.type,
    gender: r.gender,
    origin: r.origin,
    location: r.location,
    image: r.image,
  }));
};
