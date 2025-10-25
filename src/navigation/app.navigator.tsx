import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CharacterListScreen from "../modules/characters/screens/character.list.screen";
import CharacterDetailScreen from "../modules/characters/screens/character.detali.screen";


export type RootStackParamList = {
    CharacterList: undefined;
    CharacterDetail: { characterId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="CharacterList"
                    component={CharacterListScreen}
                    options={{ title: "Rick & Morty" }}
                />
                <Stack.Screen
                    name="CharacterDetail"
                    component={CharacterDetailScreen}
                    options={{ title: "Character Details" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}