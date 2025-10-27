import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/app.navigator";
import { useNavigation } from "@react-navigation/native";
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../theme/theme";
import { globalStyles } from "../theme/styles";

type HomeScreenNav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNav>();

  return (
    <LinearGradient
      colors={
        theme.colors.backgroundGradient as unknown as readonly [
          ColorValue,
          ColorValue,
          ...ColorValue[],
        ]
      }
      style={globalStyles.screenContainer}
    >
      <View style={globalStyles.centered}>
        <Text style={globalStyles.title}>Rick & Morty Explorer</Text>
        <Text style={globalStyles.subtitle}>Selecciona una categoría</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CharacterList")}
        >
          <Text style={styles.text}>👨‍🚀 Personajes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LocationList")}
        >
          <Text style={styles.text}>🌌 Ubicaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EpisodeList")}
        >
          <Text style={styles.text}>📺 Episodios</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.md + 2,
    marginVertical: theme.spacing.sm,
    width: "80%",
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
  },
});
