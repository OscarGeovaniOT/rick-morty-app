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
import { theme } from "../../../theme/theme";
import { globalStyles } from "../../../theme/styles";

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
        <Text style={globalStyles.title}>{location.name}</Text>
        <Text style={globalStyles.subtitle}>🌌 Tipo: {location.type}</Text>
        <Text style={globalStyles.text}>
          🪐 Dimensión: {location.dimension}
        </Text>
        <Text style={globalStyles.text}>
          👥 Residentes: {location.residents.length}
        </Text>
      </View>
    </LinearGradient>
  );
}
