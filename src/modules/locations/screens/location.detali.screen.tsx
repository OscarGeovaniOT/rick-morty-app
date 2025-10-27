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
import { LinearGradient } from "expo-linear-gradient";

type DetailRouteProp = RouteProp<RootStackParamList, "LocationDetail">;

export default function LocationDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const [location, setLocation] = useState<LocationRickMortyType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      const data = await rickMortyService.getLocationById(
        route.params.locationId
      );
      setLocation(data);
      setLoading(false);
    };
    fetchLocation();
  }, [route.params.locationId]);

  if (loading || !location)
    return <ActivityIndicator size="large" color="#00ff99" />;

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{location.name}</Text>
        <Text style={styles.subtitle}>🌌 Tipo: {location.type}</Text>
        <Text style={styles.text}>🪐 Dimensión: {location.dimension}</Text>
        <Text style={styles.text}>
          👥 Residentes: {location.residents.length}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
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
    color: "#00d4ff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: { color: "#fff", fontSize: 18, marginBottom: 12 },
  text: { color: "#ccc", fontSize: 16, marginVertical: 4 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
