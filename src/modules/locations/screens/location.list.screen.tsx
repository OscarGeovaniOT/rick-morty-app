import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { useLocations } from "../hooks/use.locations";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import CharacterItem from "../components/location.item";
import LocationItem from "../components/location.item";

type LocationListScreenNav = NativeStackNavigationProp<RootStackParamList, "LocationList">;

export default function LocationListScreen() {

    const { locations, loading, error, loadMore, hasMore } = useLocations();

    const navigation = useNavigation<LocationListScreenNav>();

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        )
    }


    return (
        <FlatList
            data={locations}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <LocationItem
                    location={item}
                    onPress={() => navigation.navigate("LocationDetail", { locationId: item.id })}
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