import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";
import { EpisodeRickMortyType } from "../../../api/clients/types/episode/episode.rickmorty.type";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../../theme/theme";
import { globalStyles } from "../../../theme/styles";

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
    <LinearGradient
      colors={
        theme.colors.backgroundGradient as unknown as readonly [
          string,
          string,
          ...string[],
        ]
      }
      style={globalStyles.screenContainer}
    >
      <View style={globalStyles.card}>
        <Text style={globalStyles.title}>{episode.name}</Text>
        <Text style={globalStyles.subtitle}>📺 Código: {episode.episode}</Text>
        <Text style={globalStyles.text}>
          🗓 Fecha de emisión: {episode.air_date}
        </Text>
        <Text style={globalStyles.text}>
          👥 Personajes: {episode.characters.length}
        </Text>
      </View>
    </LinearGradient>
  );
}
