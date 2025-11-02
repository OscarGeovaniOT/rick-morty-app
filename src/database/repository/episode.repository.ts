import { EpisodeBdModel } from "../models/episode.bd.model";
import { querySql, runSql } from "../sqlite";

export const insertEpisode = async (episode: EpisodeBdModel) => {
  await runSql(
    `INSERT OR REPLACE INTO episodes 
     (id, name, air_date, episode,created) 
     VALUES (?, ?, ?, ?,?)`,
    [
      episode.id,
      episode.name,
      episode.air_date,
      episode.episode,
      episode.created,
    ]
  );
};

export const getEpisodes = async (
  offset = 0,
  limit = 20
): Promise<EpisodeBdModel[]> => {
  const result = await querySql(`SELECT * FROM episodes LIMIT ? OFFSET ?`, [
    limit,
    offset,
  ]);
  return result.map((r: any) => ({
    id: r.id,
    name: r.name,
    air_date: r.air_date,
    episode: r.episode,
    created: r.created,
  }));
};
