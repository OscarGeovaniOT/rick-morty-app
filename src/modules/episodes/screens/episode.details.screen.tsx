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
    <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{episode.name}</Text>
        <Text style={styles.subtitle}>📺 Código: {episode.episode}</Text>
        <Text style={styles.text}>🗓 Fecha de emisión: {episode.air_date}</Text>
        <Text style={styles.text}>
          👥 Personajes: {episode.characters.length}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    color: "#00ff99",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 12,
  },
  text: {
    color: "#ccc",
    fontSize: 16,
    marginVertical: 4,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
