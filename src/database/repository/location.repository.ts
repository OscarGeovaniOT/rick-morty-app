import { LocationBdModel } from "../models/location.bd.model";
import { querySql, runSql } from "../sqlite";

export const insertLocation = async (location: LocationBdModel) => {
  await runSql(
    `INSERT OR REPLACE INTO locations 
     (id, name, type, dimension, created) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      location.id,
      location.name,
      location.type,
      location.dimension,
      location.created,
    ]
  );
};

export const getLocations = async (
  offset = 0,
  limit = 20
): Promise<LocationBdModel[]> => {
  const result = await querySql(`SELECT * FROM locations LIMIT ? OFFSET ?`, [
    limit,
    offset,
  ]);
  return result.map((r: any) => ({
    id: r.id,
    name: r.name,
    type: r.type,
    dimension: r.dimension,
    created: r.created,
  }));
};
