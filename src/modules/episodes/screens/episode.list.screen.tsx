import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootStackParamList } from "../../../navigation/app.navigator";
import EpisodeItem from "../components/episodes.item";
import { useEpisodes } from "../hooks/use.episodes";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../../theme/theme";
import { globalStyles } from "../../../theme/styles";

type EpisodeListScreenNav = NativeStackNavigationProp<
  RootStackParamList,
  "EpisodeList"
>;

export default function EpisodeListScreen() {
  const { episodes, loading, error, loadMore, hasMore } = useEpisodes();

  const navigation = useNavigation<EpisodeListScreenNav>();

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
        <Text style={globalStyles.title}>Listado de Ubicaciones</Text>
        <Text style={globalStyles.subtitle}>
          Explora los mundos del multiverso 🌍
        </Text>
      </View>

      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EpisodeItem
            episode={item}
            onPress={() =>
              navigation.navigate("EpisodeDetail", { episodeId: item.id })
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
