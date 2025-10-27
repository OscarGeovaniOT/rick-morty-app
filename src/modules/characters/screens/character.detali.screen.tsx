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
import { LinearGradient } from "expo-linear-gradient";
import { CharacterRickMortyType } from "../../../api/clients/types/character/character.rickmorty.type";
import { globalStyles } from "../../../theme/styles";
import { theme } from "../../../theme/theme";

type DetailRouteProp = RouteProp<RootStackParamList, "CharacterDetail">;

export default function CharacterDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const [character, setCharacter] = useState<CharacterRickMortyType | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      const data = await rickMortyService.getCharacterById(
        route.params.characterId
      );
      setCharacter(data);
      setLoading(false);
    };
    fetchCharacter();
  }, [route.params.characterId]);

  if (loading || !character)
    return <ActivityIndicator size="large" color="#00ff99" />;

  return (
    <LinearGradient
      colors={theme.colors.backgroundGradient as [string, string, ...string[]]}
      style={globalStyles.screenContainer}
    >
      <ScrollView contentContainerStyle={globalStyles.scroll}>
        <View style={globalStyles.card}>
          <Image source={{ uri: character.image }} style={globalStyles.image} />
          <Text style={globalStyles.title}>{character.name}</Text>
          <Text style={globalStyles.subtitle}>
            💀 Estado: {character.status}
          </Text>
          <Text style={globalStyles.text}>👽 Especie: {character.species}</Text>
          <Text style={globalStyles.text}>🚻 Género: {character.gender}</Text>
          <Text style={globalStyles.text}>
            🌍 Origen: {character.origin.name}
          </Text>
          <Text style={globalStyles.text}>
            📍 Ubicación: {character.location.name}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  image: { width: 180, height: 180, borderRadius: 100, marginBottom: 20 },
  title: { color: "#fff", fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { color: "#aee", fontSize: 18, marginBottom: 10 },
  text: { color: "#fff", fontSize: 16, marginBottom: 6 },
});
