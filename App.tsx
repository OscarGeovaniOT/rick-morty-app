import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { CharacterRickMortyType } from './src/api/clients/types/character.rickmorty.type';
import { rickMortyService } from './src/api/clients/rick.morty.service';

export default function App() {
  const [characters, setCharacters] = useState<CharacterRickMortyType[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      const data = await rickMortyService.getAllCharacters(1);
      setCharacters(data.results);
    }

    fetchData();
  }, []);


  return (
    <FlatList
      data={characters}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.status}</Text>
            <Text>{item.species}</Text>
          </View>
        </View>
      )}
    />
  )
}
