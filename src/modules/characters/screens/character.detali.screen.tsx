import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { CharacterRickMortyType } from "../../../api/clients/types/character.rickmorty.type";
import { useEffect, useState } from "react";
import { rickMortyService } from "../../../api/clients/rick.morty.service";
import { ActivityIndicator, Image, ScrollView, Text } from "react-native";

type DetailRouteProp = RouteProp<RootStackParamList, "CharacterDetail">;

export default function CharacterDetailScreen() {
    const route = useRoute<DetailRouteProp>();
    const [character, setCharacter] = useState<CharacterRickMortyType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            const data = await rickMortyService.getCharacterById(route.params.characterId);
            setCharacter(data);
            setLoading(false);
        }
        fetchCharacter();
    }, [route.params.characterId]);

    if (loading || !character) return <ActivityIndicator size="large" color="#00ff99" />;

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Image
                source={{ uri: character.image }}
                style={{ width: "100%", height: 300, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>{character.name}</Text>
            <Text>Status: {character.status}</Text>
            <Text>Species: {character.species}</Text>
            <Text>Gender: {character.gender}</Text>
            <Text>Origin: {character.origin.name}</Text>
            <Text>Location: {character.location.name}</Text>
        </ScrollView>
    );
}