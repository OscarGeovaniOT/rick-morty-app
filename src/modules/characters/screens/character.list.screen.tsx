import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { useCharacters } from "../hooks/use.characters";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CharacterItem from "../components/character.item";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../../theme/theme";
import { globalStyles } from "../../../theme/styles";

type CharacterListScreenNav = NativeStackNavigationProp<
  RootStackParamList,
  "CharacterList"
>;

export default function CharacterListScreen() {
  const { characters, loading, error, loadMore, hasMore } = useCharacters();

  const navigation = useNavigation<CharacterListScreenNav>();

  if (error) {
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
        <View style={globalStyles.centered}>
          <Text style={[globalStyles.title, { color: "red" }]}>
            Ocurrió un error
          </Text>
          <Text style={globalStyles.text}>{error}</Text>
        </View>
      </LinearGradient>
    );
  }

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
      <View style={styles.headerContainer}>
        <Text style={globalStyles.title}>Listado de Personajes</Text>
        <Text style={globalStyles.subtitle}>
          Desliza para explorar el multiverso 🪐
        </Text>
      </View>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterItem
            character={item}
            onPress={() =>
              navigation.navigate("CharacterDetail", { characterId: item.id })
            }
          />
        )}
        onEndReached={() => hasMore && loadMore()}
        onEndReachedThreshold={0.6}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color={theme.colors.accent} />
          ) : null
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.lg,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
});
