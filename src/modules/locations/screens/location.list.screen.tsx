import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/app.navigator";
import { useLocations } from "../hooks/use.locations";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CharacterItem from "../components/location.item";
import LocationItem from "../components/location.item";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../../theme/theme";
import { globalStyles } from "../../../theme/styles";

type LocationListScreenNav = NativeStackNavigationProp<
  RootStackParamList,
  "LocationList"
>;

export default function LocationListScreen() {
  const { locations, loading, error, loadMore, hasMore } = useLocations();

  const navigation = useNavigation<LocationListScreenNav>();

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
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LocationItem
            location={item}
            onPress={() =>
              navigation.navigate("LocationDetail", { locationId: item.id })
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
