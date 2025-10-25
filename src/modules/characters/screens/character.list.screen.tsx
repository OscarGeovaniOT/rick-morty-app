import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { useCharacters } from "../hooks/use.characters";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CharacterItem from "../components/character.item";

type CharacterListScreenNav = NativeStackNavigationProp<RootStackParamList, "CharacterList">;

export default function CharacterListScreen() {

    const { characters, loading, error, loadMore, hasMore } = useCharacters();

    const navigation = useNavigation<CharacterListScreenNav>();

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        )
    }


    return (
        <FlatList
            data={characters}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <CharacterItem
                    character={item}
                    onPress={() => navigation.navigate("CharacterDetail", { characterId: item.id })}
                />
            )}
            onEndReached={() => hasMore && loadMore()}
            onEndReachedThreshold={0.6}
            ListFooterComponent={
                loading ? <ActivityIndicator size="large" color="#00ff99" /> : null
            }
        />
    )
}