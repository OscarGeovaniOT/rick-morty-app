import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { RootStackParamList } from "../../../navigation/app.navigator";
import EpisodeItem from "../components/episodes.item";
import { useEpisodes } from "../hooks/use.episodes";

type EpisodeListScreenNav = NativeStackNavigationProp<
  RootStackParamList,
  "EpisodeList"
>;

export default function EpisodeListScreen() {
  const { episodes, loading, error, loadMore, hasMore } = useEpisodes();

  const navigation = useNavigation<EpisodeListScreenNav>();

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
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
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#00ff99" /> : null
      }
    />
  );
}
