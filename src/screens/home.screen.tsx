import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/app.navigator";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HomeScreenNav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNav>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("CharacterList")}>
                <Text style={styles.text}>Characters</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("LocationList")}>
                <Text style={styles.text}>Locations</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EpisodeList")}>
                <Text style={styles.text}>Episodes</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    button: {
        backgroundColor: "#00ff99",
        padding: 20,
        marginVertical: 10,
        width: "70%",
        borderRadius: 12,
        alignItems: "center",
    },
    text: { color: "#000", fontSize: 18, fontWeight: "bold" },
});