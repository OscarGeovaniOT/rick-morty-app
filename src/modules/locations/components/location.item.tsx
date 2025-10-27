import { Image, Text, TouchableOpacity, View } from "react-native";
import { LocationRickMortyType } from "../../../api/clients/types/location/location.rickmorty.type";

interface Props {
    location: LocationRickMortyType;
    onPress: () => void;
}

export default function LocationItem({ location, onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: "row",
                marginVertical: 8,
                marginHorizontal: 12,
                backgroundColor: "#1a1a1a",
                borderRadius: 12,
                padding: 10,
                alignItems: "center",
            }}
        >
            {/* <Image
                source={{ uri: location.image }}
                style={{ width: 70, height: 70, borderRadius: 10 }}
            /> */}
            <View style={{ marginLeft: 12 }}>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                    {location.name}
                </Text>
                <Text style={{ color: "#aaa" }}>{location.type}</Text>
                <Text style={{ color: "#aaa" }}>{location.dimension}</Text>
                {/* <Text style={{ color: character.status === "Alive" ? "#4ade80" : "#f87171" }}>
                    {character.status}
                </Text> */}
            </View>
        </TouchableOpacity>
    );
}