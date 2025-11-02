import * as migration1 from "./001_create_characters_table";
import * as migration2 from "./002_create_locations_table";
import * as migration3 from "./003_create_episodes_table";

export const migrations = [
  { version: 1, up: migration1.up, down: migration1.down },
  { version: 2, up: migration2.up, down: migration2.down },
  { version: 3, up: migration3.up, down: migration3.down },
];
