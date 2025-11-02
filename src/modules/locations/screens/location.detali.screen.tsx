import { RouteProp, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { globalStyles } from "../../../theme/styles";
import { theme } from "../../../theme/theme";

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
