export interface CharacterRickMortyType {
  id: number;
  name: string;
  status: string;
  species: string;
  // type: string;
  gender: string;
  origin: {
    name: string;
    /* url: string; */
  };
  location: {
    name: string;
    /* url: string; */
  };
  type: string;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
