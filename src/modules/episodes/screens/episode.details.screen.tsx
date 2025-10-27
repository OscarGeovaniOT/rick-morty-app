import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { ActivityIndicator, Image, ScrollView, Text } from "react-native";
import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";
import { EpisodeRickMortyType } from "../../../api/clients/types/episode/episode.rickmorty.type";

type DetailRouteProp = RouteProp<RootStackParamList, "EpisodeDetail">;

export default function EpisodeDetailsScreen() {
  const route = useRoute<DetailRouteProp>();
  const [episode, setEpisode] = useState<EpisodeRickMortyType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisode = async () => {
      const data = await rickMortyService.getEpisodeById(
        route.params.episodeId
      );
      setEpisode(data);
      setLoading(false);
    };
    fetchEpisode();
  }, [route.params.episodeId]);

  if (loading || !episode)
    return <ActivityIndicator size="large" color="#00ff99" />;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
        {episode.name}
      </Text>
      <Text>Air Date: {episode.air_date}</Text>
      <Text>Episode: {episode.episode}</Text>
      <Text>Characters: {episode.characters.join(", ")}</Text>
    </ScrollView>
  );
}
