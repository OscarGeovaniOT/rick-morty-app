import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { ActivityIndicator, Image, ScrollView, Text } from "react-native";
import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";

type DetailRouteProp = RouteProp<RootStackParamList, "LocationDetail">;

export default function LocationDetailScreen() {
    const route = useRoute<DetailRouteProp>();
    const [location, setLocation] = useState<LocationRickMortyType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            const data = await rickMortyService.getLocationById(route.params.locationId);
            setLocation(data);
            setLoading(false);
        }
        fetchLocation();
    }, [route.params.locationId]);

    if (loading || !location) return <ActivityIndicator size="large" color="#00ff99" />;

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>{location.name}</Text>
            <Text>Dimension: {location.dimension}</Text>
        </ScrollView>
    );
}