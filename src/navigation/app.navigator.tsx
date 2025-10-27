import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CharacterListScreen from "../modules/characters/screens/character.list.screen";
import CharacterDetailScreen from "../modules/characters/screens/character.detali.screen";
import HomeScreen from "../screens/home.screen";
import LocationListScreen from "../modules/locations/screens/location.list.screen";
import LocationDetailScreen from "../modules/locations/screens/location.detali.screen";
import EpisodeListScreen from "../modules/episodes/screens/episode.list.screen";
import EpisodeDetailsScreen from "../modules/episodes/screens/episode.details.screen";

export type RootStackParamList = {
  Home: undefined;

  CharacterList: undefined;
  CharacterDetail: { characterId: number };

  LocationList: undefined;
  LocationDetail: { locationId: number };

  EpisodeList: undefined;
  EpisodeDetail: { episodeId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Rick & Morty" }}
        />

        <Stack.Screen
          name="CharacterList"
          component={CharacterListScreen}
          options={{ title: "Lista de personajes" }}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
          options={{ title: "Detalles del personaje" }}
        />

        <Stack.Screen
          name="LocationList"
          component={LocationListScreen}
          options={{ title: "Lista de ubicaciones" }}
        />
        <Stack.Screen
          name="LocationDetail"
          component={LocationDetailScreen}
          options={{ title: "Detalles de la ubicación" }}
        />

        <Stack.Screen
          name="EpisodeList"
          component={EpisodeListScreen}
          options={{ title: "Lista de episodios" }}
        />
        <Stack.Screen
          name="EpisodeDetail"
          component={EpisodeDetailsScreen}
          options={{ title: "Detalles del episodio" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
